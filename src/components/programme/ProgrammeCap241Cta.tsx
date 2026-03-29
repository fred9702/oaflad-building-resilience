"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-white/80 bg-white/15 px-4 py-1.5 rounded-full mb-6">
            {t("cap241Badge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t("cap241Title")}
          </h2>
          <p className="font-body text-lg text-white/85 max-w-2xl mx-auto mb-10">
            {t("cap241Intro")}
          </p>
          <Button href={`/${locale}/cap-241`} variant="secondary">
            {t("cap241Cta")}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
