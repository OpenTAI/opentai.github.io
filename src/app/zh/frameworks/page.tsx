import type { Metadata } from "next";
import { EcosystemCatalogPage } from "@/components/ecosystem-catalog-page";
import { SiteShell } from "@/components/site-shell";
import { ecosystemFrameworks } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "框架",
  description: "用于红队测试、评测、训练与防御 AI 系统的开源框架。",
  alternates: {
    canonical: "/zh/frameworks/",
    languages: { en: "/frameworks/", "zh-CN": "/zh/frameworks/" },
  },
};

export default function ChineseFrameworksPage() {
  return (
    <SiteShell locale="zh">
      <EcosystemCatalogPage kind="frameworks" locale="zh" records={ecosystemFrameworks} />
    </SiteShell>
  );
}
