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
          ["Datasets", "/datasets", false],
          ["Benchmarks", "/benchmarks", false],
          ["Models", "/models", false],
          ["Frameworks", "/frameworks", false],
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
          ["Companies", "/companies", false],
          ["Community", "/community", false],
        ],
      },
    ],
  );
});

test("footer navigation prioritizes exploration and existing policy sections", () => {
  assert.deepEqual(
    footerNavigationGroups.map((group) => [
      group.label,
      group.items.map((item) => item.href),
    ]),
    [
      ["Research & Evaluation", ["/papers", "/benchmarks", "/leaderboard", "/arenas"]],
      ["Resources", ["/datasets", "/models", "/frameworks"]],
      ["OpenTAI", ["/companies", "/community", "/about", "https://github.com/OpenTAI"]],
      [
        "Terms & Policies",
        [
          "/about#inclusion",
          "/about#governance",
          "/about#contributing",
          "/about#citation",
        ],
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
