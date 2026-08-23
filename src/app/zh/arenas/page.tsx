import type { Metadata } from "next";
import { ArenaPage } from "@/components/arena-page";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "竞技场",
  description: "经来源核验的公开 AI 安全与网络安全竞技场导航。",
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
