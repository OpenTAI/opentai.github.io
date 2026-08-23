import { RankingResourceGrid } from "@/components/ranking-resource-grid";
import { LeaderboardStatistics } from "@/components/leaderboard-statistics";
import { ResourceSubmissionDialog } from "@/components/resource-submission-dialog";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { leaderboards } from "@/data/site";
import { Locale } from "@/lib/i18n";

export function LeaderboardPageView({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale} sectionLabel="Leaderboard">
      <SimplePage
        breadcrumb={["Home", "Evaluation", "Leaderboards"]}
        className="leaderboard-page"
        description={leaderboards.subtitle}
        heroAside={<ResourceSubmissionDialog kind="leaderboard" locale={locale} />}
        heroIcon="◫"
        locale={locale}
        showDescription
        title="Leaderboard"
      >
        <LeaderboardStatistics locale={locale} records={leaderboards.directory} />
        <RankingResourceGrid
          label="Verified public leaderboards"
          locale={locale}
          records={leaderboards.directory}
        />
      </SimplePage>
    </SiteShell>
  );
}
