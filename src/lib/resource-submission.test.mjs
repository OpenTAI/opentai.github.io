import assert from "node:assert/strict";
import test from "node:test";
import {
  buildResourceSubmissionIssueUrl,
  validateResourceSubmission,
} from "./resource-submission.ts";

test("requires name, a four-digit year, and a GitHub repository URL", () => {
  assert.deepEqual(
    validateResourceSubmission({ githubUrl: "", link: "", name: "", year: "" }),
    { githubUrl: "required", name: "required", year: "required" },
  );
  assert.deepEqual(
    validateResourceSubmission({
      githubUrl: "https://example.com/repository",
      link: "",
      name: "SafeBench",
      year: "24",
    }),
    { githubUrl: "github", year: "year" },
  );
});

test("accepts an optional public link and validates it when present", () => {
  const valid = {
    githubUrl: "https://github.com/example/safebench",
    link: "https://arxiv.org/abs/2401.00001",
    name: "SafeBench",
    year: "2024",
  };
  assert.deepEqual(validateResourceSubmission(valid), {});
  assert.deepEqual(validateResourceSubmission({ ...valid, link: "not-a-url" }), {
    link: "url",
  });
});

test("builds a reviewable issue for the requested resource kind", () => {
  const url = new URL(
    buildResourceSubmissionIssueUrl("dataset", {
      githubUrl: "https://github.com/example/training-data",
      link: "https://huggingface.co/datasets/example/training-data",
      name: "Training Data",
      year: "2025",
    }),
  );

  assert.equal(url.origin + url.pathname, "https://github.com/GabryGao/opentai/issues/new");
  assert.equal(url.searchParams.get("title"), "[Dataset submission] Training Data");
  assert.match(url.searchParams.get("body") ?? "", /Name: Training Data/);
  assert.match(url.searchParams.get("body") ?? "", /Year: 2025/);
  assert.match(url.searchParams.get("body") ?? "", /GitHub: https:\/\/github\.com\/example\/training-data/);
  assert.match(url.searchParams.get("body") ?? "", /requires source verification/i);
});
