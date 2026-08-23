import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  filterEcosystemRecords,
  formatCatalogValue,
  getFrameworkCategory,
  getFrameworkCategories,
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

test("searches company direction, country, academic origin, and status metadata", () => {
  const company = {
    ...records[0],
    id: "company",
    direction: "Agent security",
    directionZh: "智能体安全",
    country: "United States",
    countryZh: "美国",
    academicOrigin: "Carnegie Mellon University",
    academicOriginZh: "卡内基梅隆大学",
    status: "Acquired",
    statusZh: "已被收购",
  };

  for (const query of ["agent security", "美国", "Carnegie Mellon", "已被收购"]) {
    assert.deepEqual(
      filterEcosystemRecords([company], { category: "All", query }).map(
        (record) => record.id,
      ),
      ["company"],
    );
  }
});

test("renders explicit localized placeholders for unrecorded fields", () => {
  assert.equal(formatCatalogValue(undefined, "en"), "Not recorded yet");
  assert.equal(formatCatalogValue("", "zh"), "尚未记录");
  assert.equal(formatCatalogValue(2024, "en"), "2024");
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

test("company cards use the warm editorial atlas layout", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const component = readFileSync(
    new URL("../components/ecosystem-catalog-page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.ecosystem-catalog-companies\s*{[\s\S]*?--company-green:\s*#2d7d48/);
  assert.match(css, /\.company-hero-mark\s*{[\s\S]*?font-family:\s*ui-serif/);
  assert.match(css, /\.ecosystem-catalog-companies\s+\.company-logo-panel\s*{[\s\S]*?background-size:\s*18px 18px/);
  assert.match(css, /\.company-valuation-highlight\s*{[\s\S]*?background:\s*var\(--company-ink\)/);
  assert.match(component, /company-card-index/);
  assert.match(component, /company-valuation-highlight/);
  assert.match(component, /company-market-node-copy/);
  assert.match(component, /function CompanyMarketMap/);
  assert.match(component, /companyMarketGroups/);
  assert.match(component, /Companies grouped by their verified directory category/);
  assert.match(css, /\.company-market-map\s*{[\s\S]*?background-size:\s*24px 24px/);
  assert.match(css, /\.company-market-layer\s*{[\s\S]*?--company-layer-color/);
  assert.match(css, /\.company-market-node\s*{[\s\S]*?grid-template-columns:/);
});

test("company landscape nodes are narrower and vertically roomier", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(
    css,
    /\.company-market-node\s*\{[^}]*width:\s*14rem;[^}]*min-height:\s*4rem/,
  );
  assert.match(
    css,
    /\.company-market-node-valued\s*\{[^}]*min-width:\s*14rem/,
  );
});

test("company directory uses a compact four-column desktop layout", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(
    css,
    /@media\s*\(min-width:\s*1280px\)\s*\{\s*\.ecosystem-catalog-companies\s+\.ecosystem-grid\s*\{\s*grid-template-columns:\s*repeat\(4,/,
  );
  assert.match(
    css,
    /\.ecosystem-catalog-companies\s+\.company-logo-panel\s*\{[^}]*min-height:\s*5rem/,
  );
  assert.match(
    css,
    /\.ecosystem-catalog-companies\s+\.company-card-body\s*\{[^}]*padding:\s*0\.72rem/,
  );
});

test("framework records are grouped into the three approved display categories", () => {
  const frameworks = [
    { ...records[0], id: "openrt", category: "Red Teaming" },
    { ...records[0], id: "attack", category: "Attack" },
    { ...records[0], id: "promptfoo", category: "Evaluation" },
    { ...records[0], id: "safe-rlhf", category: "Defense" },
  ];

  assert.equal(getFrameworkCategory("Attack"), "Red Teaming");
  assert.equal(getFrameworkCategory("Defense"), "Defense / Alignment");
  assert.equal(getFrameworkCategory("Evaluation"), "Evaluation");
  assert.deepEqual(getFrameworkCategories(frameworks), [
    "Red Teaming",
    "Evaluation",
    "Defense / Alignment",
  ]);
});
