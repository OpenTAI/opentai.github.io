import { BenchmarkDetailPageView } from "@/components/benchmark-detail-page-view";
import { benchmarkDetails } from "@/data/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = benchmarkDetails[slug];
  if (!detail) return {};

  const description = detail.description.slice(0, 180);

  return {
    title: `${detail.name} · Benchmarks`,
    description,
    openGraph: { title: `${detail.name} · Benchmarks · OpenTAI`, description },
  };
}

export function generateStaticParams() {
  return Object.keys(benchmarkDetails).map((slug) => ({ slug }));
}

export default async function BenchmarkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BenchmarkDetailPageView locale="en" slug={slug} />;
}
