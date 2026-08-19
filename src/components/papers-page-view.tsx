import { PaperLibrary } from "@/components/paper-library";
import { ResourceSubmissionDialog } from "@/components/resource-submission-dialog";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { Locale } from "@/lib/i18n";

export function PapersPageView({ locale }: { locale: Locale }) {
  const description =
    locale === "zh"
      ? "精选的人工智能安全论文集合，涵盖大语言模型、智能体和具身智能。"
      : "A curated collection of AI safety papers spanning LLMs, Agents, and Embodied AI.";
  const overview =
    locale === "zh"
      ? "在一个可搜索的集合中发现综述、评测基准论文、数据集和基础研究。"
      : "Discover surveys, benchmark papers, datasets, and foundational research—all in one searchable collection.";

  return (
    <SiteShell locale={locale} sectionLabel="Papers">
      <SimplePage
        breadcrumb={["Home", "Papers"]}
        description={`${description}\n\n${overview}`}
        heroAside={<ResourceSubmissionDialog kind="paper" locale={locale} />}
        heroIcon="◈"
        locale={locale}
        title="Papers"
      >
        <PaperLibrary locale={locale} />
      </SimplePage>
    </SiteShell>
  );
}
