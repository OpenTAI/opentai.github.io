"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { Locale, t } from "@/lib/i18n";
import {
  buildResourceSubmissionIssueUrl,
  type ResourceSubmissionErrors,
  type ResourceSubmissionKind,
  type ResourceSubmissionValues,
  validateResourceSubmission,
} from "@/lib/resource-submission";

const EMPTY_VALUES: ResourceSubmissionValues = {
  githubUrl: "",
  link: "",
  name: "",
  year: "",
};

const SUBMIT_LABELS: Record<ResourceSubmissionKind, string> = {
  arena: "Submit your Arena",
  benchmark: "Submit your Benchmark",
  dataset: "Submit your Dataset",
};

const DIALOG_TITLES: Record<ResourceSubmissionKind, string> = {
  arena: "Suggest an Arena",
  benchmark: "Suggest a Benchmark",
  dataset: "Suggest a Dataset",
};

function errorMessage(locale: Locale, error: string | undefined) {
  if (!error) return undefined;
  const key = {
    github: "Enter a GitHub repository URL.",
    required: "This field is required.",
    url: "Enter a valid public URL.",
    year: "Enter a four-digit year.",
  }[error];
  return key ? t(locale, key) : undefined;
}

export function ResourceSubmissionDialog({
  kind,
  locale,
}: {
  kind: ResourceSubmissionKind;
  locale: Locale;
}) {
  const [errors, setErrors] = useState<ResourceSubmissionErrors>({});
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<ResourceSubmissionValues>(EMPTY_VALUES);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function update(field: keyof ResourceSubmissionValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateResourceSubmission(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    window.open(
      buildResourceSubmissionIssueUrl(kind, values),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="submission-cta">
      <p>{t(locale, "Help us find a verified public resource.")}</p>
      <button onClick={() => setIsOpen(true)} type="button">
        <span>{t(locale, SUBMIT_LABELS[kind])}</span>
        <span aria-hidden="true">↗</span>
      </button>

      {isOpen ? (
        <div
          aria-labelledby={titleId}
          aria-modal="true"
          className="submission-dialog-backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setIsOpen(false);
          }}
          role="dialog"
        >
          <div className="submission-dialog-panel">
            <div className="submission-dialog-heading">
              <div>
                <span>{t(locale, "Community submission")}</span>
                <h2 id={titleId}>{t(locale, DIALOG_TITLES[kind])}</h2>
              </div>
              <button
                aria-label={t(locale, "Close submission form")}
                className="submission-dialog-close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <p className="submission-dialog-note">
              {t(locale, "Submissions open a GitHub issue for source review before inclusion.")}
            </p>

            <form className="submission-form" noValidate onSubmit={submit}>
              <label>
                <span>{t(locale, "Name")} *</span>
                <input
                  aria-invalid={Boolean(errors.name)}
                  autoFocus
                  onChange={(event) => update("name", event.target.value)}
                  value={values.name}
                />
                {errors.name ? <small>{errorMessage(locale, errors.name)}</small> : null}
              </label>

              <label>
                <span>{t(locale, "Year")} *</span>
                <input
                  aria-invalid={Boolean(errors.year)}
                  inputMode="numeric"
                  onChange={(event) => update("year", event.target.value)}
                  placeholder="2025"
                  value={values.year}
                />
                {errors.year ? <small>{errorMessage(locale, errors.year)}</small> : null}
              </label>

              <label className="submission-form-wide">
                <span>{t(locale, "Link (optional)")}</span>
                <input
                  aria-invalid={Boolean(errors.link)}
                  onChange={(event) => update("link", event.target.value)}
                  placeholder="https://arxiv.org/abs/..."
                  type="url"
                  value={values.link}
                />
                {errors.link ? <small>{errorMessage(locale, errors.link)}</small> : null}
              </label>

              <label className="submission-form-wide">
                <span>{t(locale, "GitHub Link")} *</span>
                <input
                  aria-invalid={Boolean(errors.githubUrl)}
                  onChange={(event) => update("githubUrl", event.target.value)}
                  placeholder="https://github.com/owner/repository"
                  type="url"
                  value={values.githubUrl}
                />
                {errors.githubUrl ? (
                  <small>{errorMessage(locale, errors.githubUrl)}</small>
                ) : null}
              </label>

              <div className="submission-form-actions submission-form-wide">
                <button onClick={() => setIsOpen(false)} type="button">
                  {t(locale, "Cancel")}
                </button>
                <button className="submission-form-primary" type="submit">
                  {t(locale, "Continue on GitHub")} ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
