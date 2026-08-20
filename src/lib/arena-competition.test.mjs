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

test("the arena page exposes the verified arena catalog", () => {
  const source = readFileSync(
    new URL("../components/arena-page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /ecosystemArenas/);
  assert.match(source, /arena-platform-grid/);
});
