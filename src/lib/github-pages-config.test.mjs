import assert from "node:assert/strict";
import test from "node:test";

test("uses the domain root for an organization Pages repository regardless of owner casing", async () => {
  const previousRepository = process.env.GITHUB_REPOSITORY;
  const previousActions = process.env.GITHUB_ACTIONS;
  const previousBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

  process.env.GITHUB_REPOSITORY = "OpenTAI/opentai.github.io";
  process.env.GITHUB_ACTIONS = "true";
  delete process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const { default: nextConfig } = await import(
      `../../next.config.ts?organization-pages=${Date.now()}`
    );

    assert.equal(nextConfig.basePath, "");
  } finally {
    if (previousRepository === undefined) delete process.env.GITHUB_REPOSITORY;
    else process.env.GITHUB_REPOSITORY = previousRepository;

    if (previousActions === undefined) delete process.env.GITHUB_ACTIONS;
    else process.env.GITHUB_ACTIONS = previousActions;

    if (previousBasePath === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previousBasePath;
  }
});

test("keeps a repository subpath for a project Pages repository", async () => {
  const previousRepository = process.env.GITHUB_REPOSITORY;
  const previousActions = process.env.GITHUB_ACTIONS;
  const previousBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

  process.env.GITHUB_REPOSITORY = "GabryGao/opentai";
  process.env.GITHUB_ACTIONS = "true";
  delete process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const { default: nextConfig } = await import(
      `../../next.config.ts?project-pages=${Date.now()}`
    );

    assert.equal(nextConfig.basePath, "/opentai");
  } finally {
    if (previousRepository === undefined) delete process.env.GITHUB_REPOSITORY;
    else process.env.GITHUB_REPOSITORY = previousRepository;

    if (previousActions === undefined) delete process.env.GITHUB_ACTIONS;
    else process.env.GITHUB_ACTIONS = previousActions;

    if (previousBasePath === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previousBasePath;
  }
});
