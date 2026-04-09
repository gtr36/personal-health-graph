#!/usr/bin/env node
/**
 * SubagentStop hook: writes agent metadata to an aggregate ledger file
 * for observability.
 *
 * Input: JSON on stdin with { session_id, cwd, agent_id, agent_type,
 *   agent_transcript_path, last_assistant_message, hook_event_name }
 * Output: empty (no stdout output needed)
 *
 * Appends a JSONL record to <tmpdir>/vercel-plugin-<sessionId>-subagent-ledger.jsonl
 * so the session-end-cleanup hook (or external tools) can inspect subagent history.
 */

import { appendFileSync, mkdirSync } from "node:fs";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { tmpdir } from "node:os";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { listSessionKeys } from "./hook-env.mjs";
import { createLogger, logCaughtError, type Logger } from "./logger.mjs";

const log: Logger = createLogger();

// ---------------------------------------------------------------------------
// Input parsing
// ---------------------------------------------------------------------------

interface SubagentStopInput {
  session_id?: string;
  cwd?: string;
  agent_id?: string;
  agent_type?: string;
  agent_transcript_path?: string;
  last_assistant_message?: string;
  hook_event_name?: string;
}

function parseInput(): SubagentStopInput | null {
  try {
    const raw = readFileSync(0, "utf8");
    if (!raw.trim()) return null;
    return JSON.parse(raw) as SubagentStopInput;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Ledger
// ---------------------------------------------------------------------------

interface LedgerEntry {
  timestamp: string;
  session_id: string;
  agent_id: string;
  agent_type: string;
  agent_transcript_path?: string;
}

function ledgerPath(sessionId: string): string {
  return resolve(tmpdir(), `vercel-plugin-${sessionId}-subagent-ledger.jsonl`);
}

function appendLedger(entry: LedgerEntry): void {
  const path = ledgerPath(entry.session_id);
  try {
    appendFileSync(path, JSON.stringify(entry) + "\n", "utf-8");
  } catch (error) {
    logCaughtError(log, "subagent-stop-sync:append-ledger-failed", error, { path });
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const input = parseInput();
  if (!input) {
    process.exit(0);
  }

  const sessionId = input.session_id;
  if (!sessionId) {
    process.exit(0);
  }

  const agentId = input.agent_id ?? "unknown";
  const agentType = input.agent_type ?? "unknown";

  log.debug("subagent-stop-sync", { sessionId, agentId, agentType });

  let ledgerEntryWritten = false;
  try {
    appendLedger({
      timestamp: new Date().toISOString(),
      session_id: sessionId,
      agent_id: agentId,
      agent_type: agentType,
      agent_transcript_path: input.agent_transcript_path,
    });
    ledgerEntryWritten = true;
  } catch (error) {
    logCaughtError(log, "subagent-stop-sync:ledger-write-failed", error, {
      sessionId,
      agentId,
    });
  }

  // Count skills injected for this agent by reading the scoped claim dir
  let skillsInjected = 0;
  try {
    const claimed = listSessionKeys(sessionId, "seen-skills", agentId !== "unknown" ? agentId : undefined);
    skillsInjected = claimed.length;
  } catch {
    // Non-critical — claim dir may not exist if no skills were injected
  }

  log.summary("subagent-stop-sync:complete", {
    agent_id: agentId,
    agent_type: agentType,
    skills_injected: skillsInjected,
    ledger_entry_written: ledgerEntryWritten,
  });

  process.exit(0);
}

const ENTRYPOINT = fileURLToPath(import.meta.url);
const isEntrypoint = process.argv[1]
  ? resolve(process.argv[1]) === ENTRYPOINT
  : false;

if (isEntrypoint) {
  main();
}

// Exports for testing
export { parseInput, appendLedger, ledgerPath, main };
export type { SubagentStopInput, LedgerEntry };
