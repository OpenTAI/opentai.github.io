import type { Metadata } from "next";
import { CollectionPageView } from "@/components/collection-page-view";

export const metadata: Metadata = {
  title: "工具",
  description: "OpenTAI 收录的可信人工智能工具与框架。",
  alternates: {
    canonical: "/zh/tools/",
    languages: { en: "/tools/", "zh-CN": "/zh/tools/" },
  },
};

export default function ChineseToolsPage() {
  return <CollectionPageView locale="zh" slug="tools" />;
}
