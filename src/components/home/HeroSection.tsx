"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

const HERO_LOGOS: Record<string, string> = {
  fr: "/images/fr/campaign-logo-full.svg",
  en: "/images/en/campaign-logo-full.svg",
};
const HERO_LOGO_FALLBACK = "/images/common/mark.svg";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const heroLogo = HERO_LOGOS[locale] ?? HERO_LOGO_FALLBACK;
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" } as Transition,
        };

  const logoAnim = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, ease: "easeOut" } as Transition,
      };

  return (
    <section
      className="relative min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Full-bleed background photo */}
      <Image
        src="/images/photography/hands-unity.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {/* Warm gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,240,230,0.88) 0%, rgba(245,230,211,0.82) 50%, rgba(251,240,230,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Geometric triangle stripe on far-left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-3 md:w-4 z-10"
        aria-hidden="true"
      >
        <div className="h-1/4 bg-orange" />
        <div className="h-1/4 bg-crimson" />
        <div className="h-1/4 bg-brown" />
        <div className="h-1/4 bg-green" />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 py-20 lg:px-8 text-center">
        <motion.div {...logoAnim}>
          <Image
            src={heroLogo}
            alt="OAFLAD #BuildingResilience"
            width={480}
            height={240}
            className="h-auto w-[240px] md:w-[360px] lg:w-[440px] mx-auto"
          />
        </motion.div>

        <motion.h1
          className="mt-8 font-heading text-5xl md:text-7xl font-extrabold text-crimson leading-tight"
          {...fadeUp(0.6)}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="mt-4 font-heading text-2xl md:text-3xl font-bold text-orange"
          {...fadeUp(0.8)}
        >
          <HighlightKeywords>{t("hashtag")}</HighlightKeywords>
        </motion.p>

        <motion.p
          className="mt-4 font-body text-lg md:text-xl text-brown/90"
          {...fadeUp(1.0)}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          {...fadeUp(1.2)}
        >
          <Button href={`/${locale}/register`} variant="primary">
            {t("register")}
          </Button>
          <Button href={`/${locale}/programme`} variant="secondary-dark">
            {t("programme")}
          </Button>
          <Button href={`/${locale}/cap-241`} variant="secondary-dark">
            {t("cap241")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
