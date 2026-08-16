import type { Metadata } from "next";
import { CollectionPageView } from "@/components/collection-page-view";

export const metadata: Metadata = {
  title: "模型",
  description: "OpenTAI 收录的可信人工智能模型。",
  alternates: {
    canonical: "/zh/models/",
    languages: { en: "/models/", "zh-CN": "/zh/models/" },
  },
};

export default function ChineseModelsPage() {
  return <CollectionPageView locale="zh" showEmptyCategories slug="models" />;
}
