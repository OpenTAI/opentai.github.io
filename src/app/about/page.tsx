import { PlannedList, SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { collectionOrder, mission, partners, siteBrand, subpageConfigs } from "@/data/site";

export const metadata = {
  title: "About",
  description: "What OpenTAI collects, and how to get in touch.",
  openGraph: { title: "About · OpenTAI", description: "What OpenTAI collects, and how to get in touch." },
};


const PLANNED = ["Governance model", "How to cite OpenTAI", "Contribution guidelines"];

const totals = collectionOrder.map((slug) => ({
  title: subpageConfigs[slug].title,
  count: subpageConfigs[slug].tableRows.length,
}));

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
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="subpage-main-table-card">
            <h2 className="mb-5 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
              What is collected here
            </h2>
            <ul className="space-y-3">
              {totals.map((item) => (
                <li
                  key={item.title}
                  className="flex items-baseline justify-between gap-4 border-b border-[#f2f4f8] pb-3 text-sm last:border-0 last:pb-0"
                >
                  <span className="font-medium text-[#111827]">{item.title}</span>
                  <span className="text-[#667085]">{item.count} entries</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-4 pt-1 text-sm">
                <span className="font-medium text-[#111827]">Partner institutions</span>
                <span className="text-[#667085]">{partners.length}</span>
              </li>
            </ul>
          </div>

          <div className="subpage-main-table-card">
            <h2 className="mb-5 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
              Contact
            </h2>
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
          </div>
        </section>

        <PlannedList
          items={PLANNED}
          note="Governance and citation details have to come from the OpenTAI team; nothing has been drafted on their behalf."
          title="Still needed"
        />
      </SimplePage>
    </SiteShell>
  );
}
