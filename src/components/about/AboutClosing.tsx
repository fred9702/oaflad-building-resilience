"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutClosing() {
  const t = useTranslations("about");

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-brown">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div
            className="mx-auto w-16 h-1 bg-gradient-to-r from-orange to-crimson rounded-full mb-8"
            aria-hidden="true"
          />
          <p className="font-heading text-2xl md:text-3xl font-bold text-white leading-relaxed italic">
            {t("closingQuote")}
          </p>
          <div
            className="mx-auto w-16 h-1 bg-gradient-to-r from-orange to-crimson rounded-full mt-8"
            aria-hidden="true"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
