import type { Metadata } from "next";
import { DiscoverPageView } from "@/components/discover-page-view";

export const metadata: Metadata = {
  title: "OpenTAI — 可信人工智能开放枢纽",
  description: "OpenTAI 可信人工智能开放资源索引。",
  alternates: {
    canonical: "/zh/",
    languages: { en: "/", "zh-CN": "/zh/" },
  },
};

export default function ChineseDiscoverPage() {
  return <DiscoverPageView locale="zh" />;
}
