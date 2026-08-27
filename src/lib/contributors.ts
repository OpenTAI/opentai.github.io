export type Contributor = {
  avatarUrl: string;
  displayName: string;
  githubHandle: string;
  profileUrl: string;
  sourceUrl: string;
};

export const contributors: readonly Contributor[] = [
  {
    avatarUrl: "https://github.com/GabryGao.png?size=160",
    displayName: "Xin Gao",
    githubHandle: "GabryGao",
    profileUrl: "https://github.com/GabryGao",
    sourceUrl: "https://github.com/GabryGao",
  },
  {
    avatarUrl: "https://github.com/wuyoscar.png?size=160",
    displayName: "Oscar Wu",
    githubHandle: "wuyoscar",
    profileUrl: "https://github.com/wuyoscar",
    sourceUrl: "https://github.com/wuyoscar/agent-oscar",
  },
  {
    avatarUrl: "https://github.com/SII-FLEEECERmw.png?size=160",
    displayName: "Ming Wen",
    githubHandle: "SII-FLEEECERmw",
    profileUrl: "https://github.com/SII-FLEEECERmw",
    sourceUrl: "https://github.com/SII-FLEEECERmw",
  },
] as const;
