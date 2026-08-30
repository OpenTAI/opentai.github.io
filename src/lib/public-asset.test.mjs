import assert from "node:assert/strict";
import test from "node:test";

import * as siteUrl from "./site-url.ts";

test("public assets keep the deployment base path without changing remote URLs", () => {
  assert.equal(typeof siteUrl.publicAssetHref, "function");
  assert.equal(
    siteUrl.publicAssetHref("/media/fudan-university.png", "/opentai"),
    "/opentai/media/fudan-university.png",
  );
  assert.equal(
    siteUrl.publicAssetHref("https://example.org/logo.png", "/opentai"),
    "https://example.org/logo.png",
  );
  assert.equal(siteUrl.publicAssetHref("/brand/logo.png", ""), "/brand/logo.png");
});
