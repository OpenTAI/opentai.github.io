import type { Metadata } from "next";
import { TermsPageView } from "@/components/terms-page-view";

export const metadata: Metadata = {
  title: "Terms Of Use",
  description: "Terms governing access to and use of OpenTAI.",
  alternates: {
    canonical: "/terms/",
    languages: { en: "/terms/", "zh-CN": "/zh/terms/" },
  },
};

export default function TermsPage() {
  return <TermsPageView locale="en" />;
}
