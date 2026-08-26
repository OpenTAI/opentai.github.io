import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { buildContributionIssueUrl, contributionAreas } from "@/lib/contribution";
import { Locale, t } from "@/lib/i18n";

export function ContributePageView({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale} sectionLabel="Community">
      <SimplePage
        breadcrumb={["Home", "Ecosystem", "Community", "Contribute"]}
        className="contribute-page"
        description="Choose an area and open a GitHub issue to start a source-reviewed contribution."
        heroIcon="＋"
        locale={locale}
        showDescription
        title="Contribute to OpenTAI"
      >
        <section className="subpage-main-table-card contribute-section">
          <div className="contribute-heading">
            <p>{t(locale, "Get involved")}</p>
            <h2>{t(locale, "How would you like to contribute?")}</h2>
          </div>

          <div className="contribute-grid">
            {contributionAreas.map((area, index) => (
              <article className="contribute-card" key={area.id}>
                <span className="contribute-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{t(locale, area.title)}</h3>
                  <p>{t(locale, area.description)}</p>
                </div>
                <a
                  className="contribute-card-cta"
                  href={buildContributionIssueUrl(area.id)}
                  rel="noreferrer"
                  target="_blank"
                >
                  {t(locale, "Submit contribution")}
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>

          <p className="contribute-review-note">
            {t(
              locale,
              "Every submission opens a GitHub issue and is reviewed before it becomes part of OpenTAI.",
            )}
          </p>
        </section>
      </SimplePage>
    </SiteShell>
  );
}
