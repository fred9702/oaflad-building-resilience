"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function CTABanner() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="bg-orange py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
          {t("headline")}
        </h2>
        <Link
          href={`/${locale}/register`}
          className="mt-8 inline-block font-heading font-semibold text-lg text-white border-2 border-white hover:bg-white hover:text-orange px-8 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange"
        >
          {t("button")}
        </Link>
      </div>
    </section>
  );
}
