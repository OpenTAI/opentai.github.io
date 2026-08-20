import type { Metadata } from "next";
import { ArenaPage } from "@/components/arena-page";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "竞技场",
  description: "OpenTAI 面向 AI 安全对抗赛题、可复现提交与核验排行榜的社区竞技场。",
  alternates: {
    canonical: "/zh/arenas/",
    languages: { en: "/arenas/", "zh-CN": "/zh/arenas/" },
  },
};

export default function ChineseArenasPage() {
  return (
    <SiteShell locale="zh">
      <ArenaPage locale="zh" />
    </SiteShell>
  );
}
