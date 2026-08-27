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

export function buildVolunteerContactMailto(email: string) {
  const query = new URLSearchParams({
    subject: "OpenTAI volunteer contribution",
  });

  return `mailto:${email}?${query.toString()}`;
}

export type VolunteerContributionValues = {
  areaId: ContributionAreaId | string;
  githubProfile: string;
  proposal: string;
};

export type VolunteerContributionErrors = Partial<
  Record<keyof VolunteerContributionValues, "area" | "github" | "required">
>;

function contributionArea(areaId: ContributionAreaId | string) {
  return contributionAreas.find((candidate) => candidate.id === areaId);
}

function isGitHubProfile(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "github.com" &&
      url.pathname.split("/").filter(Boolean).length >= 1
    );
  } catch {
    return false;
  }
}

export function validateVolunteerContribution(
  values: VolunteerContributionValues,
): VolunteerContributionErrors {
  const errors: VolunteerContributionErrors = {};

  if (!contributionArea(values.areaId)) errors.areaId = "area";
  if (!isGitHubProfile(values.githubProfile.trim())) errors.githubProfile = "github";
  if (!values.proposal.trim()) errors.proposal = "required";

  return errors;
}

export function buildVolunteerContributionIssueUrl(values: VolunteerContributionValues) {
  const area = contributionArea(values.areaId);

  if (!area) {
    throw new Error(`Unknown contribution area: ${values.areaId}`);
  }

  const body = [
    `GitHub profile: ${values.githubProfile.trim()}`,
    "",
    `Contribution area: ${area.title}`,
    "",
    "Proposed contribution:",
    values.proposal.trim(),
    "",
    "All contributions require source review before acceptance.",
  ].join("\n");

  const query = new URLSearchParams({
    title: `[Contribution] ${area.title}`,
    body,
  });

  return `${CONTRIBUTION_ISSUE_URL}?${query.toString()}`;
}
