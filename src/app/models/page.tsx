import { CollectionPageView } from "@/components/collection-page-view";

export const metadata = {
  title: "Models",
  description: "Open-source trustworthy AI models — guard models, safety-aligned models, detectors, and agents.",
  openGraph: { title: "Models · OpenTAI", description: "Open-source trustworthy AI models — guard models, safety-aligned models, detectors, and agents." },
};


export default function ModelsPage() {
  return <CollectionPageView locale="en" showEmptyCategories slug="models" />;
}
