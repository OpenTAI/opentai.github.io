import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("leaderboard page uses the arena scoreboard instead of summary charts", () => {
  const source = readFileSync(
    new URL("../components/leaderboard-page-view.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /ArenaScoreboardGrid/);
  assert.match(source, /kind="leaderboard"/);
  assert.doesNotMatch(source, /LeaderboardStatistics/);
  assert.doesNotMatch(source, /RankingResourceGrid/);
});

test("leaderboard page shares the arena visual shell", () => {
  const source = readFileSync(
    new URL("../components/leaderboard-page-view.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /className="leaderboard-page arena-page"/);
  assert.match(source, /showHero=\{false\}/);
  assert.doesNotMatch(source, /heroAside=/);
  assert.doesNotMatch(source, /showDescription/);
});

test("leaderboard cards use the arena ice-blue surface system", () => {
  const source = readFileSync(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(
    source,
    /\.leaderboard-page \.leaderboard-statistics\s*\{[^}]*background:\s*var\(--arena-panel\)/s,
  );
  assert.match(
    source,
    /\.leaderboard-page \.ranking-resource-card\s*\{[^}]*background:\s*var\(--arena-card\)/s,
  );
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
