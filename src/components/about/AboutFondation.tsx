"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutFondation() {
  const t = useTranslations("about");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-warm-cream) 0%, #fff 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-brown bg-brown/10 px-4 py-1.5 rounded-full mb-6">
            {t("fondationBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-crimson">
            {t("fondationTitle")}
          </h2>
          <p className="mt-2 font-heading text-lg md:text-xl font-semibold text-orange">
            {t("fondationSubtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 max-w-3xl">
            <p className="font-body text-near-black/70 mb-2">{t("fondationIntro")}</p>
            <p className="font-body text-lg text-near-black/80 leading-relaxed">
              {t("fondationVision")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 font-body text-near-black/80 leading-relaxed max-w-3xl">
            {t("fondationCatalyst")}
          </p>
          <p className="mt-4 font-body text-near-black/70 max-w-3xl">
            {t("fondationOaflad")}
          </p>
        </ScrollReveal>

        {/* Principles */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10">
            <p className="font-body text-near-black/70 mb-4">{t("fondationPrinciplesIntro")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["sustainable", "resilience", "partnerships"] as const).map((key, i) => (
                <div
                  key={key}
                  className="bg-brown/5 border border-brown/10 rounded-xl p-5 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-brown/10 flex items-center justify-center mx-auto mb-3">
                    <span className="font-heading font-bold text-brown text-sm">{i + 1}</span>
                  </div>
                  <p className="font-body text-sm text-near-black/75 font-medium">
                    {t(`fondationPrinciples.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Key message */}
        <ScrollReveal delay={0.35}>
          <div className="mt-10 border-l-4 border-brown bg-brown/5 rounded-r-xl px-6 py-5">
            <p className="font-heading text-lg font-bold text-brown">
              {t("fondationKeyMessage")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
