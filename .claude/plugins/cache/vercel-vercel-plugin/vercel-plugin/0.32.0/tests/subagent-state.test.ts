import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  appendPendingLaunch,
  claimPendingLaunch,
  listPendingLaunches,
  readAgentState,
  writeAgentState,
  type PendingLaunch,
} from "../hooks/src/subagent-state.mts";

let sessionId: string;

function pendingLaunchPath(currentSessionId: string): string {
  return join(resolve(tmpdir()), `vercel-plugin-${currentSessionId}-pending-launches.jsonl`);
}

function pendingLaunchLockPath(currentSessionId: string): string {
  return `${pendingLaunchPath(currentSessionId)}.lock`;
}

function agentStatePath(currentSessionId: string, agentId: string): string {
  const agentHash = createHash("sha256").update(agentId).digest("hex");
  return join(resolve(tmpdir()), `vercel-plugin-${currentSessionId}-agent-${agentHash}.json`);
}

function cleanupSessionFiles(currentSessionId: string, agentIds: string[]): void {
  rmSync(pendingLaunchPath(currentSessionId), { force: true });
  rmSync(pendingLaunchLockPath(currentSessionId), { force: true });

  for (const agentId of agentIds) {
    rmSync(agentStatePath(currentSessionId, agentId), { force: true });
  }
}

beforeEach(() => {
  sessionId = `subagent-state-${Date.now()}-${Math.random().toString(36).slice(2)}`;
});

afterEach(() => {
  cleanupSessionFiles(sessionId, ["agent-a", "agent-b", "missing-agent", "broken-agent"]);
});

describe("subagent-state pending launches", () => {
  test("test_listPendingLaunches_filters_expired_records", () => {
    const now = Date.now();
    const expiredLaunch: PendingLaunch = {
      description: "expired",
      prompt: "old",
      subagent_type: "Plan",
      createdAt: now - 61_000,
    };
    const freshLaunch: PendingLaunch = {
      description: "fresh",
      prompt: "new",
      subagent_type: "Plan",
      createdAt: now - 500,
    };

    appendPendingLaunch(sessionId, expiredLaunch);
    appendPendingLaunch(sessionId, freshLaunch);

    expect(listPendingLaunches(sessionId)).toEqual([freshLaunch]);
  });

  test("test_claimPendingLaunch_returns_oldest_matching_record_and_removes_it", () => {
    const now = Date.now();
    const oldestPlan: PendingLaunch = {
      description: "first",
      prompt: "plan first",
      subagent_type: "Plan",
      createdAt: now - 3_000,
    };
    const exploreLaunch: PendingLaunch = {
      description: "explore",
      prompt: "explore",
      subagent_type: "Explore",
      createdAt: now - 2_000,
    };
    const newestPlan: PendingLaunch = {
      description: "second",
      prompt: "plan second",
      subagent_type: "Plan",
      createdAt: now - 1_000,
    };

    appendPendingLaunch(sessionId, newestPlan);
    appendPendingLaunch(sessionId, exploreLaunch);
    appendPendingLaunch(sessionId, oldestPlan);

    expect(claimPendingLaunch(sessionId, "Plan")).toEqual(oldestPlan);
    expect(listPendingLaunches(sessionId)).toEqual([
      exploreLaunch,
      newestPlan,
    ]);
    expect(claimPendingLaunch(sessionId, "Plan")).toEqual(newestPlan);
    expect(claimPendingLaunch(sessionId, "Plan")).toBeNull();
    expect(listPendingLaunches(sessionId)).toEqual([exploreLaunch]);
  });
});

describe("subagent-state agent state", () => {
  test("test_readAgentState_returns_empty_object_when_file_is_missing_or_invalid", () => {
    expect(readAgentState(sessionId, "missing-agent")).toEqual({});

    const brokenPath = agentStatePath(sessionId, "broken-agent");
    writeFileSync(brokenPath, "{not-json", "utf-8");

    expect(readAgentState(sessionId, "broken-agent")).toEqual({});
  });

  test("test_writeAgentState_writes_and_overwrites_state_atomically", () => {
    writeAgentState(sessionId, "agent-a", { step: "queued", attempts: 1 });
    expect(readAgentState(sessionId, "agent-a")).toEqual({ step: "queued", attempts: 1 });

    writeAgentState(sessionId, "agent-a", { step: "claimed", attempts: 2, active: true });

    expect(readAgentState(sessionId, "agent-a")).toEqual({
      step: "claimed",
      attempts: 2,
      active: true,
    });
    expect(JSON.parse(readFileSync(agentStatePath(sessionId, "agent-a"), "utf-8"))).toEqual({
      step: "claimed",
      attempts: 2,
      active: true,
    });
  });
});
