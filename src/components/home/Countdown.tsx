"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";

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

export function Countdown() {
  const t = useTranslations("countdown");
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getTimeLeft);
  const srRef = useRef<HTMLDivElement>(null);
  const lastAnnouncedMinute = useRef(-1);

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
      className="bg-navy py-12"
      aria-label={t("label")}
    >
      {/* Screen reader announcement — updates only on minute change */}
      <div ref={srRef} className="sr-only" aria-live="polite" role="status" />

      <div className="mx-auto max-w-3xl px-4">
        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {boxes.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center" aria-hidden="true">
              <span className="font-heading text-4xl md:text-6xl font-extrabold text-white tabular-nums">
                {mounted ? String(value).padStart(2, "0") : "--"}
              </span>
              <span className="mt-2 font-body text-xs md:text-sm text-white/90 uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
