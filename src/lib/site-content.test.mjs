import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relativePath) =>
  readFile(new URL(relativePath, import.meta.url), "utf8");

test("uses the temporary OpenTAI contact address across generated site content", async () => {
  const generator = await readSource("../../scripts/generate-site.py");
  assert.match(generator, /contactEmail: "danxjma@gmail\.com"/);
  assert.doesNotMatch(generator, /contact\.opentai@gmail\.com/);
});

test("the arena submission CTA asks users to submit an arena", async () => {
  const dialog = await readSource("../components/resource-submission-dialog.tsx");
  assert.match(dialog, /arena: "Submit your arena"/);
  assert.doesNotMatch(dialog, /arena: "Propose a Challenge"/);
});

test("the About page exposes OpenTAI-specific policies without governance or contributing drafts", async () => {
  const about = await readSource("../components/about-page-view.tsx");
  assert.match(about, /id="terms"/);
  assert.match(about, /id="privacy"/);
  assert.match(about, /id="inclusion-attribution"/);
  assert.match(about, /id="corrections-takedown"/);
  assert.match(about, /title="Terms of Use"/);
  assert.match(about, /title="Privacy Notice"/);
  assert.match(about, /title="Inclusion & Attribution"/);
  assert.match(about, /title="Corrections & Takedown"/);
  assert.doesNotMatch(about, /id="governance"/);
  assert.doesNotMatch(about, /id="contributing"/);
});

test("Community recognizes contributors before placing partner institutions last", async () => {
  const community = await readSource("../components/community-page-view.tsx");
  const recognition = community.indexOf("Contributor Recognition");
  const partners = community.indexOf("Partner institutions");

  assert.ok(recognition >= 0);
  assert.ok(partners > recognition);
  assert.match(community, /Main Contributors/);
  assert.match(community, /Volunteer to contribute/);
  assert.match(community, /localizeHref\(locale, "\/contribute"\)/);
  assert.doesNotMatch(community, /mailto:/);
});

test("the contribution path has bilingual static routes and is discoverable", async () => {
  const view = await readSource("../components/contribute-page-view.tsx");
  const englishRoute = await readSource("../app/contribute/page.tsx");
  const chineseRoute = await readSource("../app/zh/contribute/page.tsx");
  const sitemap = await readSource("../app/sitemap.ts");

  assert.match(view, /How would you like to contribute\?/);
  assert.match(view, /contributionAreas\.map/);
  assert.match(view, /buildContributionIssueUrl/);
  assert.match(englishRoute, /locale="en"/);
  assert.match(chineseRoute, /locale="zh"/);
  assert.match(sitemap, /"\/contribute"/);
});
