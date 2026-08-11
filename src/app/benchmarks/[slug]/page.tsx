import Link from "next/link";
import { notFound } from "next/navigation";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { benchmarkDetails, leaderboards } from "@/data/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = benchmarkDetails[slug];
  if (!detail) return {};

  const description = detail.description.slice(0, 180);

  return {
    title: `${detail.name} · Benchmarks`,
    description,
    openGraph: { title: `${detail.name} · Benchmarks · OpenTAI`, description },
  };
}

export function generateStaticParams() {
  return Object.keys(benchmarkDetails).map((slug) => ({ slug }));
}

const PENDING_HINT: Record<string, string> = {
  Dataset: "Which corpus the benchmark evaluates on, and where to download it.",
  Metrics: "The scores the benchmark reports, and how they are computed.",
  Baselines: "Reference systems and their published results.",
  Leaderboard: "A scored submission table for this benchmark.",
};

function Panel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="subpage-main-table-card">
      <h2 className="mb-5 text-[1.4rem] font-semibold tracking-[-0.04em] text-[#111827]">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default async function BenchmarkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = benchmarkDetails[slug];
  if (!detail) notFound();

  const facts: [string, string][] = [
    detail.repo ? (["Repository", detail.repo] as [string, string]) : null,
    detail.language ? (["Language", detail.language] as [string, string]) : null,
    detail.license ? (["Licence", detail.license] as [string, string]) : null,
    detail.stars !== undefined
      ? (["Stars", detail.stars.toLocaleString()] as [string, string])
      : null,
    detail.forks !== undefined
      ? (["Forks", detail.forks.toLocaleString()] as [string, string])
      : null,
    detail.updated ? (["Last push", detail.updated] as [string, string]) : null,
  ].filter(Boolean) as [string, string][];

  const adversarial = detail.category === "Robustness";

  return (
    <SiteShell sectionLabel="Benchmarks">
      <SimplePage
        breadcrumb={["Discover", "Benchmarks", detail.name]}
        description={detail.description}
        heroIcon="◎"
        overview={
          detail.venue
            ? `Published at ${detail.venue}${detail.posted ? ` · first posted ${detail.posted}` : ""}.`
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

        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
          <Panel title="Description">
            <p className="text-[0.98rem] leading-8 text-[#475467]">{detail.description}</p>
            {detail.abstract ? (
              <>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#98a2b3]">
                  Abstract
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#667085]">{detail.abstract}</p>
              </>
            ) : null}
          </Panel>

          <div className="space-y-4">
            <Panel title="Code">
              {facts.length ? (
                <dl className="space-y-3 text-sm">
                  {facts.map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[#98a2b3]">{label}</dt>
                      <dd className="break-all text-right font-medium text-[#344054]">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-[#98a2b3]">No public repository recorded.</p>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {detail.resources.map((resource) => (
                  <Link
                    key={resource.href}
                    className="subpage-resource-pill transition hover:border-[#c7d2fe] hover:text-[#4338ca]"
                    href={resource.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {resource.label}
                  </Link>
                ))}
              </div>
            </Panel>

            <Panel title="Papers">
              {detail.authors?.length ? (
                <div className="space-y-3 text-sm">
                  <p className="leading-6 text-[#475467]">
                    {detail.authors.join(", ")}
                    {detail.authorCount && detail.authorCount > detail.authors.length
                      ? ` +${detail.authorCount - detail.authors.length} more`
                      : ""}
                  </p>
                  <p className="text-[#98a2b3]">
                    {detail.venue ? `${detail.venue} · ` : ""}
                    {detail.posted}
                    {detail.arxivId ? ` · arXiv:${detail.arxivId}` : ""}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-[#98a2b3]">No paper recorded for this benchmark.</p>
              )}
            </Panel>
          </div>
        </section>

        <Panel title="Leaderboard">
          {adversarial ? (
            <div className="space-y-3">
              <p className="text-sm leading-6 text-[#475467]">
                Adversarial robustness results for this evaluation are published on the
                leaderboard: {leaderboards.tables.map((table) => table.label).join(" and ")} across{" "}
                {leaderboards.tables.reduce((total, table) => total + table.boards.length, 0)}{" "}
                boards.
              </p>
              <Link className="site-cta inline-flex" href="/leaderboard">
                Open leaderboard
              </Link>
            </div>
          ) : (
            <p className="text-sm text-[#98a2b3]">
              No scored submissions recorded for this benchmark yet.
            </p>
          )}
        </Panel>

        <section className="subpage-main-table-card">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[1.4rem] font-semibold tracking-[-0.04em] text-[#111827]">
              Needs curation
            </h2>
            <span className="rounded-full border border-[#fde68a] bg-[#fffbeb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#b45309]">
              Not recorded
            </span>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {detail.pending
              .filter((field) => !(adversarial && field === "Leaderboard"))
              .map((field) => (
                <li
                  key={field}
                  className="rounded-[18px] border border-dashed border-[#e3e8f2] bg-[#fafbfe] px-5 py-4"
                >
                  <p className="text-sm font-medium text-[#475467]">{field}</p>
                  <p className="mt-1 text-xs leading-5 text-[#98a2b3]">{PENDING_HINT[field]}</p>
                </li>
              ))}
          </ul>
          <p className="mt-5 text-sm leading-6 text-[#98a2b3]">
            These fields are part of the benchmark page spec but cannot be read reliably from a
            repository or an abstract — they have to be filled in by hand.
          </p>
        </section>
      </SimplePage>
    </SiteShell>
  );
}
