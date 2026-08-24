import assert from "node:assert/strict";
import test from "node:test";

import {
  cyberGymResultsFromPayload,
  exploitGymResultsFromPayload,
} from "./arena-live-sync.ts";

test("maps and ranks CyberGym's official level-one success rates", () => {
  const results = cyberGymResultsFromPayload(
    {
      level1: [
        {
          agent: "Runner-up",
          model: "GLM-5.2",
          score_10: 0.848,
          include_in_plot: true,
        },
        {
          agent: "Whitzard \\(白泽\\)",
          model: "Multi-model (GPT-5.4, Claude Opus 4.6)",
          score_10: 0.912,
          include_in_plot: true,
        },
        {
          agent: "Hidden row",
          model: "Model X",
          score_10: 0.99,
          include_in_plot: false,
        },
      ],
    },
    12,
  );

  assert.deepEqual(results, [
    {
      rank: 1,
      name: "Whitzard (白泽)",
      detail: "GPT-5.4 · Claude Opus 4.6",
      value: "91.20%",
    },
    {
      rank: 2,
      name: "Runner-up",
      detail: "GLM-5.2",
      value: "84.80%",
    },
  ]);
});

test("maps and ranks ExploitGym's official on-target exploit counts", () => {
  const results = exploitGymResultsFromPayload(
    {
      results: [
        {
          model: "Claude Mythos Preview (Results obtained in collaboration with Anthropic.)",
          agent: "Claude Code",
          eval_note: "2h timeout",
          on_target: 157,
        },
        {
          model: "GPT-5.6 Sol (reasoning max)",
          agent: "Codex CLI",
          eval_note: "6h timeout",
          on_target: 293,
        },
      ],
    },
    12,
  );

  assert.deepEqual(results, [
    {
      rank: 1,
      name: "GPT-5.6 Sol (reasoning max)",
      detail: "Codex CLI · 6h timeout",
      value: "293",
    },
    {
      rank: 2,
      name: "Claude Mythos Preview",
      detail: "Claude Code · 2h timeout",
      value: "157",
    },
  ]);
});

test("rejects malformed live payloads instead of replacing the static fallback", () => {
  assert.deepEqual(cyberGymResultsFromPayload({ level1: "bad" }), []);
  assert.deepEqual(exploitGymResultsFromPayload({ results: null }), []);
});
