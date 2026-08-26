import type { Metadata } from "next";
import { ContributePageView } from "@/components/contribute-page-view";

export const metadata: Metadata = {
  title: "参与贡献",
  description: "选择贡献方向，并向 OpenTAI 提交有公开来源支持的工作。",
  alternates: {
    canonical: "/zh/contribute/",
    languages: { en: "/contribute/", "zh-CN": "/zh/contribute/" },
  },
};

export default function ChineseContributePage() {
  return <ContributePageView locale="zh" />;
}
