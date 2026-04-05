"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quotes } from "@phosphor-icons/react";

export function PresidentialQuote() {
  const t = useTranslations("speakers.president");

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-crimson/5 border-l-4 border-crimson">

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo */}
            <div className="shrink-0">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden ring-2 ring-crimson/30 shadow-xl">
                <Image
                  src="/images/speakers/president-brice-oligui-nguema.jpg"
                  alt={t("name")}
                  width={224}
                  height={224}
                  className="object-cover object-top w-full h-full"
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
              <blockquote className="font-body text-base md:text-lg text-near-black/85 leading-relaxed italic">
                {t("quote")}
              </blockquote>
              <div className="mt-6 border-t border-crimson/15 pt-4">
                <p className="font-heading text-base font-bold text-near-black">
                  {t("name")}
                </p>
                <p className="font-body text-sm text-near-black/60">
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
