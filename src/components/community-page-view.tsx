import Image from "next/image";
import { PlannedList, SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { partners } from "@/data/site";
import { Locale, t } from "@/lib/i18n";

const PLANNED = ["Workshops", "Challenges", "Open projects", "Contributor directory"];

export function CommunityPageView({ locale }: { locale: Locale }) {
  const description =
    locale === "zh"
      ? "参与 OpenTAI 的机构，以及在平台上开展的研讨会、挑战赛和项目。"
      : "The organizations behind OpenTAI, and the workshops, challenges, and projects that run on it.";
  const overview =
    locale === "zh"
      ? `目前有 ${partners.length} 家机构参与平台合作。`
      : `${partners.length} institutions currently collaborate on the platform.`;

  return (
    <SiteShell locale={locale} sectionLabel="Community">
      <SimplePage
        breadcrumb={["Home", "Ecosystem", "Community"]}
        description={description}
        heroIcon="◉"
        locale={locale}
        overview={overview}
        title="Community"
      >
        <section className="subpage-main-table-card">
          <h2 className="mb-6 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
            {t(locale, "Partner institutions")}
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
          locale={locale}
          note="These need content from the OpenTAI team — there is nothing on the current site to port."
          title="Coming to this page"
        />
      </SimplePage>
    </SiteShell>
  );
}
