"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { CaretDown } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const SEQ1_KEYS = [
  "registration",
  "opening",
  "launch",
  "president",
  "oaflad",
  "firstLadies",
  "doctorate",
  "poem",
  "exhibition",
  "lunch",
] as const;

/** Keys that should link to the About page */
const LINK_KEYS = new Set(["launch"]);

const SEQ2_KEYS = [
  "capsules",
  "minister",
  "panel1",
  "panel2",
  "closing",
] as const;

const SEQ1_COLORS = [
  "bg-orange", "bg-crimson", "bg-crimson", "bg-orange",
  "bg-orange", "bg-crimson", "bg-crimson", "bg-orange",
  "bg-green", "bg-orange", "bg-crimson",
] as const;

const SEQ2_COLORS = [
  "bg-orange", "bg-crimson", "bg-green",
  "bg-orange", "bg-green",
] as const;

const ACCENT_STYLES = {
  crimson: {
    badge: "text-crimson bg-crimson/10",
    line: "from-crimson/40 to-crimson/10",
  },
  orange: {
    badge: "text-orange bg-orange/10",
    line: "from-orange/40 to-orange/10",
  },
} as const;

function TimelineItem({
  seqKey,
  itemKey,
  dotColor,
  locale,
  t,
  isLink,
}: {
  seqKey: "seq1" | "seq2";
  itemKey: string;
  dotColor: string;
  locale: string;
  t: ReturnType<typeof useTranslations>;
  isLink: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const title = t(`${seqKey}.${itemKey}.title`);
  const description = t(`${seqKey}.${itemKey}.description`);
  const time = t(`${seqKey}.${itemKey}.time`);

  return (
    <div className="relative flex items-start gap-6 md:gap-8">
      <div className="relative z-10 flex items-center justify-center shrink-0">
        <div className={`w-12 md:w-16 h-12 md:h-16 rounded-full ${dotColor} flex items-center justify-center shadow-md`}>
          <span className="font-heading text-xs md:text-sm font-bold text-white">
            {time}
          </span>
        </div>
      </div>

      <div className="flex-1">
        {isLink ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left bg-warm-cream/60 border border-brown/10 rounded-xl px-5 py-4 md:px-6 md:py-5 hover:border-crimson/30 hover:bg-crimson/5 transition-colors group focus:outline-none focus:ring-2 focus:ring-orange"
            aria-expanded={expanded}
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-heading text-base md:text-lg font-bold text-near-black group-hover:text-crimson transition-colors">
                {title}
              </h4>
              <CaretDown
                size={16}
                className={`shrink-0 text-near-black/40 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
            </div>
            {!expanded && (
              <p className="mt-1 font-body text-sm text-near-black/60">{description}</p>
            )}
            {expanded && (
              <div className="mt-3 space-y-2">
                <p className="font-body text-sm text-near-black/60">{description}</p>
                <Link
                  href={`/${locale}/about`}
                  className="inline-block font-heading text-sm font-semibold text-crimson hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {locale === "fr" ? "En savoir plus →" : "Learn more →"}
                </Link>
              </div>
            )}
          </button>
        ) : (
          <div className="bg-warm-cream/60 border border-brown/10 rounded-xl px-5 py-4 md:px-6 md:py-5">
            <h4 className="font-heading text-base md:text-lg font-bold text-near-black">
              {title}
            </h4>
            <p className="mt-1 font-body text-sm text-near-black/60">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineSequence({
  seqKey,
  keys,
  colors,
  accent,
  locale,
  t,
}: {
  seqKey: "seq1" | "seq2";
  keys: readonly string[];
  colors: readonly string[];
  accent: keyof typeof ACCENT_STYLES;
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="mb-20 last:mb-0">
      {/* Sequence header */}
      <div className="mb-8">
        <ScrollReveal>
          <div className="text-center">
            <span className={`inline-block font-heading text-sm font-semibold uppercase tracking-widest ${ACCENT_STYLES[accent].badge} px-4 py-1.5 rounded-full mb-4`}>
              {t(`${seqKey}Badge`)}
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-near-black">
              {t(`${seqKey}Title`)}
            </h3>
            <p className="mt-2 font-body text-sm text-near-black/60 italic">
              {t(`${seqKey}Subtitle`)}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="relative">
        <div
          className={`absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b ${ACCENT_STYLES[accent].line}`}
          aria-hidden="true"
        />

        <div className="space-y-8">
          {keys.map((key, i) => {
            const dotColor = colors[i % colors.length];
            return (
              <ScrollReveal key={key} delay={i * 0.05}>
                <TimelineItem
                  seqKey={seqKey}
                  itemKey={key}
                  dotColor={dotColor}
                  locale={locale}
                  t={t}
                  isLink={LINK_KEYS.has(key)}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ProgrammeTimeline() {
  const t = useTranslations("programme");
  const locale = useLocale();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white" aria-label="Programme timeline">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <TimelineSequence
          seqKey="seq1"
          keys={SEQ1_KEYS}
          colors={SEQ1_COLORS}
          accent="crimson"
          locale={locale}
          t={t}
        />
        <TimelineSequence
          seqKey="seq2"
          keys={SEQ2_KEYS}
          colors={SEQ2_COLORS}
          accent="orange"
          locale={locale}
          t={t}
        />
      </div>
    </section>
  );
}
