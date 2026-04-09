import { createHash } from "node:crypto";
import {
  appendFileSync,
  closeSync,
  mkdirSync,
  openSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import * as hookEnvNs from "./hook-env.mjs";
import { createLogger, logCaughtError, type Logger } from "./logger.mjs";

export type PendingLaunch = {
  description: string;
  prompt: string;
  subagent_type: string;
  resume?: string;
  name?: string;
  createdAt: number;
};

const PENDING_LAUNCH_TTL_MS = 60_000;
const LOCK_WAIT_TIMEOUT_MS = 2_000;
const LOCK_WAIT_INTERVAL_MS = 10;
const LOCK_STALE_MS = 5_000;

type HookEnvWithTmpDir = typeof hookEnvNs & {
  getTmpDir?: () => string;
};

const hookEnv = hookEnvNs as HookEnvWithTmpDir;
const log: Logger = createLogger();

function isNodeErrorCode(error: unknown, code: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === code
  );
}

function sleepMs(ms: number): void {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    // Busy-wait for short lock contention windows.
  }
}

function resolveTmpRoot(): string {
  try {
    const tempRoot = hookEnv.getTmpDir?.();
    if (typeof tempRoot === "string" && tempRoot.trim() !== "") {
      return resolve(tempRoot);
    }
  } catch (error) {
    logCaughtError(log, "subagent-state:get-tmp-dir-failed", error, {});
  }

  return resolve(tmpdir());
}

function pendingLaunchPath(sessionId: string): string {
  return join(resolveTmpRoot(), `vercel-plugin-${sessionId}-pending-launches.jsonl`);
}

function pendingLaunchLockPath(sessionId: string): string {
  return `${pendingLaunchPath(sessionId)}.lock`;
}

function agentStatePath(sessionId: string, agentId: string): string {
  const agentHash = createHash("sha256").update(agentId).digest("hex");
  return join(resolveTmpRoot(), `vercel-plugin-${sessionId}-agent-${agentHash}.json`);
}

function maybeClearStaleLock(lockPath: string, context: Record<string, unknown>): void {
  try {
    const stats = statSync(lockPath);
    if (Date.now() - stats.mtimeMs > LOCK_STALE_MS) {
      rmSync(lockPath, { force: true });
      log.debug("subagent-state:stale-lock-cleared", { lockPath, ...context });
    }
  } catch (error) {
    if (!isNodeErrorCode(error, "ENOENT")) {
      logCaughtError(log, "subagent-state:stale-lock-check-failed", error, { lockPath, ...context });
    }
  }
}

function acquireLock(lockPath: string, context: Record<string, unknown>): boolean {
  mkdirSync(dirname(lockPath), { recursive: true });

  const deadline = Date.now() + LOCK_WAIT_TIMEOUT_MS;
  while (Date.now() <= deadline) {
    try {
      const fd = openSync(lockPath, "wx");
      closeSync(fd);
      return true;
    } catch (error) {
      if (isNodeErrorCode(error, "EEXIST")) {
        maybeClearStaleLock(lockPath, context);
        sleepMs(LOCK_WAIT_INTERVAL_MS);
        continue;
      }

      logCaughtError(log, "subagent-state:acquire-lock-failed", error, { lockPath, ...context });
      return false;
    }
  }

  log.debug("subagent-state:lock-timeout", { lockPath, ...context });
  return false;
}

function releaseLock(lockPath: string, context: Record<string, unknown>): void {
  try {
    rmSync(lockPath, { force: true });
  } catch (error) {
    logCaughtError(log, "subagent-state:release-lock-failed", error, { lockPath, ...context });
  }
}

function withLock<T>(
  lockPath: string,
  context: Record<string, unknown>,
  fallback: T,
  action: () => T,
): T {
  if (!acquireLock(lockPath, context)) {
    return fallback;
  }

  try {
    return action();
  } finally {
    releaseLock(lockPath, context);
  }
}

function isPendingLaunch(value: unknown): value is PendingLaunch {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;
  if (
    typeof record.description !== "string" ||
    typeof record.prompt !== "string" ||
    typeof record.subagent_type !== "string" ||
    typeof record.createdAt !== "number" ||
    !Number.isFinite(record.createdAt)
  ) {
    return false;
  }

  if ("resume" in record && typeof record.resume !== "string" && typeof record.resume !== "undefined") {
    return false;
  }

  if ("name" in record && typeof record.name !== "string" && typeof record.name !== "undefined") {
    return false;
  }

  return true;
}

