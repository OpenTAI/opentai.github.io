import { SiteShell } from "@/components/site-shell";
import { SubpageLayout } from "@/components/subpage-layout";
import { subpageConfigs } from "@/data/site";

export const metadata = {
  title: "Datasets",
  description: "Training, evaluation, preference, red team, and agent trajectory datasets for trustworthy AI.",
  openGraph: { title: "Datasets · OpenTAI", description: "Training, evaluation, preference, red team, and agent trajectory datasets for trustworthy AI." },
};


export default function DatasetsPage() {
  return (
    <SiteShell sectionLabel="Datasets">
      <SubpageLayout {...subpageConfigs.datasets} showEmptyCategories />
    </SiteShell>
  );
}
