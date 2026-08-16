import { LeaderboardView } from "@/components/leaderboard-view";
import { PlannedList, SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { leaderboards } from "@/data/site";
import { Locale } from "@/lib/i18n";

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

export function LeaderboardPageView({ locale }: { locale: Locale }) {
  const boardCount = leaderboards.tables.reduce((total, table) => total + table.boards.length, 0);
  const overview =
    locale === "zh"
      ? `共 ${scored} 条评分记录，覆盖 ${boardCount} 个榜单，数据从 OpenTAI 当前排行榜迁移。`
      : `${scored} scored entries across ${boardCount} boards, ported from the current OpenTAI leaderboards.`;

  return (
    <SiteShell locale={locale} sectionLabel="Leaderboard">
      <SimplePage
        breadcrumb={["Home", "Leaderboard"]}
        description={leaderboards.subtitle}
        heroIcon="◫"
        locale={locale}
        overview={overview}
        title="Leaderboard"
      >
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
