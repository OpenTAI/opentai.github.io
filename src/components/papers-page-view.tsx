import { PaperLibrary } from "@/components/paper-library";
import { ResourceSubmissionDialog } from "@/components/resource-submission-dialog";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { paperLibrary } from "@/data/papers";
import { Locale } from "@/lib/i18n";
import { paperCatalogSummary } from "@/lib/paper-catalog";

export function PapersPageView({ locale }: { locale: Locale }) {
  const summary = paperCatalogSummary(paperLibrary);

  return (
    <SiteShell locale={locale} sectionLabel="Papers">
      <SimplePage
        breadcrumb={["Home", "Research", "Papers"]}
        className="papers-page"
        description=""
        heroAside={<ResourceSubmissionDialog kind="paper" locale={locale} />}
        heroIcon="◈"
        heroStats={[
          { label: "Entries", value: summary.entries },
          { label: "Domains", value: summary.domains },
          { label: "Surveys", value: summary.surveys },
          { label: "Links", value: summary.links },
        ]}
        locale={locale}
        title="Papers"
      >
        <PaperLibrary locale={locale} />
      </SimplePage>
    </SiteShell>
  );
}
