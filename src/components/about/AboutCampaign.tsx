"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

export function AboutCampaign() {
  const t = useTranslations("about");

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
        <div className="h-1/4 bg-orange" />
        <div className="h-1/4 bg-crimson" />
        <div className="h-1/4 bg-brown" />
        <div className="h-1/4 bg-green" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/10 px-4 py-1.5 rounded-full mb-6">
            {t("campaignBadge")}
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-crimson leading-tight max-w-4xl">
            {t("campaignTitle")}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 font-body text-lg md:text-xl text-near-black/80 max-w-3xl leading-relaxed">
            <HighlightKeywords>{t("campaignIntro")}</HighlightKeywords>
          </p>
        </ScrollReveal>

        {/* Context items */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8">
            <p className="font-body text-near-black/70 mb-4">{t("campaignContext")}</p>
            <div className="flex flex-col gap-3 ml-1">
              {(["climate", "tensions", "health"] as const).map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-crimson shrink-0" />
                  <span className="font-body text-near-black/75">
                    {t(`campaignContextItems.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-8 font-body text-lg text-near-black/80 leading-relaxed">
            {t("campaignWomen")}
          </p>
        </ScrollReveal>

        {/* Conviction block */}
        <ScrollReveal delay={0.35}>
          <div className="mt-10 border-l-4 border-crimson bg-crimson/5 rounded-r-xl px-6 py-5">
            <p className="font-body text-near-black/70 mb-1">{t("campaignConviction")}</p>
            <p className="font-heading text-lg font-bold text-crimson">
              {t("campaignConvictionText")}
            </p>
          </div>
        </ScrollReveal>

        {/* OAFLAD goals */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10">
            <p className="font-body text-near-black/80 mb-4">{t("campaignGoalsIntro")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["systems", "women", "responses"] as const).map((key, i) => (
                <div
                  key={key}
                  className="bg-white/60 backdrop-blur-sm border border-orange/10 rounded-xl p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center mb-3">
                    <span className="font-heading font-bold text-orange text-sm">{i + 1}</span>
                  </div>
                  <p className="font-body text-sm text-near-black/75">
                    {t(`campaignGoals.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <p className="mt-10 font-body text-near-black/70 leading-relaxed max-w-3xl">
            <HighlightKeywords>{t("campaignFramework")}</HighlightKeywords>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
