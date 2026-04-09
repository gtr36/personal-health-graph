/**
 * Focused tests for redactCommand() in hooks/pretooluse-skill-inject.mjs.
 *
 * Covers: env-var key preservation, bearer tokens, connection strings,
 * JSON secret values, URL query params, cookies, CLI flags, truncation,
 * and edge cases.
 */

import { describe, test, expect, beforeAll } from "bun:test";

let redactCommand: (cmd: string) => string;

beforeAll(async () => {
  const mod = await import("../hooks/pretooluse-skill-inject.mjs");
  redactCommand = mod.redactCommand;
});

// ---------------------------------------------------------------------------
// Env-var style: KEY=value
// ---------------------------------------------------------------------------

describe("env-var key=value redaction", () => {
  test("preserves full prefixed key name (regression: key-loss bug)", () => {
    expect(redactCommand("VERCEL_TOKEN=abc123")).toBe("VERCEL_TOKEN=[REDACTED]");
    expect(redactCommand("MY_API_KEY=secret")).toBe("MY_API_KEY=[REDACTED]");
    expect(redactCommand("APP_SECRET=s3cret")).toBe("APP_SECRET=[REDACTED]");
    expect(redactCommand("DB_PASSWORD=hunter2 npm start")).toBe("DB_PASSWORD=[REDACTED] npm start");
  });

  test("simple keys without prefix", () => {
    expect(redactCommand("TOKEN=abc123")).toBe("TOKEN=[REDACTED]");
    expect(redactCommand("KEY=abc123")).toBe("KEY=[REDACTED]");
    expect(redactCommand("SECRET=abc123")).toBe("SECRET=[REDACTED]");
  });

  test("sensitive word in the middle of key name", () => {
    expect(redactCommand("MY_SECRET_VALUE=hunter2")).toBe("MY_SECRET_VALUE=[REDACTED]");
    expect(redactCommand("CREDENTIAL_STORE=val")).toBe("CREDENTIAL_STORE=[REDACTED]");
    expect(redactCommand("MY_TOKEN_ID=abc")).toBe("MY_TOKEN_ID=[REDACTED]");
  });

  test("case-insensitive matching", () => {
    expect(redactCommand("token=abc123")).toContain("[REDACTED]");
    expect(redactCommand("Token=abc123")).toContain("[REDACTED]");
  });

  test("multiple env vars in one command", () => {
    const result = redactCommand("TOKEN=aaa KEY=bbb SECRET=ccc");
    expect(result).not.toContain("aaa");
    expect(result).not.toContain("bbb");
    expect(result).not.toContain("ccc");
  });
});

// ---------------------------------------------------------------------------
// Bearer / token authorization
// ---------------------------------------------------------------------------

describe("bearer and token authorization", () => {
  test("masks Bearer tokens", () => {
    const result = redactCommand("curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.abc'");
    expect(result).toContain("Bearer [REDACTED]");
    expect(result).not.toContain("eyJhbGciOiJIUzI1NiJ9");
  });

  test("masks 'token xxx' authorization style", () => {
    const result = redactCommand("gh api -H 'Authorization: token ghp_abc123XYZ456'");
    expect(result).toContain("token [REDACTED]");
    expect(result).not.toContain("ghp_abc123XYZ456");
  });
});

// ---------------------------------------------------------------------------
// Connection strings
// ---------------------------------------------------------------------------

describe("connection strings", () => {
  test("masks postgres connection string credentials", () => {
    const result = redactCommand("psql postgres://admin:s3cret@db.example.com:5432/mydb");
    expect(result).toContain("postgres://[REDACTED]@db.example.com");
    expect(result).not.toContain("s3cret");
    expect(result).not.toContain("admin:");
  });

  test("masks redis connection string credentials", () => {
    const result = redactCommand("redis-cli -u redis://default:hunter2@cache.example.com:6379");
    expect(result).toContain("redis://[REDACTED]@cache.example.com");
    expect(result).not.toContain("hunter2");
  });

  test("masks mysql connection string credentials", () => {
    const result = redactCommand("mysql mysql://root:pass123@localhost:3306/db");
    expect(result).toContain("mysql://[REDACTED]@localhost");
    expect(result).not.toContain("pass123");
  });
});

// ---------------------------------------------------------------------------
// JSON secret values
// ---------------------------------------------------------------------------

describe("JSON secret values", () => {
  test("masks token in JSON", () => {
    const result = redactCommand('echo \'{"token": "sk_live_abc123", "name": "test"}\'');
    expect(result).toContain('"token": "[REDACTED]"');
    expect(result).not.toContain("sk_live_abc123");
    // Non-sensitive keys preserved
    expect(result).toContain('"name": "test"');
  });

  test("masks password and api_key in JSON", () => {
    expect(redactCommand('{"password": "hunter2"}')).toContain('"password": "[REDACTED]"');
    expect(redactCommand('{"api_key": "ak_xyz"}')).toContain('"api_key": "[REDACTED]"');
    expect(redactCommand('{"apiKey": "ak_xyz"}')).toContain('"apiKey": "[REDACTED]"');
  });

  test("masks secret and credential in JSON", () => {
    expect(redactCommand('{"secret": "s3cret"}')).toContain('"secret": "[REDACTED]"');
    expect(redactCommand('{"credential": "cred123"}')).toContain('"credential": "[REDACTED]"');
  });
});

