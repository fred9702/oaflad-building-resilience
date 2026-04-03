"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const TIMELINE_COLORS = [
  { dot: "bg-orange", line: "border-orange/30" },
  { dot: "bg-crimson", line: "border-crimson/30" },
  { dot: "bg-green", line: "border-green/30" },
  { dot: "bg-orange", line: "border-orange/30" },
  { dot: "bg-crimson", line: "border-crimson/30" },
  { dot: "bg-green", line: "border-green/30" },
  { dot: "bg-orange", line: "border-orange/30" },
  { dot: "bg-crimson", line: "border-crimson/30" },
  { dot: "bg-green", line: "border-green/30" },
] as const;

const TIMELINE_KEYS = [
  "registration",
  "opening",
  "oaflad",
  "firstLadies",
  "lunch",
  "minister",
  "panel1",
  "panel2",
  "closing",
] as const;

export function ProgrammeTimeline() {
  const t = useTranslations("programme");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-crimson bg-crimson/10 px-4 py-1.5 rounded-full mb-6">
              {t("timelineBadge")}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-crimson">
              {t("timelineTitle")}
            </h2>
          </div>
        </ScrollReveal>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange via-crimson to-green"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {TIMELINE_KEYS.map((key, i) => {
              const color = TIMELINE_COLORS[i % TIMELINE_COLORS.length];
              return (
                <ScrollReveal key={key} delay={i * 0.05}>
                  <div className="relative flex items-start gap-6 md:gap-8">
                    {/* Dot */}
                    <div className="relative z-10 flex items-center justify-center shrink-0">
                      <div className={`w-12 md:w-16 h-12 md:h-16 rounded-full ${color.dot} flex items-center justify-center shadow-md`}>
                        <span className="font-heading text-xs md:text-sm font-bold text-white">
                          {t(`timeline.${key}.time`)}
                        </span>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="flex-1 bg-warm-cream/60 border border-brown/10 rounded-xl px-5 py-4 md:px-6 md:py-5">
                      <h3 className="font-heading text-base md:text-lg font-bold text-near-black">
                        {t(`timeline.${key}.title`)}
                      </h3>
                      <p className="mt-1 font-body text-sm text-near-black/60">
                        {t(`timeline.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
