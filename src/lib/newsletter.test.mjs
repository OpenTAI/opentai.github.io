import assert from "node:assert/strict";
import test from "node:test";

import { buildNewsletterMailto } from "./newsletter.ts";

test("builds a private mail-app subscription request without a storage endpoint", () => {
  const url = new URL(
    buildNewsletterMailto({
      email: "reader@example.edu",
      language: "zh",
    }),
  );

  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "danxjma@gmail.com");
  assert.equal(url.searchParams.get("subject"), "OpenTAI Daily subscription request");
  assert.equal(
    url.searchParams.get("body"),
    [
      "Please add me to OpenTAI Daily.",
      "",
      "Subscriber email: reader@example.edu",
      "Language: Chinese",
    ].join("\n"),
  );
});

test("normalizes an English subscription address before preparing the email", () => {
  const url = new URL(
    buildNewsletterMailto({
      email: "  Reader@Example.edu  ",
      language: "en",
    }),
  );

  assert.match(url.searchParams.get("body") ?? "", /Subscriber email: Reader@Example\.edu/);
  assert.match(url.searchParams.get("body") ?? "", /Language: English/);
});
