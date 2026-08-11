import Image from "next/image";
import { PlannedList, SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { partners } from "@/data/site";

export const metadata = {
  title: "Community",
  description: "Partner institutions collaborating on OpenTAI.",
  openGraph: { title: "Community · OpenTAI", description: "Partner institutions collaborating on OpenTAI." },
};


const PLANNED = ["Workshops", "Challenges", "Open projects", "Contributor directory"];

export default function CommunityPage() {
  return (
    <SiteShell sectionLabel="Community">
      <SimplePage
        breadcrumb={["Discover", "Community"]}
        description="The organizations behind OpenTAI, and the workshops, challenges, and projects that run on it."
        heroIcon="◉"
        overview={`${partners.length} institutions currently collaborate on the platform.`}
        title="Community"
      >
        <section className="subpage-main-table-card">
          <h2 className="mb-6 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
            Partner institutions
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 xl:grid-cols-6">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center gap-3 text-center">
                <div className="relative h-12 w-full">
                  <Image
                    alt={partner.name}
                    className="object-contain"
                    fill
                    sizes="140px"
                    src={partner.logo}
                  />
                </div>
                <p className="text-xs leading-5 text-[#667085]">{partner.name}</p>
              </div>
            ))}
          </div>
        </section>

        <PlannedList
          items={PLANNED}
          note="These need content from the OpenTAI team — there is nothing on the current site to port."
          title="Coming to this page"
        />
      </SimplePage>
    </SiteShell>
  );
}
