export const contributionAreaIds = [
  "research-papers",
  "models-datasets",
  "benchmarks-evaluation",
  "tools-resources",
  "website-development",
  "community",
] as const;

export type ContributionAreaId = (typeof contributionAreaIds)[number];

export type ContributionArea = {
  id: ContributionAreaId;
  title: string;
  description: string;
};

export const contributionAreas: readonly ContributionArea[] = [
  {
    id: "research-papers",
    title: "Research & Papers",
    description:
      "Recommend or organize trustworthy AI research with a public paper or primary source.",
  },
  {
    id: "models-datasets",
    title: "Models & Datasets",
    description: "Submit or improve source-backed model and dataset records.",
  },
  {
    id: "benchmarks-evaluation",
    title: "Benchmarks & Evaluation",
    description: "Add reproducible benchmarks, metrics, or verified evaluation results.",
  },
  {
    id: "tools-resources",
    title: "Tools & Resources",
    description: "Recommend open-source safety tools, frameworks, and practical resources.",
  },
  {
    id: "website-development",
    title: "Website & Development",
    description: "Improve the website, fix a bug, or propose a focused pull request.",
  },
  {
    id: "community",
    title: "Community",
    description: "Help with events, documentation, translation, or community operations.",
  },
];

const CONTRIBUTION_ISSUE_URL = "https://github.com/GabryGao/opentai/issues/new";

export function buildContributionIssueUrl(areaId: ContributionAreaId | string) {
  const area = contributionAreas.find((candidate) => candidate.id === areaId);

  if (!area) {
    throw new Error(`Unknown contribution area: ${areaId}`);
  }

  const body = [
    `Contribution area: ${area.title}`,
    "",
    "Proposed contribution:",
    "",
    "Public sources or references:",
    "",
    "How can this be verified or reproduced?",
    "",
    "All contributions require source review before acceptance.",
  ].join("\n");

  const query = new URLSearchParams({
    title: `[Contribution] ${area.title}`,
    body,
  });

  return `${CONTRIBUTION_ISSUE_URL}?${query.toString()}`;
}
