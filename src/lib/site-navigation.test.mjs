import assert from "node:assert/strict";
import test from "node:test";
import {
  activeNavigationGroup,
  navigationGroups,
} from "./site-navigation.ts";

test("groups the public navigation without linking unfinished routes", () => {
  assert.deepEqual(
    navigationGroups.map((group) => ({
      label: group.label,
      items: group.items.map((item) => [item.label, item.href ?? null, item.pending ?? false]),
    })),
    [
      { label: "Research", items: [["Papers", "/papers", false]] },
      {
        label: "Resources",
        items: [
          ["Datasets", "/datasets", false],
          ["Benchmarks", "/benchmarks", false],
          ["Models", "/models", false],
          ["Frameworks", null, true],
          ["Tools", "/tools", false],
        ],
      },
      {
        label: "Evaluation",
        items: [
          ["Leaderboards", "/leaderboard", false],
          ["Arenas", null, true],
        ],
      },
      {
        label: "Ecosystem",
        items: [
          ["Companies", null, true],
          ["Community", "/community", false],
        ],
      },
    ],
  );
});

test("marks the group that owns the current route", () => {
  assert.equal(activeNavigationGroup("/papers"), "Research");
  assert.equal(activeNavigationGroup("/benchmarks/safe-bench"), "Resources");
  assert.equal(activeNavigationGroup("/leaderboard"), "Evaluation");
  assert.equal(activeNavigationGroup("/community"), "Ecosystem");
  assert.equal(activeNavigationGroup("/"), null);
});
