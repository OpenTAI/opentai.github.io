import { SiteShell } from "@/components/site-shell";
import { SubpageLayout } from "@/components/subpage-layout";
import { subpageConfigs } from "@/data/site";

export const metadata = {
  title: "Benchmarks",
  description: "Evaluation benchmarks, tasks, and metrics for trustworthy AI.",
  openGraph: { title: "Benchmarks · OpenTAI", description: "Evaluation benchmarks, tasks, and metrics for trustworthy AI." },
};


export default function BenchmarksPage() {
  return (
    <SiteShell sectionLabel="Benchmarks">
      <SubpageLayout {...subpageConfigs.benchmarks} detailBase="/benchmarks" showEmptyCategories />
    </SiteShell>
  );
}
