"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

export function AboutGabon() {
  const t = useTranslations("about");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      {/* Triangle pattern instead of dot-grid for visual variety */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='48' viewBox='0 0 60 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,0 60,48 0,48' fill='%232D7B3F'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "60px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <SectionBadge color="green" variant="underline">
            {t("gabonBadge")}
          </SectionBadge>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-crimson">
            {t("gabonTitle")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 font-body text-lg text-near-black/80">
            {t("gabonIntro")}
          </p>
          <p className="mt-4 font-body text-lg text-near-black/80 leading-relaxed">
            <HighlightKeywords>{t("gabonChoice")}</HighlightKeywords>
          </p>
        </ScrollReveal>

        {/* Conviction — top-border card variant (different from AboutCampaign left-border) */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 border-t-4 border-green bg-green/5 rounded-xl px-6 py-6 shadow-sm">
            <p className="font-body text-base md:text-lg text-near-black/70 mb-1">{t("gabonConviction")}</p>
            <p className="font-heading text-lg md:text-xl font-bold text-green">
              {t("gabonConvictionText")}
            </p>
            <p className="mt-2 font-body text-base md:text-lg text-near-black/70">
              {t("gabonBuilt")}
            </p>
          </div>
        </ScrollReveal>

        {/* Terrain dimension — contained in a warm card */}
        <ScrollReveal delay={0.22}>
          <div className="mt-12 bg-gradient-to-br from-orange/8 via-orange/4 to-transparent border border-orange/15 rounded-2xl p-6 md:p-10">
            <SectionBadge color="orange" variant="pill">
              {t("terrainBadge")}
            </SectionBadge>

            {/* Stat highlight + tour description */}
            <div className="mt-4 flex flex-col md:flex-row md:items-start gap-5">
              <div className="shrink-0 flex flex-row md:flex-col items-center md:items-center gap-3 md:gap-1 bg-orange/10 rounded-xl px-5 py-3 md:py-4 md:min-w-[100px]">
                <span className="font-heading text-3xl md:text-4xl font-extrabold text-orange">18</span>
                <span className="font-heading text-xs font-semibold uppercase tracking-wider text-orange/70">{t("terrainStatLabel")}</span>
              </div>
              <p className="font-body text-lg text-near-black/80 leading-relaxed">
                {t("terrainTour")}
              </p>
            </div>

            {/* Approach statement */}
            <div className="mt-6 bg-orange/10 rounded-xl px-6 py-4">
              <p className="font-heading text-base md:text-lg font-bold text-brown">
                {t("terrainApproach")}
              </p>
            </div>

            {/* Narrative + community voices */}
            <p className="mt-6 font-body text-base md:text-lg text-near-black/70 leading-relaxed">
              {t("terrainNarrative")}
            </p>

            <div className="mt-6 space-y-4">
              {(["terrainQuote1", "terrainQuote2"] as const).map((key) => (
                <div key={key} className="border-l-3 border-orange bg-white/60 rounded-r-lg px-6 py-5 md:px-8 md:py-6 shadow-sm">
                  <p className="font-body text-base md:text-lg italic text-brown leading-relaxed">
                    «&nbsp;{t(key)}&nbsp;»
                  </p>
                </div>
              ))}
            </div>

            {/* Link to 3 axes */}
            <div className="mt-6">
              <p className="font-body text-base md:text-lg text-near-black/70 mb-4">{t("terrainAxesIntro")}</p>
              <div className="flex flex-col gap-3">
                {(["prevention", "continuity", "trajectories"] as const).map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <span className="mt-2 w-2.5 h-2.5 rounded-full bg-orange shrink-0" />
                    <span className="font-heading text-base md:text-lg font-semibold text-near-black/80">
                      {t(`terrainAxes.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.27}>
          <p className="mt-8 font-body text-base md:text-lg text-near-black/80">
            <HighlightKeywords>{t("gabonProgramme")}</HighlightKeywords>
          </p>
        </ScrollReveal>

        {/* Commitments */}
        <ScrollReveal delay={0.3}>
          <div className="mt-6">
            <p className="font-body text-base md:text-lg text-near-black/70 mb-4">{t("gabonCommitmentIntro")}</p>
            <div className="flex flex-col gap-3">
              {(["national", "root", "social"] as const).map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-green shrink-0" />
                  <span className="font-body text-base md:text-lg text-near-black/75">
                    {t(`gabonCommitments.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Position statement */}
        <ScrollReveal delay={0.35}>
          <div className="mt-12 bg-gradient-to-r from-green/8 to-transparent rounded-2xl p-8">
            <p className="font-body text-base md:text-lg text-near-black/70 mb-3">{t("gabonPosition")}</p>
            <div className="space-y-2">
              <p className="font-heading text-base md:text-lg font-semibold text-near-black/85">
                {t("gabonHealth")}
              </p>
              <p className="font-heading text-base md:text-lg font-semibold text-green">
                {t("gabonStability")}
              </p>
              <p className="font-heading text-base md:text-lg font-semibold text-green">
                {t("gabonLever")}
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
