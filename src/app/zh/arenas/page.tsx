import type { Metadata } from "next";
import { EcosystemCatalogPage } from "@/components/ecosystem-catalog-page";
import { SiteShell } from "@/components/site-shell";
import { ecosystemArenas } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "竞技场",
  description: "用于对抗交互与公开 AI 安全评测的在线竞技场和研究型竞技环境。",
  alternates: {
    canonical: "/zh/arenas/",
    languages: { en: "/arenas/", "zh-CN": "/zh/arenas/" },
  },
};

export default function ChineseArenasPage() {
  return (
    <SiteShell locale="zh">
      <EcosystemCatalogPage kind="arenas" locale="zh" records={ecosystemArenas} />
    </SiteShell>
  );
}
