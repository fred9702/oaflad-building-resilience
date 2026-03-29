"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const INFO_ITEMS = [
  {
    labelKey: "talkLocationLabel",
    valueKeys: ["talkLocation"],
    subtitleKey: "talkRoom",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    labelKey: "talkTimeLabel",
    valueKeys: ["talkWelcome", "talkStart"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
] as const;

export function ProgrammeTalk() {
  const t = useTranslations("programme");

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

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-brown) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/10 px-4 py-1.5 rounded-full mb-6">
            {t("talkBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-crimson leading-tight">
            {t("talkTitle")}
          </h2>
          <p className="mt-4 font-body text-lg text-near-black/80 max-w-3xl">
            {t("talkDescription")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {INFO_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white/70 backdrop-blur-sm border border-orange/10 rounded-xl px-6 py-5"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-crimson/10 text-crimson shrink-0 mt-0.5">
                  {item.icon}
                </span>
                <div>
                  <span className="font-heading text-xs font-semibold uppercase tracking-wider text-near-black/50">
                    {t(item.labelKey)}
                  </span>
                  <div className="mt-1 font-body text-near-black/85 font-medium">
                    {item.valueKeys.map((key, j) => (
                      <span key={key}>
                        {j > 0 && <span className="mx-1.5 text-near-black/30">·</span>}
                        {t(key)}
                      </span>
                    ))}
                  </div>
                  {"subtitleKey" in item && item.subtitleKey && (
                    <p className="text-sm text-near-black/50 mt-0.5 italic">
                      {t(item.subtitleKey)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
