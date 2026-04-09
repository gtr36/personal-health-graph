#!/usr/bin/env node
/**
 * PreToolUse hook: observes Agent tool launches and records pending
 * subagent spawn metadata for later correlation.
 *
 * Input: JSON on stdin with tool_name, tool_input, session_id, cwd
 * Output: JSON on stdout — {} (observer only, no tool mutation)
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { appendPendingLaunch, type PendingLaunch } from "./subagent-state.mjs";
import { createLogger, logCaughtError } from "./logger.mjs";

const log = createLogger();
const EMPTY_OUTPUT = "{}";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function resolveSessionId(input: Record<string, unknown>, env: NodeJS.ProcessEnv): string | null {
  if (typeof input.session_id === "string" && input.session_id.trim() !== "") {
    return input.session_id;
  }

  if (typeof env.SESSION_ID === "string" && env.SESSION_ID.trim() !== "") {
    return env.SESSION_ID;
  }

  return null;
}

export function parseInput(raw: string, env: NodeJS.ProcessEnv = process.env): {
  sessionId: string;
  toolInput: Record<string, unknown>;
} | null {
  const trimmed = (raw || "").trim();
  if (!trimmed) {
    log.debug("pretooluse-subagent-spawn-observe-skip", { reason: "stdin_empty" });
    return null;
  }

  let input: Record<string, unknown>;
  try {
    const parsed = JSON.parse(trimmed);
    if (!isRecord(parsed)) {
      log.debug("pretooluse-subagent-spawn-observe-skip", { reason: "stdin_not_object" });
      return null;
    }
    input = parsed;
  } catch {
    log.debug("pretooluse-subagent-spawn-observe-skip", { reason: "stdin_parse_fail" });
    return null;
  }

  const toolName = typeof input.tool_name === "string" ? input.tool_name : "";
  if (toolName !== "Agent") {
    log.debug("pretooluse-subagent-spawn-observe-skip", { reason: "unsupported_tool", toolName });
    return null;
  }

  const sessionId = resolveSessionId(input, env);
  if (!sessionId) {
    log.debug("pretooluse-subagent-spawn-observe-skip", { reason: "missing_session_id" });
    return null;
  }

  const toolInput = isRecord(input.tool_input) ? input.tool_input : {};
  return { sessionId, toolInput };
}

export function buildPendingLaunchRecord(toolInput: Record<string, unknown>, createdAt: number): PendingLaunch {
  const resume = typeof toolInput.resume === "string" ? toolInput.resume : undefined;
  const name = typeof toolInput.name === "string" ? toolInput.name : undefined;
  const pendingLaunch: PendingLaunch = {
    description: typeof toolInput.description === "string" ? toolInput.description : "",
    prompt: typeof toolInput.prompt === "string" ? toolInput.prompt : "",
    subagent_type: typeof toolInput.subagent_type === "string" ? toolInput.subagent_type : "",
    createdAt,
    ...(resume !== undefined ? { resume } : {}),
    ...(name !== undefined ? { name } : {}),
  };

  return pendingLaunch;
}

export function writePendingLaunchRecord(sessionId: string, toolInput: Record<string, unknown>): string {
  const createdAt = Date.now();
  const payload = buildPendingLaunchRecord(toolInput, createdAt);

  appendPendingLaunch(sessionId, payload);

  log.debug("pretooluse-subagent-spawn-observe-recorded", {
    sessionId,
    subagentType: typeof payload.subagent_type === "string" ? payload.subagent_type : null,
    name: typeof payload.name === "string" ? payload.name : null,
  });

  return sessionId;
}

export function run(rawInput?: string): string {
  let raw = rawInput;

  if (raw === undefined) {
    try {
      raw = readFileSync(0, "utf-8");
    } catch {
      return EMPTY_OUTPUT;
    }
  }

  const parsed = parseInput(raw);
  if (!parsed) {
    return EMPTY_OUTPUT;
  }

  try {
    writePendingLaunchRecord(parsed.sessionId, parsed.toolInput);
  } catch (error) {
    logCaughtError(log, "pretooluse-subagent-spawn-observe-write-failed", error, {
      attempted: "write_pending_launch_record",
      sessionId: parsed.sessionId,
      state: "launch_observation_failed",
    });
  }

  return EMPTY_OUTPUT;
}

function isMainModule(): boolean {
  const entrypoint = fileURLToPath(import.meta.url);
  return process.argv[1] ? resolve(process.argv[1]) === entrypoint : false;
}

if (isMainModule()) {
  process.stdout.write(run());
}
