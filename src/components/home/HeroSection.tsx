"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Button } from "@/components/ui/Button";

const HERO_LOGOS: Record<string, string> = {
  fr: "/images/fr/campaign-logo.svg",
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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1F4E79 0%, rgba(31,78,121,0.9) 30%, rgba(107,52,23,0.7) 60%, rgba(155,28,55,0.2) 80%, #1F4E79 100%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 20s ease infinite",
        }}
        aria-hidden="true"
      />
      {/* Navy overlay */}
      <div className="absolute inset-0 bg-navy/50" aria-hidden="true" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Geometric African motif overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='40,0 80,40 40,80 0,40' fill='none' stroke='white' stroke-width='0.5'/%3E%3Cpolygon points='40,10 70,40 40,70 10,40' fill='none' stroke='white' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          animation: "float-pattern 12s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Top decorative strip */}
      <div
        className="absolute top-0 left-0 right-0 h-8 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='32' viewBox='0 0 40 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='20,0 40,32 0,32' fill='white'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "40px 32px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
        {/* Campaign logo */}
        <motion.div className="mb-8 flex justify-center" {...logoAnim}>
          <Image
            src={heroLogo}
            alt="OAFLAD #BuildingResilience"
            width={280}
            height={140}
            className="h-auto w-[280px] md:w-[360px] drop-shadow-lg"
            priority
          />
        </motion.div>

        <motion.h1
          className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-tight"
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
          className="mt-4 font-body text-lg md:text-xl text-white/90"
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
          <Button href={`/${locale}/programme`} variant="secondary">
            {t("programme")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
