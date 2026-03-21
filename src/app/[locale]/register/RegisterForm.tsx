"use client";

import { useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "opdad",
  "government",
  "partner",
  "civilSociety",
  "community",
  "other",
] as const;

const LANGUAGES = ["fr", "en", "pt", "es"] as const;

const LANGUAGE_LABELS: Record<(typeof LANGUAGES)[number], string> = {
  fr: "Français",
  en: "English",
  pt: "Português",
  es: "Español",
};

export function RegisterForm() {
  const t = useTranslations("register");
  const locale = useLocale();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(form: FormData): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!form.get("firstName")) errors.firstName = t("required");
    if (!form.get("lastName")) errors.lastName = t("required");
    const email = form.get("email") as string;
    if (!email) {
      errors.email = t("required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t("invalidEmail");
    }
    if (!form.get("category")) errors.category = t("required");
    if (!form.get("gdprConsent")) errors.gdprConsent = t("consentRequired");
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
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone") || null,
        organisation: formData.get("organisation") || null,
        role: formData.get("role") || null,
        category: formData.get("category"),
        language_pref: formData.get("languagePref") || "fr",
        gdpr_consent: true,
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
    "w-full rounded border border-mid-grey bg-white px-4 py-2 font-body text-near-black focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange";
  const labelClass = "block font-body text-sm font-semibold text-near-black mb-1";
  const errorClass = "text-crimson text-sm mt-1 font-body";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-light-beige rounded-lg p-6 md:p-10 shadow-sm"
    >
      {error && (
        <div
          className="mb-6 rounded border border-crimson bg-crimson/10 p-4 text-crimson font-body text-sm"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
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
            className={inputClass}
          />
          {fieldErrors.email && (
            <p id="email-error" className={errorClass} role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phone")}
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>

        {/* Organisation */}
        <div>
          <label htmlFor="organisation" className={labelClass}>
            {t("organisation")}
          </label>
          <input id="organisation" name="organisation" type="text" className={inputClass} />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className={labelClass}>
            {t("role")}
          </label>
          <input id="role" name="role" type="text" className={inputClass} />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className={labelClass}>
            {t("category")} *
          </label>
          <select
            id="category"
            name="category"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.category}
            aria-describedby={fieldErrors.category ? "category-error" : undefined}
            className={inputClass}
          >
            <option value="" disabled>
              {t("categoryOptions.placeholder")}
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {t(`categoryOptions.${cat}`)}
              </option>
            ))}
          </select>
          {fieldErrors.category && (
            <p id="category-error" className={errorClass} role="alert">
              {fieldErrors.category}
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

        {/* GDPR consent */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              name="gdprConsent"
              value="true"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.gdprConsent}
              aria-describedby={fieldErrors.gdprConsent ? "gdprConsent-error" : undefined}
              className="h-5 w-5 rounded border-mid-grey text-orange focus:ring-2 focus:ring-orange"
            />
            <span className="font-body text-sm text-near-black">{t("gdprConsent")} *</span>
          </label>
          {fieldErrors.gdprConsent && (
            <p id="gdprConsent-error" className={errorClass} role="alert">
              {fieldErrors.gdprConsent}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full font-heading font-semibold text-lg text-white bg-orange hover:bg-orange/90 disabled:opacity-60 px-8 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
      >
        {submitting ? "..." : t("submit")}
      </button>
    </form>
  );
}
