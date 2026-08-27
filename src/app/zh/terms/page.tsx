import type { Metadata } from "next";
import { TermsPageView } from "@/components/terms-page-view";

export const metadata: Metadata = {
  title: "使用条款",
  description: "OpenTAI 网站与服务的使用条款。",
  alternates: {
    canonical: "/zh/terms/",
    languages: { en: "/terms/", "zh-CN": "/zh/terms/" },
  },
};

export default function ChineseTermsPage() {
  return <TermsPageView locale="zh" />;
}
