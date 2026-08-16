import { SiteShell } from "@/components/site-shell";
import { SubpageLayout } from "@/components/subpage-layout";
import { datasetConfig } from "@/data/datasets";
import { collectionOrder, subpageConfigs } from "@/data/site";
import { Locale } from "@/lib/i18n";

type CollectionSlug = (typeof collectionOrder)[number];

export function CollectionPageView({
  detailBase,
  locale,
  showEmptyCategories = false,
  slug,
}: {
  detailBase?: string;
  locale: Locale;
  showEmptyCategories?: boolean;
  slug: CollectionSlug;
}) {
  const config = slug === "datasets" ? datasetConfig : subpageConfigs[slug];

  return (
    <SiteShell locale={locale} sectionLabel={config.title}>
      <SubpageLayout
        {...config}
        detailBase={detailBase}
        locale={locale}
        resourceCardKind={
          slug === "benchmarks" ? "benchmark" : slug === "datasets" ? "dataset" : undefined
        }
        showEmptyCategories={showEmptyCategories}
      />
    </SiteShell>
  );
}
