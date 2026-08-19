import type { Metadata } from "next";
import { EcosystemCatalogPage } from "@/components/ecosystem-catalog-page";
import { SiteShell } from "@/components/site-shell";
import { ecosystemModels } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "模型",
  description: "面向可信人工智能系统的开源护栏模型、安全专用模型与安全对齐模型。",
  alternates: {
    canonical: "/zh/models/",
    languages: { en: "/models/", "zh-CN": "/zh/models/" },
  },
};

export default function ChineseModelsPage() {
  return (
    <SiteShell locale="zh">
      <EcosystemCatalogPage kind="models" locale="zh" records={ecosystemModels} />
    </SiteShell>
  );
}
