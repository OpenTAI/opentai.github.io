import type { RankingDirectoryRecord } from "@/data/site";
import { Locale, t } from "@/lib/i18n";

function localized(locale: Locale, english: string, chinese: string | undefined) {
  return locale === "zh" && chinese ? chinese : english;
}

export function RankingResourceGrid({
  label,
  locale,
  records,
}: {
  label: string;
  locale: Locale;
  records: readonly RankingDirectoryRecord[];
}) {
  return (
    <section aria-label={t(locale, label)} className="ranking-resource-grid">
      {records.map((record) => (
        <article className="ranking-resource-card" key={record.url}>
          <div className="ranking-resource-header">
            <h2>{record.name}</h2>
            <span>{t(locale, record.type)}</span>
          </div>

          <p className="ranking-resource-focus">
            {localized(locale, record.focus, record.focusZh)}
          </p>

          <a className="ranking-resource-primary-link" href={record.url} rel="noreferrer" target="_blank">
            {t(locale, "Open official page")} ↗
          </a>

          <div className="ranking-resource-snapshot">
            <div>
              <span>{t(locale, "Metric")}</span>
              <strong>{localized(locale, record.metric, record.metricZh)}</strong>
            </div>
            <time>{t(locale, record.snapshotDate)}</time>
          </div>

          {record.results.length > 0 ? (
            <ol className="ranking-resource-results">
              {record.results.map((result) => (
                <li key={`${record.name}-${result.rank}-${result.name}`}>
                  <span className="ranking-resource-rank">{result.rank}</span>
                  <div>
                    <strong>{result.name}</strong>
                    {result.detail ? <small>{result.detail}</small> : null}
                  </div>
                  <b>{result.value}</b>
                </li>
              ))}
            </ol>
          ) : (
            <p className="ranking-resource-empty">
              {localized(locale, record.emptyState ?? "Not recorded yet.", record.emptyStateZh)}
            </p>
          )}

          <div className="ranking-resource-footer">
            <nav aria-label={`${record.name} ${t(locale, "Links")}`} className="ranking-resource-links">
              {(record.links.length > 0
                ? record.links
                : [
                    { label: "Open official page", labelZh: undefined, url: record.url },
                    { label: "Official source", labelZh: undefined, url: record.source },
                  ]
              ).map((link) => (
                <a href={link.url} key={`${record.name}-${link.url}`} rel="noreferrer" target="_blank">
                  {localized(locale, link.label, link.labelZh)} ↗
                </a>
              ))}
            </nav>
            <details>
              <summary>{t(locale, "Source record")}</summary>
              <p>{record.verificationNote}</p>
            </details>
          </div>
        </article>
      ))}
    </section>
  );
}
