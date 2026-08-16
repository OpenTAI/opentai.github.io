import { CollectionPageView } from "@/components/collection-page-view";

export const metadata = {
  title: "Datasets",
  description: "Verified training and fine-tuning datasets for trustworthy AI.",
  openGraph: { title: "Datasets · OpenTAI", description: "Verified training and fine-tuning datasets for trustworthy AI." },
};


export default function DatasetsPage() {
  return <CollectionPageView locale="en" showEmptyCategories slug="datasets" />;
}
