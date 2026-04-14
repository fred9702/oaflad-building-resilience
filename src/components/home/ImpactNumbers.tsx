"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type StatKey = "stat1" | "stat2" | "stat3" | "stat4";
const STAT_KEYS: StatKey[] = ["stat1", "stat2", "stat3", "stat4"];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedCounter({ target, duration = 1600, onComplete }: { target: number; duration?: number; onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const onCompleteRef = useRef(onComplete);

  // Keep the latest onComplete callback in a ref so it doesn't retrigger the effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let startTs: number | null = null;
    let rafId: number | null = null;
    let completed = false;

    function tick(ts: number) {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (!completed) {
        completed = true;
        onCompleteRef.current?.();
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return <>{count}</>;
}

function StatCard({ statKey }: { statKey: StatKey }) {
  const t = useTranslations("home.impact");
  const shouldReduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [pulse, setPulse] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const value = t(`${statKey}.value`);
  const label = t(`${statKey}.label`);
  const subtitle = t(`${statKey}.subtitle`);
  const numericValue = parseInt(value, 10);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleComplete = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6">
      <div
        className="font-heading text-5xl md:text-6xl font-extrabold text-orange tabular-nums"
        style={{
          textShadow: "0 2px 6px rgba(0,0,0,0.7)",
          ...(pulse ? { animation: "pulse-scale 0.6s ease-in-out" } : {}),
        }}
      >
        {shouldReduceMotion || !inView ? numericValue : (
          inView ? <AnimatedCounter target={numericValue} onComplete={handleComplete} /> : 0
        )}
      </div>
      <div
        className="mt-2 font-heading text-lg font-bold uppercase tracking-wide"
        style={{ color: "#FBF0E6", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
      >
        {label}
      </div>
      <div
        className="mt-1 font-body text-sm"
        style={{ color: "rgba(251, 240, 230, 0.92)", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
      >
        {subtitle}
      </div>
    </div>
  );
}

export function ImpactNumbers() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      aria-label="Impact numbers"
    >
      {/* Parallax photo background */}
      <div
        className="absolute inset-0 bg-brown bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("/images/photography/hands-unity.jpg")' }}
        aria-hidden="true"
      />
      {/* Dark overlay — heavier for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(45,45,45,0.88) 0%, rgba(107,52,23,0.92) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-warm-cream/10">
            {STAT_KEYS.map((key) => (
              <StatCard key={key} statKey={key} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
