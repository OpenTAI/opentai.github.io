import Image from "next/image";
import { ContributionDialog } from "@/components/contribution-dialog";
import { OrganizationContributors } from "@/components/organization-contributors";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { partners } from "@/data/site";
import { Locale, t } from "@/lib/i18n";

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
        <section className="subpage-main-table-card community-introduction">
          <h2>{t(locale, "OpenTAI Community")}</h2>
          <h3>{t(locale, "Building Trustworthy AI, Together")}</h3>
          {locale === "zh" ? (
            <>
              <p>
                可信人工智能正在快速发展，但相关研究、工具和资源仍然较为分散。
                <strong>OpenTAI 希望将它们汇聚到一个开放且持续更新的平台中，</strong>
                让研究者、开发者和初创团队能够找到所需资源、建立联系并开展协作。
              </p>
              <p>
                我们的使命是让可信人工智能成为一项
                <strong>全球、开放、协作的共同事业。</strong>
                我们欢迎每个人参与贡献——无论是
                <strong>分享最新研究与资源，还是帮助我们建设和维护 OpenTAI。</strong>
              </p>
              <p className="community-introduction-closing">
                开放研究。共同建设。让人工智能值得信赖。
              </p>
            </>
          ) : (
            <>
              <p>
                Trustworthy AI is evolving rapidly, yet its research, tools, and resources remain
                fragmented. <strong>OpenTAI aims to bring them together in one open, up-to-date hub</strong>{" "}
                where researchers, builders, and startups can find the resources they need,
                connect, and collaborate.
              </p>
              <p>
                Our mission is to make trustworthy AI a <strong>global, open, and collaborative effort.</strong>{" "}
                We welcome contributions from everyone — whether by
                <strong> sharing your latest research and resources, or helping us build and maintain OpenTAI.</strong>
              </p>
              <p className="community-introduction-closing">
                Research openly. Build together. Make AI trustworthy.
              </p>
            </>
          )}
        </section>

        <section className="subpage-main-table-card contributor-recognition-section">
          <div className="contributor-recognition-heading">
            <div>
              <p>{t(locale, "Contributor Recognition")}</p>
              <h2>{t(locale, "Contributors")}</h2>
            </div>
            <ContributionDialog locale={locale} />
          </div>
          <OrganizationContributors locale={locale} />
        </section>

        <section className="subpage-main-table-card">
          <h2 className="mb-6 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
            {t(locale, "Partner Institutions")}
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
      </SimplePage>
    </SiteShell>
  );
}
