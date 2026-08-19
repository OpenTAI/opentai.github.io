import assert from "node:assert/strict";
import test from "node:test";
import {
  buildContactMailtoUrl,
  buildResourceSubmissionIssueUrl,
  resourceSubmissionNameLabel,
  validateContactMessage,
  validateResourceSubmission,
} from "./resource-submission.ts";

test("builds a contact email without sending data to a website backend", () => {
  const values = {
    email: "researcher@example.com",
    message: "Could you review this resource?",
    name: "Researcher",
    subject: "OpenTAI resource question",
  };

  assert.deepEqual(validateContactMessage(values), {});
  const url = new URL(buildContactMailtoUrl("contact.opentai@gmail.com", values));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "contact.opentai@gmail.com");
  assert.equal(url.searchParams.get("subject"), "OpenTAI resource question");
  assert.match(url.searchParams.get("body") ?? "", /Name: Researcher/);
  assert.match(url.searchParams.get("body") ?? "", /Email: researcher@example\.com/);
  assert.match(url.searchParams.get("body") ?? "", /Could you review this resource\?/);
});

test("requires every contact form field and a valid reply email", () => {
  assert.deepEqual(
    validateContactMessage({ email: "", message: "", name: "", subject: "" }),
    { email: "required", message: "required", name: "required", subject: "required" },
  );
  assert.deepEqual(
    validateContactMessage({
      email: "not-an-email",
      message: "Question",
      name: "Researcher",
      subject: "Hello",
    }),
    { email: "email" },
  );
});

test("uses a specific name label for each submitted resource kind", () => {
  assert.equal(resourceSubmissionNameLabel("dataset"), "Dataset Name");
  assert.equal(resourceSubmissionNameLabel("benchmark"), "Benchmark Name");
  assert.equal(resourceSubmissionNameLabel("arena"), "Arena Name");
  assert.equal(resourceSubmissionNameLabel("paper"), "Paper Title");
});

test("requires name, a four-digit year, and a GitHub repository URL", () => {
  assert.deepEqual(
    validateResourceSubmission("dataset", { githubUrl: "", link: "", name: "", year: "" }),
    { githubUrl: "required", name: "required", year: "required" },
  );
  assert.deepEqual(
    validateResourceSubmission("dataset", {
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
  assert.deepEqual(validateResourceSubmission("dataset", valid), {});
  assert.deepEqual(validateResourceSubmission("dataset", { ...valid, link: "not-a-url" }), {
    link: "url",
  });
});

test("requires a public paper link while keeping its GitHub link optional", () => {
  const valid = {
    githubUrl: "",
    link: "https://arxiv.org/abs/2501.00001",
    name: "A Safety Paper",
    year: "2025",
  };

  assert.deepEqual(validateResourceSubmission("paper", valid), {});
  assert.deepEqual(validateResourceSubmission("paper", { ...valid, link: "" }), {
    link: "required",
  });
  assert.deepEqual(
    validateResourceSubmission("paper", {
      ...valid,
      githubUrl: "https://example.com/not-github",
    }),
    { githubUrl: "github" },
  );
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
