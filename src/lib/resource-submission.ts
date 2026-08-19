export type ResourceSubmissionKind = "arena" | "benchmark" | "dataset" | "paper";

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

export type ContactMessageValues = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

export type ContactMessageError = "email" | "required";

export type ContactMessageErrors = Partial<
  Record<keyof ContactMessageValues, ContactMessageError>
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
  kind: ResourceSubmissionKind,
  values: ResourceSubmissionValues,
): ResourceSubmissionErrors {
  const errors: ResourceSubmissionErrors = {};

  if (!values.name.trim()) errors.name = "required";
  if (!values.year.trim()) {
    errors.year = "required";
  } else if (!/^(?:19|20)\d{2}$/.test(values.year.trim())) {
    errors.year = "year";
  }
  if (kind === "paper" && !values.link.trim()) {
    errors.link = "required";
  } else if (values.link.trim() && !publicUrl(values.link.trim())) {
    errors.link = "url";
  }
  if (kind !== "paper" && !values.githubUrl.trim()) {
    errors.githubUrl = "required";
  } else if (values.githubUrl.trim() && !githubRepositoryUrl(values.githubUrl.trim())) {
    errors.githubUrl = "github";
  }

  return errors;
}

const KIND_LABELS: Record<ResourceSubmissionKind, string> = {
  arena: "Arena",
  benchmark: "Benchmark",
  dataset: "Dataset",
  paper: "Paper",
};

export function resourceSubmissionNameLabel(kind: ResourceSubmissionKind) {
  return kind === "paper" ? "Paper Title" : `${KIND_LABELS[kind]} Name`;
}

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

export function validateContactMessage(
  values: ContactMessageValues,
): ContactMessageErrors {
  const errors: ContactMessageErrors = {};

  if (!values.name.trim()) errors.name = "required";
  if (!values.subject.trim()) errors.subject = "required";
  if (!values.message.trim()) errors.message = "required";
  if (!values.email.trim()) {
    errors.email = "required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "email";
  }

  return errors;
}

export function buildContactMailtoUrl(
  recipient: string,
  values: ContactMessageValues,
) {
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    "",
    values.message.trim(),
  ].join("\n");
  const query = new URLSearchParams({
    body,
    subject: values.subject.trim(),
  });

  return `mailto:${recipient}?${query.toString()}`;
}
