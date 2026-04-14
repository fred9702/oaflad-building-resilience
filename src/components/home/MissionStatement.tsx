"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

export function MissionStatement() {
  const tQuote = useTranslations("quote");
  const tHome = useTranslations("home.mission");
  const shouldReduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  const quoteText = tQuote("text");
  const words = quoteText.split(" ");

  return (
    <section
      className="relative bg-warm-cream overflow-hidden"
      aria-label="Mission statement"
    >
      {/* Orange gradient divider */}
      <div
        className="h-1 w-full"
        style={{ background: "linear-gradient(to right, #E07B39, #9B1C37, #6B3417)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 lg:px-8 py-16 md:py-24">
        <div
          className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16"
          ref={(el) => setRef(el)}
        >
          {/* Portrait */}
          <div className="flex-shrink-0">
            <div className="relative w-[224px] h-[288px] md:w-[256px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/photography/zita-oligui-nguema-portrait.jpg"
                alt={tHome("photoAlt")}
                fill
                className="object-cover"
                style={{ objectPosition: "35% 25%" }}
                sizes="(max-width: 768px) 224px, 256px"
              />
            </div>
          </div>

          {/* Quote */}
          <figure className="flex-1">
            <div
              className="w-10 h-1 rounded-full mb-6"
              style={{ background: "linear-gradient(to right, #E07B39, #9B1C37)" }}
              aria-hidden="true"
            />
            <blockquote>
              <p className="font-heading text-xl md:text-2xl lg:text-3xl italic text-crimson leading-snug" aria-label={quoteText}>
                {shouldReduceMotion ? (
                  <>&laquo;&nbsp;{quoteText}&nbsp;&raquo;</>
                ) : (
                  <>
                    &laquo;&nbsp;
                    {words.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
                        className="inline"
                        aria-hidden="true"
                      >
                        {word}{" "}
                      </motion.span>
                    ))}
                    &nbsp;&raquo;
                  </>
                )}
              </p>
            </blockquote>
            <figcaption className="mt-8 font-body text-base text-brown">
              <span className="font-semibold">{tQuote("author")}</span>
              <br />
              <span className="text-brown/70">{tQuote("role")}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
