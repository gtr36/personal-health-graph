import { describe, test, expect } from "bun:test";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  cwdToProjectDirName,
  analyzeSessionJsonl,
  findSessionJsonls,
} from "../scripts/benchmark-analyze";

describe("cwdToProjectDirName", () => {
  test("keeps leading dash for absolute paths", () => {
    expect(cwdToProjectDirName("/Users/john/dev/app")).toBe(
      "-Users-john-dev-app",
    );
  });

  test("matches Claude Code actual directory naming", () => {
    // Real example from ~/.claude/projects/
    expect(
      cwdToProjectDirName("/Users/johnlindquist/dev/vercel-plugin"),
    ).toBe("-Users-johnlindquist-dev-vercel-plugin");
  });

  test("handles nested paths", () => {
    expect(
      cwdToProjectDirName("/Users/john/dev/vercel-plugin-testing/01-recipe"),
    ).toBe("-Users-john-dev-vercel-plugin-testing-01-recipe");
  });

  test("handles root path", () => {
    expect(cwdToProjectDirName("/")).toBe("-");
  });
});

describe("analyzeSessionJsonl", () => {
  let tmpDir: string;

  test("extracts tokens and tool calls from mock JSONL", async () => {
    tmpDir = await mkdtemp(join(tmpdir(), "bench-analyze-"));
    const jsonlPath = join(tmpDir, "session.jsonl");

    const lines = [
      JSON.stringify({
        sessionId: "sess-abc-123",
        message: {
          role: "assistant",
          usage: {
            input_tokens: 100,
            output_tokens: 50,
            cache_read_input_tokens: 20,
            cache_creation_input_tokens: 10,
          },
          content: [
            { type: "tool_use", name: "Read", id: "t1" },
            { type: "tool_use", name: "Bash", id: "t2" },
            { type: "tool_use", name: "Read", id: "t3" },
          ],
        },
      }),
      JSON.stringify({
        message: {
          role: "assistant",
          usage: { input_tokens: 200, output_tokens: 75 },
          content: [
            { type: "tool_use", name: "Edit", id: "t4" },
            {
              type: "tool_result",
              is_error: true,
              content: "file not found",
            },
          ],
        },
      }),
    ];

    await writeFile(jsonlPath, lines.join("\n"));
    const stats = await analyzeSessionJsonl(jsonlPath);

    expect(stats.sessionId).toBe("sess-abc-123");
    expect(stats.tokens.input).toBe(300);
    expect(stats.tokens.output).toBe(125);
    expect(stats.tokens.cacheRead).toBe(20);
    expect(stats.tokens.cacheCreation).toBe(10);
    expect(stats.toolCalls).toEqual({ Read: 2, Bash: 1, Edit: 1 });
    expect(stats.totalToolCalls).toBe(4);
    expect(stats.errors).toContain("file not found");

    await rm(tmpDir, { recursive: true });
  });

  test("handles empty JSONL", async () => {
    tmpDir = await mkdtemp(join(tmpdir(), "bench-analyze-"));
    const jsonlPath = join(tmpDir, "empty.jsonl");
    await writeFile(jsonlPath, "");

    const stats = await analyzeSessionJsonl(jsonlPath);
    expect(stats.sessionId).toBe("");
    expect(stats.totalToolCalls).toBe(0);
    expect(stats.tokens.input).toBe(0);

    await rm(tmpDir, { recursive: true });
  });

  test("handles malformed JSON lines gracefully", async () => {
    tmpDir = await mkdtemp(join(tmpdir(), "bench-analyze-"));
    const jsonlPath = join(tmpDir, "bad.jsonl");
    await writeFile(
      jsonlPath,
      [
        "not json",
        JSON.stringify({
          sessionId: "s1",
          message: { usage: { input_tokens: 10, output_tokens: 5 } },
        }),
        "{broken",
      ].join("\n"),
    );

    const stats = await analyzeSessionJsonl(jsonlPath);
    expect(stats.sessionId).toBe("s1");
    expect(stats.tokens.input).toBe(10);

    await rm(tmpDir, { recursive: true });
  });
});

describe("findSessionJsonls", () => {
  test("returns empty array for nonexistent directory", async () => {
    const result = await findSessionJsonls("/nonexistent/path/xyz");
    expect(result).toEqual([]);
  });
});
