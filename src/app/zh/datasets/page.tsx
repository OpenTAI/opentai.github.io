import type { Metadata } from "next";
import { CollectionPageView } from "@/components/collection-page-view";

export const metadata: Metadata = {
  title: "数据集",
  description: "按 LLMs、Agents 与 Embodied AI 浏览已核实的训练与微调数据集。",
  alternates: {
    canonical: "/zh/datasets/",
    languages: { en: "/datasets/", "zh-CN": "/zh/datasets/" },
  },
};

export default function ChineseDatasetsPage() {
  return <CollectionPageView locale="zh" showEmptyCategories slug="datasets" />;
}
