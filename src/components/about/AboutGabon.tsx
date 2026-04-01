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

        <ScrollReveal delay={0.25}>
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
