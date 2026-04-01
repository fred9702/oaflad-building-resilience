"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
    return <span className="font-heading text-4xl md:text-6xl font-extrabold text-warm-cream tabular-nums">{display}</span>;
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={display}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="font-heading text-4xl md:text-6xl font-extrabold text-warm-cream tabular-nums inline-block"
      >
        {display}
      </motion.span>
    </AnimatePresence>
  );
}

export function Countdown() {
  const t = useTranslations("countdown");
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getTimeLeft);
  const srRef = useRef<HTMLDivElement>(null);
  const lastAnnouncedMinute = useRef(-1);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Announce to screen readers only when minutes change (not every second)
  useEffect(() => {
    if (!mounted) return;
    if (time.minutes !== lastAnnouncedMinute.current) {
      lastAnnouncedMinute.current = time.minutes;
      if (srRef.current) {
        srRef.current.textContent = `${time.days} ${t("days")}, ${time.hours} ${t("hours")}, ${time.minutes} ${t("minutes")}`;
      }
    }
  }, [mounted, time, t]);

  const boxes = [
    { value: time.days, label: t("days") },
    { value: time.hours, label: t("hours") },
    { value: time.minutes, label: t("minutes") },
    { value: time.seconds, label: t("seconds") },
  ];

  return (
    <section
      className="relative bg-brown py-12"
      aria-label={t("label")}
    >
      <Image
        src="/images/photography/cap-femmes-gathering.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brown opacity-75" aria-hidden="true" />

      {/* Screen reader announcement — updates only on minute change */}
      <div ref={srRef} className="sr-only" aria-live="polite" role="status" />

      <div className="relative mx-auto max-w-3xl px-4">
        {/* Section heading */}
        <p className="text-sm uppercase tracking-widest text-orange text-center mb-6 font-heading">
          {t("label")}
        </p>

        <div className="flex items-center justify-center gap-3 md:gap-6">
          {boxes.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-3 md:gap-6">
              <div
                className="glass rounded-xl p-4 md:p-6 flex flex-col items-center hover:shadow-[0_0_30px_rgba(224,123,57,0.15)] transition-shadow duration-300"
                aria-hidden="true"
              >
                <FlipNumber value={value} mounted={mounted} shouldReduceMotion={shouldReduceMotion} />
                <span className="mt-2 font-body text-xs md:text-sm text-warm-cream/90 uppercase tracking-wider">
                  {label}
                </span>
              </div>
              {/* Decorative separators between cards */}
              {i < boxes.length - 1 && (
                <div className="hidden md:flex flex-col gap-2" aria-hidden="true">
                  <div className="w-2 h-2 rounded-full bg-orange" />
                  <div className="w-2 h-2 rounded-full bg-orange" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
