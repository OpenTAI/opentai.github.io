import assert from "node:assert/strict";
import test from "node:test";
import {
  activeNavigationGroup,
  footerNavigationGroups,
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
          ["Benchmarks", "/benchmarks", false],
          ["Models", "/models", false],
          ["Datasets", "/datasets", false],
        ],
      },
      {
        label: "Evaluation",
        items: [
          ["Leaderboards", "/leaderboard", false],
          ["Arenas", "/arenas", false],
        ],
      },
      {
        label: "Ecosystem",
        items: [
          ["Startups", "/companies", false],
          ["Community", "/community", false],
        ],
      },
    ],
  );
});

test("footer navigation links Terms Of Use to its standalone policy page", () => {
  assert.deepEqual(
    footerNavigationGroups.map((group) => [
      group.label,
      group.items.map((item) => [item.label, item.href]),
    ]),
    [
      [
        "Research",
        [["Papers", "/papers"]],
      ],
      [
        "Resources",
        [
          ["Benchmarks", "/benchmarks"],
          ["Models", "/models"],
          ["Datasets", "/datasets"],
        ],
      ],
      [
        "Evaluation",
        [
          ["Leaderboards", "/leaderboard"],
          ["Arenas", "/arenas"],
        ],
      ],
      [
        "Ecosystem",
        [
          ["Startups", "/companies"],
          ["Community", "/community"],
          ["GitHub", "https://github.com/OpenTAI"],
        ],
      ],
      [
        "Terms & Policies",
        [["Terms Of Use", "/terms"]],
      ],
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
