import { DraftNotice } from "@/components/draft-notice";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { collectionOrder, mission, partners, siteBrand, subpageConfigs } from "@/data/site";
import { paperLibrary } from "@/data/papers";
import { Locale, t } from "@/lib/i18n";

const totals = collectionOrder.map((slug) => ({
  title: subpageConfigs[slug].title,
  count: subpageConfigs[slug].tableRows.length,
}));

const INCLUSION = [
  "Every entry links to a public artefact — a repository, a dataset, a paper, or an evaluation platform. Nothing is listed on a description alone.",
  "Repository activity, author lists, and download counts are read from the GitHub, arXiv, and Hugging Face APIs rather than typed in by hand.",
  "A publication venue is only shown when it appears in the project's own repository description or arXiv comment.",
  "A resource is matched to a repository only when its name appears in that repository's name or description.",
  "Fields that cannot be verified are left visibly empty. The site never fills a gap with a plausible-looking placeholder.",
];

const CONTRIBUTE: [string, string][] = [
  ["Suggest a resource", "Send the name, a one-line description, and a public link."],
  [
    "Correct an entry",
    "Point at the field and the source that contradicts it — corrections are applied at the data layer, not the page.",
  ],
  [
    "Add evaluation results",
    "Leaderboards need scored submissions with a reproducible evaluation setup.",
  ],
];

function Panel({
  children,
  id,
  locale,
  title,
}: {
  children: React.ReactNode;
  id?: string;
  locale: Locale;
  title: string;
}) {
  return (
    <section className="subpage-main-table-card scroll-mt-28" id={id}>
      <h2 className="mb-5 text-[1.5rem] font-semibold tracking-[-0.04em] text-[#111827]">
        {t(locale, title)}
      </h2>
      {children}
    </section>
  );
}

export function AboutPageView({ locale }: { locale: Locale }) {
  const governance =
    locale === "zh"
      ? `OpenTAI 是由 ${partners.length} 家合作机构的研究人员共同维护的开放平台。平台同时索引第三方开源成果和合作团队自身发布的成果。收录某项资源不代表为其背书；收录规则公开列于上方，以便讨论和质疑。`
      : `OpenTAI is an open platform maintained by researchers across ${partners.length} collaborating institutions. It indexes third-party open-source work alongside the collaboration's own releases. Listing a resource is not an endorsement of it, and the inclusion rules are published above so that they can be argued with.`;

  return (
    <SiteShell locale={locale} sectionLabel="About">
      <SimplePage
        breadcrumb={["Home", "About"]}
        description={mission.body}
        heroIcon="◍"
        locale={locale}
        overview={siteBrand.headline}
        title="About OpenTAI"
      >
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <Panel locale={locale} title="What is collected here">
            <ul className="space-y-3">
              {totals.map((item) => (
                <li
                  key={item.title}
                  className="flex items-baseline justify-between gap-4 border-b border-[#f2f4f8] pb-3 text-sm"
                >
                  <span className="font-medium text-[#111827]">{t(locale, item.title)}</span>
                  <span className="text-[#667085]">{item.count} {t(locale, "entries")}</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-4 border-b border-[#f2f4f8] pb-3 text-sm">
                <span className="font-medium text-[#111827]">{t(locale, "Research library")}</span>
                <span className="text-[#667085]">{paperLibrary.length} {t(locale, "papers")}</span>
              </li>
              <li className="flex items-baseline justify-between gap-4 text-sm">
                <span className="font-medium text-[#111827]">{t(locale, "Partner institutions")}</span>
                <span className="text-[#667085]">{partners.length}</span>
              </li>
            </ul>
          </Panel>

          <Panel locale={locale} title="Contact">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[#98a2b3]">{t(locale, "Email")}</dt>
                <dd>
                  <a
                    className="font-medium text-[#4f46e5] hover:underline"
                    href={`mailto:${siteBrand.contactEmail}`}
                  >
                    {siteBrand.contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[#98a2b3]">{t(locale, "Current site")}</dt>
                <dd>
                  <a
                    className="font-medium text-[#4f46e5] hover:underline"
                    href={siteBrand.upstream}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {siteBrand.upstream.replace("https://", "")}
                  </a>
                </dd>
              </div>
            </dl>
          </Panel>
        </section>

        <Panel id="inclusion" locale={locale} title="How resources are included">
          <ul className="space-y-3">
            {INCLUSION.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm leading-7 text-[#475467]">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-[#4f46e5]">
                  ·
                </span>
                <span>{t(locale, rule)}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel id="governance" locale={locale} title="Governance">
          <div className="space-y-4">
            <DraftNotice locale={locale}>
              The text below describes how the platform currently operates. Decision-making,
              maintainer roles, and the process for accepting new resources still need to be
              confirmed and written by the OpenTAI team.
            </DraftNotice>
            <p className="text-sm leading-7 text-[#475467]">
              {governance}
            </p>
            <p className="text-sm leading-7 text-[#475467]">
              {t(
                locale,
                "Content is generated from a scripted pipeline rather than edited page by page, so every published claim can be traced back to the source it came from and refreshed when that source changes.",
              )}
            </p>
          </div>
        </Panel>

        <Panel id="contributing" locale={locale} title="Contributing">
          <div className="space-y-4">
            <DraftNotice locale={locale}>
              These routes are a proposal. The team needs to decide where suggestions are filed and
              who reviews them.
            </DraftNotice>
            <dl className="grid gap-4 sm:grid-cols-3">
              {CONTRIBUTE.map(([title, detail]) => (
                <div key={title} className="rounded-[18px] border border-[#eff2f6] px-5 py-4">
                  <dt className="text-sm font-semibold text-[#111827]">{t(locale, title)}</dt>
                  <dd className="mt-2 text-sm leading-6 text-[#667085]">{t(locale, detail)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>

        <Panel id="citation" locale={locale} title="Citation">
          <div className="space-y-4">
            <DraftNotice locale={locale}>
              Placeholder citation. If the platform has an accompanying paper, or the team prefers
              a different author line, replace this entry.
            </DraftNotice>
            <p className="text-sm leading-7 text-[#475467]">
              {t(
                locale,
                "When citing an individual benchmark, model, dataset, or tool, cite that resource's own paper — every entry links to it. To cite the platform itself:",
              )}
            </p>
            <pre className="overflow-x-auto rounded-[18px] border border-[#eff2f6] bg-[#fafbfe] px-5 py-4 text-xs leading-6 text-[#475467]">
              {`@misc{opentai,
  title        = {OpenTAI: The Open Hub for Trustworthy AI and AI Safety},
  author       = {{OpenTAI Contributors}},
  year         = {2026},
  howpublished = {\\url{https://opentai.org}}
}`}
            </pre>
          </div>
        </Panel>
      </SimplePage>
    </SiteShell>
  );
}
