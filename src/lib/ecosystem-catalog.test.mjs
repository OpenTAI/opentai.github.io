import assert from "node:assert/strict";
import test from "node:test";
import {
  filterEcosystemRecords,
  sortEcosystemRecords,
} from "./ecosystem-catalog.ts";

const records = [
  {
    id: "older",
    name: "Older Guard",
    category: "Guard Models",
    description: "Prompt safety classifier",
    descriptionZh: "提示词安全分类器",
    year: 2023,
    stars: 20,
    publisher: "Alpha Lab",
    links: [],
    sources: ["https://example.com/older"],
    verificationNote: "Verified",
  },
  {
    id: "newer",
    name: "Newer Security Model",
    category: "Security Models",
    description: "Cybersecurity model",
    descriptionZh: "网络安全模型",
    year: 2025,
    stars: 10,
    publisher: "Beta Lab",
    links: [],
    sources: ["https://example.com/newer"],
    verificationNote: "Verified",
  },
  {
    id: "missing",
    name: "No Metrics",
    category: "Guard Models",
    description: "No recorded metrics",
    descriptionZh: "没有已记录指标",
    links: [],
    sources: ["https://example.com/missing"],
    verificationNote: "Verified",
  },
];

test("filters by category and English or Chinese search text", () => {
  assert.deepEqual(
    filterEcosystemRecords(records, { category: "Guard Models", query: "alpha" }).map(
      (record) => record.id,
    ),
    ["older"],
  );
  assert.deepEqual(
    filterEcosystemRecords(records, { category: "All", query: "网络安全" }).map(
      (record) => record.id,
    ),
    ["newer"],
  );
});

test("default and stars sorting keep missing values last", () => {
  assert.deepEqual(
    sortEcosystemRecords(records, "default").map((record) => record.id),
    ["older", "newer", "missing"],
  );
  assert.deepEqual(
    sortEcosystemRecords(records, "stars-desc").map((record) => record.id),
    ["older", "newer", "missing"],
  );
});

test("sorts by newest year and name without mutating input", () => {
  const original = records.map((record) => record.id);
  assert.deepEqual(
    sortEcosystemRecords(records, "year-desc").map((record) => record.id),
    ["newer", "older", "missing"],
  );
  assert.deepEqual(
    sortEcosystemRecords(records, "name-asc").map((record) => record.id),
    ["newer", "missing", "older"],
  );
  assert.deepEqual(records.map((record) => record.id), original);
});
