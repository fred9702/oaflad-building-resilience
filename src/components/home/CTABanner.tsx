"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { PhotoBackground } from "@/components/ui/PhotoBackground";

export function CTABanner() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <PhotoBackground
      src="/images/photography/first-ladies-group.jpg"
      alt=""
      overlayColor="bg-crimson"
      overlayOpacity="opacity-80"
    >
      <section className="py-12 md:py-16 overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
            {t("headline")}
          </h2>
          <p className="mt-3 font-body text-lg text-white/80">
            {t("date")}
          </p>

          {/* Key stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
            {(["stat1", "stat2", "stat3"] as const).map((key) => (
              <div
                key={key}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 min-w-[120px]"
              >
                <span className="block font-heading text-2xl md:text-3xl font-extrabold text-orange">
                  {t(`${key}.value`)}
                </span>
                <span className="block font-body text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">
                  {t(`${key}.label`)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`/${locale}/register`} variant="primary">
              {t("button")}
            </Button>
            <Button href={`/${locale}/programme`} variant="secondary">
              {t("programmeButton")}
            </Button>
          </div>
        </ScrollReveal>
      </div>
      </section>
    </PhotoBackground>
  );
}
