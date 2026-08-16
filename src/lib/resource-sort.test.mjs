import assert from "node:assert/strict";
import test from "node:test";
import { sortResourceRows } from "./resource-sort.ts";

const rows = [
  { name: "Missing", resources: [], type: "LLMs", note: "", year: undefined },
  { name: "Older", resources: [], type: "LLMs", note: "", year: "2021", downloads: 40, stars: 8 },
  { name: "Newer", resources: [], type: "LLMs", note: "", year: "2024", downloads: 120, stars: 3 },
  { name: "Middle", resources: [], type: "LLMs", note: "", venue: "ACL 2023", downloads: 40, stars: 12 },
];

test("sorts downloads high-to-low and keeps missing values last", () => {
  assert.deepEqual(
    sortResourceRows(rows, "downloads-desc").map((row) => row.name),
    ["Newer", "Older", "Middle", "Missing"],
  );
});

test("sorts stars low-to-high and keeps missing values last", () => {
  assert.deepEqual(
    sortResourceRows(rows, "stars-asc").map((row) => row.name),
    ["Newer", "Older", "Middle", "Missing"],
  );
});

test("sorts years in both directions using explicit year or venue", () => {
  assert.deepEqual(
    sortResourceRows(rows, "year-desc").map((row) => row.name),
    ["Newer", "Middle", "Older", "Missing"],
  );
  assert.deepEqual(
    sortResourceRows(rows, "year-asc").map((row) => row.name),
    ["Older", "Middle", "Newer", "Missing"],
  );
});

test("default order is unchanged and input is not mutated", () => {
  const original = rows.map((row) => row.name);
  assert.deepEqual(
    sortResourceRows(rows, "default").map((row) => row.name),
    original,
  );
  assert.deepEqual(rows.map((row) => row.name), original);
});
