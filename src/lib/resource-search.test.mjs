import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { matchesLocalizedSearch } from "./resource-search.ts";

const translations = new Map([
  ["training data", "训练数据"],
  ["source: approved survey", "来源：指定综述"],
]);
const translate = (value) => translations.get(value) ?? value;

test("matches both source text and localized text", () => {
  const values = ["SafetyPrompts", "training data", "source: approved survey"];

  assert.equal(matchesLocalizedSearch(values, "safetyprompts", translate), true);
  assert.equal(matchesLocalizedSearch(values, "训练数据", translate), true);
  assert.equal(matchesLocalizedSearch(values, "指定综述", translate), true);
  assert.equal(matchesLocalizedSearch(values, "不存在", translate), false);
  assert.equal(matchesLocalizedSearch(values, "", translate), true);
});

test("resource cards retain heading semantics and visible search focus", () => {
  const component = readFileSync(
    new URL("../components/subpage-layout.tsx", import.meta.url),
    "utf8",
  );
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(component, /<h3 className="resource-card-heading">/);
  assert.match(component, /className="resource-card-stars"/);
  assert.match(component, /t\(locale, "Recorded scale"\)/);
  assert.doesNotMatch(component, /<span aria-hidden="true">#<\/span>/);
  assert.match(css, /\.subpage-search-box:focus-within\s*{/);
  assert.match(css, /\.resource-card-stars\s*{/);
});

test("the narrow link popover remains right anchored", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const narrowStyles = css.match(/@media \(max-width: 479px\)\s*{[\s\S]*?\n}/)?.[0] ?? "";

  assert.match(narrowStyles, /\.resource-links-popover\s*{[\s\S]*?right:\s*0/);
  assert.doesNotMatch(narrowStyles, /\.resource-links-popover\s*{[\s\S]*?left:\s*0/);
});
