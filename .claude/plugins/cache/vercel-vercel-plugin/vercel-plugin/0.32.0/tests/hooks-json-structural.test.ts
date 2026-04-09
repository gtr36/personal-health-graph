/**
 * Structural validation: hooks.json contains SubagentStart and SubagentStop
 * entries with the expected matchers and timeouts.
 */
import { describe, test, expect } from "bun:test";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

interface HookEntry {
  type: string;
  command: string;
  timeout?: number;
}

interface HookGroup {
  matcher: string;
  hooks: HookEntry[];
}

interface HooksJson {
  hooks: Record<string, HookGroup[]>;
}

const hooksJson: HooksJson = await import(resolve(ROOT, "hooks/hooks.json"));

describe("hooks.json SubagentStart", () => {
  const groups = hooksJson.hooks.SubagentStart;

  test("array exists with at least one entry", () => {
    expect(Array.isArray(groups)).toBe(true);
    expect(groups.length).toBeGreaterThanOrEqual(1);
  });

  test("matcher is '.+'", () => {
    expect(groups[0].matcher).toBe(".+");
  });

  test("hook has timeout set to 5", () => {
    expect(groups[0].hooks[0].timeout).toBe(5);
  });
});

describe("hooks.json SubagentStop", () => {
  const groups = hooksJson.hooks.SubagentStop;

  test("array exists with at least one entry", () => {
    expect(Array.isArray(groups)).toBe(true);
    expect(groups.length).toBeGreaterThanOrEqual(1);
  });

  test("matcher is '.+'", () => {
    expect(groups[0].matcher).toBe(".+");
  });

  test("hook has timeout set to 5", () => {
    expect(groups[0].hooks[0].timeout).toBe(5);
  });
});
