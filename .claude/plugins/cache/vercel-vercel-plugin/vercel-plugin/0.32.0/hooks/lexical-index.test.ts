import { afterEach, describe, expect, it } from "bun:test";
import { initializeLexicalIndex, searchSkills } from "./src/lexical-index.mts";

const originalMinScore = process.env.VERCEL_PLUGIN_LEXICAL_RESULT_MIN_SCORE;

function restoreMinScore(): void {
  if (typeof originalMinScore === "string") {
    process.env.VERCEL_PLUGIN_LEXICAL_RESULT_MIN_SCORE = originalMinScore;
    return;
  }
  delete process.env.VERCEL_PLUGIN_LEXICAL_RESULT_MIN_SCORE;
}

afterEach(() => {
  restoreMinScore();
  initializeLexicalIndex(new Map());
});

describe("lexical index", () => {
  it("test_searchSkills_matches_top_level_and_metadata_retrieval_with_query_expansion", () => {
    process.env.VERCEL_PLUGIN_LEXICAL_RESULT_MIN_SCORE = "0";
    initializeLexicalIndex(
      new Map([
        [
          "deployments",
          {
            retrieval: {
              aliases: ["deploy"],
              intents: ["publish release"],
              entities: ["environment secret"],
              examples: ["push this app live"],
            },
          },
        ],
        [
          "auth",
          {
            metadata: {
              retrieval: {
                aliases: ["auth"],
                intents: ["login"],
                entities: ["session credentials"],
                examples: ["cannot signin"],
              },
            },
          },
        ],
      ]),
    );

    expect(searchSkills("ship my env config")[0]?.skill).toBe("deployments");
    expect(searchSkills("cant signin with session credentials")[0]?.skill).toBe("auth");
  });

  it("test_searchSkills_filters_results_using_env_min_score", () => {
    initializeLexicalIndex(
      new Map([
        [
          "api-skill",
          {
            retrieval: {
              aliases: ["api"],
              intents: ["endpoint route"],
              entities: ["graphql handler"],
              examples: ["build a rest api"],
            },
          },
        ],
      ]),
    );

    process.env.VERCEL_PLUGIN_LEXICAL_RESULT_MIN_SCORE = "999";

    expect(searchSkills("graphql api route")).toEqual([]);
  });
});
