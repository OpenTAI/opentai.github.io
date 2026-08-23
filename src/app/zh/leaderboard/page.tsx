import type { Metadata } from "next";
import { LeaderboardPageView } from "@/components/leaderboard-page-view";

export const metadata: Metadata = {
  title: "排行榜",
  description: "面向大语言模型、智能体与具身智能的开放可信与安全排行榜。",
  alternates: {
    canonical: "/zh/leaderboard/",
    languages: { en: "/leaderboard/", "zh-CN": "/zh/leaderboard/" },
  },
};

export default function ChineseLeaderboardPage() {
  return <LeaderboardPageView locale="zh" />;
}
