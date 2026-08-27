import assert from "node:assert/strict";
import test from "node:test";

import { mergeOrganizationMembers } from "./organization-members.ts";

const fallback = [
  {
    avatarUrl: "https://github.com/wuyoscar.png",
    displayName: "Oscar Wu",
    githubHandle: "wuyoscar",
    htmlUrl: "https://github.com/wuyoscar",
  },
  {
    avatarUrl: "https://github.com/GabryGao.png",
    displayName: "Xin Gao",
    githubHandle: "GabryGao",
    htmlUrl: "https://github.com/GabryGao",
  },
];

test("keeps GabryGao first when GitHub returns public organization members", () => {
  const members = mergeOrganizationMembers(
    [
      {
        avatar_url: "https://github.com/other.png",
        html_url: "https://github.com/other",
        login: "other",
      },
      {
        avatar_url: "https://github.com/GabryGao-live.png",
        html_url: "https://github.com/GabryGao",
        login: "GabryGao",
      },
    ],
    fallback,
    "GabryGao",
  );

  assert.deepEqual(
    members.map((member) => member.githubHandle),
    ["GabryGao", "other", "wuyoscar"],
  );
  assert.equal(members[0].displayName, "Xin Gao");
  assert.equal(members[0].avatarUrl, "https://github.com/GabryGao-live.png");
});

test("keeps GabryGao first when the organization has no public members", () => {
  const members = mergeOrganizationMembers([], fallback, "GabryGao");

  assert.deepEqual(
    members.map((member) => member.githubHandle),
    ["GabryGao", "wuyoscar"],
  );
});
