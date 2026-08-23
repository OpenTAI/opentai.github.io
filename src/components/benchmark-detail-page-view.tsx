import Link from "next/link";
import { notFound } from "next/navigation";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { benchmarkDetails, leaderboards } from "@/data/site";
import { Locale, localizeHref, t } from "@/lib/i18n";

const PENDING_HINT: Record<string, string> = {
  Dataset: "Which corpus the benchmark evaluates on, and where to download it.",
  Metrics: "The scores the benchmark reports, and how they are computed.",
  Baselines: "Reference systems and their published results.",
  Leaderboard: "A scored submission table for this benchmark.",
};

function Panel({
  children,
  locale,
  source,
  title,
}: {
  children: React.ReactNode;
  locale: Locale;
  source?: string;
  title: string;
}) {
  return (
    <section className="subpage-main-table-card flex flex-col">
      <h2 className="mb-5 text-[1.4rem] font-semibold tracking-[-0.04em] text-[#111827]">
        {t(locale, title)}
      </h2>
      <div className="flex-1">{children}</div>
      {source ? (
        <p className="mt-5 border-t border-[#f2f4f8] pt-4 text-xs text-[#98a2b3]">
          {t(locale, "Source")}: {source}
        </p>
      ) : null}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[#98a2b3]">{children}</p>;
}

export function BenchmarkDetailPageView({ locale, slug }: { locale: Locale; slug: string }) {
  const detail = benchmarkDetails[slug];
  if (!detail) notFound();

  const facts = (
    [
      ["Repository", detail.repo],
      ["Language", detail.language],
      ["Licence", detail.license],
      ["Stars", detail.stars?.toLocaleString()],
      ["Forks", detail.forks?.toLocaleString()],
      ["Last push", detail.updated],
    ] as [string, string | undefined][]
  ).filter((entry): entry is [string, string] => Boolean(entry[1]));

  const onSiteLeaderboard = detail.category === "Robustness";
  const pending = detail.pending.filter(
    (field) => !(field === "Leaderboard" && onSiteLeaderboard),
  );

  return (
    <SiteShell locale={locale} sectionLabel="Benchmarks">
      <SimplePage
        breadcrumb={["Home", "Resources", "Benchmarks", detail.name]}
        description={detail.description}
        heroIcon="◎"
        locale={locale}
        overview={
          detail.venue
            ? locale === "zh"
              ? `发表于 ${detail.venue}${detail.posted ? ` · 首次发布于 ${detail.posted}` : ""}。`
              : `Published at ${detail.venue}${detail.posted ? ` · first posted ${detail.posted}` : ""}.`
            : undefined
        }
        title={detail.name}
      >
        <div className="flex flex-wrap gap-2">
          <span className="subpage-table-pill">{detail.category}</span>
          {detail.tags.map((tag) => (
            <span key={tag} className="subpage-row-tag">
              {tag}
            </span>
          ))}
        </div>

        {detail.note ? (
          <div className="rounded-[18px] border border-[#fde68a] bg-[#fffbeb] px-5 py-4">
            <p className="text-sm leading-6 text-[#92400e]">{detail.note}</p>
          </div>
        ) : null}

        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
          <Panel locale={locale} title="Description">
            <p className="text-[0.98rem] leading-8 text-[#475467]">
              {t(locale, detail.description)}
            </p>
            {detail.abstract ? (
              <>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#98a2b3]">
                  {t(locale, "Abstract")}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#667085]">{detail.abstract}</p>
              </>
            ) : null}
          </Panel>

          <div className="space-y-4">
            <Panel locale={locale} title="Code">
              {facts.length ? (
                <dl className="space-y-3 text-sm">
                  {facts.map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[#98a2b3]">{t(locale, label)}</dt>
                      <dd className="break-all text-right font-medium text-[#344054]">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <Empty>{t(locale, "No public repository recorded.")}</Empty>
              )}
              {detail.resources.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {detail.resources.map((resource) => (
                    <Link
                      key={resource.href}
                      className="subpage-resource-pill transition hover:border-[#c7d2fe] hover:text-[#4338ca]"
                      href={resource.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {t(locale, resource.label)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </Panel>

            <Panel locale={locale} title="Papers">
              {detail.authors?.length || detail.arxivId ? (
                <div className="space-y-3 text-sm">
                  {detail.authors?.length ? (
                    <p className="leading-6 text-[#475467]">
                      {detail.authors.join(", ")}
                      {detail.authorCount && detail.authorCount > detail.authors.length
                        ? locale === "zh"
                          ? ` 等 ${detail.authorCount} 位作者`
                          : ` +${detail.authorCount - detail.authors.length} more`
                        : ""}
                    </p>
                  ) : null}
                  <p className="text-[#98a2b3]">
                    {detail.venue ? `${detail.venue} · ` : ""}
                    {detail.posted}
                    {detail.arxivId ? `${detail.posted ? " · " : ""}arXiv:${detail.arxivId}` : ""}
                  </p>
                  {detail.arxivId ? (
                    <Link
                      className="home-secondary-cta inline-flex"
                      href={`https://arxiv.org/abs/${detail.arxivId}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {t(locale, "Open paper")} →
                    </Link>
                  ) : null}
                </div>
              ) : (
                <Empty>{t(locale, "No paper recorded for this benchmark.")}</Empty>
              )}
            </Panel>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2 xl:items-start">
          <Panel locale={locale} source={detail.dataset?.source} title="Dataset">
            {detail.dataset ? (
              <p className="text-sm leading-7 text-[#475467]">
                {t(locale, detail.dataset.text)}
              </p>
            ) : (
              <Empty>{t(locale, "Not recorded yet.")}</Empty>
            )}
          </Panel>

          <Panel locale={locale} source={detail.metrics?.source} title="Metrics">
            {detail.metrics ? (
              <ul className="space-y-3">
                {detail.metrics.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-[#475467]">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-[#4f46e5]">
                      ·
                    </span>
                    <span>{t(locale, item)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>{t(locale, "Not recorded yet.")}</Empty>
            )}
          </Panel>

          <Panel locale={locale} source={detail.baselines?.source} title="Baselines">
            {detail.baselines ? (
              <p className="text-sm leading-7 text-[#475467]">
                {t(locale, detail.baselines.text)}
              </p>
            ) : (
              <Empty>{t(locale, "Not recorded yet.")}</Empty>
            )}
          </Panel>

          <Panel locale={locale} source={detail.externalLeaderboard?.source} title="Leaderboard">
            {onSiteLeaderboard ? (
              <div className="space-y-4">
                <p className="text-sm leading-7 text-[#475467]">
                  {locale === "zh"
                    ? `该评测的对抗鲁棒性结果已发布在本站，共覆盖 ${leaderboards.tables.reduce((total, table) => total + table.boards.length, 0)} 个榜单。`
                    : `Adversarial robustness results for this evaluation are published on this site: ${leaderboards.tables.map((table) => table.label).join(" and ")} across ${leaderboards.tables.reduce((total, table) => total + table.boards.length, 0)} boards.`}
                </p>
                <Link className="site-cta inline-flex" href={localizeHref(locale, "/leaderboard")}>
                  {t(locale, "Open leaderboard")}
                </Link>
              </div>
            ) : detail.externalLeaderboard ? (
              <div className="space-y-4">
                <p className="text-sm leading-7 text-[#475467]">
                  {t(locale, "This benchmark maintains its own public leaderboard.")}
                </p>
                <Link
                  className="home-secondary-cta inline-flex"
                  href={detail.externalLeaderboard.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {detail.externalLeaderboard.label} →
                </Link>
              </div>
            ) : (
              <Empty>{t(locale, "No scored submissions recorded for this benchmark yet.")}</Empty>
            )}
          </Panel>
        </section>

        {pending.length ? (
          <section className="subpage-main-table-card">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-[1.4rem] font-semibold tracking-[-0.04em] text-[#111827]">
                {t(locale, "Still missing")}
              </h2>
              <span className="rounded-full border border-[#fde68a] bg-[#fffbeb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#b45309]">
                {t(locale, "Not recorded")}
              </span>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {pending.map((field) => (
                <li
                  key={field}
                  className="rounded-[18px] border border-dashed border-[#e3e8f2] bg-[#fafbfe] px-5 py-4"
                >
                  <p className="text-sm font-medium text-[#475467]">{t(locale, field)}</p>
                  <p className="mt-1 text-xs leading-5 text-[#98a2b3]">
                    {t(locale, PENDING_HINT[field])}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </SimplePage>
    </SiteShell>
  );
}
