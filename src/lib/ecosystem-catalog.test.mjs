import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import * as catalog from "./ecosystem-catalog.ts";
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

test("company filters expose verified years, countries, and specialty keywords", () => {
  assert.equal(typeof catalog.getCompanyFilterOptions, "function");

  const companies = [
    {
      ...records[0],
      id: "company-us",
      founded: 2024,
      country: "United States",
      countryZh: "美国",
      direction: "Guard models · Agent security",
      directionZh: "护栏模型 · 智能体安全",
    },
    {
      ...records[1],
      id: "company-cn",
      founded: 2023,
      country: "China",
      countryZh: "中国",
      direction: "Safety infrastructure · Agent security",
      directionZh: "安全基础设施 · 智能体安全",
    },
  ];

  assert.deepEqual(catalog.getCompanyFilterOptions(companies, "en"), {
    years: [2024, 2023],
    countries: ["China", "United States"],
    specialties: ["Agent security", "Guard models", "Safety infrastructure"],
  });
  assert.deepEqual(catalog.getCompanyFilterOptions(companies, "zh").specialties, [
    "安全基础设施",
    "护栏模型",
    "智能体安全",
  ]);
});

test("company filters combine year, localized country, and specialty", () => {
  assert.equal(typeof catalog.filterCompanyRecords, "function");

  const companies = [
    {
      ...records[0],
      id: "company-us",
      founded: 2024,
      country: "United States",
      countryZh: "美国",
      direction: "Guard models · Agent security",
      directionZh: "护栏模型 · 智能体安全",
    },
    {
      ...records[1],
      id: "company-cn",
      founded: 2023,
      country: "China",
      countryZh: "中国",
      direction: "Safety infrastructure · Agent security",
      directionZh: "安全基础设施 · 智能体安全",
    },
  ];

  assert.deepEqual(
    catalog.filterCompanyRecords(companies, {
      country: "中国",
      locale: "zh",
      specialty: "智能体安全",
      year: "2023",
    }).map((record) => record.id),
    ["company-cn"],
  );
});

test("company valuation labels use the requested ChatGPT estimate wording", () => {
  assert.equal(typeof catalog.formatCompanyValuation, "function");
  assert.equal(
    catalog.formatCompanyValuation("OpenTAI estimate · $70–140M", "en"),
    "ChatGPT estimate · $70–140M",
  );
  assert.equal(
    catalog.formatCompanyValuation("OpenTAI 估算 · 5,000万–1亿元人民币", "zh"),
    "ChatGPT 估算 · 5,000万–1亿元人民币",
  );
});

test("company page is an unclassified, filterable brand wall", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const component = readFileSync(
    new URL("../components/ecosystem-catalog-page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.ecosystem-catalog-companies\s*{[\s\S]*?--company-electric:\s*#4b7cff/);
  assert.match(css, /\.company-brand-heading\s*{[^}]*display:\s*flex/);
  assert.match(css, /\.company-valuation-highlight\s*{[\s\S]*?background:\s*var\(--company-ink\)/);
  assert.match(component, /company-filter-control/);
  assert.match(component, /strings\.specialty/);
  assert.match(component, /strings\.strength/);
  assert.match(component, /company-valuation-highlight/);
  assert.doesNotMatch(component, /function CompanyMarketMap/);
  assert.doesNotMatch(component, /className="ecosystem-category">\{record\.category\}/);
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
