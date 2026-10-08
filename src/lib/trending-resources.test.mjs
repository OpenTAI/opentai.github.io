import assert from "node:assert/strict";
import test from "node:test";
import { buildTrendingResources } from "./trending-resources.ts";
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
  models: [], datasets: [], benchmarks: [], allowedBenchmarkSlugs: [], ...overrides,
});
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
    datasets: invalid.map((stars, index) => row(`Dataset ${index}`, stars)),
    benchmarks: invalid.map((stars, index) => row(`Benchmark ${index}`, stars, `b${index}`)),
    allowedBenchmarkSlugs: invalid.map((_, index) => `b${index}`),
  }))), []);
});

test("recorded zero stars remain eligible in each category", () => {
  assert.deepEqual(names(buildTrendingResources(inputs({
    models: [model("Zero model", 0)], datasets: [row("Zero dataset", 0)],
    benchmarks: [row("Zero benchmark", 0, "zero")], allowedBenchmarkSlugs: ["zero"],
  }))), ["Zero model", "Zero dataset", "Zero benchmark"]);
});

test("sorts by recorded stars descending and preserves source order for ties", () => {
  assert.deepEqual(names(buildTrendingResources(inputs({
    models: [model("Model tie", 10)],
    datasets: [row("Dataset high", 30), row("Dataset tie", 10), row("Dataset low", 2)],
    benchmarks: [row("Benchmark tie", 10, "tie")], allowedBenchmarkSlugs: ["tie"],
  }))), ["Dataset high", "Model tie", "Dataset tie", "Benchmark tie", "Dataset low"]);
});

test("caps the homepage at six and supports a smaller explicit limit", () => {
  const source = inputs({ datasets: Array.from({ length: 9 }, (_, i) => row(`Dataset ${i}`, i)) });
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

test("retains category-page links and distinct category occurrences of the same resource", () => {
  const shared = row("Shared resource", 8, "shared");
  assert.deepEqual(buildTrendingResources(inputs({
    datasets: [shared], benchmarks: [shared], allowedBenchmarkSlugs: ["shared"],
  })).map(({ collection, href }) => ({ collection, href })), [
    { collection: "Datasets", href: "/datasets" },
    { collection: "Benchmarks", href: "/benchmarks" },
  ]);
});

test("does not mutate any input arrays or resource objects", () => {
  const source = inputs({
    models: [model("Small", 1), model("Large", 100)],
    datasets: [row("Dataset", 10)], benchmarks: [row("Benchmark", 20, "approved")],
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
  const { trendingBenchmarkSlugs } = await import("../data/trending.ts");
  assert.ok(subpageConfigs.models.tableRows.some((entry) => entry.name === "OmniSVG"));
  assert.ok(subpageConfigs.benchmarks.tableRows.some((entry) => entry.name === "Bench2Drive"));
  const source = inputs({ models: ecosystemModels, datasets: subpageConfigs.datasets.tableRows,
    benchmarks: subpageConfigs.benchmarks.tableRows, allowedBenchmarkSlugs: trendingBenchmarkSlugs });
  const selected = buildTrendingResources(source);
  assert.equal(selected.length, 6);
  assert.ok(!names(selected).includes("OmniSVG"));
  assert.ok(!names(selected).includes("Bench2Drive"));
  assert.deepEqual(buildTrendingResources(inputs({
    benchmarks: subpageConfigs.benchmarks.tableRows.filter((entry) => entry.name === "Bench2Drive"),
    allowedBenchmarkSlugs: trendingBenchmarkSlugs,
  })), []);
  for (const entry of selected) {
    if (entry.collection === "Models") assert.ok(ecosystemModels.some((source) => source.name === entry.name));
    if (entry.collection === "Datasets") assert.ok(subpageConfigs.datasets.tableRows.some((source) => source.name === entry.name));
    if (entry.collection === "Benchmarks") assert.ok(trendingBenchmarkSlugs.includes(entry.slug));
  }
});
