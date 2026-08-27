import assert from "node:assert/strict";
import test from "node:test";
import {
  buildVolunteerContactMailto,
  buildVolunteerContributionIssueUrl,
  contributionAreas,
  validateVolunteerContribution,
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

test("builds a prefilled review issue from the compact volunteer form", () => {
  const url = new URL(
    buildVolunteerContributionIssueUrl({
      areaId: "website-development",
      githubProfile: "https://github.com/example",
      proposal: "Fix a reproducible navigation bug.",
    }),
  );

  assert.equal(url.origin + url.pathname, "https://github.com/GabryGao/opentai/issues/new");
  assert.equal(url.searchParams.get("title"), "[Contribution] Website & Development");
  assert.match(url.searchParams.get("body") ?? "", /GitHub profile: https:\/\/github\.com\/example/);
  assert.match(url.searchParams.get("body") ?? "", /Contribution area: Website & Development/);
  assert.match(url.searchParams.get("body") ?? "", /Fix a reproducible navigation bug\./);
  assert.match(url.searchParams.get("body") ?? "", /review before acceptance/i);
});

test("builds the teacher contact link for volunteer questions", () => {
  const url = new URL(buildVolunteerContactMailto("danxjma@gmail.com"));

  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "danxjma@gmail.com");
  assert.equal(url.searchParams.get("subject"), "OpenTAI volunteer contribution");
});

test("validates the compact volunteer form before opening GitHub", () => {
  assert.deepEqual(
    validateVolunteerContribution({
      areaId: "unknown-area",
      githubProfile: "https://example.com/not-github",
      proposal: "",
    }),
    {
      areaId: "area",
      githubProfile: "github",
      proposal: "required",
    },
  );
});

test("rejects an unknown contribution area instead of creating a misleading issue", () => {
  assert.throws(
    () =>
      buildVolunteerContributionIssueUrl({
        areaId: "unknown-area",
        githubProfile: "https://github.com/example",
        proposal: "A source-backed contribution.",
      }),
    /Unknown contribution area/,
  );
});
