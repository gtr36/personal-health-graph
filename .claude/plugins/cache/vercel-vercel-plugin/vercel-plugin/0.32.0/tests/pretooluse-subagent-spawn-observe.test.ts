import { afterEach, describe, expect, mock, test } from "bun:test";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SOURCE_HOOK = resolve(ROOT, "hooks", "src", "pretooluse-subagent-spawn-observe.mts");
const COMPILED_HOOK = resolve(ROOT, "hooks", "pretooluse-subagent-spawn-observe.mjs");
const SOURCE_STATE = resolve(ROOT, "hooks", "src", "subagent-state.mjs");
const COMPILED_STATE = resolve(ROOT, "hooks", "subagent-state.mjs");

let appendCalls: Array<{ sessionId: string; launch: Record<string, unknown> }> = [];

function configureStateMock(modulePath: string): void {
  appendCalls = [];
  mock.module(modulePath, () => ({
    appendPendingLaunch: (sessionId: string, launch: Record<string, unknown>) => {
      appendCalls.push({ sessionId, launch });
    },
  }));
}

async function loadVariant(kind: "source" | "compiled") {
  if (kind === "source") {
    configureStateMock(SOURCE_STATE);
    return import(`${SOURCE_HOOK}?t=${Date.now()}-${Math.random()}`);
  }

  configureStateMock(COMPILED_STATE);
  return import(`${COMPILED_HOOK}?t=${Date.now()}-${Math.random()}`);
}

afterEach(() => {
  mock.restore();
  delete process.env.SESSION_ID;
});

for (const kind of ["source", "compiled"] as const) {
  describe(`${kind} pretooluse-subagent-spawn-observe`, () => {
    test("returns empty JSON and does not record for non-Agent tools", async () => {
      const mod = await loadVariant(kind);

      expect(mod.run(JSON.stringify({
        tool_name: "Read",
        tool_input: { file_path: "/tmp/example.ts" },
        session_id: "session-non-agent",
      }))).toBe("{}");

      expect(appendCalls).toEqual([]);
    });

    test("writes a pending launch record for Agent tool input", async () => {
      const mod = await loadVariant(kind);
      const sessionId = "session-agent";

      expect(mod.run(JSON.stringify({
        tool_name: "Agent",
        session_id: sessionId,
        tool_input: {
          description: "Observe the failing deploy",
          prompt: "Inspect the Vercel deployment logs and summarize the first error",
          subagent_type: "Explore",
          resume: "resume-token",
          name: "observer",
        },
      }))).toBe("{}");

      expect(appendCalls).toHaveLength(1);
      expect(appendCalls[0]?.sessionId).toBe(sessionId);
      expect(appendCalls[0]?.launch).toMatchObject({
        description: "Observe the failing deploy",
        prompt: "Inspect the Vercel deployment logs and summarize the first error",
        subagent_type: "Explore",
        resume: "resume-token",
        name: "observer",
      });
      expect(typeof appendCalls[0]?.launch.createdAt).toBe("number");
    });

    test("falls back to SESSION_ID when stdin omits session_id", async () => {
      const mod = await loadVariant(kind);
      process.env.SESSION_ID = "env-session-id";

      expect(mod.run(JSON.stringify({
        tool_name: "Agent",
        tool_input: {
          description: "Fallback session",
          prompt: "Use env session id",
        },
      }))).toBe("{}");

      expect(appendCalls).toHaveLength(1);
      expect(appendCalls[0]?.sessionId).toBe("env-session-id");
    });
  });
}
