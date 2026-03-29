"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

export function Cap241Equilibrium() {
  const t = useTranslations("cap241");

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
        {/* EQUILIBRIUM Programme */}
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-crimson bg-crimson/10 px-4 py-1.5 rounded-full mb-6">
            {t("equilibriumBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-crimson">
            <HighlightKeywords>{t("equilibriumTitle")}</HighlightKeywords>
          </h2>
          <p className="mt-2 font-heading text-lg md:text-xl font-semibold text-orange">
            {t("equilibriumSubtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 font-body text-lg text-near-black/80 max-w-3xl">
            <HighlightKeywords>{t("equilibriumIntro")}</HighlightKeywords>
          </p>
        </ScrollReveal>

        {/* Three action pillars */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["prevent", "support", "rebuild"] as const).map((key, i) => (
              <div
                key={key}
                className="relative bg-white border border-crimson/10 rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-crimson text-lg">
                    {i + 1}
                  </span>
                </div>
                <p className="font-heading text-base font-bold text-near-black">
                  {t(`equilibriumActions.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-10 font-body text-near-black/70 italic max-w-3xl">
            {t("equilibriumAmbition")}
          </p>
        </ScrollReveal>

        {/* Fragile Trajectories */}
        <div className="mt-20 border-t border-brown/10 pt-16">
          <ScrollReveal>
            <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-brown bg-brown/10 px-4 py-1.5 rounded-full mb-6">
              {t("trajectoriesBadge")}
            </span>
            <h3 className="font-heading text-2xl md:text-4xl font-extrabold text-crimson">
              {t("trajectoriesTitle")}
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-4 font-body text-near-black/80">
              {t("trajectoriesIntro")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {(["psychosocial", "family", "paths"] as const).map((key) => (
                <span
                  key={key}
                  className="font-body text-sm bg-crimson/8 text-crimson px-4 py-2 rounded-full border border-crimson/15"
                >
                  {t(`trajectoriesIssues.${key}`)}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 font-body text-near-black/80">
              <HighlightKeywords>{t("trajectoriesResponse")}</HighlightKeywords>
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["recognising", "preventing", "supporting"] as const).map((key) => (
                <span
                  key={key}
                  className="font-body text-sm bg-green/8 text-green px-4 py-2 rounded-full border border-green/15 font-medium"
                >
                  {t(`trajectoriesActions.${key}`)}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
