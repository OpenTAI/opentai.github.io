import type { Metadata } from "next";
import { LeaderboardPageView } from "@/components/leaderboard-page-view";

export const metadata: Metadata = {
  title: "排行榜",
  description: "OpenTAI 收录的评测结果排行榜。",
  alternates: {
    canonical: "/zh/leaderboard/",
    languages: { en: "/leaderboard/", "zh-CN": "/zh/leaderboard/" },
  },
};

export default function ChineseLeaderboardPage() {
  return <LeaderboardPageView locale="zh" />;
}
