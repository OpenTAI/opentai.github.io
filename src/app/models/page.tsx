import { SiteShell } from "@/components/site-shell";
import { SubpageLayout } from "@/components/subpage-layout";
import { subpageConfigs } from "@/data/site";

export const metadata = {
  title: "Models",
  description: "Open-source trustworthy AI models — guard models, safety-aligned models, detectors, and agents.",
  openGraph: { title: "Models · OpenTAI", description: "Open-source trustworthy AI models — guard models, safety-aligned models, detectors, and agents." },
};


export default function ModelsPage() {
  return (
    <SiteShell sectionLabel="Models">
      <SubpageLayout {...subpageConfigs.models} showEmptyCategories />
    </SiteShell>
  );
}
