export type ResourceSubmissionKind = "arena" | "benchmark" | "dataset";

export type ResourceSubmissionValues = {
  githubUrl: string;
  link: string;
  name: string;
  year: string;
};

export type ResourceSubmissionError = "github" | "required" | "url" | "year";

export type ResourceSubmissionErrors = Partial<
  Record<keyof ResourceSubmissionValues, ResourceSubmissionError>
>;

function publicUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function githubRepositoryUrl(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    const parts = url.pathname.split("/").filter(Boolean);
    return (
      url.protocol === "https:" &&
      (hostname === "github.com" || hostname === "www.github.com") &&
      parts.length >= 2
    );
  } catch {
    return false;
  }
}

export function validateResourceSubmission(
  values: ResourceSubmissionValues,
): ResourceSubmissionErrors {
  const errors: ResourceSubmissionErrors = {};

  if (!values.name.trim()) errors.name = "required";
  if (!values.year.trim()) {
    errors.year = "required";
  } else if (!/^(?:19|20)\d{2}$/.test(values.year.trim())) {
    errors.year = "year";
  }
  if (values.link.trim() && !publicUrl(values.link.trim())) errors.link = "url";
  if (!values.githubUrl.trim()) {
    errors.githubUrl = "required";
  } else if (!githubRepositoryUrl(values.githubUrl.trim())) {
    errors.githubUrl = "github";
  }

  return errors;
}

const KIND_LABELS: Record<ResourceSubmissionKind, string> = {
  arena: "Arena",
  benchmark: "Benchmark",
  dataset: "Dataset",
};

export function buildResourceSubmissionIssueUrl(
  kind: ResourceSubmissionKind,
  values: ResourceSubmissionValues,
) {
  const label = KIND_LABELS[kind];
  const body = [
    `Resource kind: ${label}`,
    `Name: ${values.name.trim()}`,
    `Year: ${values.year.trim()}`,
    `Link: ${values.link.trim() || "Not provided"}`,
    `GitHub: ${values.githubUrl.trim()}`,
    "",
    "This submission requires source verification before it can be included in OpenTAI.",
  ].join("\n");
  const query = new URLSearchParams({
    body,
    title: `[${label} submission] ${values.name.trim()}`,
  });

  return `https://github.com/GabryGao/opentai/issues/new?${query.toString()}`;
}