// ---------------------------------------------------------------------------
// URL query parameters
// ---------------------------------------------------------------------------

describe("URL query param redaction", () => {
  test("masks single sensitive query param", () => {
    const result = redactCommand("curl 'https://x.co?token=abc123&name=foo'");
    expect(result).toContain("?token=[REDACTED]");
    expect(result).not.toContain("abc123");
    expect(result).toContain("&name=foo");
  });

  test("masks multiple sensitive query params", () => {
    const result = redactCommand("curl 'https://x.co?key=k1&secret=s2&page=1'");
    expect(result).toContain("?key=[REDACTED]");
    expect(result).toContain("&secret=[REDACTED]");
    expect(result).toContain("&page=1");
  });
});

// ---------------------------------------------------------------------------
// Cookie headers
// ---------------------------------------------------------------------------

describe("cookie header redaction", () => {
  test("masks Cookie header values", () => {
    const result = redactCommand("curl -H 'Cookie: session=abc123; auth_tok=xyz789' https://example.com");
    expect(result).toContain("Cookie: [REDACTED]");
    expect(result).not.toContain("abc123");
    expect(result).not.toContain("xyz789");
  });

  test("masks Set-Cookie header values", () => {
    const result = redactCommand("curl -v 'Set-Cookie: id=a3fWa; Path=/; HttpOnly'");
    expect(result).toContain("Set-Cookie: [REDACTED]");
    expect(result).not.toContain("a3fWa");
  });
});

// ---------------------------------------------------------------------------
// CLI flag redaction (--token, --password, --api-key, --secret, --auth)
// ---------------------------------------------------------------------------

describe("CLI flag redaction", () => {
  test("masks --token flag value", () => {
    const result = redactCommand("vercel --token tk_abcdef deploy");
    expect(result).toContain("--token [REDACTED]");
    expect(result).not.toContain("tk_abcdef");
  });

  test("masks --password flag value", () => {
    const result = redactCommand("mysql --password s3cret -u root");
    expect(result).toContain("--password [REDACTED]");
    expect(result).not.toContain("s3cret");
  });

  test("masks --api-key flag value", () => {
    const result = redactCommand("cli --api-key my-key-123");
    expect(result).toContain("--api-key [REDACTED]");
    expect(result).not.toContain("my-key-123");
  });

  test("masks --secret and --auth flags", () => {
    expect(redactCommand("tool --secret mysecretval")).toContain("--secret [REDACTED]");
    expect(redactCommand("tool --auth bearer_tok")).toContain("--auth [REDACTED]");
  });

  test("masks --credential flag value", () => {
    expect(redactCommand("tool --credential cred123")).toContain("--credential [REDACTED]");
    expect(redactCommand("tool --credential cred123")).not.toContain("cred123");
  });
});

// ---------------------------------------------------------------------------
// Truncation
// ---------------------------------------------------------------------------

describe("truncation", () => {
  test("truncates commands longer than 200 chars", () => {
    const longCmd = "a".repeat(300);
    const result = redactCommand(longCmd);
    expect(result.length).toBeLessThan(300);
    expect(result).toContain("…[truncated]");
    expect(result.startsWith("a".repeat(200))).toBe(true);
  });

  test("does not truncate commands under 200 chars", () => {
    const cmd = "a".repeat(100);
    expect(redactCommand(cmd)).toBe(cmd);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe("edge cases", () => {
  test("handles non-string input gracefully", () => {
    expect(redactCommand(undefined as any)).toBe("");
    expect(redactCommand(null as any)).toBe("");
    expect(redactCommand(123 as any)).toBe("");
  });

  test("returns empty string for empty input", () => {
    expect(redactCommand("")).toBe("");
  });

  test("preserves safe commands unchanged", () => {
    expect(redactCommand("ls -la")).toBe("ls -la");
    expect(redactCommand("git status")).toBe("git status");
    expect(redactCommand("npm install express")).toBe("npm install express");
  });

  test("combined redaction: multiple pattern types in one command", () => {
    const cmd = "VERCEL_TOKEN=abc curl -H 'Authorization: Bearer eyJhbGciOiJI' --password s3cret https://x.co?key=k1";
    const result = redactCommand(cmd);
    expect(result).toContain("VERCEL_TOKEN=[REDACTED]");
    expect(result).toContain("Bearer [REDACTED]");
    expect(result).toContain("--password [REDACTED]");
    expect(result).toContain("?key=[REDACTED]");
    expect(result).not.toContain("abc ");
    expect(result).not.toContain("eyJhbGciOiJI");
    expect(result).not.toContain("s3cret");
    expect(result).not.toContain("k1");
  });
});
