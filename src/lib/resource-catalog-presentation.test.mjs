import assert from "node:assert/strict";
import test from "node:test";
import {
  buildLeaderboardSummary,
  buildResourceCatalogSummary,
  compactResourceTitle,
  datasetActionLabel,
} from "./resource-catalog-presentation.ts";

test("compacts only the list-card title at the first colon", () => {
  assert.equal(
    compactResourceTitle("VizWiz Grand Challenge: Answering Visual Questions from Blind People"),
    "VizWiz Grand Challenge",
  );
  assert.equal(compactResourceTitle("数据集名称：补充说明"), "数据集名称");
  assert.equal(compactResourceTitle("HASARD"), "HASARD");
});

test("labels only direct dataset files as downloads", () => {
  for (const href of [
    "https://example.org/data.zip",
    "https://example.org/data.tgz?download=1",
    "https://example.org/data.tar.gz",
    "https://example.org/data.csv",
    "https://example.org/data.jsonl",
    "https://example.org/data.parquet",
  ]) {
    assert.equal(datasetActionLabel(href), "Download", href);
  }

  for (const href of [
    "https://huggingface.co/datasets/org/name",
    "https://github.com/org/repository",
    "https://example.org/dataset",
  ]) {
    assert.equal(datasetActionLabel(href), "Open dataset", href);
  }
});

test("derives benchmark summary only from recorded row fields", () => {
  const summary = buildResourceCatalogSummary(
    [
      {
        name: "A",
        year: "2021",
        stars: 10,
        resources: [
          { href: "https://github.com/example/a", label: "GitHub" },
          { href: "https://arxiv.org/abs/1", label: "Paper" },
        ],
      },
      {
        name: "B",
        venue: "ACL 2024",
        stars: 5,
        resources: [{ href: "https://example.com/b", label: "Project" }],
      },
      { name: "C", resources: [] },
    ],
  );

  assert.deepEqual(summary, {
    entries: 3,
    githubRows: 1,
    links: 3,
    stars: 15,
    yearEnd: 2024,
    yearStart: 2021,
  });
});

test("sums recorded dataset downloads and omits missing aggregate metrics", () => {
  assert.deepEqual(
    buildResourceCatalogSummary(
      [
        {
          name: "A",
          posted: "2023-08-01",
          downloads: 120,
          stars: 12,
          resources: [{ href: "https://huggingface.co/datasets/a/b", label: "Hugging Face" }],
        },
        {
          name: "B",
          downloads: 30,
          stars: 8,
          resources: [{ href: "https://github.com/example/b", label: "GitHub" }],
        },
      ],
    ),
    {
      downloads: 150,
      entries: 2,
      githubRows: 1,
      links: 2,
      stars: 20,
      yearEnd: 2023,
      yearStart: 2023,
    },
  );

  assert.deepEqual(buildResourceCatalogSummary([]), {
    entries: 0,
    githubRows: 0,
    links: 0,
  });
});

test("derives Arena counts from existing leaderboard rows", () => {
  assert.deepEqual(
    buildLeaderboardSummary([
      {
        boards: [
          {
            rows: [
              { link: "https://example.com/a", model: "Model A" },
              { model: "Model B" },
            ],
          },
          { rows: [{ link: "https://example.com/a2", model: "Model A" }] },
        ],
      },
    ]),
    { boards: 2, entries: 3, links: 2, models: 2 },
  );
});
