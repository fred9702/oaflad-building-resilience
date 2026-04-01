"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function SpeakersClosing() {
  const t = useTranslations("speakers");
  const locale = useLocale();

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-crimson">
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
          <p className="font-heading text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8">
            {t("partnersClosingText")}
          </p>
          <Button href={`/${locale}/partners`} variant="primary">
            {t("partnersCta")}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
