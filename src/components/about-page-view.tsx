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
  "Original authors, organizations, repositories, papers, and licences remain attributed to their primary sources.",
  "Listing a resource does not mean that OpenTAI endorses it, certifies it, or owns it.",
];

const TERMS = [
  "OpenTAI is a source-linked research index and navigation service. It does not own the third-party papers, datasets, models, code, companies, or evaluation platforms that it links to.",
  "Third-party resources remain governed by their original terms, licences, and policies. Check the primary source before downloading, reusing, citing, or relying on a resource.",
  "Indexed information is provided for research and educational use and may be incomplete, delayed, or changed by its original source.",
  "A listing is not an endorsement, certification, partnership, or guarantee of safety, quality, accuracy, or availability.",
];

const PRIVACY = [
  "OpenTAI currently does not require user accounts and does not accept form submissions through its own server.",
  "Contact and submission actions open your email application or GitHub. Information you choose to send is handled by those services under their own privacy policies.",
  "The hosting provider may process routine technical request data, such as an IP address, browser metadata, requested URLs, and timestamps, to deliver and protect the website.",
  "When you follow an external link, the destination site applies its own privacy and data practices.",
];

const CORRECTIONS = [
  "Request a factual correction when an indexed name, date, affiliation, score, valuation, description, or link is contradicted by a reliable primary source.",
  "Request review or removal when a listing raises a privacy, attribution, intellectual-property, safety, or broken-source concern.",
  "Include the affected OpenTAI URL, the requested change, and a public primary source or other evidence that supports the request.",
  "OpenTAI can correct, label, restrict, or remove an index entry after reviewing the available evidence. Removing an OpenTAI entry does not remove content from the original source.",
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

        <Panel
          id="inclusion-attribution"
          locale={locale}
          title="Inclusion & Attribution"
        >
          <DraftNotice locale={locale}>
            This policy describes the source-review rules currently used by OpenTAI and remains
            subject to OpenTAI team review.
          </DraftNotice>
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

        <Panel id="terms" locale={locale} title="Terms of Use">
          <div className="space-y-4">
            <DraftNotice locale={locale}>
              This is a working draft for review by the OpenTAI team. It is not a final legal policy.
            </DraftNotice>
            <ul className="space-y-3">
              {TERMS.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-7 text-[#475467]">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-[#4f46e5]">·</span>
                  <span>{t(locale, rule)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel id="privacy" locale={locale} title="Privacy Notice">
          <div className="space-y-4">
            <DraftNotice locale={locale}>
              This is a working draft for review by the OpenTAI team. It is not a final legal policy.
            </DraftNotice>
            <ul className="space-y-3">
              {PRIVACY.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-7 text-[#475467]">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-[#4f46e5]">·</span>
                  <span>{t(locale, rule)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel id="corrections-takedown" locale={locale} title="Corrections & Takedown">
          <div className="space-y-4">
            <DraftNotice locale={locale}>
              This process is a working draft for review by the OpenTAI team.
            </DraftNotice>
            <ul className="space-y-3">
              {CORRECTIONS.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-7 text-[#475467]">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-[#4f46e5]">·</span>
                  <span>{t(locale, rule)}</span>
                </li>
              ))}
            </ul>
            <a
              className="inline-flex rounded-full border border-[#d9ddea] px-4 py-2 text-sm font-semibold text-[#4f46e5] transition hover:border-[#4f46e5] hover:bg-[#f7f7ff]"
              href={`mailto:${siteBrand.contactEmail}?subject=${encodeURIComponent("OpenTAI correction or takedown request")}`}
            >
              {t(locale, "Request a correction or review")} ↗
            </a>
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
