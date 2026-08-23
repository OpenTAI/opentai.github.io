import { PaperLibrary } from "@/components/paper-library";
import { ResourceSubmissionDialog } from "@/components/resource-submission-dialog";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { Locale } from "@/lib/i18n";

export function PapersPageView({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale} sectionLabel="Papers">
      <SimplePage
        breadcrumb={["Home", "Research", "Papers"]}
        className="papers-page"
        description=""
        heroAside={<ResourceSubmissionDialog kind="paper" locale={locale} />}
        heroIcon="◈"
        locale={locale}
        title="Papers"
      >
        <PaperLibrary locale={locale} />
      </SimplePage>
    </SiteShell>
  );
}
