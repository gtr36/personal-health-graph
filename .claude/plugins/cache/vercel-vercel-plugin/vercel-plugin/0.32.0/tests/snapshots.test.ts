/**
 * Golden snapshot tests for hook payloads.
 *
 * Asserts exact matchedSkills, injectedSkills, and droppedByCap values
 * for representative fixtures loaded from tests/fixtures/golden-payloads.json.
 *
 * Covers: vercel.json edit, next.config.ts read, bash deploy command,
 * AI SDK file edit, and cap-collision scenarios.
 */

import { describe, test, expect, beforeEach } from "bun:test";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const HOOK_SCRIPT = join(ROOT, "hooks", "pretooluse-skill-inject.mjs");
const PAYLOADS_PATH = join(ROOT, "tests", "fixtures", "consolidated-payloads.json");

// Unique session ID per test to avoid cross-test dedup conflicts
let testSession: string;

beforeEach(() => {
  testSession = `snap-${Date.now()}-${Math.random().toString(36).slice(2)}`;
});

// High budget disables budget-based limiting so cap tests are unaffected
const UNLIMITED_BUDGET = "999999";

interface HookResult {
  code: number;
  stdout: string;
  stderr: string;
  skillInjection: Record<string, unknown> | null;
  additionalContext: string;
}

/** Extract skillInjection metadata from the HTML comment in additionalContext. */
function parseSkillInjection(additionalContext: string): Record<string, unknown> | null {
  const match = additionalContext.match(/<!-- skillInjection: (\{.*?\}) -->/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

async function runHook(input: object): Promise<HookResult> {
  const payload = JSON.stringify({ ...input, session_id: testSession });
  const proc = Bun.spawn(["node", HOOK_SCRIPT], {
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    env: {
      ...process.env,
      VERCEL_PLUGIN_HOOK_DEDUP: "off",
      VERCEL_PLUGIN_INJECTION_BUDGET: UNLIMITED_BUDGET,
    },
  });
  proc.stdin.write(payload);
  proc.stdin.end();
  const code = await proc.exited;
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();

  let skillInjection: Record<string, unknown> | null = null;
  let additionalContext = "";
  try {
    const parsed = JSON.parse(stdout);
    additionalContext = parsed?.hookSpecificOutput?.additionalContext ?? "";
    skillInjection = parseSkillInjection(additionalContext);
  } catch {}

  return { code, stdout, stderr, skillInjection, additionalContext };
}

// ---------------------------------------------------------------------------
// Load consolidated golden payloads
// ---------------------------------------------------------------------------

interface GoldenFixture {
  name: string;
  input: {
    tool_name: string;
    tool_input: Record<string, string>;
  };
  expected: {
    skillInjection: {
      version: number;
      toolName: string;
      toolTarget: string;
      matchedSkills: string[];
      injectedSkills: string[];
      droppedByCap: string[];
      droppedByBudget: string[];
    };
  };
}

const payloads: { fixtures: GoldenFixture[] } = JSON.parse(
  readFileSync(PAYLOADS_PATH, "utf-8"),
);

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("golden payload snapshots", () => {
  for (const fixture of payloads.fixtures) {
    test(`golden: ${fixture.name}`, async () => {
      const { code, skillInjection: actual, additionalContext } = await runHook(fixture.input);
      expect(code).toBe(0);
      expect(actual).not.toBeNull();

      const expected = fixture.expected.skillInjection;

      // Version and tool metadata must match exactly
      expect(actual!.version).toBe(expected.version);
      expect(actual!.toolName).toBe(expected.toolName);
      expect(actual!.toolTarget).toBe(expected.toolTarget);

      // matchedSkills — same set (order may vary)
      expect([...(actual!.matchedSkills as string[])].sort()).toEqual(
        [...expected.matchedSkills].sort(),
      );

      // injectedSkills — exact ordered list (ranking matters)
      expect(actual!.injectedSkills).toEqual(expected.injectedSkills);

      // droppedByCap — same set (order may vary)
      expect([...(actual!.droppedByCap as string[])].sort()).toEqual(
        [...expected.droppedByCap].sort(),
      );

      // droppedByBudget — same set (order may vary)
      expect([...((actual!.droppedByBudget as string[]) || [])].sort()).toEqual(
        [...expected.droppedByBudget].sort(),
      );

      // Invariant: injected + droppedByCap + droppedByBudget + summaryOnly = matchedSkills
      const summaryOnlyLen = Array.isArray(actual!.summaryOnly) ? (actual!.summaryOnly as string[]).length : 0;
      expect(
        (actual!.injectedSkills as string[]).length +
          (actual!.droppedByCap as string[]).length +
          ((actual!.droppedByBudget as string[])?.length || 0) +
          summaryOnlyLen,
      ).toBe((actual!.matchedSkills as string[]).length);

      // Verify additionalContext contains skill markers for each injected skill
      for (const skill of expected.injectedSkills) {
        expect(additionalContext).toContain(`Skill(${skill})`);
      }
    });
  }

  test("consolidated payloads file has at least 5 fixtures", () => {
    expect(payloads.fixtures.length).toBeGreaterThanOrEqual(5);
  });
});
