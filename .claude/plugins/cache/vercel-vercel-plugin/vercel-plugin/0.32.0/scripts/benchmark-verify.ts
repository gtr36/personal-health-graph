#!/usr/bin/env bun
/**
 * Benchmark verifier: for each completed benchmark project, detects the
 * package manager, runs the dev server, polls localhost for a 200 response,
 * and writes a verify.json with results.
 *
 * Usage: bun run scripts/benchmark-verify.ts [options]
 *   --base <path>     Override base directory (default: ~/dev/vercel-plugin-testing)
 *   --port <number>   Starting port (default: 3000)
 *   --timeout <ms>    Max time to wait for dev server (default: 60000 = 60s)
 *   --slug <name>     Verify only this slug (can repeat)
 *   --help            Print usage and exit
 */

import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { homedir } from "node:os";
import type { BenchmarkRunManifest } from "./benchmark-runner";

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const DEFAULT_BASE = join(homedir(), "dev", "vercel-plugin-testing");

const { values: flags } = parseArgs({
  options: {
    base: { type: "string", default: DEFAULT_BASE },
    port: { type: "string", default: "3000" },
    timeout: { type: "string", default: "60000" },
    slug: { type: "string", multiple: true },
    help: { type: "boolean", default: false },
  },
  strict: true,
});

if (flags.help) {
  console.log(`Usage: bun run scripts/benchmark-verify.ts [options]
  --base <path>     Override base directory (default: ~/dev/vercel-plugin-testing)
  --port <number>   Starting port (default: 3000)
  --timeout <ms>    Max time to wait for dev server (default: 60000 = 60s)
  --slug <name>     Verify only this slug (can repeat)
  --help            Print usage and exit`);
  process.exit(0);
}

const BASE_DIR = resolve(flags.base!);
const START_PORT = parseInt(flags.port!, 10);
const TIMEOUT_MS = parseInt(flags.timeout!, 10);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface VerifyResult {
  slug: string;
  devServer: boolean;
  buildErrors: string[];
  port: number;
  packageManager: string;
  startCommand: string;
  responseStatus: number | null;
  responseBody: string | null;
  durationMs: number;
  timestamp: string;
}

type PackageManager = "npm" | "bun" | "pnpm" | "yarn";

// ---------------------------------------------------------------------------
// Detection helpers
// ---------------------------------------------------------------------------

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function detectPackageManager(projectDir: string): Promise<PackageManager> {
  if (await fileExists(join(projectDir, "bun.lockb"))) return "bun";
  if (await fileExists(join(projectDir, "bun.lock"))) return "bun";
  if (await fileExists(join(projectDir, "pnpm-lock.yaml"))) return "pnpm";
  if (await fileExists(join(projectDir, "yarn.lock"))) return "yarn";
  return "npm";
}

function devCommand(pm: PackageManager): string[] {
  switch (pm) {
    case "bun":
      return ["bun", "run", "dev"];
    case "pnpm":
      return ["pnpm", "run", "dev"];
    case "yarn":
      return ["yarn", "dev"];
    case "npm":
    default:
      return ["npm", "run", "dev"];
  }
}

// ---------------------------------------------------------------------------
// Dev server polling
// ---------------------------------------------------------------------------

const HOSTS = ["localhost", "127.0.0.1"] as const;

export async function pollServer(
  port: number,
  timeoutMs: number,
): Promise<{ status: number | null; body: string | null }> {
  const start = Date.now();
  let delay = 500; // start at 500ms, exponential backoff

  while (Date.now() - start < timeoutMs) {
    for (const host of HOSTS) {
      try {
        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`http://${host}:${port}`, {
          signal: controller.signal,
          redirect: "manual", // don't follow redirects — capture the status
        });
        clearTimeout(fetchTimeout);
        const body = await res.text();
        return { status: res.status, body: body.slice(0, 2000) };
      } catch {
        // Server not ready on this host yet
      }
    }
    await Bun.sleep(delay);
    delay = Math.min(delay * 1.5, 5000); // cap at 5s
  }

  return { status: null, body: null };
}

/** Returns true for any 2xx or 3xx HTTP status code. */
export function isSuccessStatus(status: number | null): boolean {
  return status != null && status >= 200 && status < 400;
}

