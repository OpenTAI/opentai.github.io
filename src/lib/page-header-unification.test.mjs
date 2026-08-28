import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relativePath) =>
  readFile(new URL(relativePath, import.meta.url), "utf8");

test("the shared integrated heading owns the icon, title, statistics, summary, and action slots", async () => {
  const component = await readSource("../components/integrated-section-heading.tsx");

  assert.match(component, /export function IntegratedSectionHeading/);
  assert.match(component, /className="integrated-section-heading"/);
  assert.match(component, /className="integrated-section-icon"/);
  assert.match(component, /<h1/);
  assert.match(component, /stats\.map/);
  assert.match(component, /integrated-section-summary/);
  assert.match(component, /integrated-section-action/);
});
