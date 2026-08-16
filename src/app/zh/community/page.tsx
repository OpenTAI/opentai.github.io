import type { Metadata } from "next";
import { CommunityPageView } from "@/components/community-page-view";

export const metadata: Metadata = {
  title: "社区",
  description: "OpenTAI 社区与合作机构。",
  alternates: {
    canonical: "/zh/community/",
    languages: { en: "/community/", "zh-CN": "/zh/community/" },
  },
};

export default function ChineseCommunityPage() {
  return <CommunityPageView locale="zh" />;
}
