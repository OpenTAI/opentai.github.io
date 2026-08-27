"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import {
  buildVolunteerContactMailto,
  buildVolunteerContributionIssueUrl,
  contributionAreas,
  type VolunteerContributionErrors,
  type VolunteerContributionValues,
  validateVolunteerContribution,
} from "@/lib/contribution";
import { siteBrand } from "@/data/site";
import { Locale, t } from "@/lib/i18n";

const EMPTY_VALUES: VolunteerContributionValues = {
  areaId: "",
  githubProfile: "",
  proposal: "",
};

function errorMessage(locale: Locale, error: string | undefined) {
  if (!error) return undefined;
  const key = {
    area: "Select a contribution area.",
    github: "Enter a GitHub profile URL.",
    required: "This field is required.",
  }[error];
  return key ? t(locale, key) : undefined;
}

export function ContributionDialog({ locale }: { locale: Locale }) {
  const [errors, setErrors] = useState<VolunteerContributionErrors>({});
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<VolunteerContributionValues>(EMPTY_VALUES);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function update(field: keyof VolunteerContributionValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateVolunteerContribution(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    window.open(
      buildVolunteerContributionIssueUrl(values),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="contribution-dialog-root">
      <button
        className="contribution-dialog-trigger"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {t(locale, "Volunteer to contribute")}
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
          <div className="submission-dialog-panel contribution-dialog-panel">
            <div className="submission-dialog-heading">
              <div>
                <span>{t(locale, "Community submission")}</span>
                <h2 id={titleId}>{t(locale, "Volunteer to contribute")}</h2>
              </div>
              <button
                aria-label={t(locale, "Close contribution form")}
                className="submission-dialog-close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="submission-dialog-note contribution-dialog-note">
              <p>
                {t(
                  locale,
                  "Tell us how you would like to help. Your submission opens a GitHub issue for review.",
                )}
              </p>
              <p>
                {t(locale, "Questions? Email")} {" "}
                <a href={buildVolunteerContactMailto(siteBrand.contactEmail)}>
                  {siteBrand.contactEmail}
                </a>
              </p>
            </div>

            <form className="submission-form" noValidate onSubmit={submit}>
              <label>
                <span>{t(locale, "GitHub profile")} *</span>
                <input
                  aria-invalid={Boolean(errors.githubProfile)}
                  autoFocus
                  onChange={(event) => update("githubProfile", event.target.value)}
                  placeholder="https://github.com/username"
                  type="url"
                  value={values.githubProfile}
                />
                {errors.githubProfile ? (
                  <small>{errorMessage(locale, errors.githubProfile)}</small>
                ) : null}
              </label>

              <label>
                <span>{t(locale, "Contribution area")} *</span>
                <select
                  aria-invalid={Boolean(errors.areaId)}
                  onChange={(event) => update("areaId", event.target.value)}
                  value={values.areaId}
                >
                  <option value="">{t(locale, "Select an area")}</option>
                  {contributionAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {t(locale, area.title)}
                    </option>
                  ))}
                </select>
                {errors.areaId ? <small>{errorMessage(locale, errors.areaId)}</small> : null}
              </label>

              <label className="submission-form-wide">
                <span>{t(locale, "How would you like to help?")} *</span>
                <textarea
                  aria-invalid={Boolean(errors.proposal)}
                  onChange={(event) => update("proposal", event.target.value)}
                  rows={6}
                  value={values.proposal}
                />
                {errors.proposal ? <small>{errorMessage(locale, errors.proposal)}</small> : null}
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
