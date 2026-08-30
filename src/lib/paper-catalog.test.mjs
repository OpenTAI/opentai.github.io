import assert from "node:assert/strict";
import test from "node:test";
import {
  paperDisplayMeta,
  paperYearCounts,
  sortPapersNewestFirst,
} from "./paper-catalog.ts";
import * as paperCatalog from "./paper-catalog.ts";
import { paperLibrary } from "../data/papers.ts";
import { paperSearchIndex } from "../data/paper-search.ts";

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
  assert.deepEqual(
    paperDisplayMeta({
      arxivId: "2601.04566",
      venue: "Findings of the Association for Computational Linguistics: ACL",
      year: "2026",
    }),
    { linkLabel: "arXiv", venueLabel: "ACL Findings", yearLabel: "2026" },
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

test("shows every verified author when a paper has at most five authors", () => {
  assert.equal(typeof paperCatalog.formatPaperAuthors, "function");

  assert.equal(
    paperCatalog.formatPaperAuthors([
      "Mahiro Nakao",
      "Kazuhiro Takemoto",
      "Aiko Example",
      "Bo Example",
      "Chen Example",
    ]),
    "Mahiro Nakao, Kazuhiro Takemoto, Aiko Example, Bo Example, Chen Example",
  );
});

test("uses et al. only when a paper has more than five verified authors", () => {
  assert.equal(typeof paperCatalog.formatPaperAuthors, "function");

  assert.equal(
    paperCatalog.formatPaperAuthors([
      "Yunhao Feng",
      "Yige Li",
      "Yutao Wu",
      "Yingshui Tan",
      "Yanming Guo",
      "Yifan Ding",
    ]),
    "Yunhao Feng et al.",
  );
});

test("paper search text includes every author even when the display is abbreviated", () => {
  assert.equal(typeof paperCatalog.paperSearchText, "function");

  const text = paperCatalog.paperSearchText({
    authors: ["Yunhao Feng", "Yige Li", "Xingjun Ma"],
    domain: "Embodied AI",
    group: "Agentic",
    title: "BackdoorAgent",
    venue: "ACL",
    year: "2026",
  });

  assert.match(text, /xingjun ma/);
});

test("generated paper data retains the verified full author list", () => {
  const paper = paperLibrary.find((row) =>
    row.title.startsWith("BackdoorAgent: A Unified Framework"),
  );

  assert.ok(paper);
  assert.deepEqual(paper.authors, [
    "Yunhao Feng",
    "Yige Li",
    "Yutao Wu",
    "Yingshui Tan",
    "Yanming Guo",
    "Yifan Ding",
    "Kun Zhai",
    "Xingjun Ma",
    "Yu-Gang Jiang",
  ]);
  assert.equal(paper.authorCount, 9);
});

test("the slim Discover index searches verified coauthors", () => {
  const paper = paperSearchIndex.find((row) =>
    row.t.startsWith("BackdoorAgent: A Unified Framework"),
  );

  assert.ok(paper);
  assert.match(paper.s ?? "", /Xingjun Ma/);
});
