import type { Metadata } from "next";
import { CollectionPageView } from "@/components/collection-page-view";

export const metadata: Metadata = {
  title: "评测基准",
  description: "按 LLMs、Agents 与 Embodied AI 浏览可信人工智能评测基准。",
  alternates: {
    canonical: "/zh/benchmarks/",
    languages: { en: "/benchmarks/", "zh-CN": "/zh/benchmarks/" },
  },
};

export default function ChineseBenchmarksPage() {
  return <CollectionPageView detailBase="/benchmarks" locale="zh" showEmptyCategories slug="benchmarks" />;
}
