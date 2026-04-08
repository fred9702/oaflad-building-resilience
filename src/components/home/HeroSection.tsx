"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

const HERO_LOGOS: Record<string, string> = {
  fr: "/images/fr/campaign-logo-full.svg",
  en: "/images/en/campaign-logo-full.svg",
};
const HERO_LOGO_FALLBACK = "/images/common/mark.svg";

const TARGET = new Date("2026-04-17T08:00:00+01:00").getTime();

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipNumber({ value, mounted, shouldReduceMotion }: { value: number; mounted: boolean; shouldReduceMotion: boolean | null }) {
  const display = mounted ? String(value).padStart(2, "0") : "--";

  if (shouldReduceMotion) {
    return <span className="font-heading text-2xl md:text-5xl font-extrabold text-warm-cream tabular-nums">{display}</span>;
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={display}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="font-heading text-2xl md:text-5xl font-extrabold text-warm-cream tabular-nums inline-block"
      >
        {display}
      </motion.span>
    </AnimatePresence>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");
  const tCountdown = useTranslations("countdown");
  const locale = useLocale();
  const heroLogo = HERO_LOGOS[locale] ?? HERO_LOGO_FALLBACK;
  const shouldReduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getTimeLeft);
  const srRef = useRef<HTMLDivElement>(null);
  const lastAnnouncedMinute = useRef(-1);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (time.minutes !== lastAnnouncedMinute.current) {
      lastAnnouncedMinute.current = time.minutes;
      if (srRef.current) {
        srRef.current.textContent = `${time.days} ${tCountdown("days")}, ${time.hours} ${tCountdown("hours")}, ${time.minutes} ${tCountdown("minutes")}`;
      }
    }
  }, [mounted, time, tCountdown]);

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

  const boxes = [
    { value: time.days, label: tCountdown("days") },
    { value: time.hours, label: tCountdown("hours") },
    { value: time.minutes, label: tCountdown("minutes") },
    { value: time.seconds, label: tCountdown("seconds") },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
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

      {/* Content — centered */}
      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 py-20 lg:px-8 text-center">
        <motion.div {...logoAnim}>
          <Image
            src={heroLogo}
            alt={locale === "fr" ? "OPDAD #RenforcerLaRésilience" : "OAFLAD #BuildingResilience"}
            width={480}
            height={240}
            className="h-auto w-[320px] md:w-[480px] lg:w-[580px] mx-auto"
          />
        </motion.div>

        <motion.div
          className="mt-8 max-w-2xl mx-auto text-center"
          {...fadeUp(0.3)}
        >
          <p className="font-heading text-xl md:text-2xl font-semibold text-brown leading-snug tracking-tight">
            {t("tagline")}
          </p>
          <div
            className="mt-5 mx-auto h-[3px] w-24 rounded-full"
            style={{ background: "linear-gradient(to right, #E07B39, #9B1C37)" }}
            aria-hidden="true"
          />
        </motion.div>

        <motion.p
          className="mt-8 font-heading text-2xl md:text-4xl font-bold text-crimson"
          {...fadeUp(0.5)}
        >
          {t("subtitle")}
        </motion.p>

        {/* Countdown timer */}
        <motion.div
          className="mt-10"
          {...fadeUp(0.7)}
        >
          <div ref={srRef} className="sr-only" aria-live="polite" role="status" />
          <p className="text-sm uppercase tracking-widest text-brown/60 mb-4 font-heading">
            {tCountdown("label")}
          </p>
          <div className="flex items-center justify-center gap-1.5 md:gap-5">
            {boxes.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-1.5 md:gap-5">
                <div
                  className="bg-brown/80 backdrop-blur-sm border border-brown/20 rounded-lg md:rounded-xl px-2.5 py-2 md:px-5 md:py-4 flex flex-col items-center min-w-[60px] md:min-w-0"
                  aria-hidden="true"
                >
                  <FlipNumber value={value} mounted={mounted} shouldReduceMotion={shouldReduceMotion} />
                  <span className="mt-1 font-body text-[10px] md:text-xs text-warm-cream/80 uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                {i < boxes.length - 1 && (
                  <span className="text-brown/40 font-heading text-lg md:text-2xl font-bold" aria-hidden="true">:</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
