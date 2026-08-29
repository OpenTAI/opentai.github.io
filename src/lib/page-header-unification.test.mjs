import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relativePath) =>
  readFile(new URL(relativePath, import.meta.url), "utf8");

test("the shared integrated heading owns the icon, title, statistics, summary, and action slots", async () => {
  const component = await readSource("../components/integrated-section-heading.tsx");

  assert.match(component, /export function IntegratedSectionHeading/);
  assert.match(component, /className="integrated-section-heading"/);
  assert.match(component, /className="integrated-section-icon"/);
  assert.match(component, /<h1/);
  assert.match(component, /stats\.map/);
  assert.match(component, /integrated-section-summary/);
  assert.match(component, /integrated-section-action/);
});

test("community and ranking directories disable the duplicate hero and integrate their page heading", async () => {
  const community = await readSource("../components/community-page-view.tsx");
  const leaderboard = await readSource("../components/leaderboard-page-view.tsx");
  const arena = await readSource("../components/arena-page.tsx");
  const scoreboards = await readSource("../components/arena-scoreboard-grid.tsx");

  assert.match(community, /showHero=\{false\}/);
  assert.match(community, /<IntegratedSectionHeading/);
  assert.match(community, /title="OpenTAI Community"/);
  assert.match(leaderboard, /showHero=\{false\}/);
  assert.doesNotMatch(leaderboard, /heroAside=/);
  assert.match(arena, /showHero=\{false\}/);
  assert.doesNotMatch(arena, /heroAside=/);
  assert.match(scoreboards, /<IntegratedSectionHeading/);
  assert.match(scoreboards, /<ResourceSubmissionDialog/);
});

test("benchmark and dataset catalogs integrate their heading into the statistics section", async () => {
  const catalog = await readSource("../components/subpage-layout.tsx");

  assert.match(catalog, /\{!resourceCardKind \? \(/);
  assert.match(catalog, /function ResourceStatistics\([\s\S]*?title:/);
  assert.match(catalog, /<IntegratedSectionHeading/);
  assert.match(catalog, /<ResourceSubmissionDialog kind=\{kind\}/);
  assert.doesNotMatch(catalog, /const statisticsTitle/);
  assert.doesNotMatch(catalog, /t\(locale, statisticsTitle\)/);
});

test("decorative pre-headings and the visible contact recipient are absent", async () => {
  const contact = await readSource("../components/contact-dialog.tsx");
  const contribution = await readSource("../components/contribution-dialog.tsx");
  const submission = await readSource("../components/resource-submission-dialog.tsx");
  const community = await readSource("../components/community-page-view.tsx");
  const subscribe = await readSource("../components/subscribe.tsx");
  const overview = await readSource("../components/text-arena-overview.tsx");
  const results = await readSource("../components/arena-results-chart.tsx");

  assert.doesNotMatch(contact, /OpenTAI contact|contact-dialog-email/);
  assert.match(contact, /buildContactMailtoUrl\(email, values\)/);
  assert.doesNotMatch(contribution, /Community submission/);
  assert.doesNotMatch(
    contribution,
    /Questions\? Email|buildVolunteerContactMailto|siteBrand\.contactEmail/,
  );
  assert.doesNotMatch(submission, /Community submission/);
  assert.doesNotMatch(community, /Contributor Recognition/);
  assert.doesNotMatch(subscribe, /OpenTAI Daily/);
  assert.doesNotMatch(overview, /Cross-Category Overview|跨分类总览/);
  assert.doesNotMatch(results, /Official Result Snapshot|官方结果快照/);
});
