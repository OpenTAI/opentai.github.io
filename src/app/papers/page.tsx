import { PapersPageView } from "@/components/papers-page-view";

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
  return <PapersPageView locale="en" />;
}
