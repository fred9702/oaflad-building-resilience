"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function HomeFinalCta() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section
      className="bg-warm-cream py-12 md:py-20"
      aria-label="Call to action"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <ScrollReveal>
          {/* Gradient divider */}
          <div
            className="mx-auto h-[3px] w-16 rounded-full mb-8"
            style={{ background: "linear-gradient(to right, #E07B39, #9B1C37)" }}
            aria-hidden="true"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={`/${locale}/about`} variant="primary">
              {t("learnMoreButton")}
            </Button>
            <Button href={`/${locale}/programme`} variant="secondary-dark">
              {t("programmeButton")}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
