import assert from "node:assert/strict";
import test from "node:test";

import { nextArenaScrollTop } from "./arena-auto-scroll.ts";

test("auto-scroll advances one ranking row while more results remain", () => {
  assert.equal(
    nextArenaScrollTop({
      clientHeight: 320,
      rowStep: 64,
      scrollHeight: 768,
      scrollTop: 128,
    }),
    192,
  );
});

test("auto-scroll returns to the first ranking when it reaches the end", () => {
  assert.equal(
    nextArenaScrollTop({
      clientHeight: 320,
      rowStep: 64,
      scrollHeight: 768,
      scrollTop: 448,
    }),
    0,
  );
});

test("auto-scroll shows the final partial row before returning to the top", () => {
  assert.equal(
    nextArenaScrollTop({
      clientHeight: 320,
      rowStep: 64,
      scrollHeight: 768,
      scrollTop: 400,
    }),
    448,
  );
});

test("auto-scroll stays still when every ranking already fits", () => {
  assert.equal(
    nextArenaScrollTop({
      clientHeight: 320,
      rowStep: 64,
      scrollHeight: 300,
      scrollTop: 0,
    }),
    0,
  );
});