function parsePendingLaunchLine(line: string, filePath: string): PendingLaunch | null {
  if (line.trim() === "") return null;

  try {
    const parsed = JSON.parse(line) as unknown;
    if (isPendingLaunch(parsed)) {
      return parsed;
    }

    log.debug("subagent-state:invalid-pending-launch-record", { filePath, line });
    return null;
  } catch (error) {
    logCaughtError(log, "subagent-state:parse-pending-launch-line-failed", error, { filePath, line });
    return null;
  }
}

function readPendingLaunchFile(filePath: string): PendingLaunch[] {
  try {
    const content = readFileSync(filePath, "utf-8");
    return content
      .split("\n")
      .map((line) => parsePendingLaunchLine(line, filePath))
      .filter((launch): launch is PendingLaunch => launch !== null);
  } catch (error) {
    if (isNodeErrorCode(error, "ENOENT")) {
      return [];
    }

    logCaughtError(log, "subagent-state:read-pending-launch-file-failed", error, { filePath });
    return [];
  }
}

function isPendingLaunchExpired(launch: PendingLaunch, now: number): boolean {
  return now - launch.createdAt > PENDING_LAUNCH_TTL_MS;
}

function serializePendingLaunches(launches: PendingLaunch[]): string {
  if (launches.length === 0) {
    return "";
  }

  return `${launches.map((launch) => JSON.stringify(launch)).join("\n")}\n`;
}

function writeFileAtomically(path: string, content: string, context: Record<string, unknown>): void {
  const tempPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(tempPath, content, "utf-8");
    renameSync(tempPath, path);
  } catch (error) {
    logCaughtError(log, "subagent-state:atomic-write-failed", error, { path, tempPath, ...context });
    try {
      rmSync(tempPath, { force: true });
    } catch {}
  }
}

export function listPendingLaunches(sessionId: string): PendingLaunch[] {
  const now = Date.now();
  return readPendingLaunchFile(pendingLaunchPath(sessionId))
    .filter((launch) => !isPendingLaunchExpired(launch, now))
    .sort((left, right) => left.createdAt - right.createdAt);
}

export function claimPendingLaunch(sessionId: string, agentType: string): PendingLaunch | null {
  const filePath = pendingLaunchPath(sessionId);
  const lockPath = pendingLaunchLockPath(sessionId);

  return withLock(lockPath, { sessionId, agentType, filePath, operation: "claim" }, null, () => {
    const now = Date.now();
    const launches = readPendingLaunchFile(filePath);
    const activeLaunches = launches.filter((launch) => !isPendingLaunchExpired(launch, now));
    const hadExpiredLaunches = activeLaunches.length !== launches.length;

    let claimedLaunch: PendingLaunch | null = null;
    let claimedIndex = -1;

    for (const [index, launch] of activeLaunches.entries()) {
      if (launch.subagent_type !== agentType) {
        continue;
      }

      if (claimedLaunch === null || launch.createdAt < claimedLaunch.createdAt) {
        claimedLaunch = launch;
        claimedIndex = index;
      }
    }

    if (claimedIndex >= 0) {
      activeLaunches.splice(claimedIndex, 1);
    }

    if (claimedLaunch !== null || hadExpiredLaunches) {
      writeFileAtomically(filePath, serializePendingLaunches(activeLaunches), {
        sessionId,
        agentType,
        filePath,
        claimed: claimedLaunch !== null,
      });
    }

    return claimedLaunch;
  });
}

export function appendPendingLaunch(sessionId: string, launch: PendingLaunch): void {
  const filePath = pendingLaunchPath(sessionId);
  const lockPath = pendingLaunchLockPath(sessionId);

  withLock(lockPath, { sessionId, filePath, operation: "append" }, undefined, () => {
    try {
      mkdirSync(dirname(filePath), { recursive: true });
      appendFileSync(filePath, `${JSON.stringify(launch)}\n`, "utf-8");
    } catch (error) {
      logCaughtError(log, "subagent-state:append-pending-launch-failed", error, { sessionId, filePath });
    }
  });
}

export function readAgentState(sessionId: string, agentId: string): Record<string, unknown> {
  const filePath = agentStatePath(sessionId, agentId);

  try {
    const content = readFileSync(filePath, "utf-8").trim();
    if (content === "") {
      return {};
    }

    const parsed = JSON.parse(content) as unknown;
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }

    log.debug("subagent-state:agent-state-not-object", { filePath, agentId, sessionId });
    return {};
  } catch (error) {
    if (!isNodeErrorCode(error, "ENOENT")) {
      logCaughtError(log, "subagent-state:read-agent-state-failed", error, { filePath, agentId, sessionId });
    }
    return {};
  }
}

export function writeAgentState(sessionId: string, agentId: string, state: Record<string, unknown>): void {
  const filePath = agentStatePath(sessionId, agentId);
  writeFileAtomically(filePath, `${JSON.stringify(state)}\n`, { sessionId, agentId, filePath });
}
