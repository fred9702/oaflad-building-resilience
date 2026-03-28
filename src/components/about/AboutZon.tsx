"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutZon() {
  const t = useTranslations("about");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-crimson">
      {/* Geometric overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='32' viewBox='0 0 40 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='20,0 40,32 0,32' fill='white'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "40px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-white/80 bg-white/15 px-4 py-1.5 rounded-full mb-8">
            {t("zonBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-10">
            {t("zonTitle")}
          </h2>
        </ScrollReveal>

        {/* Quote blocks */}
        <div className="space-y-8">
          <ScrollReveal delay={0.1}>
            <blockquote className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange rounded-full" />
              <p className="pl-6 font-body text-lg text-white/90 leading-relaxed italic">
                {t("zonQuote")}
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <blockquote className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange rounded-full" />
              <p className="pl-6 font-body text-lg text-white/90 leading-relaxed italic">
                {t("zonQuote2")}
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <blockquote className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange rounded-full" />
              <p className="pl-6 font-body text-lg text-white/90 leading-relaxed italic">
                {t("zonQuote3")}
              </p>
            </blockquote>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
