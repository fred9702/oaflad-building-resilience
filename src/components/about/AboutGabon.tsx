"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

export function AboutGabon() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-brown) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-green bg-green/10 px-4 py-1.5 rounded-full mb-6">
            {t("gabonBadge")}
          </span>
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

        {/* Conviction */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 border-l-4 border-green bg-green/5 rounded-r-xl px-6 py-5">
            <p className="font-body text-near-black/70 mb-1">{t("gabonConviction")}</p>
            <p className="font-heading text-lg font-bold text-green">
              {t("gabonConvictionText")}
            </p>
            <p className="mt-2 font-body text-near-black/70">
              {t("gabonBuilt")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="mt-8 font-body text-near-black/80">
            <HighlightKeywords>{t("gabonProgramme")}</HighlightKeywords>
          </p>
        </ScrollReveal>

        {/* Commitments */}
        <ScrollReveal delay={0.3}>
          <div className="mt-6">
            <p className="font-body text-near-black/70 mb-4">{t("gabonCommitmentIntro")}</p>
            <div className="flex flex-col gap-3">
              {(["national", "root", "social"] as const).map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-green shrink-0" />
                  <span className="font-body text-near-black/75">
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
            <p className="font-body text-near-black/70 mb-3">{t("gabonPosition")}</p>
            <div className="space-y-2">
              <p className="font-heading text-base font-semibold text-near-black/85">
                {t("gabonHealth")}
              </p>
              <p className="font-heading text-base font-semibold text-green">
                {t("gabonStability")}
              </p>
              <p className="font-heading text-base font-semibold text-green">
                {t("gabonLever")}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-10">
            <Button href={`/${locale}/cap-241`} variant="primary">
              {t("zonCta")}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
