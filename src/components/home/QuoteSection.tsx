"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function QuoteSection() {
  const t = useTranslations("quote");

  return (
    <section className="bg-warm-cream py-16 md:py-24" aria-label="Quote">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <ScrollReveal>
          <figure className="border-l-4 border-orange pl-6 md:pl-8">
            <blockquote>
              <p className="font-heading text-2xl md:text-3xl italic text-crimson leading-snug">
                &laquo;&nbsp;{t("text")}&nbsp;&raquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 font-body text-base text-brown">
              <span className="font-semibold">{t("author")}</span>
              <br />
              <span className="text-brown/70">{t("role")}</span>
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}
