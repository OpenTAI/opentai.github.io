import assert from "node:assert/strict";
import test from "node:test";
import { benchmarkCardPresentation } from "./benchmark-card-presentation.ts";
import { t } from "./i18n.ts";

const simulationRow = {
  kind: "benchmark",
  note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: IPI attacks.",
  tags: ["prompt injection", "source: safety-at-scale", "simulation-based benchmarks"],
};

test("removes Safety at Scale attribution from an English Agent benchmark card", () => {
  assert.deepEqual(
    benchmarkCardPresentation({ ...simulationRow, locale: "en" }),
    {
      note: "Evaluation focus: IPI attacks.",
      tags: ["simulation-based benchmarks"],
    },
  );
});

test("shows only the verified Chinese focus and interaction mode", () => {
  const presentation = benchmarkCardPresentation({
    ...simulationRow,
    locale: "zh",
  });

  assert.deepEqual(presentation, {
    note: "Evaluation focus: IPI attacks.",
    tags: ["simulation-based benchmarks"],
  });
  assert.equal(t("zh", presentation.note), "测评重点：间接提示注入攻击。");
});

test("keeps only the real-interaction classification on a real-interaction card", () => {
  assert.deepEqual(
    benchmarkCardPresentation({
      kind: "benchmark",
      locale: "en",
      note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Driving safety.",
      tags: ["robustness", "source: safety-at-scale", "real-interaction benchmarks"],
    }),
    {
      note: "Evaluation focus: Driving safety.",
      tags: ["real-interaction benchmarks"],
    },
  );
});

test("leaves dataset cards unchanged", () => {
  assert.deepEqual(
    benchmarkCardPresentation({
      kind: "dataset",
      locale: "zh",
      note: "Verified training data description.",
      tags: ["source: approved survey", "training dataset"],
    }),
    {
      note: "Verified training data description.",
      tags: ["training dataset"],
    },
  );
});

test("keeps verified interaction tags ahead of the benchmark interaction mode", () => {
  assert.deepEqual(
    benchmarkCardPresentation({
      ...simulationRow,
      tags: [
        "Mobile",
        "Computer-use",
        "prompt injection",
        "simulation-based benchmarks",
      ],
      locale: "en",
    }),
    {
      note: "Evaluation focus: IPI attacks.",
      tags: ["Mobile", "Computer-use", "simulation-based benchmarks"],
    },
  );
});
