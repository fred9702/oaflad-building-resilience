"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useReducedMotion } from "framer-motion";

interface DonutStat {
  percent: number;
  labelFr: string;
  labelEn: string;
  color: string;
}

const STATS: DonutStat[] = [
  { percent: 60, labelFr: "Femmes en zones fragiles", labelEn: "Women in fragile zones", color: "#E07B39" },
  { percent: 45, labelFr: "Accès aux soins limité", labelEn: "Limited healthcare access", color: "#9B1C37" },
  { percent: 70, labelFr: "Jeunes sans formation", labelEn: "Youth without training", color: "#E07B39" },
];

const RADIUS = 40;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function DonutWithLabel({ stat, animated, locale }: { stat: DonutStat; animated: boolean; locale: string }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (animated) {
      setProgress(stat.percent);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setProgress(stat.percent);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.percent, animated]);

  const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
  const label = locale === "fr" ? stat.labelFr : stat.labelEn;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative">
        <svg width={100} height={100} viewBox="0 0 100 100" role="img" aria-label={`${stat.percent}% — ${label}`}>
          <circle
            cx={50}
            cy={50}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx={50}
            cy={50}
            r={RADIUS}
            fill="none"
            stroke={stat.color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 50 50)"
            style={{ transition: animated ? "none" : "stroke-dashoffset 1500ms ease-out" }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-heading text-xl font-bold text-warm-cream"
          aria-hidden="true"
        >
          {stat.percent}%
        </span>
      </div>
      <p className="mt-3 font-body text-sm text-warm-cream/80 max-w-[120px] leading-snug">
        {label}
      </p>
    </div>
  );
}

export function Cap241Stats() {
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "linear-gradient(135deg, #6B3417 0%, #4a2410 50%, #6B3417 100%)" }}
      aria-label={locale === "fr" ? "Statistiques illustratives" : "Illustrative statistics"}
    >
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h2 className="sr-only">
          {locale === "fr" ? "Données illustratives" : "Illustrative data"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 justify-items-center">
          {STATS.map((stat) => (
            <DonutWithLabel
              key={stat.labelEn}
              stat={stat}
              animated={!!shouldReduceMotion}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
