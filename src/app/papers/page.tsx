import { PaperLibrary } from "@/components/paper-library";
import { SimplePage } from "@/components/simple-page";
import { SiteShell } from "@/components/site-shell";
import { paperDomains, paperLibrary } from "@/data/papers";

export const metadata = {
  title: "Papers",
  description:
    "A merged safety research library covering LLMs, agents, embodied AI and vision-language models.",
  openGraph: {
    title: "Papers · OpenTAI",
    description:
      "A merged safety research library covering LLMs, agents, embodied AI and vision-language models.",
  },
};

export default function PapersPage() {
  return (
    <SiteShell sectionLabel="Papers">
      <SimplePage
        breadcrumb={["Discover", "Papers"]}
        description={`${paperLibrary.length.toLocaleString()} safety papers across ${paperDomains.length} domains — ${paperDomains.join(", ")} — filterable by research area and by survey.`}
        heroIcon="◈"
        overview="Merged from the two survey lists the OpenTAI team maintains and contributes to. Nothing here is written for the site; every entry keeps the title, authors and venue its source recorded."
        title="Papers"
      >
        <PaperLibrary />
      </SimplePage>
    </SiteShell>
  );
}
