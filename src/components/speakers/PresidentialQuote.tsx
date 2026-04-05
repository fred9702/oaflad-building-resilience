"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quotes } from "@phosphor-icons/react";

export function PresidentialQuote() {
  const t = useTranslations("speakers.president");

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-near-black">
      {/* Subtle diagonal accent */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, white 40px, white 41px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo */}
            <div className="shrink-0">
              <div className="relative w-48 md:w-56 aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-crimson/30 shadow-xl">
                <Image
                  src="/images/speakers/president-brice-oligui-nguema.jpg"
                  alt={t("name")}
                  width={224}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Quote */}
            <div className="flex-1 text-center md:text-left">
              <Quotes
                size={36}
                weight="fill"
                className="text-crimson/40 mb-4 mx-auto md:mx-0"
              />
              <blockquote className="font-body text-base md:text-lg text-white/90 leading-relaxed italic">
                {t("quote")}
              </blockquote>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-heading text-base font-bold text-white">
                  {t("name")}
                </p>
                <p className="font-body text-sm text-white/60">
                  {t("title")}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
