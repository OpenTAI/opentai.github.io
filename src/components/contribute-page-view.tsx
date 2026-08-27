import { ContributionDialog } from "@/components/contribution-dialog";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { Locale, t } from "@/lib/i18n";

export function ContributePageView({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale} sectionLabel="Community">
      <SimplePage
        breadcrumb={["Home", "Ecosystem", "Community", "Contribute"]}
        className="contribute-page"
        description="Share how you would like to help OpenTAI and continue on GitHub for review."
        heroIcon="＋"
        locale={locale}
        showDescription
        title="Contribute To OpenTAI"
      >
        <section className="subpage-main-table-card contribute-section contribute-section-simple">
          <div className="contribute-heading">
            <p>{t(locale, "Get Involved")}</p>
            <h2>{t(locale, "Contribute To OpenTAI")}</h2>
          </div>
          <p className="contribute-simple-copy">
            {t(
              locale,
              "Tell us what you would like to contribute. We will open a GitHub issue so the proposal and its sources can be reviewed in public.",
            )}
          </p>
          <ContributionDialog locale={locale} />
        </section>
      </SimplePage>
    </SiteShell>
  );
}
