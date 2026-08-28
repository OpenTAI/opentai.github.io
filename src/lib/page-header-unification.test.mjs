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
