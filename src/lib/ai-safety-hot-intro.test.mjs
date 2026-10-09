import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { registerHooks } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

// Render the real TSX components without adding a browser or test dependency.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const base = new URL(`../${specifier.slice(2)}`, import.meta.url);
      const extension = existsSync(fileURLToPath(`${base.href}.tsx`)) ? ".tsx" : ".ts";
      return nextResolve(fileURLToPath(`${base.href}${extension}`), context);
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".tsx")) {
      return {
        format: "commonjs",
        source: ts.transpileModule(readFileSync(fileURLToPath(url), "utf8"), {
          compilerOptions: {
            jsx: ts.JsxEmit.ReactJSX,
            module: ts.ModuleKind.CommonJS,
            esModuleInterop: true,
          },
        }).outputText,
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});

const { AiSafetyHotIntro, IntroVideoFrame, introVideoReducer } =
  await import("../components/ai-safety-hot-intro.tsx");
const { SubscribeBox } = await import("../components/subscribe.tsx");

function elementOfType(element, type) {
  if (!element || typeof element !== "object") return undefined;
  if (element.type === type) return element;
  const children = [].concat(element.props?.children ?? []);
  return children.map((child) => elementOfType(child, type)).find(Boolean);
}

function playerHarness(locale = "en") {
  let state = "poster";
  return () => IntroVideoFrame({
    locale,
    videoHref: "/media/ai-safety-hot-intro.mp4",
    posterHref: "/media/ai-safety-hot-intro-poster.jpg",
    state,
    dispatch: (event) => { state = introVideoReducer(state, event); },
  });
}

test("initial render shows the introduction poster without a video source or preload", () => {
  const html = renderToStaticMarkup(createElement(AiSafetyHotIntro, {
    locale: "en",
    videoHref: "/media/ai-safety-hot-intro.mp4",
    posterHref: "/media/ai-safety-hot-intro-poster.jpg",
  }));
  assert.match(html, /ai-safety-hot-intro-poster\.jpg/);
  assert.match(html, /41-second introduction/);
  assert.match(html, /<button[^>]*type="button"/);
  assert.doesNotMatch(html, /<video|<source|ai-safety-hot-intro\.mp4/);
});

test("activating the poster loads the original inline video with native controls", () => {
  const render = playerHarness();
  assert.equal(elementOfType(render(), "video"), undefined);
  const play = elementOfType(render(), "button");
  assert.ok(play, "the initial poster exposes a play button");
  play.props.onClick();
  const video = elementOfType(render(), "video");
  assert.equal(video.props.src, "/media/ai-safety-hot-intro.mp4");
  assert.equal(video.props.autoPlay, true);
  assert.equal(video.props.controls, true);
  assert.equal(video.props.playsInline, true);
  assert.ok(!video.props.muted);
  assert.ok(!video.props.loop);
});

test("a media failure offers a localized retry that loads a fresh player", () => {
  const render = playerHarness("zh");
  const play = elementOfType(render(), "button");
  assert.ok(play, "the initial poster exposes a play button");
  play.props.onClick();
  elementOfType(render(), "video").props.onError();
  assert.equal(elementOfType(render(), "video"), undefined);
  const failed = renderToStaticMarkup(render());
  assert.match(failed, /视频加载失败，请重试。/);
  assert.match(failed, /重试播放/);
  elementOfType(render(), "button").props.onClick();
  assert.equal(elementOfType(render(), "video").props.src, "/media/ai-safety-hot-intro.mp4");
});

test("both homepage cards preserve the approved copy, CTA, and prefixed poster", () => {
  const previous = process.env.NEXT_PUBLIC_BASE_PATH;
  process.env.NEXT_PUBLIC_BASE_PATH = "/opentai";
  try {
    const english = renderToStaticMarkup(createElement(SubscribeBox, { locale: "en" }));
    const chinese = renderToStaticMarkup(createElement(SubscribeBox, { locale: "zh" }));
    assert.match(english, /AI Safety HOT is an AI-powered news and research aggregation platform that tracks, curates, and summarizes the latest developments in AI safety from 1,000\+ media sources worldwide\./);
    assert.match(chinese, /AI Safety HOT 是一个由 AI 驱动的新闻与研究聚合平台，追踪、精选并总结来自全球 1,000 多个媒体来源的 AI 安全最新进展。/);
    assert.match(english, /Visit AI Safety HOT/);
    assert.match(chinese, /访问 AI Safety HOT/);
    assert.match(chinese, /41 秒了解 AI Safety HOT/);
    for (const html of [english, chinese]) {
      assert.match(html, /<h2[^>]*>AI Safety HOT<\/h2>/);
      assert.match(html, /href="https:\/\/aisafetyhot\.com\/"/);
      assert.match(html, /rel="noopener noreferrer"/);
      assert.match(html, /target="_blank"/);
      assert.match(html, /src="\/opentai\/media\/ai-safety-hot-intro-poster\.jpg"/);
      assert.doesNotMatch(html, /<video|<source/);
    }
    const intro = elementOfType(SubscribeBox({ locale: "en" }), AiSafetyHotIntro);
    assert.equal(intro.props.videoHref, "/opentai/media/ai-safety-hot-intro.mp4");
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previous;
  }
});

test("each narrow-screen card places its single visit link after the video poster", () => {
  for (const locale of ["en", "zh"]) {
    const html = renderToStaticMarkup(createElement(SubscribeBox, { locale }));
    const title = html.indexOf("<h2");
    const poster = html.indexOf("<img");
    const visit = html.indexOf('href="https://aisafetyhot.com/"');
    assert.ok(title >= 0 && poster > title);
    assert.ok(visit > poster, "the visit CTA follows the poster in the mobile reading order");
    assert.equal(html.match(/href="https:\/\/aisafetyhot\.com\/"/g)?.length, 1);
  }
});
