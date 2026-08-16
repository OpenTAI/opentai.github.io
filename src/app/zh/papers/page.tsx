import type { Metadata } from "next";
import { PapersPageView } from "@/components/papers-page-view";

export const metadata: Metadata = {
  title: "论文",
  description: "按 LLMs、Agents 与 Embodied AI，以及研究与综述类型浏览安全论文。",
  alternates: {
    canonical: "/zh/papers/",
    languages: { en: "/papers/", "zh-CN": "/zh/papers/" },
  },
};

export default function ChinesePapersPage() {
  return <PapersPageView locale="zh" />;
}
