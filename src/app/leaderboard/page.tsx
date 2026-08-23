import { LeaderboardPageView } from "@/components/leaderboard-page-view";

export const metadata = {
  title: "Leaderboard",
  description: "Open trustworthiness and safety leaderboards for LLMs, Agents, and Embodied AI.",
  openGraph: {
    title: "Leaderboard · OpenTAI",
    description: "Open trustworthiness and safety leaderboards for LLMs, Agents, and Embodied AI.",
  },
};

export default function LeaderboardPage() {
  return <LeaderboardPageView locale="en" />;
}
