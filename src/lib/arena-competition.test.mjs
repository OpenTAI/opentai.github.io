import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildArenaCompetitionState } from "./arena-competition.ts";

test("publishes only approved challenges and verified leaderboard entries", () => {
  const state = buildArenaCompetitionState({
    challenges: [
      { id: "draft", name: "Draft challenge", status: "draft" },
      { id: "open", name: "Open challenge", status: "published" },
    ],
    entries: [
      {
        challengeId: "open",
        participant: "Unverified",
        model: "Model D",
        score: 99,
        evidenceUrl: "https://example.org/unverified",
        verified: false,
      },
      {
        challengeId: "open",
        participant: "Runner-up",
        model: "Model B",
        score: 82,
        evidenceUrl: "https://example.org/runner-up",
        verified: true,
      },
      {
        challengeId: "open",
        participant: "Leader",
        model: "Model A",
        score: 91,
        evidenceUrl: "https://example.org/leader",
        verified: true,
      },
      {
        challengeId: "draft",
        participant: "Draft result",
        model: "Model C",
        score: 100,
        evidenceUrl: "https://example.org/draft",
        verified: true,
      },
    ],
  });

  assert.deepEqual(state.challenges.map((challenge) => challenge.id), ["open"]);
  assert.deepEqual(state.leaderboard.map((entry) => entry.participant), ["Leader", "Runner-up"]);
  assert.equal(state.challengeCount, 1);
  assert.equal(state.verifiedResultCount, 2);
});

test("reports an honest empty state before OpenTAI publishes a competition", () => {
  const state = buildArenaCompetitionState({ challenges: [], entries: [] });

  assert.deepEqual(state.challenges, []);
  assert.deepEqual(state.leaderboard, []);
  assert.equal(state.challengeCount, 0);
  assert.equal(state.verifiedResultCount, 0);
});

test("ranks only verified results that include public evidence", () => {
  const state = buildArenaCompetitionState({
    challenges: [
      { id: "agent-safety", name: "Agent Safety", status: "published" },
    ],
    entries: [
      {
        challengeId: "agent-safety",
        participant: "Complete runner-up",
        model: "Model B",
        score: 82,
        capabilityScore: 76,
        evidenceUrl: "https://example.org/runner-up",
        verified: true,
      },
      {
        challengeId: "agent-safety",
        participant: "Missing evidence",
        model: "Model C",
        score: 99,
        capabilityScore: 90,
        evidenceUrl: "",
        verified: true,
      },
      {
        challengeId: "agent-safety",
        participant: "Complete leader",
        model: "Model A",
        score: 91,
        capabilityScore: 73,
        evidenceUrl: "https://example.org/leader",
        verified: true,
      },
    ],
  });

  assert.deepEqual(
    state.leaderboard.map((entry) => ({
      participant: entry.participant,
      rank: entry.rank,
    })),
    [
      { participant: "Complete leader", rank: 1 },
      { participant: "Complete runner-up", rank: 2 },
    ],
  );
});

