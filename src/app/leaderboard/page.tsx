import { LeaderboardPageView } from "@/components/leaderboard-page-view";

export const metadata = {
  title: "Leaderboard",
  description: "Adversarial robustness rankings across black-box and white-box evaluations.",
  openGraph: {
    title: "Leaderboard · OpenTAI",
    description: "Adversarial robustness rankings across black-box and white-box evaluations.",
  },
};

export default function LeaderboardPage() {
  return <LeaderboardPageView locale="en" />;
}
