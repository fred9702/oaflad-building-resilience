"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutZonBrief() {
  const t = useTranslations("about");

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-crimson">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='32' viewBox='0 0 40 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='20,0 40,32 0,32' fill='white'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "40px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-white/80 bg-white/15 px-4 py-1.5 rounded-full mb-6">
            {t("zonBadge")}
          </span>
          <blockquote>
            <p className="font-body text-xl md:text-2xl text-white/90 leading-relaxed italic max-w-3xl mx-auto">
              &ldquo;{t("zonQuote")}&rdquo;
            </p>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}
