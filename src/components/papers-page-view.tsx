import { PaperLibrary } from "@/components/paper-library";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { paperDomains, paperLibrary } from "@/data/papers";
import { Locale, t } from "@/lib/i18n";

export function PapersPageView({ locale }: { locale: Locale }) {
  const description =
    locale === "zh"
      ? `${paperLibrary.length.toLocaleString()} 篇安全论文，覆盖 ${paperDomains.length} 个领域——${paperDomains.map((domain) => t(locale, domain)).join("、")}；可按研究方向及研究/综述类型筛选。`
      : `${paperLibrary.length.toLocaleString()} safety papers across ${paperDomains.length} domains — ${paperDomains.join(", ")} — filterable by research area and by survey.`;
  const overview =
    locale === "zh"
      ? "合并自 OpenTAI 团队指定的两份来源清单。本站没有重写其中内容；每个条目均保留来源记录的标题、作者和发表场所。"
      : "Merged from the two source lists specified by the OpenTAI team. Nothing here is written for the site; every entry keeps the title, authors and venue its source recorded.";

  return (
    <SiteShell locale={locale} sectionLabel="Papers">
      <SimplePage
        breadcrumb={["Home", "Papers"]}
        description={description}
        heroIcon="◈"
        locale={locale}
        overview={overview}
        title="Papers"
      >
        <PaperLibrary locale={locale} />
      </SimplePage>
    </SiteShell>
  );
}
