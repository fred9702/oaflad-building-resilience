"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(to right, #E07B39, rgba(155,28,55,0.8), #E07B39)",
        backgroundSize: "200% 100%",
        animation: "gradient-shift 8s ease infinite",
      }}
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

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
            {t("headline")}
          </h2>
          <p className="mt-3 font-body text-lg text-white/80">
            {t("date")}
          </p>
          <div className="mt-8">
            <Button href={`/${locale}/register`} variant="secondary">
              {t("button")}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
