import assert from "node:assert/strict";
import test from "node:test";
import {
  paperDisplayMeta,
  paperYearCounts,
  sortPapersNewestFirst,
} from "./paper-catalog.ts";
import * as paperCatalog from "./paper-catalog.ts";

const papers = [
  { title: "Older", venue: "ACL", year: "2023" },
  { title: "No year", venue: "NeurIPS" },
  { title: "Newest B", venue: "arXiv", year: "2025" },
  { title: "Newest A", venue: "CVPR", year: "2025" },
];

test("sorts papers newest first and keeps missing years last", () => {
  assert.deepEqual(
    sortPapersNewestFirst(papers).map((paper) => paper.title),
    ["Newest A", "Newest B", "Older", "No year"],
  );
});

test("counts only papers with a recorded four-digit year", () => {
  assert.deepEqual(paperYearCounts(papers), [
    { count: 1, year: 2023 },
    { count: 2, year: 2025 },
  ]);
});

test("separates year and link metadata without repeating arXiv as a venue", () => {
  assert.deepEqual(
    paperDisplayMeta({ arxivId: "2501.00001", venue: "arXiv", year: "2025" }),
    { linkLabel: "arXiv", venueLabel: null, yearLabel: "2025" },
  );
  assert.deepEqual(
    paperDisplayMeta({ arxivId: "2401.00001", venue: "ACL", year: "2024" }),
    { linkLabel: "arXiv", venueLabel: "ACL", yearLabel: "2024" },
  );
});

test("summarizes source-backed paper hero statistics", () => {
  assert.equal(typeof paperCatalog.paperCatalogSummary, "function");

  const summary = paperCatalog.paperCatalogSummary([
    {
      arxivId: "2501.00001",
      domain: "LLMs",
      kind: "research",
      title: "Linked Through arXiv",
    },
    {
      domain: "Agents",
      kind: "survey",
      title: "Linked Through a Public URL",
      url: "https://example.org/paper",
    },
    {
      domain: "LLMs",
      kind: "research",
      title: "No Public Link Recorded",
    },
  ]);

  assert.deepEqual(summary, {
    domains: 2,
    entries: 3,
    links: 2,
    surveys: 1,
  });
});
