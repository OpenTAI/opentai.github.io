import type { CSSProperties } from "react";
import type { RankingDirectoryRecord, RankingResult } from "@/data/site";
import { Locale, t } from "@/lib/i18n";

function localized(locale: Locale, english: string, chinese: string | undefined) {
  return locale === "zh" && chinese ? chinese : english;
}

function numericValue(result: RankingResult) {
  const value = Number.parseFloat(result.value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function resultWidth(result: RankingResult, results: readonly RankingResult[]) {
  const values = results.map(numericValue);
  const maximum = Math.max(...values, 1);
  return Math.max(7, (numericValue(result) / maximum) * 100);
}

function direction(locale: Locale, metric: string) {
  if (metric.includes("↓")) return locale === "zh" ? "越低越好" : "Lower is better";
  if (metric.includes("↑")) return locale === "zh" ? "越高越好" : "Higher is better";
  return "";
}

export function ArenaScoreboardGrid({
  locale,
  records,
}: {
  locale: Locale;
  records: readonly RankingDirectoryRecord[];
}) {
  return (
    <section aria-labelledby="arena-directory-title" className="arena-scoreboards">
      <header className="arena-scoreboards-heading">
        <div>
          <span>{locale === "zh" ? "已核验的公开结果" : "Verified public results"}</span>
          <h2 id="arena-directory-title">
            {locale === "zh" ? "安全竞技场排名" : "Safety arena rankings"}
          </h2>
        </div>
        <p>
          {locale === "zh"
            ? `${records.length} 个竞技场 · 结果来自各项目官方页面`
            : `${records.length} arenas · results reproduced from official sources`}
        </p>
      </header>

      <div className="arena-scoreboard-grid">
        {records.map((record) => (
          <article className="arena-scoreboard-card" key={record.url}>
            <header className="arena-scoreboard-card-heading">
              <div className="arena-scoreboard-title">
                <span aria-hidden="true" className="arena-scoreboard-mark">
                  {record.name.slice(0, 1)}
                </span>
                <div>
                  <h3>{record.name}</h3>
                  <p>{localized(locale, record.focus, record.focusZh)}</p>
                </div>
              </div>
              <span className="arena-scoreboard-tag">{t(locale, record.type)}</span>
            </header>

            <div className="arena-scoreboard-metric">
              <div>
                <span>{t(locale, "Metric")}</span>
                <strong>{localized(locale, record.metric, record.metricZh)}</strong>
              </div>
              <div>
                <b>{direction(locale, record.metric)}</b>
                <time>{t(locale, record.snapshotDate)}</time>
              </div>
            </div>

            {record.results.length > 0 ? (
              <ol className="arena-scoreboard-results">
                {record.results.map((result) => (
                  <li key={`${record.name}-${result.rank}-${result.name}`}>
                    <span className="arena-scoreboard-rank">{result.rank}</span>
                    <div className="arena-scoreboard-result-copy">
                      <strong>{result.name}</strong>
                      {result.detail ? <small>{result.detail}</small> : null}
                    </div>
                    <div aria-hidden="true" className="arena-scoreboard-track">
                      <span
                        style={
                          {
                            "--arena-result-width": `${resultWidth(result, record.results)}%`,
                          } as CSSProperties
                        }
                      />
                    </div>
                    <b className="arena-scoreboard-value">{result.value}</b>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="arena-scoreboard-empty">
                {localized(locale, record.emptyState ?? "Not recorded yet.", record.emptyStateZh)}
              </p>
            )}

            <footer className="arena-scoreboard-footer">
              <nav aria-label={`${record.name} ${t(locale, "Links")}`}>
                {record.links.map((link, index) => (
                  <a
                    className={index === 0 ? "arena-scoreboard-link-primary" : undefined}
                    href={link.url}
                    key={`${record.name}-${link.url}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {localized(locale, link.label, link.labelZh)} ↗
                  </a>
                ))}
              </nav>
              <details>
                <summary>{t(locale, "Source record")}</summary>
                <p>{record.verificationNote}</p>
              </details>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
