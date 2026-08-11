import { SiteShell } from "@/components/site-shell";
import { SubpageLayout } from "@/components/subpage-layout";
import { subpageConfigs } from "@/data/site";

export const metadata = {
  title: "Tools",
  description: "Libraries, frameworks, and attack/defense toolkits for trustworthy AI research.",
  openGraph: { title: "Tools · OpenTAI", description: "Libraries, frameworks, and attack/defense toolkits for trustworthy AI research." },
};


export default function ToolsPage() {
  return (
    <SiteShell sectionLabel="Tools">
      <SubpageLayout {...subpageConfigs.tools} />
    </SiteShell>
  );
}
