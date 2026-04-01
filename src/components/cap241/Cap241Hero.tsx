"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

export function Cap241Hero() {
  const t = useTranslations("cap241");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Diagonal background split */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-warm-cream) 0%, var(--color-light-beige) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Geometric accent — vertical stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 md:w-3"
        aria-hidden="true"
      >
        <div className="h-1/4 bg-orange" />
        <div className="h-1/4 bg-crimson" />
        <div className="h-1/4 bg-green" />
        <div className="h-1/4 bg-brown" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/10 px-4 py-1.5 rounded-full self-start">
              {t("badge")}
            </span>
            <Image
              src="/images/cap241/cap-241.png"
              alt="CAP 241"
              width={200}
              height={80}
              className="h-16 md:h-20 w-auto"
              priority
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-crimson leading-tight max-w-3xl">
            <HighlightKeywords>{t("heroTitle")}</HighlightKeywords>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 font-body text-lg md:text-xl text-near-black/80 max-w-2xl">
            {t.rich("heroIntro", {
              link: (chunks) => (
                <a
                  href="https://mabanniere.ga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crimson underline underline-offset-2 hover:text-orange transition-colors"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-4">
            {(["social", "national", "international"] as const).map((key, i) => (
              <div
                key={key}
                className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-orange/15 rounded-xl px-5 py-3"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-crimson/10 text-crimson font-heading font-bold text-sm">
                  {i + 1}
                </span>
                <span className="font-body text-near-black/90 font-medium">
                  {t(`heroLinks.${key}`)}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
