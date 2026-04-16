"use client";

import { useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const TITLES = ["mr", "mrs", "hem", "hon", "prof", "dr", "ven"] as const;

const GROUPS = [
  "firstLadies",
  "government",
  "senate",
  "nationalAssembly",
  "constitutionalCourt",
  "highCourts",
  "cesec",
  "diplomaticCorps",
  "internationalOrgs",
  "presidency",
  "associations",
  "other",
] as const;

const LANGUAGES = ["fr", "en", "pt", "es"] as const;

const LANGUAGE_LABELS: Record<(typeof LANGUAGES)[number], string> = {
  fr: "Français",
  en: "English",
  pt: "Português",
  es: "Español",
};

export function RegisterForm({ token }: { token: string }) {
  const t = useTranslations("register");
  const locale = useLocale();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(form: FormData): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!form.get("title")) errors.title = t("required");
    if (!form.get("firstName")) errors.firstName = t("required");
    if (!form.get("lastName")) errors.lastName = t("required");
    if (!form.get("group")) errors.group = t("required");
    const email = form.get("email") as string;
    if (!email) {
      errors.email = t("required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t("invalidEmail");
    }
    return errors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        title: formData.get("title"),
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        email: formData.get("email"),
        category: formData.get("group"),
        language_pref: formData.get("languagePref") || "fr",
        token,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.code === "DUPLICATE_EMAIL") {
          setError(t("errorDuplicate"));
        } else {
          setError(t("errorGeneric"));
        }
        return;
      }

      router.push(`/${locale}/register/confirmation`);
    } catch {
      setError(t("errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-mid-grey bg-white px-4 py-2.5 font-body text-near-black focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange transition-colors";
  const labelClass = "block font-body text-sm font-semibold text-near-black mb-1.5";
  const errorClass = "text-crimson text-sm mt-1 font-body";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-light-beige rounded-2xl p-6 md:p-10 shadow-sm"
    >
      {error && (
        <div
          className="mb-6 rounded-lg border border-crimson bg-crimson/10 p-4 text-crimson font-body text-sm"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Title */}
        <div>
          <label htmlFor="title" className={labelClass}>
            {t("titleLabel")} *
          </label>
          <select
            id="title"
            name="title"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.title}
            aria-describedby={fieldErrors.title ? "title-error" : undefined}
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {t("titlePlaceholder")}
            </option>
            {TITLES.map((key) => (
              <option key={key} value={key}>
                {t(`titleOptions.${key}`)}
              </option>
            ))}
          </select>
          {fieldErrors.title && (
            <p id="title-error" className={errorClass} role="alert">
              {fieldErrors.title}
            </p>
          )}
        </div>

        {/* spacer on desktop */}
        <div className="hidden md:block" />

        {/* First name */}
        <div>
          <label htmlFor="firstName" className={labelClass}>
            {t("firstName")} *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.firstName}
            aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
            autoComplete="given-name"
            className={inputClass}
          />
          {fieldErrors.firstName && (
            <p id="firstName-error" className={errorClass} role="alert">
              {fieldErrors.firstName}
            </p>
          )}
        </div>

        {/* Last name */}
        <div>
          <label htmlFor="lastName" className={labelClass}>
            {t("lastName")} *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.lastName}
            aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
            autoComplete="family-name"
            className={inputClass}
          />
          {fieldErrors.lastName && (
            <p id="lastName-error" className={errorClass} role="alert">
              {fieldErrors.lastName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label htmlFor="email" className={labelClass}>
            {t("email")} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            autoComplete="email"
            className={inputClass}
          />
          {fieldErrors.email && (
            <p id="email-error" className={errorClass} role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Group */}
        <div className="md:col-span-2">
          <label htmlFor="group" className={labelClass}>
            {t("group")} *
          </label>
          <select
            id="group"
            name="group"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.group}
            aria-describedby={fieldErrors.group ? "group-error" : undefined}
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {t("groupPlaceholder")}
            </option>
            {GROUPS.map((key) => (
              <option key={key} value={key}>
                {t(`groupOptions.${key}`)}
              </option>
            ))}
          </select>
          {fieldErrors.group && (
            <p id="group-error" className={errorClass} role="alert">
              {fieldErrors.group}
            </p>
          )}
        </div>

        {/* Language preference */}
        <div className="md:col-span-2">
          <label htmlFor="languagePref" className={labelClass}>
            {t("languagePref")}
          </label>
          <select
            id="languagePref"
            name="languagePref"
            defaultValue={locale}
            className={inputClass}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {LANGUAGE_LABELS[lang]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full font-heading font-semibold text-lg text-white bg-orange hover:bg-orange/90 disabled:opacity-60 px-8 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 min-h-[48px]"
      >
        {submitting ? "…" : t("submit")}
      </button>
    </form>
  );
}
