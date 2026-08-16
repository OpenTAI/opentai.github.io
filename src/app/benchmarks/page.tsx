import { CollectionPageView } from "@/components/collection-page-view";

export const metadata = {
  title: "Benchmarks",
  description: "Evaluation benchmarks, tasks, and metrics for trustworthy AI.",
  openGraph: { title: "Benchmarks · OpenTAI", description: "Evaluation benchmarks, tasks, and metrics for trustworthy AI." },
};


export default function BenchmarksPage() {
  return <CollectionPageView detailBase="/benchmarks" locale="en" showEmptyCategories slug="benchmarks" />;
}
