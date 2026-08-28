import assert from "node:assert/strict";
import test from "node:test";
import {
  collectionOrder,
  homeCategoryCards,
  subpageConfigs,
} from "../data/site.ts";

test("the public hub exposes every current public page in the approved order", () => {
  assert.deepEqual(
    homeCategoryCards.map((card) => [card.title, card.href]),
    [
      ["Papers", "/papers"],
      ["Benchmarks", "/benchmarks"],
      ["Models", "/models"],
      ["Datasets", "/datasets"],
      ["Leaderboards", "/leaderboard"],
      ["Arenas", "/arenas"],
      ["Startups", "/companies"],
      ["Community", "/community"],
    ],
  );
  assert.deepEqual(collectionOrder, ["benchmarks", "models", "datasets"]);
  assert.equal("tools" in subpageConfigs, false);
});
