import assert from "node:assert/strict";
import test from "node:test";

import {
  applyLeaderboardResultUpdates,
  harmActionsResultsFromHtml,
  trustLlmResultsFromScript,
} from "./leaderboard-live-sync.ts";

test("reads HarmActionsEval rows only from the official SafeActions table", () => {
  const html = `
    <table><tbody><tr><td>1</td><td>Wrong table</td><td>99%</td></tr></tbody></table>
    <table>
      <caption>HarmActionsEval model leaderboard with SafeActions@1 scores.</caption>
      <thead><tr><th>Rank</th><th>Model Name</th><th>SafeActions@1</th></tr></thead>
      <tbody>
        <tr><td>02</td><td><span>GPT-5.3</span><span>OpenAI</span></td><td>12.77%</td></tr>
        <tr><td>01</td><td><span>Qwen3.5-397b-a17b</span><span>Alibaba Cloud</span></td><td>23.40%</td></tr>
        <tr><td>03</td><td><span>Claude Sonnet 4.6</span><span>Anthropic</span></td><td>2.84%</td></tr>
      </tbody>
    </table>`;

  assert.deepEqual(harmActionsResultsFromHtml(html, 2), [
    {
      rank: 1,
      name: "Qwen3.5-397b-a17b",
      detail: "Alibaba Cloud",
      value: "23.40%",
    },
    {
      rank: 2,
      name: "GPT-5.3",
      detail: "OpenAI",
      value: "12.77%",
    },
  ]);
});

test("reads and ranks the published TrustLLM safety metric without evaluating script code", () => {
  const script = `
    safety=[
      {"Model":"GPT-4","Jailbreak (↑)":0.914,"Toxicity (↓)":0.386},
      {"Model":"Llama2-70b","Jailbreak (↑)":0.974,"Toxicity (↓)":0.248},
      {"Model":"ERNIE","Jailbreak (↑)":0.949,"Toxicity (↓)":0.072}
    ];
    globalThis.shouldNeverRun = true;
  `;

  assert.deepEqual(
    trustLlmResultsFromScript(script, {
      dataset: "safety",
      metric: "Jailbreak (↑)",
      limit: 3,
    }),
    [
      { rank: 1, name: "Llama2-70b", value: "0.974" },
      { rank: 2, name: "ERNIE", value: "0.949" },
      { rank: 3, name: "GPT-4", value: "0.914" },
    ],
  );
});

test("reads and ranks the published TrustLLM fairness metric", () => {
  const script = `fairness=[
    {"Model":"gpt-4","Stereotype Recognition  (↑)":0.656},
    {"Model":"Llama3-70b","Stereotype Recognition  (↑)":0.726},
    {"Model":"PaLM2","Stereotype Recognition  (↑)":0.634}
  ]`;

  assert.deepEqual(
    trustLlmResultsFromScript(script, {
      dataset: "fairness",
      metric: "Stereotype Recognition  (↑)",
      limit: 2,
    }),
    [
      { rank: 1, name: "Llama3-70b", value: "0.726" },
      { rank: 2, name: "gpt-4", value: "0.656" },
    ],
  );
});

test("rejects malformed official text instead of replacing verified static results", () => {
  assert.deepEqual(harmActionsResultsFromHtml("<table></table>"), []);
  assert.deepEqual(
    trustLlmResultsFromScript("safety = notJson", {
      dataset: "safety",
      metric: "Jailbreak (↑)",
    }),
    [],
  );

  const records = [
    { name: "HarmActionsEval", results: [{ rank: 1, name: "Verified", value: "1" }] },
    { name: "Other", results: [{ rank: 1, name: "Unchanged", value: "2" }] },
  ];

  assert.deepEqual(
    applyLeaderboardResultUpdates(records, [
      { name: "HarmActionsEval", results: [] },
      {
        name: "Other",
        results: [{ rank: 1, name: "Fresh official row", value: "3" }],
      },
    ]),
    [
      { name: "HarmActionsEval", results: [{ rank: 1, name: "Verified", value: "1" }] },
      { name: "Other", results: [{ rank: 1, name: "Fresh official row", value: "3" }] },
    ],
  );
});
