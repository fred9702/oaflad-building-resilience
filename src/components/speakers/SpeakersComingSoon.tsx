"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SpeakersComingSoon() {
  const t = useTranslations("speakers");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-brown) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/10 px-4 py-1.5 rounded-full mb-8">
            {t("comingSoonBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-crimson">
            {t("comingSoonTitle")}
          </h2>
          <p className="mt-6 font-body text-lg text-near-black/70 max-w-xl mx-auto">
            {t("content")}
          </p>
          <div
            className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-orange to-crimson rounded-full"
            aria-hidden="true"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
