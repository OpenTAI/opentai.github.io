import { PaperLibrary } from "@/components/paper-library";
import { SiteShell } from "@/components/site-shell";
import { SubpageLayout } from "@/components/subpage-layout";
import { subpageConfigs } from "@/data/site";

export const metadata = {
  title: "Papers",
  description: "Papers with code plus a 571-paper research library on large model safety.",
  openGraph: { title: "Papers · OpenTAI", description: "Papers with code plus a 571-paper research library on large model safety." },
};


export default function PapersPage() {
  return (
    <SiteShell sectionLabel="Papers">
      <div className="space-y-7">
        <SubpageLayout {...subpageConfigs.papers} />
        <PaperLibrary />
      </div>
    </SiteShell>
  );
}
