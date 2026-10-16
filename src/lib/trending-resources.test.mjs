import assert from "node:assert/strict";
import test from "node:test";
import { buildTrendingResources, trendingDedupeKey } from "./trending-resources.ts";
import { ecosystemModels } from "../data/ecosystem.ts";
import { subpageConfigs } from "../data/site.ts";

const row = (name, stars, slug) => ({
  name, stars, slug, note: `${name} description`, type: "LLMs", resources: [],
});
const model = (name, stars) => ({
  id: name.toLowerCase(), name, stars, category: "Guard Models",
  description: `${name} safety model`, descriptionZh: `${name} 安全模型`,
  publisher: "Verified Lab", links: [], sources: [], verificationNote: "Verified",
});
const inputs = (overrides = {}) => ({
  models: [], datasets: [], benchmarks: [], allowedBenchmarkSlugs: [], allowedDatasetSlugs: [],
  ...overrides,
});
const dataset = (name, stars, extra = {}) => ({
  ...row(name, stars, `d-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`), ...extra,
});
const admitted = (datasets) => ({ datasets, allowedDatasetSlugs: datasets.map((entry) => entry.slug) });
const names = (resources) => resources.map((resource) => resource.name);

test("only admitted benchmarks compete even when excluded and unknown rows have larger stars", () => {
  assert.deepEqual(names(buildTrendingResources(inputs({
    benchmarks: [row("Excluded", 90000, "excluded"), row("Unknown", 80000, "unknown"),
      row("Approved", 20, "approved"), row("Missing slug", 70000)],
    allowedBenchmarkSlugs: ["approved"],
  }))), ["Approved"]);
});

test("an empty approval list fails closed with no benchmark fallback", () => {
  assert.deepEqual(buildTrendingResources(inputs({
    benchmarks: [row("Safety sounding name", 9999, "safety")],
  })), []);
});

test("all categories require finite nonnegative numeric stars", () => {
  const invalid = [undefined, null, NaN, Infinity, -Infinity, -1, "100"];
  assert.deepEqual(names(buildTrendingResources(inputs({
    models: invalid.map((stars, index) => model(`Model ${index}`, stars)),
    ...admitted(invalid.map((stars, index) => dataset(`Dataset ${index}`, stars))),
    benchmarks: invalid.map((stars, index) => row(`Benchmark ${index}`, stars, `b${index}`)),
    allowedBenchmarkSlugs: invalid.map((_, index) => `b${index}`),
  }))), []);
});

test("recorded zero stars remain eligible in each category", () => {
  assert.deepEqual(names(buildTrendingResources(inputs({
    models: [model("Zero model", 0)], ...admitted([dataset("Zero dataset", 0)]),
    benchmarks: [row("Zero benchmark", 0, "zero")], allowedBenchmarkSlugs: ["zero"],
  }))), ["Zero model", "Zero dataset", "Zero benchmark"]);
});

test("sorts by recorded stars descending and preserves source order for ties", () => {
  assert.deepEqual(names(buildTrendingResources(inputs({
    models: [model("Model tie", 10)],
    ...admitted([dataset("Dataset high", 30), dataset("Dataset tie", 10), dataset("Dataset low", 2)]),
    benchmarks: [row("Benchmark tie", 10, "tie")], allowedBenchmarkSlugs: ["tie"],
  }))), ["Dataset high", "Model tie", "Dataset tie", "Benchmark tie", "Dataset low"]);
});

test("caps the homepage at six and supports a smaller explicit limit", () => {
  const source = inputs(admitted(Array.from({ length: 9 }, (_, i) => dataset(`Dataset ${i}`, i))));
  assert.deepEqual(names(buildTrendingResources(source)), ["Dataset 8", "Dataset 7", "Dataset 6", "Dataset 5", "Dataset 4", "Dataset 3"]);
  assert.deepEqual(names(buildTrendingResources(source, 2)), ["Dataset 8", "Dataset 7"]);
  assert.equal(buildTrendingResources(source, 99).length, 6);
  assert.deepEqual(buildTrendingResources(source, 0), []);
});

test("does not pad a short eligible list", () => {
  assert.deepEqual(names(buildTrendingResources(inputs({ models: [model("Only model", 4)] }))), ["Only model"]);
});

test("maps verified ecosystem model fields and Chinese description to the card", () => {
  const [entry] = buildTrendingResources(inputs({ models: [model("Guard", 23)] }));
  assert.deepEqual(entry, {
    name: "Guard", slug: "guard", type: "Guard Models", note: "Guard safety model",
    noteZh: "Guard 安全模型", venue: "Verified Lab", stars: 23,
    resources: [], collection: "Models", href: "/models",
  });
});