/** Scan dev server stdout for a port announcement (e.g. localhost:3001, 0.0.0.0:4321). */
export function detectPortFromOutput(output: string): number | null {
  // Match patterns like "localhost:XXXX", "127.0.0.1:XXXX", "0.0.0.0:XXXX", "http://...:XXXX"
  const match = output.match(/(?:localhost|127\.0\.0\.1|0\.0\.0\.0):(\d{4,5})/);
  if (match) {
    const port = parseInt(match[1], 10);
    if (port > 0 && port < 65536) return port;
  }
  return null;
}

async function extractBuildErrors(stderr: string): Promise<string[]> {
  const errors: string[] = [];
  const lines = stderr.split("\n");
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (
      lower.includes("error") ||
      lower.includes("failed") ||
      lower.includes("cannot find module")
    ) {
      errors.push(line.trim());
    }
  }
  // Deduplicate and limit
  return [...new Set(errors)].slice(0, 20);
}

// ---------------------------------------------------------------------------
// Per-project verification
// ---------------------------------------------------------------------------

async function verifyProject(
  projectDir: string,
  slug: string,
  port: number,
): Promise<VerifyResult> {
  const start = Date.now();
  const resultsDir = join(BASE_DIR, "results", slug);

  // Check if the project has a package.json (i.e., claude actually created something)
  const hasPackageJson = await fileExists(join(projectDir, "package.json"));
  if (!hasPackageJson) {
    const result: VerifyResult = {
      slug,
      devServer: false,
      buildErrors: ["No package.json found — project may not have been scaffolded"],
      port,
      packageManager: "unknown",
      startCommand: "none",
      responseStatus: null,
      responseBody: null,
      durationMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
    await writeFile(join(resultsDir, "verify.json"), JSON.stringify(result, null, 2));
    return result;
  }

  // Check if there's a "dev" script
  let pkgJson: Record<string, any>;
  try {
    pkgJson = JSON.parse(await readFile(join(projectDir, "package.json"), "utf-8"));
  } catch {
    const result: VerifyResult = {
      slug,
      devServer: false,
      buildErrors: ["Could not parse package.json"],
      port,
      packageManager: "unknown",
      startCommand: "none",
      responseStatus: null,
      responseBody: null,
      durationMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
    await writeFile(join(resultsDir, "verify.json"), JSON.stringify(result, null, 2));
    return result;
  }

  const hasDevScript = pkgJson.scripts?.dev != null;
  if (!hasDevScript) {
    const result: VerifyResult = {
      slug,
      devServer: false,
      buildErrors: ["No 'dev' script in package.json"],
      port,
      packageManager: await detectPackageManager(projectDir),
      startCommand: "none",
      responseStatus: null,
      responseBody: null,
      durationMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
    await writeFile(join(resultsDir, "verify.json"), JSON.stringify(result, null, 2));
    return result;
  }

  const pm = await detectPackageManager(projectDir);
  const cmd = devCommand(pm);

  // Set PORT env to avoid conflicts
  const env: Record<string, string> = {
    ...(process.env as Record<string, string>),
    PORT: String(port),
  };

  console.log(`  Starting dev server on port ${port} (${cmd.join(" ")})...`);

  const proc = Bun.spawn(cmd, {
    cwd: projectDir,
    stdout: "pipe",
    stderr: "pipe",
    env,
  });

  // Collect early stdout to detect the actual port the framework chose
  let stdoutChunks = "";
  const stdoutReader = (async () => {
    const reader = proc.stdout.getReader();
    const deadline = Date.now() + 15_000; // read for up to 15s
    try {
      while (Date.now() < deadline && stdoutChunks.length < 16_384) {
        const { done, value } = await reader.read();
        if (done) break;
        stdoutChunks += new TextDecoder().decode(value);
      }
    } catch {
      // stream closed
    } finally {
      reader.releaseLock();
    }
  })();

  // Give the process a moment to print its port, then check
  await Bun.sleep(3000);
  const detectedPort = detectPortFromOutput(stdoutChunks);
  const actualPort = detectedPort ?? port;
  if (detectedPort && detectedPort !== port) {
    console.log(`  Detected port ${detectedPort} from stdout (assigned ${port})`);
  }

  // Poll for the server to be ready
  const poll = await pollServer(actualPort, TIMEOUT_MS);

  // Kill the process, then read remaining output
  proc.kill("SIGTERM");
  const killTimer = setTimeout(() => proc.kill("SIGKILL"), 5000);
  // Cancel stdout reader by killing the process, then collect stderr
  await stdoutReader.catch(() => {});
  const stderr = await new Response(proc.stderr).text();
  await proc.exited;
  clearTimeout(killTimer);

  const buildErrors = await extractBuildErrors(stderr);
  const devServerOk = isSuccessStatus(poll.status);

  const result: VerifyResult = {
    slug,
    devServer: devServerOk,
    buildErrors,
    port: actualPort,
    packageManager: pm,
    startCommand: cmd.join(" "),
    responseStatus: poll.status,
    responseBody: poll.body,
    durationMs: Date.now() - start,
    timestamp: new Date().toISOString(),
  };

  await writeFile(join(resultsDir, "verify.json"), JSON.stringify(result, null, 2));
  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n=== Benchmark Verifier ===`);
  console.log(`Base directory: ${BASE_DIR}`);
  console.log(`Server timeout: ${TIMEOUT_MS / 1000}s\n`);

  // Discover project directories — prefer run-manifest.json from runner
  const slugFilter = flags.slug ? new Set(flags.slug) : null;
  let projectSlugs: string[];

  const manifestPath = join(BASE_DIR, "results", "run-manifest.json");
  let manifest: BenchmarkRunManifest | null = null;
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf-8")) as BenchmarkRunManifest;
    projectSlugs = manifest.projects
      .map((p) => p.slug)
      .filter((s) => !slugFilter || slugFilter.has(s))
      .sort();
    console.log(`Loaded run manifest: ${manifest.runId}`);
  } catch {
    // Fallback: glob directories
    let entries: string[];
    try {
      entries = await readdir(BASE_DIR);
    } catch {
      console.error(`Base directory not found: ${BASE_DIR}`);
      console.error(`Run benchmark-runner.ts first.`);
      process.exit(1);
    }
    projectSlugs = entries
      .filter((e) => e !== "results" && !e.startsWith("."))
      .filter((e) => !slugFilter || slugFilter.has(e))
      .sort();
    console.log(`No run manifest found, discovered directories`);
  }

  if (projectSlugs.length === 0) {
    console.error("No project directories found.");
    process.exit(1);
  }

  console.log(`Found ${projectSlugs.length} project(s) to verify\n`);

  const results: VerifyResult[] = [];
  let port = START_PORT;

  for (const slug of projectSlugs) {
    const projectDir = join(BASE_DIR, slug);
    const isDir = (await stat(projectDir)).isDirectory();
    if (!isDir) continue;

    console.log(`--- ${slug} ---`);
    const result = await verifyProject(projectDir, slug, port);

    const status = result.devServer ? "PASS" : "FAIL";
    console.log(
      `  ${status} (${(result.durationMs / 1000).toFixed(1)}s) — ` +
        `status=${result.responseStatus ?? "none"}, pm=${result.packageManager}`,
    );
    if (result.buildErrors.length > 0) {
      console.log(`  Build errors: ${result.buildErrors.length}`);
    }

    results.push(result);
    port++; // Increment port for next project to avoid conflicts
  }

  // Write summary
  const summaryPath = join(BASE_DIR, "results", "verify-summary.json");
  await writeFile(summaryPath, JSON.stringify(results, null, 2));

  // Print summary table
  console.log(`\n=== Verification Summary ===`);
  console.log(
    `${"Slug".padEnd(28)} ${"Dev Server".padEnd(12)} ${"Status".padEnd(8)} ${"PM".padEnd(6)} Errors`,
  );
  console.log("-".repeat(75));
  for (const r of results) {
    console.log(
      `${r.slug.padEnd(28)} ${(r.devServer ? "YES" : "NO").padEnd(12)} ${(r.responseStatus ?? "-").toString().padEnd(8)} ${r.packageManager.padEnd(6)} ${r.buildErrors.length}`,
    );
  }

  const passed = results.filter((r) => r.devServer).length;
  console.log(`\n${passed}/${results.length} projects passed dev server verification`);
  console.log(`Results saved to: ${summaryPath}\n`);

  process.exit(passed === results.length ? 0 : 1);
}

// Only run main when executed directly (not when imported by tests)
const isDirectRun =
  typeof Bun !== "undefined"
    ? Bun.main === import.meta.path
    : process.argv[1] === import.meta.filename;

if (isDirectRun) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(2);
  });
}
