import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("leaderboard page renders source-aware charts before the ranking cards", () => {
  const source = readFileSync(
    new URL("../components/leaderboard-page-view.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /LeaderboardStatistics/);
  assert.ok(source.indexOf("<LeaderboardStatistics") < source.indexOf("<RankingResourceGrid"));
});

test("ranking cards expose the official page before the result rows", () => {
  const source = readFileSync(
    new URL("../components/ranking-resource-grid.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /ranking-resource-primary-link/);
  assert.match(source, /ranking-resource-links/);
  assert.ok(source.indexOf("ranking-resource-primary-link") < source.indexOf("ranking-resource-results"));
  assert.ok(source.indexOf("ranking-resource-results") < source.indexOf("ranking-resource-links"));
});

test("score chart states that independent leaderboard metrics are not comparable", () => {
  const source = readFileSync(
    new URL("../components/leaderboard-statistics.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /not comparable across lines/);
  assert.match(source, /does not create a cross-leaderboard ranking/);
});
