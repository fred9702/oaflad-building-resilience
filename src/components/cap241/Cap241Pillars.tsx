"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PILLAR_COLORS = [
  { bg: "bg-crimson/8", border: "border-crimson/20", accent: "text-crimson", dot: "bg-crimson" },
  { bg: "bg-orange/8", border: "border-orange/20", accent: "text-orange", dot: "bg-orange" },
  { bg: "bg-green/8", border: "border-green/20", accent: "text-green", dot: "bg-green" },
  { bg: "bg-navy/8", border: "border-navy/20", accent: "text-navy", dot: "bg-navy" },
] as const;

const PILLAR_KEYS = ["pillar1", "pillar2", "pillar3", "pillar4"] as const;

const PILLAR_LOGOS = [
  "/images/cap241/cap-sante.png",
  "/images/cap241/cap-femmes.png",
  "/images/cap241/cap-jeunesse.png",
  "/images/cap241/cap-education.png",
] as const;

export function Cap241Pillars() {
  const t = useTranslations("cap241");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-green bg-green/10 px-4 py-1.5 rounded-full mb-6">
              {t("pillarsBadge")}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-crimson">
              {t("pillarsTitle")}
            </h2>
          </div>
        </ScrollReveal>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PILLAR_KEYS.map((key, i) => {
            const color = PILLAR_COLORS[i];
            return (
              <ScrollReveal key={key} delay={i * 0.1}>
                <div
                  className={`relative ${color.bg} border ${color.border} rounded-2xl p-8 h-full transition-transform hover:scale-[1.01]`}
                >
                  {/* Pillar logo + name */}
                  <div className="flex items-center gap-4 mb-5">
                    <Image
                      src={PILLAR_LOGOS[i]}
                      alt={t(`${key}.name`)}
                      width={56}
                      height={56}
                      className="h-12 w-auto shrink-0"
                    />
                    <div>
                      <h3 className={`font-heading text-xl font-bold ${color.accent}`}>
                        {t(`${key}.name`)}
                      </h3>
                      <p className="font-heading text-sm font-semibold uppercase tracking-wider text-near-black/40">
                        {t(`${key}.programme`)}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-base md:text-lg text-near-black/75 leading-relaxed">
                    {t(`${key}.description`)}
                  </p>

                  {/* Items list for pillar 1 (CAP Health has detailed items) */}
                  {key === "pillar1" && (
                    <ul className="mt-5 space-y-2">
                      {(["care", "mental", "social", "family"] as const).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${color.dot} shrink-0`} />
                          <span className="font-body text-base text-near-black/70">
                            {t(`${key}.items.${item}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Interdependence section */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 bg-gradient-to-r from-crimson to-brown rounded-2xl p-8 md:p-12 text-white">
            <h3 className="font-heading text-xl md:text-2xl font-bold mb-6">
              {t("pillarsIntro")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["health", "family", "prevention", "skills"] as const).map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange shrink-0" />
                  <span className="font-body text-base md:text-lg text-white/90">
                    {t(`pillarsInterdependence.${key}`)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 font-body text-white/80 text-base border-t border-white/20 pt-6">
              {t("pillarsArchitecture")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
