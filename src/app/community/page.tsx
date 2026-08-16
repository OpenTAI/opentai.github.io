import { CommunityPageView } from "@/components/community-page-view";

export const metadata = {
  title: "Community",
  description: "Partner institutions collaborating on OpenTAI.",
  openGraph: {
    title: "Community · OpenTAI",
    description: "Partner institutions collaborating on OpenTAI.",
  },
};

export default function CommunityPage() {
  return <CommunityPageView locale="en" />;
}
