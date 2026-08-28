"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { Locale, t } from "@/lib/i18n";
import {
  buildContactMailtoUrl,
  type ContactMessageErrors,
  type ContactMessageValues,
  validateContactMessage,
} from "@/lib/resource-submission";

const EMPTY_VALUES: ContactMessageValues = {
  email: "",
  message: "",
  name: "",
  subject: "",
};

function errorMessage(locale: Locale, error: string | undefined) {
  if (!error) return undefined;
  return t(locale, error === "email" ? "Enter a valid email address." : "This field is required.");
}

export function ContactDialog({
  email,
  locale,
}: {
  email: string;
  locale: Locale;
}) {
  const [errors, setErrors] = useState<ContactMessageErrors>({});
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<ContactMessageValues>(EMPTY_VALUES);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function update(field: keyof ContactMessageValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactMessage(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    window.location.href = buildContactMailtoUrl(email, values);
  }

  return (
    <div className="contact-dialog-root">
      <button className="contact-dialog-trigger" onClick={() => setIsOpen(true)} type="button">
        {t(locale, "Contact Us")}
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
                <h2 id={titleId}>{t(locale, "Contact Us")}</h2>
              </div>
              <button
                aria-label={t(locale, "Close contact form")}
                className="submission-dialog-close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <p className="submission-dialog-note">
              {t(locale, "This form opens your email app and sends no data through the website.")}
            </p>

            <form className="submission-form" noValidate onSubmit={submit}>
              <label>
                <span>{t(locale, "Your name")} *</span>
                <input
                  aria-invalid={Boolean(errors.name)}
                  autoFocus
                  onChange={(event) => update("name", event.target.value)}
                  value={values.name}
                />
                {errors.name ? <small>{errorMessage(locale, errors.name)}</small> : null}
              </label>
              <label>
                <span>{t(locale, "Your email")} *</span>
                <input
                  aria-invalid={Boolean(errors.email)}
                  onChange={(event) => update("email", event.target.value)}
                  type="email"
                  value={values.email}
                />
                {errors.email ? <small>{errorMessage(locale, errors.email)}</small> : null}
              </label>
              <label className="submission-form-wide">
                <span>{t(locale, "Subject")} *</span>
                <input
                  aria-invalid={Boolean(errors.subject)}
                  onChange={(event) => update("subject", event.target.value)}
                  value={values.subject}
                />
                {errors.subject ? <small>{errorMessage(locale, errors.subject)}</small> : null}
              </label>
              <label className="submission-form-wide">
                <span>{t(locale, "Message")} *</span>
                <textarea
                  aria-invalid={Boolean(errors.message)}
                  onChange={(event) => update("message", event.target.value)}
                  rows={6}
                  value={values.message}
                />
                {errors.message ? <small>{errorMessage(locale, errors.message)}</small> : null}
              </label>
              <div className="submission-form-actions submission-form-wide">
                <button onClick={() => setIsOpen(false)} type="button">
                  {t(locale, "Cancel")}
                </button>
                <button className="submission-form-primary" type="submit">
                  {t(locale, "Open email app")} ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