test("only audited datasets compete and an empty dataset allowlist fails closed", () => {
  const rows = [dataset("Kept", 5), dataset("Excluded general corpus", 90000), row("No slug", 70000)];
  assert.deepEqual(names(buildTrendingResources(inputs({
    datasets: rows, allowedDatasetSlugs: ["d-kept"],
  }))), ["Kept"]);
  assert.deepEqual(buildTrendingResources(inputs({ datasets: rows })), []);
});

test("a resource listed as dataset and benchmark appears once, as the benchmark", () => {
  const shared = { resources: [{ label: "GitHub", href: "https://github.com/Lab/Shared/blob/main/data.csv" }] };
  assert.deepEqual(buildTrendingResources(inputs({
    ...admitted([dataset("Shared resource", 8, { repo: "lab/shared" })]),
    benchmarks: [{ ...row("Shared resource (bench)", 8, "shared"), ...shared }],
    allowedBenchmarkSlugs: ["shared"],
  })).map(({ name, collection, href }) => ({ name, collection, href })), [
    { name: "Shared resource (bench)", collection: "Benchmarks", href: "/benchmarks" },
  ]);
});

test("same-name resources without any repository collapse by normalized name", () => {
  assert.deepEqual(buildTrendingResources(inputs({
    ...admitted([dataset("Adv-Bench", 3)]), benchmarks: [row("AdvBench", 3, "advbench")],
    allowedBenchmarkSlugs: ["advbench"],
  })).map(({ collection }) => collection), ["Benchmarks"]);
});

test("shared repositories collapse: model beats dataset, equal-star datasets keep catalog order", () => {
  const selected = buildTrendingResources(inputs({
    models: [{ ...model("Beaver", 1610), github: "https://github.com/PKU-Alignment/safe-rlhf" }],
    ...admitted([
      dataset("Anthropic Red Team Attempts", 1856, { repo: "anthropics/hh-rlhf" }),
      dataset("HH-RLHF", 1856, { repo: "Anthropics/HH-RLHF" }),
      dataset("PKU-SafeRLHF", 1610, { repo: "PKU-Alignment/safe-rlhf" }),
      dataset("Other", 1700, { repo: "other/other" }),
    ]),
  }));
  assert.deepEqual(names(selected), ["Anthropic Red Team Attempts", "Other", "Beaver"]);
  assert.equal(trendingDedupeKey(selected[0]), "repo:anthropics/hh-rlhf");
});

test("does not mutate any input arrays or resource objects", () => {
  const source = inputs({
    models: [model("Small", 1), model("Large", 100)],
    ...admitted([dataset("Dataset", 10)]), benchmarks: [row("Benchmark", 20, "approved")],
    allowedBenchmarkSlugs: ["approved"],
  });
  const original = structuredClone(source);
  for (const value of Object.values(source)) {
    for (const entry of value) if (typeof entry === "object") Object.freeze(entry);
    Object.freeze(value);
  }
  buildTrendingResources(source);
  assert.deepEqual(source, original);
});

test("real audited candidates replace OmniSVG and never admit Bench2Drive even above the cutoff", async () => {
  const { trendingBenchmarkSlugs, trendingDatasetSlugs } = await import("../data/trending.ts");
  assert.ok(subpageConfigs.models.tableRows.some((entry) => entry.name === "OmniSVG"));
  assert.ok(subpageConfigs.benchmarks.tableRows.some((entry) => entry.name === "Bench2Drive"));
  const source = inputs({ models: ecosystemModels, datasets: subpageConfigs.datasets.tableRows,
    benchmarks: subpageConfigs.benchmarks.tableRows, allowedBenchmarkSlugs: trendingBenchmarkSlugs,
    allowedDatasetSlugs: trendingDatasetSlugs });
  const selected = buildTrendingResources(source);
  assert.equal(selected.length, 6);
  assert.ok(!names(selected).includes("OmniSVG"));
  assert.ok(!names(selected).includes("Bench2Drive"));
  assert.ok(!names(selected).includes("OpenAssistant OASST1"));
  assert.equal(names(selected).filter((name) => name === "AdvBench").length, 1);
  assert.equal(selected.find((entry) => entry.name === "AdvBench")?.collection, "Benchmarks");
  assert.deepEqual(buildTrendingResources(inputs({
    benchmarks: subpageConfigs.benchmarks.tableRows.filter((entry) => entry.name === "Bench2Drive"),
    allowedBenchmarkSlugs: trendingBenchmarkSlugs,
  })), []);
  for (const entry of selected) {
    if (entry.collection === "Models") assert.ok(ecosystemModels.some((source) => source.name === entry.name));
    if (entry.collection === "Datasets") assert.ok(trendingDatasetSlugs.includes(entry.slug));
    if (entry.collection === "Benchmarks") assert.ok(trendingBenchmarkSlugs.includes(entry.slug));
  }
});
