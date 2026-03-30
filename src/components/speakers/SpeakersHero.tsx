"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

export function SpeakersHero() {
  const t = useTranslations("speakers");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-warm-cream) 0%, var(--color-light-beige) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Vertical accent stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 md:w-3"
        aria-hidden="true"
      >
        <div className="h-1/3 bg-crimson" />
        <div className="h-1/3 bg-orange" />
        <div className="h-1/3 bg-brown" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/10 px-4 py-1.5 rounded-full mb-6">
            {t("badge")}
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-crimson leading-tight max-w-4xl">
            {t("title")}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 font-body text-lg md:text-xl text-near-black/80 max-w-3xl leading-relaxed">
            <HighlightKeywords>{t("intro")}</HighlightKeywords>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
