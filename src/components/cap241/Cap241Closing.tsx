"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function Cap241Closing() {
  const t = useTranslations("about");
  const tCta = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-brown">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div
            className="mx-auto w-16 h-1 bg-gradient-to-r from-orange to-crimson rounded-full mb-8"
            aria-hidden="true"
          />
          <p className="font-heading text-2xl md:text-3xl font-bold text-white leading-relaxed italic">
            {t("closingQuote")}
          </p>
          <div className="mt-8">
            <Button href={`/${locale}/programme`} variant="primary">
              {tCta("programmeButton")}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
