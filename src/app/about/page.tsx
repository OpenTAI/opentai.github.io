import { DraftNotice } from "@/components/draft-notice";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { collectionOrder, mission, partners, siteBrand, subpageConfigs } from "@/data/site";
import { paperLibrary } from "@/data/papers";

export const metadata = {
  title: "About",
  description: "What OpenTAI collects, how resources are included, and how to get in touch.",
  openGraph: {
    title: "About · OpenTAI",
    description: "What OpenTAI collects, how resources are included, and how to get in touch.",
  },
};

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

function Panel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="subpage-main-table-card">
      <h2 className="mb-5 text-[1.5rem] font-semibold tracking-[-0.04em] text-[#111827]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <SiteShell sectionLabel="About">
      <SimplePage
        breadcrumb={["Discover", "About"]}
        description={mission.body}
        heroIcon="◍"
        overview={siteBrand.headline}
        title="About OpenTAI"
      >
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <Panel title="What is collected here">
            <ul className="space-y-3">
              {totals.map((item) => (
                <li
                  key={item.title}
                  className="flex items-baseline justify-between gap-4 border-b border-[#f2f4f8] pb-3 text-sm"
                >
                  <span className="font-medium text-[#111827]">{item.title}</span>
                  <span className="text-[#667085]">{item.count} entries</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-4 border-b border-[#f2f4f8] pb-3 text-sm">
                <span className="font-medium text-[#111827]">Research library</span>
                <span className="text-[#667085]">{paperLibrary.length} papers</span>
              </li>
              <li className="flex items-baseline justify-between gap-4 text-sm">
                <span className="font-medium text-[#111827]">Partner institutions</span>
                <span className="text-[#667085]">{partners.length}</span>
              </li>
            </ul>
          </Panel>

          <Panel title="Contact">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[#98a2b3]">Email</dt>
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
                <dt className="text-[#98a2b3]">Current site</dt>
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

        <Panel title="How resources are included">
          <ul className="space-y-3">
            {INCLUSION.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm leading-7 text-[#475467]">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-[#4f46e5]">
                  ·
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Governance">
          <div className="space-y-4">
            <DraftNotice>
              The text below describes how the platform currently operates. Decision-making,
              maintainer roles, and the process for accepting new resources still need to be
              confirmed and written by the OpenTAI team.
            </DraftNotice>
            <p className="text-sm leading-7 text-[#475467]">
              OpenTAI is an open platform maintained by researchers across {partners.length}{" "}
              collaborating institutions. It indexes third-party open-source work alongside the
              collaboration&apos;s own releases. Listing a resource is not an endorsement of it,
              and the inclusion rules are published above so that they can be argued with.
            </p>
            <p className="text-sm leading-7 text-[#475467]">
              Content is generated from a scripted pipeline rather than edited page by page, so
              every published claim can be traced back to the source it came from and refreshed
              when that source changes.
            </p>
          </div>
        </Panel>

        <Panel title="Contributing">
          <div className="space-y-4">
            <DraftNotice>
              These routes are a proposal. The team needs to decide where suggestions are filed and
              who reviews them.
            </DraftNotice>
            <dl className="grid gap-4 sm:grid-cols-3">
              {CONTRIBUTE.map(([title, detail]) => (
                <div key={title} className="rounded-[18px] border border-[#eff2f6] px-5 py-4">
                  <dt className="text-sm font-semibold text-[#111827]">{title}</dt>
                  <dd className="mt-2 text-sm leading-6 text-[#667085]">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>

        <Panel title="Citation">
          <div className="space-y-4">
            <DraftNotice>
              Placeholder citation. If the platform has an accompanying paper, or the team prefers
              a different author line, replace this entry.
            </DraftNotice>
            <p className="text-sm leading-7 text-[#475467]">
              When citing an individual benchmark, model, dataset, or tool, cite that
              resource&apos;s own paper — every entry links to it. To cite the platform itself:
            </p>
            <pre className="overflow-x-auto rounded-[18px] border border-[#eff2f6] bg-[#fafbfe] px-5 py-4 text-xs leading-6 text-[#475467]">
              {`@misc{opentai,
  title        = {OpenTAI: The Open Hub for Trustworthy AI},
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
