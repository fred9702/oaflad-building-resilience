"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createAuthBrowserClient } from "@/lib/supabase/auth-client";

function LoginForm() {
  const t = useTranslations("login");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth" ? t("errorAuth") : null
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const supabase = createAuthBrowserClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `https://www.resilience241.com/api/auth/callback?locale=${locale}`,
      },
    });

    setSubmitting(false);

    if (authError) {
      setError(t("errorGeneric"));
      return;
    }

    setSent(true);
  }

  return (
    <>
      {error && (
        <div className="mb-6 rounded border border-crimson bg-crimson/10 p-3 text-crimson font-body text-sm" role="alert">
          {error}
        </div>
      )}

      {sent ? (
        <div className="text-center">
          <div className="mb-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto" aria-hidden="true">
              <circle cx="24" cy="24" r="22" fill="#2D7B3F" />
              <path d="M15 24L21 30L33 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-body text-base text-near-black/80">
            {t("success")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block font-body text-sm font-semibold text-near-black mb-1">
            {t("emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="w-full rounded border border-mid-grey bg-white px-4 py-2 font-body text-near-black focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange mb-6"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full font-heading font-semibold text-base text-white bg-crimson hover:bg-crimson/90 disabled:opacity-60 px-6 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2"
          >
            {submitting ? "..." : t("submit")}
          </button>
        </form>
      )}
    </>
  );
}

export default function LoginPage() {
  const t = useTranslations("login");
  const locale = useLocale();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="bg-light-beige rounded-lg p-8 md:p-10 shadow-sm">
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-crimson text-center mb-2">
            {t("title")}
          </h1>
          <p className="font-body text-sm text-near-black/60 text-center mb-8">
            {t("subtitle")}
          </p>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          <div className="mt-6 text-center">
            <Link href={`/${locale}`} className="font-body text-sm text-brown hover:text-crimson transition-colors">
              {t("backHome")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
