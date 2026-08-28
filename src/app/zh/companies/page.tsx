import type { Metadata } from "next";
import { EcosystemCatalogPage } from "@/components/ecosystem-catalog-page";
import { SiteShell } from "@/components/site-shell";
import { ecosystemCompanies } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "初创企业",
  description: "经来源核验的 AI 安全、智能体安全、评测与红队产品企业图谱。",
  alternates: {
    canonical: "/zh/companies/",
    languages: { en: "/companies/", "zh-CN": "/zh/companies/" },
  },
};

export default function ChineseStartupsPage() {
  return (
    <SiteShell locale="zh">
      <EcosystemCatalogPage kind="companies" locale="zh" records={ecosystemCompanies} />
    </SiteShell>
  );
}
