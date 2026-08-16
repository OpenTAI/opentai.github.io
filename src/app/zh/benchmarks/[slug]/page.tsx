import type { Metadata } from "next";
import { BenchmarkDetailPageView } from "@/components/benchmark-detail-page-view";
import { benchmarkDetails } from "@/data/site";
import { t } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(benchmarkDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = benchmarkDetails[slug];
  if (!detail) return {};

  return {
    title: `${detail.name} · 评测基准`,
    description: t("zh", detail.description),
    alternates: {
      canonical: `/zh/benchmarks/${slug}/`,
      languages: {
        en: `/benchmarks/${slug}/`,
        "zh-CN": `/zh/benchmarks/${slug}/`,
      },
    },
  };
}

export default async function ChineseBenchmarkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BenchmarkDetailPageView locale="zh" slug={slug} />;
}
