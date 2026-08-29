import assert from "node:assert/strict";
import test from "node:test";

import * as newsletter from "./newsletter.ts";

test("builds a direct JSON subscription request for the self-hosted API", () => {
  assert.equal(typeof newsletter.buildNewsletterRequest, "function");

  const request = newsletter.buildNewsletterRequest(
    {
      email: "  Reader@Example.edu  ",
      language: "zh",
    },
    "https://opentai.org/api/subscribe",
  );

  assert.equal(request.url, "https://opentai.org/api/subscribe");
  const { signal, ...init } = request.init;
  assert.ok(signal instanceof AbortSignal);
  assert.deepEqual(init, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "Reader@Example.edu",
      language: "zh",
      website: "",
    }),
  });
});

test("includes the hidden anti-bot field without changing the subscriber data", () => {
  assert.equal(typeof newsletter.buildNewsletterRequest, "function");

  const request = newsletter.buildNewsletterRequest(
    { email: "reader@example.edu", language: "en" },
    "/api/subscribe",
    "bot-filled-this",
  );

  assert.deepEqual(JSON.parse(request.init.body), {
    email: "reader@example.edu",
    language: "en",
    website: "bot-filled-this",
  });
});

test("aborts a stalled subscription request after the configured timeout", async () => {
  const request = newsletter.buildNewsletterRequest(
    { email: "reader@example.edu", language: "en" },
    "/api/subscribe",
    "",
    5,
  );

  assert.ok(request.init.signal instanceof AbortSignal);
  assert.equal(request.init.signal.aborted, false);
  await new Promise((resolve) => setTimeout(resolve, 15));
  assert.equal(request.init.signal.aborted, true);
});
