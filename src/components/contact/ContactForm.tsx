"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Envelope, Phone, MapPin } from "@phosphor-icons/react";

const INQUIRY_TYPES = [
  "general",
  "partnership",
  "press",
  "registration",
  "other",
] as const;

export function ContactForm() {
  const t = useTranslations("contact");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(form: FormData): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!form.get("name")) errors.name = t("required");
    const email = form.get("email") as string;
    if (!email) {
      errors.email = t("required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t("invalidEmail");
    }
    if (!form.get("subject")) errors.subject = t("required");
    if (!form.get("message")) errors.message = t("required");
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          organisation: formData.get("organisation") || null,
          inquiry_type: formData.get("inquiryType") || "general",
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) {
        setError(t("errorGeneric"));
        return;
      }

      setSubmitted(true);
    } catch {
      setError(t("errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded border border-mid-grey bg-white px-4 py-2 font-body text-near-black focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange";
  const labelClass =
    "block font-body text-sm font-semibold text-near-black mb-1";
  const errorClass = "text-crimson text-sm mt-1 font-body";

  if (submitted) {
    return (
      <section className="relative py-20 md:py-28 overflow-hidden bg-white">
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-green bg-green/10 px-4 py-1.5 rounded-full mb-6">
            {t("successBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-near-black">
            {t("successTitle")}
          </h2>
          <p className="mt-4 font-body text-lg text-near-black/70">
            {t("successMessage")}
          </p>
          <div
            className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-orange to-crimson rounded-full"
            aria-hidden="true"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-brown) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Contact info sidebar */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center">
                  <Envelope size={20} className="text-orange" weight="bold" />
                </div>
                <h3 className="font-heading text-base font-bold text-near-black">
                  {t("infoEmailTitle")}
                </h3>
              </div>
              <p className="font-body text-sm text-near-black/70 pl-[52px]">
                contact@resilience241.com
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center">
                  <Phone size={20} className="text-crimson" weight="bold" />
                </div>
                <h3 className="font-heading text-base font-bold text-near-black">
                  {t("infoPhoneTitle")}
                </h3>
              </div>
              <p className="font-body text-sm text-near-black/70 pl-[52px]">
                +241 77 00 00 00
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-brown/10 flex items-center justify-center">
                  <MapPin size={20} className="text-brown" weight="bold" />
                </div>
                <h3 className="font-heading text-base font-bold text-near-black">
                  {t("infoLocationTitle")}
                </h3>
              </div>
              <p className="font-body text-sm text-near-black/70 pl-[52px]">
                {t("infoLocationText")}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
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
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>
                    {t("nameLabel")} *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.name}
                    className={inputClass}
                  />
                  {fieldErrors.name && (
                    <p className={errorClass} role="alert">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    {t("emailLabel")} *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.email}
                    className={inputClass}
                  />
                  {fieldErrors.email && (
                    <p className={errorClass} role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Organisation */}
                <div>
                  <label htmlFor="organisation" className={labelClass}>
                    {t("organisationLabel")}
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    className={inputClass}
                  />
                </div>

                {/* Inquiry type */}
                <div>
                  <label htmlFor="inquiryType" className={labelClass}>
                    {t("inquiryTypeLabel")}
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    defaultValue="general"
                    className={inputClass}
                  >
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {t(`inquiryTypes.${type}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="md:col-span-2">
                  <label htmlFor="subject" className={labelClass}>
                    {t("subjectLabel")} *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.subject}
                    className={inputClass}
                  />
                  {fieldErrors.subject && (
                    <p className={errorClass} role="alert">
                      {fieldErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    {t("messageLabel")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.message}
                    className={inputClass}
                  />
                  {fieldErrors.message && (
                    <p className={errorClass} role="alert">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full font-heading font-semibold text-lg text-white bg-orange hover:bg-orange/90 disabled:opacity-60 px-8 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
              >
                {submitting ? "..." : t("submitButton")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
