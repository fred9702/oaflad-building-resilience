"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PANEL_ACCENTS = [
  { bg: "bg-crimson", light: "bg-crimson/8", text: "text-crimson" },
  { bg: "bg-orange", light: "bg-orange/8", text: "text-orange" },
  { bg: "bg-green", light: "bg-green/8", text: "text-green" },
] as const;

export function ProgrammePanels() {
  const t = useTranslations("programme");

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
          <div className="text-center mb-12">
            <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-green bg-green/10 px-4 py-1.5 rounded-full mb-6">
              {t("panelsBadge")}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-crimson">
              {t("panelsTitle")}
            </h2>
            <p className="mt-4 font-body text-near-black/70 max-w-2xl mx-auto">
              {t("panelsIntro")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {([1, 2, 3] as const).map((num, i) => {
            const accent = PANEL_ACCENTS[i];
            return (
              <ScrollReveal key={num} delay={i * 0.1}>
                <div className={`relative ${accent.light} border border-${accent.bg.replace("bg-", "")}/15 rounded-2xl p-8 h-full`}>
                  {/* Panel number bar */}
                  <div className={`${accent.bg} rounded-lg px-4 py-2 inline-block mb-5`}>
                    <span className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                      {t(`panel${num}.title`)}
                    </span>
                  </div>

                  <p className={`font-heading text-lg font-bold ${accent.text}`}>
                    {t(`panel${num}.topic`)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
