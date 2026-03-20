"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Button } from "@/components/ui/Button";

const HERO_LOGOS: Record<string, string> = {
  fr: "/images/fr/campaign-logo-full.svg",
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
      style={{
        background:
          "linear-gradient(135deg, #FBF0E6 0%, #F5E6D3 50%, #FBF0E6 100%)",
      }}
    >
      {/* Geometric triangle stripe on far-left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-3 md:w-4"
        aria-hidden="true"
      >
        <div className="h-1/4 bg-orange" />
        <div className="h-1/4 bg-crimson" />
        <div className="h-1/4 bg-brown" />
        <div className="h-1/4 bg-green" />
      </div>

      {/* Content — two-column layout */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 py-20 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left column — campaign logo */}
          <motion.div
            className="flex justify-center md:justify-start md:w-2/5 shrink-0"
            {...logoAnim}
          >
            <Image
              src={heroLogo}
              alt="OAFLAD #BuildingResilience"
              width={480}
              height={240}
              className="h-auto w-[300px] md:w-[400px] lg:w-[480px]"
              priority
            />
          </motion.div>

          {/* Right column — text + CTAs */}
          <div className="text-center md:text-left md:w-2/3">
            <motion.h1
              className="font-heading text-5xl md:text-7xl font-extrabold text-crimson leading-tight"
              {...fadeUp(0.6)}
            >
              {t("title")}
            </motion.h1>

            <motion.p
              className="mt-4 font-heading text-2xl md:text-3xl font-bold text-orange"
              {...fadeUp(0.8)}
            >
              {t("hashtag")}
            </motion.p>

            <motion.p
              className="mt-4 font-body text-lg md:text-xl text-brown/90"
              {...fadeUp(1.0)}
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
              {...fadeUp(1.2)}
            >
              <Button href={`/${locale}/register`} variant="primary">
                {t("register")}
              </Button>
              <Button href={`/${locale}/programme`} variant="secondary-dark">
                {t("programme")}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
