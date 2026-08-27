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
  assert.match(dialog, /arena: "Submit Your Arena"/);
  assert.doesNotMatch(dialog, /arena: "Propose a Challenge"/);
});

test("the About page keeps supporting policies but no longer embeds Terms Of Use", async () => {
  const about = await readSource("../components/about-page-view.tsx");
  assert.match(about, /id="privacy"/);
  assert.match(about, /id="inclusion-attribution"/);
  assert.match(about, /id="corrections-takedown"/);
  assert.match(about, /title="Privacy Notice"/);
  assert.match(about, /title="Inclusion & Attribution"/);
  assert.match(about, /title="Corrections & Takedown"/);
  assert.doesNotMatch(about, /id="terms"/);
  assert.doesNotMatch(about, /title="Terms Of Use"/);
  assert.doesNotMatch(about, /id="governance"/);
  assert.doesNotMatch(about, /id="contributing"/);
});

test("Community recognizes contributors before placing partner institutions last", async () => {
  const community = await readSource("../components/community-page-view.tsx");
  const organizationContributors = await readSource(
    "../components/organization-contributors.tsx",
  );
  const dialog = await readSource("../components/contribution-dialog.tsx");
  const styles = await readSource("../app/globals.css");
  const recognition = community.indexOf("Contributor Recognition");
  const partners = community.indexOf("Partner Institutions");

  assert.ok(recognition >= 0);
  assert.ok(partners > recognition);
  assert.match(community, />{t\(locale, "Contributors"\)}<\/h2>/);
  assert.doesNotMatch(community, /Main Contributors/);
  assert.doesNotMatch(community, /Partner institutions/);
  assert.match(community, /OrganizationContributors/);
  assert.match(organizationContributors, /height=\{72\}/);
  assert.match(organizationContributors, /width=\{72\}/);
  assert.match(organizationContributors, /className="sr-only"/);
  assert.match(styles, /\.contributor-profile-card \{[\s\S]*?width: 4\.5rem;[\s\S]*?height: 4\.5rem;/);
  assert.match(styles, /\.contributor-profile-avatar \{[\s\S]*?width: 4\.5rem;[\s\S]*?height: 4\.5rem;/);
  assert.match(styles, /@media \(max-width: 639px\) \{[\s\S]*?\.contributor-profile-card,[\s\S]*?\.contributor-profile-avatar \{[\s\S]*?width: 3\.5rem;[\s\S]*?height: 3\.5rem;/);
  assert.match(dialog, /Volunteer To Contribute/);
  assert.match(community, /ContributionDialog/);
  assert.match(organizationContributors, /members\.map/);
  assert.doesNotMatch(community, /Contributor profiles will appear here/);
  assert.doesNotMatch(community, /mailto:/);
});

test("Community automatically syncs public OpenTAI organization members with a safe fallback", async () => {
  const component = await readSource("../components/organization-contributors.tsx");

  assert.match(component, /^"use client";/);
  assert.match(component, /https:\/\/api\.github\.com\/orgs\/OpenTAI\/members\?per_page=100/);
  assert.match(component, /https:\/\/github\.com\/orgs\/OpenTAI\/people/);
  assert.match(component, /fetch\(`\$\{GITHUB_ORG_MEMBERS_API\}&page=\$\{page\}`/);
  assert.match(component, /localStorage\.getItem\(CACHE_KEY\)/);
  assert.match(component, /localStorage\.setItem\(\s*CACHE_KEY/);
  assert.match(component, /opentai-public-github-members-v3/);
  assert.match(component, /60 \* 60 \* 1000/);
  assert.match(component, /contributors\.map/);
  assert.match(component, /member\.htmlUrl/);
  assert.match(component, /member\.avatarUrl/);
  assert.match(component, /View Organization Members/);
});

test("shared English section headings capitalize every word", async () => {
  const arenaPage = await readSource("../components/arena-page.tsx");
  const arenaChart = await readSource("../components/arena-results-chart.tsx");
  const leaderboardStats = await readSource("../components/leaderboard-statistics.tsx");
  const papers = await readSource("../components/paper-library.tsx");
  const ecosystem = await readSource("../components/ecosystem-catalog-page.tsx");
  const subscribe = await readSource("../components/subscribe.tsx");
  const discover = await readSource("../components/discover.tsx");
  const codeArena = await readSource("../components/code-arena-overview.tsx");
  const subpage = await readSource("../components/subpage-layout.tsx");
  const contribution = await readSource("../components/contribution-dialog.tsx");

  assert.match(arenaPage, /title="Safety Arenas"/);
  assert.match(arenaChart, /"Official Result Snapshot"/);
  assert.match(leaderboardStats, /"Leaderboard Statistics"/);
  assert.match(leaderboardStats, /"Source-Checked Snapshots"/);
  assert.match(papers, /"Paper Statistics"/);
  assert.match(papers, /"Papers By Year"/);
  assert.match(papers, /"Papers By Domain"/);
  assert.match(ecosystem, /"Explore Companies"/);
  assert.match(subscribe, /"Your Daily Digest Of AI Safety"/);
  assert.match(discover, /"Browse The Hub"/);
  assert.match(discover, /"For Trustworthy AI"/);
  assert.match(codeArena, /"Preference Vs Price"/);
  assert.match(subpage, /Growth By Year/);
  assert.match(subpage, /By Domain/);
  assert.match(contribution, /"Volunteer To Contribute"/);
  assert.doesNotMatch(papers, /"Papers by (Year|Domain)"/);
  assert.doesNotMatch(subscribe, /Latest Trustworthy AI News/);
});

test("the contributor directory uses every team-approved GitHub account", async () => {
  const contributors = await readSource("./contributors.ts");

  for (const handle of [
    "GabryGao",
    "wuyoscar",
    "SII-FLEEECERmw",
    "bboylyg",
    "BeyonderXX",
    "chriskambimbi",
    "CiaranZhou",
    "cmhzc",
    "CuteyThyme",
    "darius22222",
    "Doby-Xu",
    "dongdongunique",
    "fresh-ma",
    "HanxunH",
  ]) {
    assert.match(contributors, new RegExp(`github\\.com/${handle}`));
    assert.match(contributors, new RegExp(`github\\.com/${handle}\\.png\\?size=160`));
  }

  assert.match(contributors, /https:\/\/github\.com\/wuyoscar\/agent-oscar/);
  assert.match(contributors, /displayName: "Xin Gao"/);
  assert.match(contributors, /displayName: "Ming Wen"/);
});

test("the contribution path has bilingual static routes and is discoverable", async () => {
  const view = await readSource("../components/contribute-page-view.tsx");
  const englishRoute = await readSource("../app/contribute/page.tsx");
  const chineseRoute = await readSource("../app/zh/contribute/page.tsx");
  const sitemap = await readSource("../app/sitemap.ts");

  assert.match(view, /ContributionDialog/);
  assert.doesNotMatch(view, /contributionAreas\.map/);
  assert.doesNotMatch(view, /contribute-grid/);
  assert.match(englishRoute, /locale="en"/);
  assert.match(chineseRoute, /locale="zh"/);
  assert.match(sitemap, /"\/contribute"/);
});
