"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhotoBackground } from "@/components/ui/PhotoBackground";

export function AboutZonBrief() {
  const t = useTranslations("about");

  return (
    <PhotoBackground
      src="/images/photography/zita-community.jpg"
      alt=""
      overlayColor="bg-crimson"
      overlayOpacity="opacity-75"
    >
      <section className="py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-white/80 bg-white/15 px-4 py-1.5 rounded-full mb-6">
            {t("zonBadge")}
          </span>
          <blockquote>
            <p className="font-body text-xl md:text-2xl text-white/90 leading-relaxed italic max-w-3xl mx-auto">
              &ldquo;{t("zonQuote")}&rdquo;
            </p>
            <footer className="mt-4 font-heading text-lg font-bold text-white">
              — {t("zonAuthor")}
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
      </section>
    </PhotoBackground>
  );
}
