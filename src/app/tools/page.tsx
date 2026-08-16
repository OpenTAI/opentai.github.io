import { CollectionPageView } from "@/components/collection-page-view";

export const metadata = {
  title: "Tools",
  description: "Libraries, frameworks, and attack/defense toolkits for trustworthy AI research.",
  openGraph: { title: "Tools · OpenTAI", description: "Libraries, frameworks, and attack/defense toolkits for trustworthy AI research." },
};


export default function ToolsPage() {
  return <CollectionPageView locale="en" slug="tools" />;
}
