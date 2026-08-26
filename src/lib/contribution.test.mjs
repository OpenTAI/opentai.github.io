import assert from "node:assert/strict";
import test from "node:test";
import {
  buildContributionIssueUrl,
  contributionAreas,
} from "./contribution.ts";

test("offers the six approved contribution areas in a stable order", () => {
  assert.deepEqual(
    contributionAreas.map(({ id, title }) => [id, title]),
    [
      ["research-papers", "Research & Papers"],
      ["models-datasets", "Models & Datasets"],
      ["benchmarks-evaluation", "Benchmarks & Evaluation"],
      ["tools-resources", "Tools & Resources"],
      ["website-development", "Website & Development"],
      ["community", "Community"],
    ],
  );
});

test("builds a prefilled review issue for a selected contribution area", () => {
  const url = new URL(buildContributionIssueUrl("website-development"));

  assert.equal(url.origin + url.pathname, "https://github.com/GabryGao/opentai/issues/new");
  assert.equal(url.searchParams.get("title"), "[Contribution] Website & Development");
  assert.match(url.searchParams.get("body") ?? "", /Contribution area: Website & Development/);
  assert.match(url.searchParams.get("body") ?? "", /Proposed contribution:/);
  assert.match(url.searchParams.get("body") ?? "", /Public sources or references:/);
  assert.match(url.searchParams.get("body") ?? "", /How can this be verified or reproduced\?/);
  assert.match(url.searchParams.get("body") ?? "", /review before acceptance/i);
});

test("rejects an unknown contribution area instead of creating a misleading issue", () => {
  assert.throws(
    () => buildContributionIssueUrl("unknown-area"),
    /Unknown contribution area/,
  );
});
