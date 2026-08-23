import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  buildCollectionStatistics,
  buildDatasetStatistics,
  buildRecentYearSeries,
  buildYearSeries,
  countDatasetDomains,
  countUsageBuckets,
  rowMatchesDomainFilters,
} from "./dataset-statistics.ts";

const rows = [
  { year: "2021", type: "LLMs", usageCount: 1 },
  { year: 2023, domain: "Agents", usageCount: 2 },
  {
    year: "2023",
    domains: ["Embodied AI", "LLMs", "LLMs"],
    usageCount: 5,
  },
  { year: "2024", type: "LLMs", domain: "Agents", usageCount: 6 },
  { year: "2024", domains: ["LLMs", "Agents"], usageCount: 20 },
  { year: "not recorded", type: "LLMs", usageCount: 21 },
  { type: "Embodied AI" },
];

test("builds a continuous year series and keeps years without rows", () => {
  assert.deepEqual(buildYearSeries(rows), [
    { year: 2021, count: 1 },
    { year: 2022, count: 0 },
    { year: 2023, count: 2 },
    { year: 2024, count: 2 },
  ]);
});

test("keeps exactly the latest five calendar years and fills missing years", () => {
  const years = buildYearSeries(rows);

  assert.deepEqual(buildRecentYearSeries(years, 2026), [
    { year: 2022, count: 0 },
    { year: 2023, count: 2 },
    { year: 2024, count: 2 },
    { year: 2025, count: 0 },
    { year: 2026, count: 0 },
  ]);
});

test("counts domains from domains, domain, or type without duplicates per row", () => {
  assert.deepEqual(countDatasetDomains(rows), [
    { label: "LLMs", count: 4 },
    { label: "Agents", count: 3 },
    { label: "Embodied AI", count: 2 },
  ]);
});

test("buckets positive usage counts at every boundary", () => {
  assert.deepEqual(countUsageBuckets(rows), [
    { label: "1", count: 1 },
    { label: "2–5", count: 2 },
    { label: "6–20", count: 2 },
    { label: "20+", count: 1 },
  ]);
});

test("returns a unique row total instead of summing multi-domain counts", () => {
  assert.deepEqual(buildDatasetStatistics(rows), {
    total: 7,
    years: [
      { year: 2021, count: 1 },
      { year: 2022, count: 0 },
      { year: 2023, count: 2 },
      { year: 2024, count: 2 },
    ],
    domains: [
      { label: "LLMs", count: 4 },
      { label: "Agents", count: 3 },
      { label: "Embodied AI", count: 2 },
    ],
    usageBuckets: [
      { label: "1", count: 1 },
      { label: "2–5", count: 2 },
      { label: "6–20", count: 2 },
      { label: "20+", count: 1 },
    ],
    usageTotal: 6,
  });
});

test("builds the shared year and domain statistics used by both resource collections", () => {
  assert.deepEqual(buildCollectionStatistics(rows), {
    total: 7,
    years: [
      { year: 2021, count: 1 },
      { year: 2022, count: 0 },
      { year: 2023, count: 2 },
      { year: 2024, count: 2 },
    ],
    domains: [
      { label: "LLMs", count: 4 },
      { label: "Agents", count: 3 },
      { label: "Embodied AI", count: 2 },
    ],
  });
});

test("returns empty chart data for an empty collection", () => {
  assert.deepEqual(buildDatasetStatistics([]), {
    total: 0,
    years: [],
    domains: [],
    usageBuckets: [
      { label: "1", count: 0 },
      { label: "2–5", count: 0 },
      { label: "6–20", count: 0 },
      { label: "20+", count: 0 },
    ],
    usageTotal: 0,
  });
});

test("the dataset chart adapter forwards every recorded domain", () => {
  const component = readFileSync(
    new URL("../components/subpage-layout.tsx", import.meta.url),
    "utf8",
  );

  assert.match(component, /domains:\s*row\.domains/);
});

test("matches category filters against every domain with legacy fallbacks", () => {
  const crossDomain = { domains: ["LLMs", "Embodied AI"], type: "LLMs" };

  assert.equal(rowMatchesDomainFilters(crossDomain, ["Embodied AI"]), true);
  assert.equal(rowMatchesDomainFilters(crossDomain, ["Agents"]), false);
  assert.equal(rowMatchesDomainFilters({ domain: "Agents" }, ["Agents"]), true);
  assert.equal(rowMatchesDomainFilters({ type: "LLMs" }, ["LLMs"]), true);
});

test("the catalog UI omits citation accordions and exposes explicit dataset URLs and domain pills", () => {
  const component = readFileSync(
    new URL("../components/subpage-layout.tsx", import.meta.url),
    "utf8",
  );
  const generator = readFileSync(
    new URL("../../scripts/generate-site.py", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(component, /row\.sourcePapers\?\.length/);
  assert.doesNotMatch(component, /resource-source-disclosure/);
  assert.match(component, /row\.primaryUrl/);
  assert.match(component, /dataset-domain-pills/);
  assert.match(generator, /row\["primaryUrl"\]\s*=\s*rec\["dataUrl"\]/);
});
