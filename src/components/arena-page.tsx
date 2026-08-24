import { ArenaResultsChart } from "@/components/arena-results-chart";
import { ArenaScoreboardGrid } from "@/components/arena-scoreboard-grid";
import { CodeArenaOverview } from "@/components/code-arena-overview";
import { ResourceSubmissionDialog } from "@/components/resource-submission-dialog";
import { SimplePage } from "@/components/simple-page";
import { TextArenaOverview } from "@/components/text-arena-overview";
import { arenaDirectory } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export function ArenaPage({ locale }: { locale: Locale }) {
  return (
    <SimplePage
      breadcrumb={["Home", "Evaluation", "Arenas"]}
      className="arena-page"
      description=""
      heroAside={<ResourceSubmissionDialog kind="arena" locale={locale} />}
      heroIcon="A"
      locale={locale}
      title="Safety arenas"
    >
      <ArenaScoreboardGrid locale={locale} records={arenaDirectory} />
      <TextArenaOverview locale={locale} />
      <CodeArenaOverview locale={locale} />
      <ArenaResultsChart locale={locale} />
    </SimplePage>
  );
}
