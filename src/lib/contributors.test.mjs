import assert from "node:assert/strict";
import test from "node:test";

import { contributors } from "./contributors.ts";

const expectedOrganizationHandles = [
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
  "GabryGao",
  "HanxunH",
  "haole1683",
  "hldongml",
  "jamesxwang",
  "JerryLuo5799",
  "jimmidier",
  "L1lahKay",
  "l1teng",
  "liushz",
  "luolin0715",
  "megaknight114",
  "mmxelio",
  "mttry",
  "new60y",
  "oliviadzy",
  "Rosy0912",
  "SFTJBD",
  "SII-FLEEECERmw",
  "SmallkeyChen",
  "snow-zhai",
  "StrawberryXia",
  "thom-wang",
  "Vinsonzyh",
  "wang-jingyi",
  "wdrink",
  "wuyoscar",
  "Wwangb",
  "x-zheng16",
  "xbhuang23",
  "xieyong0",
  "xingjunm",
  "xinwong",
  "YiyingYang12",
  "yujq22",
  "Yunhao-Feng",
  "yxwang-10",
  "zhangchaosd",
  "ZichanR",
  "zxwu",
];

test("includes all 50 consented OpenTAI organization members exactly once", () => {
  const handles = contributors.map((contributor) => contributor.githubHandle);

  assert.equal(handles.length, 50);
  assert.equal(new Set(handles.map((handle) => handle.toLowerCase())).size, 50);
  assert.deepEqual(
    [...handles].sort((left, right) => left.localeCompare(right)),
    [...expectedOrganizationHandles].sort((left, right) =>
      left.localeCompare(right),
    ),
  );
});

test("keeps GabryGao first and links every avatar to its GitHub profile", () => {
  assert.equal(contributors[0]?.githubHandle, "GabryGao");

  for (const contributor of contributors) {
    assert.ok(contributor.displayName);
    assert.equal(
      contributor.profileUrl,
      `https://github.com/${contributor.githubHandle}`,
    );
    assert.equal(
      contributor.avatarUrl,
      `https://github.com/${contributor.githubHandle}.png?size=160`,
    );
  }
});