test("the arena page exposes the verified arena ranking directory", () => {
  const source = readFileSync(
    new URL("../components/arena-page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /arenaDirectory/);
  assert.match(source, /ArenaResultsChart/);
  assert.match(source, /ArenaScoreboardGrid/);
  assert.match(source, /TextArenaOverview/);
  assert.match(source, /CodeArenaOverview/);
  assert.ok(source.indexOf("<ArenaScoreboardGrid") < source.indexOf("<TextArenaOverview"));
  assert.ok(source.indexOf("<TextArenaOverview") < source.indexOf("<CodeArenaOverview"));
  assert.ok(source.indexOf("<CodeArenaOverview") < source.indexOf("<ArenaResultsChart"));
});

test("arena scoreboards keep rankings and official links in every grid cell", () => {
  const source = readFileSync(
    new URL("../components/arena-scoreboard-grid.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /arena-scoreboard-grid/);
  assert.match(source, /record\.results\.map/);
  assert.match(source, /record\.links\.map/);
  assert.match(source, /Lower is better/);
});

test("arena page shares the company wall dark technology treatment", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const page = readFileSync(
    new URL("../components/arena-page.tsx", import.meta.url),
    "utf8",
  );
  const component = readFileSync(
    new URL("../components/arena-scoreboard-grid.tsx", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.arena-page\s*\{[^}]*--arena-electric:\s*#4b7cff/);
  assert.match(css, /\.arena-page\s*\{[^}]*--arena-red:\s*#ff5b67/);
  assert.match(css, /\.arena-page\s*\{[^}]*background:\s*#07111f/);
  assert.match(
    css,
    /\.arena-page\s+\.subpage-hero-card\s*\{[^}]*background:\s*#0b1729/,
  );
  assert.match(
    css,
    /\.arena-scoreboard-card\s*\{[^}]*background:\s*var\(--arena-card\)/,
  );
  assert.match(
    css,
    /\.text-arena-overview,\s*\.code-arena-overview,\s*\.arena-results-panel\s*\{[^}]*background:\s*var\(--arena-panel\)/,
  );
  assert.match(css, /\.arena-scoreboard-metric b\s*\{[^}]*color:\s*var\(--arena-orange\)/);
  assert.match(css, /\.arena-scoreboard-track > span\s*\{[^}]*background:\s*#f4f7ff/);
  assert.match(css, /\.arena-scoreboard-value\s*\{[^}]*color:\s*var\(--arena-orange\)/);
  assert.match(css, /\.arena-scoreboard-value\s*\{[^}]*font-variant-numeric:\s*tabular-nums/);
  assert.match(
    css,
    /\.arena-scoreboard-results\s+li:first-child\s+\.arena-scoreboard-value\s*\{[^}]*color:\s*var\(--arena-red\)/,
  );
  assert.match(page, /title="Safety arenas"/);
  assert.match(component, /arena-scoreboard-table-head/);
  assert.match(component, /"Safety arenas"/);
  assert.doesNotMatch(component, /Verified public results/);
});

test("auto-scrolling rankings preserve every independent pause condition", () => {
  const source = readFileSync(
    new URL("../components/arena-scoreboard-grid.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /hoverPausedRef/);
  assert.match(source, /focusPausedRef/);
  assert.match(source, /onPointerDown=\{pauseForManualScroll\}/);
  assert.match(source, /onKeyDown/);
  assert.match(source, /reducedMotion\.addEventListener\("change"/);
});

test("arena scoreboards refresh official live JSON hourly with a static fallback", () => {
  const source = readFileSync(
    new URL("../components/arena-scoreboard-grid.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /cyberGymResultsFromPayload/);
  assert.match(source, /exploitGymResultsFromPayload/);
  assert.match(source, /60 \* 60 \* 1000/);
  assert.match(source, /Promise\.allSettled/);
  assert.match(source, /cache: "no-store"/);
  assert.match(source, /visibilitychange/);
});

test("arena result chart exposes the official source and metric caveat", () => {
  const source = readFileSync(
    new URL("../components/arena-results-chart.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /arenaResults\.source/);
  assert.match(source, /arenaResults\.note/);
  assert.match(source, /arena-chart-metrics/);
  assert.match(source, /series\.color/);
});

test("text arena overview renders every verified category rank and its source", () => {
  const source = readFileSync(
    new URL("../components/text-arena-overview.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /textArenaOverview\.rows\.map/);
  assert.match(source, /textArenaOverview\.columns\.map/);
  assert.match(source, /textArenaOverview\.source/);
  assert.match(source, /text-arena-rank-first/);
});

test("code arena overview renders source-backed scores and the price scatter plot", () => {
  const source = readFileSync(
    new URL("../components/code-arena-overview.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /codeArenaOverview\.models\.map/g);
  assert.match(source, /blendedPrice/);
  assert.match(source, /Math\.log10/);
  assert.match(source, /codeArenaOverview\.source/);
  assert.match(source, /code-arena-scatter/);
});
