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
      group.items.map((item) => [item.label, item.href]),
    ]),
    [
      [
        "Research & Evaluation",
        [
          ["Papers", "/papers"],
          ["Benchmarks", "/benchmarks"],
          ["Leaderboards", "/leaderboard"],
          ["Arenas", "/arenas"],
        ],
      ],
      [
        "Resources",
        [
          ["Datasets", "/datasets"],
          ["Models", "/models"],
          ["Frameworks", "/frameworks"],
        ],
      ],
      [
        "OpenTAI",
        [
          ["Companies", "/companies"],
          ["Community", "/community"],
          ["About", "/about"],
          ["GitHub", "https://github.com/OpenTAI"],
        ],
      ],
      [
        "Terms & Policies",
        [
          ["Terms of Use", "/about#terms"],
          ["Privacy Notice", "/about#privacy"],
          ["Inclusion & Attribution", "/about#inclusion-attribution"],
          ["Corrections & Takedown", "/about#corrections-takedown"],
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
