import assert from "node:assert/strict";
import test from "node:test";
import * as i18n from "./i18n.ts";

test("language-switch navigation preserves the reader's scroll position", () => {
  assert.deepEqual(i18n.languageSwitchLinkProps?.("/papers", "zh"), {
    href: "/zh/papers",
    scroll: false,
  });
  assert.deepEqual(i18n.languageSwitchLinkProps?.("/zh/papers", "en"), {
    href: "/papers",
    scroll: false,
  });
});
