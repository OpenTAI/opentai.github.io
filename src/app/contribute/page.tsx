import type { Metadata } from "next";
import { ContributePageView } from "@/components/contribute-page-view";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Choose an area and contribute source-backed work to OpenTAI.",
};

export default function ContributePage() {
  return <ContributePageView locale="en" />;
}
