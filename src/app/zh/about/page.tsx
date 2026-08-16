import type { Metadata } from "next";
import { AboutPageView } from "@/components/about-page-view";

export const metadata: Metadata = {
  title: "关于",
  description: "了解 OpenTAI 可信人工智能开放资源索引。",
  alternates: {
    canonical: "/zh/about/",
    languages: { en: "/about/", "zh-CN": "/zh/about/" },
  },
};

export default function ChineseAboutPage() {
  return <AboutPageView locale="zh" />;
}
