"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Cap241Nkok() {
  const t = useTranslations("cap241");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-brown">
      <Image
        src="/images/photography/artisan-weaving.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brown opacity-80" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/20 px-4 py-1.5 rounded-full mb-6">
            {t("nkokBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white">
            {t("nkokTitle")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 font-body text-lg text-white/85 max-w-3xl">
            {t("nkokIntro")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 md:p-10">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-orange">
              {t("nkokCenter")}
            </h3>

            <p className="mt-4 font-body text-base md:text-lg text-white/80">
              {t("nkokDescription")}
            </p>

            <ul className="mt-6 space-y-3">
              {(["reception", "psychosocial", "training", "followup"] as const).map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-orange shrink-0" />
                  <span className="font-body text-base md:text-lg text-white/90">
                    {t(`nkokServices.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10">
            <p className="font-body text-base md:text-lg text-white/80">
              {t("nkokApproach")}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["recognizing", "supporting", "restoring"] as const).map((key) => (
                <span
                  key={key}
                  className="font-body text-base bg-white/15 text-white px-4 py-2 rounded-full border border-white/20"
                >
                  {t(`nkokApproachItems.${key}`)}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="mt-10 font-heading text-lg md:text-xl font-semibold text-orange italic">
            {t("nkokAmbition")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
