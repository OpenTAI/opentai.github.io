import { CollectionSummaryRow } from "@/components/collection-summary-row";
import { LeaderboardView } from "@/components/leaderboard-view";
import { ResourceSubmissionDialog } from "@/components/resource-submission-dialog";
import { PlannedList, SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { leaderboards } from "@/data/site";
import { Locale } from "@/lib/i18n";
import { buildLeaderboardSummary } from "@/lib/resource-catalog-presentation";

const PLANNED = [
  "LLM Safety Ranking",
  "Agent Safety Ranking",
  "Guard Model Ranking",
  "Privacy Ranking",
];

export function LeaderboardPageView({ locale }: { locale: Locale }) {
  const summary = buildLeaderboardSummary(leaderboards.tables);
  const summaryItems = [
    { icon: "#", label: "Scored entries", value: summary.entries.toLocaleString("en-US") },
    { icon: "▦", label: "Boards", value: summary.boards.toLocaleString("en-US") },
    { icon: "◉", label: "Models", value: summary.models.toLocaleString("en-US") },
    { icon: "↗", label: "Source links", value: summary.links.toLocaleString("en-US") },
  ];

  return (
    <SiteShell locale={locale} sectionLabel="Leaderboard">
      <SimplePage
        breadcrumb={["Home", "Leaderboard"]}
        description={leaderboards.subtitle}
        heroAside={<ResourceSubmissionDialog kind="arena" locale={locale} />}
        heroIcon="◫"
        locale={locale}
        title="Leaderboard"
      >
        <CollectionSummaryRow items={summaryItems} locale={locale} />
        <LeaderboardView locale={locale} />

        <PlannedList
          items={PLANNED}
          locale={locale}
          note="The boards above cover adversarial robustness only. The remaining rankings need scored submissions per benchmark before anything is published here."
          title="Rankings still to come"
        />
      </SimplePage>
    </SiteShell>
  );
}
