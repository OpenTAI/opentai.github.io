import { LeaderboardView } from "@/components/leaderboard-view";
import { PlannedList, SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { leaderboards } from "@/data/site";

export const metadata = {
  title: "Leaderboard",
  description: "Adversarial robustness rankings across black-box and white-box evaluations.",
  openGraph: { title: "Leaderboard · OpenTAI", description: "Adversarial robustness rankings across black-box and white-box evaluations." },
};


const PLANNED = [
  "LLM Safety Ranking",
  "Agent Safety Ranking",
  "Guard Model Ranking",
  "Privacy Ranking",
];

const scored = leaderboards.tables.reduce(
  (total, table) => total + table.boards.reduce((sum, board) => sum + board.rows.length, 0),
  0,
);

export default function LeaderboardPage() {
  return (
    <SiteShell sectionLabel="Leaderboard">
      <SimplePage
        breadcrumb={["Discover", "Leaderboard"]}
        description={leaderboards.subtitle}
        heroIcon="◫"
        overview={`${scored} scored entries across ${leaderboards.tables.reduce((total, table) => total + table.boards.length, 0)} boards, ported from the current OpenTAI leaderboards.`}
        title="Leaderboard"
      >
        <LeaderboardView />

        <PlannedList
          items={PLANNED}
          note="The boards above cover adversarial robustness only. The remaining rankings need scored submissions per benchmark before anything is published here."
          title="Rankings still to come"
        />
      </SimplePage>
    </SiteShell>
  );
}
