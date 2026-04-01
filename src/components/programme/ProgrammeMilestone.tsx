"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

export function ProgrammeMilestone() {
  const t = useTranslations("programme");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Full-bleed background photo */}
      <Image
        src="/images/photography/zita-podium.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,240,230,0.90) 0%, rgba(245,230,211,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/10 px-4 py-1.5 rounded-full mb-6">
            {t("milestoneBadge")}
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-crimson leading-tight">
            {t("milestoneTitle")}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 font-body text-lg text-near-black/80">
            {t("milestoneIntro")}
          </p>

          <div className="mt-8 space-y-4">
            {(["launch", "partners", "cooperation"] as const).map((key, i) => (
              <div
                key={key}
                className="flex items-center gap-4 bg-white/60 backdrop-blur-sm border border-orange/10 rounded-xl px-6 py-4"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-crimson text-white font-heading font-bold text-sm shrink-0">
                  {i + 1}
                </span>
                <span className="font-body text-near-black/85 font-medium">
                  <HighlightKeywords>{t(`milestoneItems.${key}`)}</HighlightKeywords>
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
