"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden bg-crimson"
    >
      {/* Geometric overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='32' viewBox='0 0 40 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='20,0 40,32 0,32' fill='white'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "40px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
            {t("headline")}
          </h2>

          {/* Key stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
            {(["stat1", "stat2", "stat3"] as const).map((key) => (
              <div
                key={key}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 min-w-[120px]"
              >
                <span className="block font-heading text-2xl md:text-3xl font-extrabold text-white">
                  {t(`${key}.value`)}
                </span>
                <span className="block font-body text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">
                  {t(`${key}.label`)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`/${locale}/about`} variant="primary">
              {t("learnMoreButton")}
            </Button>
            <Button href={`/${locale}/programme`} variant="secondary">
              {t("programmeButton")}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
