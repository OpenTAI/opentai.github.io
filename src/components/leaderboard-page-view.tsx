import { ArenaScoreboardGrid } from "@/components/arena-scoreboard-grid";
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
        className="leaderboard-page arena-page"
        description={leaderboards.subtitle}
        heroAside={<ResourceSubmissionDialog kind="leaderboard" locale={locale} />}
        heroIcon="L"
        locale={locale}
        title="Leaderboards"
      >
        <ArenaScoreboardGrid
          kind="leaderboard"
          locale={locale}
          records={leaderboards.directory}
        />
      </SimplePage>
    </SiteShell>
  );
}
