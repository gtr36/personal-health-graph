#!/usr/bin/env bun
/**
 * End-to-end benchmark orchestrator: chains runner → verify → analyze → report,
 * passing the manifest path between stages. Emits structured NDJSON events.
 *
 * Usage: bun run scripts/benchmark-e2e.ts [options]
 *   --quick        Forward to runner (run only first 3 projects)
 *   --base <path>  Override base directory (default: ~/dev/vercel-plugin-testing)
 *   --timeout <ms> Per-project timeout in ms (forwarded to runner)
 *   --help         Print usage and exit
 */

import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { homedir } from "node:os";
import { spawn } from "node:child_process";

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const DEFAULT_BASE = join(homedir(), "dev", "vercel-plugin-testing");

const { values: flags } = parseArgs({
  options: {
    base: { type: "string", default: DEFAULT_BASE },
    quick: { type: "boolean", default: false },
    timeout: { type: "string" },
    help: { type: "boolean", default: false },
  },
  strict: true,
});

if (flags.help) {
  console.log(`Usage: bun run scripts/benchmark-e2e.ts [options]

Options:
  --quick        Run only the first 3 projects (forwarded to runner)
  --base <path>  Override base directory (default: ~/dev/vercel-plugin-testing)
  --timeout <ms> Per-project timeout in ms (forwarded to runner)
  --help         Print this message and exit

Stages:
  1. runner   — Create test directories, install plugin, run claude --print
  2. verify   — Launch dev servers, poll for 200 response
  3. analyze  — Extract metrics from Claude JSONL + trace logs
  4. report   — Generate report.md with scorecards and recommendations

Events are logged to <base>/results/events.jsonl as NDJSON.`);
  process.exit(0);
}

const BASE_DIR = resolve(flags.base!);
const RESULTS_DIR = join(BASE_DIR, "results");
const EVENTS_PATH = join(RESULTS_DIR, "events.jsonl");

// ---------------------------------------------------------------------------
// Event emitter
// ---------------------------------------------------------------------------

interface PipelineEvent {
  stage: string;
  event: string;
  timestamp: string;
  data: Record<string, unknown>;
}

async function emitEvent(
  stage: string,
  event: string,
  data: Record<string, unknown> = {},
): Promise<void> {
  const entry: PipelineEvent = {
    stage,
    event,
    timestamp: new Date().toISOString(),
    data,
  };
  await appendFile(EVENTS_PATH, JSON.stringify(entry) + "\n");
}

// ---------------------------------------------------------------------------
// Stage runner
// ---------------------------------------------------------------------------

const SCRIPTS_DIR = resolve(import.meta.dir);

interface StageConfig {
  name: string;
  script: string;
  args: string[];
}

function buildStages(): StageConfig[] {
  const baseArgs = ["--base", BASE_DIR];

  const runnerArgs = [...baseArgs];
  if (flags.quick) runnerArgs.push("--quick");
  if (flags.timeout) runnerArgs.push("--timeout", flags.timeout);

  return [
    {
      name: "runner",
      script: join(SCRIPTS_DIR, "benchmark-runner.ts"),
      args: runnerArgs,
    },
    {
      name: "verify",
      script: join(SCRIPTS_DIR, "benchmark-verify.ts"),
      args: baseArgs,
    },
    {
      name: "analyze",
      script: join(SCRIPTS_DIR, "benchmark-analyze.ts"),
      args: baseArgs,
    },
    {
      name: "report",
      script: join(SCRIPTS_DIR, "benchmark-report.ts"),
      args: baseArgs,
    },
  ];
}

class StageError extends Error {
  constructor(
    public stage: string,
    public exitCode: number,
    public slug?: string,
  ) {
    const slugInfo = slug ? ` (project: ${slug})` : "";
    super(`Stage "${stage}" failed with exit code ${exitCode}${slugInfo}`);
    this.name = "StageError";
  }
}

async function runStage(stage: StageConfig): Promise<void> {
  const startMs = Date.now();
  await emitEvent(stage.name, "start", { script: stage.script, args: stage.args });

  const exitCode = await new Promise<number>((resolve) => {
    const child = spawn("bun", ["run", stage.script, ...stage.args], {
      stdio: "inherit",
      env: { ...process.env },
    });

    child.on("close", (code) => resolve(code ?? 1));
    child.on("error", (err) => {
      console.error(`Failed to spawn stage "${stage.name}":`, err.message);
      resolve(2);
    });
  });

  const durationMs = Date.now() - startMs;

  if (exitCode !== 0) {
    // Try to identify which project failed from runner summary
    const slug = await findFailedSlug(stage.name);
    await emitEvent(stage.name, "error", { exitCode, durationMs, slug: slug ?? undefined });
    throw new StageError(stage.name, exitCode, slug ?? undefined);
  }

  await emitEvent(stage.name, "complete", { exitCode: 0, durationMs });
}

/**
 * Try to extract the first failed project slug from stage outputs.
 */
async function findFailedSlug(stage: string): Promise<string | null> {
  try {
    if (stage === "runner") {
      const summary = JSON.parse(
        await readFile(join(RESULTS_DIR, "runner-summary.json"), "utf-8"),
      );
      const failed = summary.find((s: { success: boolean }) => !s.success);
      return failed?.slug ?? null;
    }
    if (stage === "verify") {
      const summary = JSON.parse(
        await readFile(join(RESULTS_DIR, "verify-summary.json"), "utf-8"),
      );
      const failed = summary.find((s: { devServer: boolean }) => !s.devServer);
      return failed?.slug ?? null;
    }
  } catch {
    // Summary file may not exist yet
  }
  return null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  await mkdir(RESULTS_DIR, { recursive: true });

  await emitEvent("pipeline", "start", {
    baseDir: BASE_DIR,
    quick: flags.quick,
    timeout: flags.timeout ?? null,
  });

  const stages = buildStages();
  const pipelineStart = Date.now();

  for (const stage of stages) {
    await runStage(stage);
  }

  const totalDurationMs = Date.now() - pipelineStart;
  await emitEvent("pipeline", "complete", { totalDurationMs });

  console.log(`\n=== E2E Pipeline Complete ===`);
  console.log(`Total duration: ${(totalDurationMs / 1000).toFixed(1)}s`);
  console.log(`Events log: ${EVENTS_PATH}`);
  console.log(`Report: ${join(RESULTS_DIR, "report.md")}\n`);
}

main().catch(async (err) => {
  if (err instanceof StageError) {
    await emitEvent("pipeline", "abort", {
      failedStage: err.stage,
      exitCode: err.exitCode,
      slug: err.slug ?? null,
    }).catch(() => {});
    console.error(`\nPipeline aborted: ${err.message}`);
    process.exit(err.exitCode);
  }
  console.error("Fatal error:", err);
  process.exit(2);
});
