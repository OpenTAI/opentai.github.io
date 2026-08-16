import { AboutPageView } from "@/components/about-page-view";

export const metadata = {
  title: "About",
  description: "What OpenTAI collects, how resources are included, and how to get in touch.",
  openGraph: {
    title: "About · OpenTAI",
    description: "What OpenTAI collects, how resources are included, and how to get in touch.",
  },
};

export default function AboutPage() {
  return <AboutPageView locale="en" />;
}
