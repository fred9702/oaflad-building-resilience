"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";
import { Button } from "@/components/ui/Button";

export function ProgrammeCap241Cta() {
  const t = useTranslations("programme");
  const locale = useLocale();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-crimson">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='32' viewBox='0 0 40 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='20,0 40,32 0,32' fill='white'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "40px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t("speakersCtaTitle")}
          </h2>
          <p className="font-body text-lg text-white/85 max-w-2xl mx-auto mb-10">
            <HighlightKeywords>{t("speakersCtaIntro")}</HighlightKeywords>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`/${locale}/speakers`} variant="primary">
              {t("speakersCta")}
            </Button>
            <Button href={`/${locale}/register`} variant="secondary">
              {t("registerCta")}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
