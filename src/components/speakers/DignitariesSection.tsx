"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { dignitaries } from "@/data/dignitaries";

export function DignitariesSection() {
  const t = useTranslations("speakers");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-light-beige">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/10 px-4 py-1.5 rounded-full mb-6">
            {t("dignitariesBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-near-black leading-tight">
            {t("dignitariesTitle")}
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {dignitaries.map((dignitary, i) => {
            const name = t(`dignitaries.${dignitary.id}.name`);
            const title = t(`dignitaries.${dignitary.id}.title`);
            const organisation = t(`dignitaries.${dignitary.id}.organisation`);

            return (
              <ScrollReveal key={dignitary.id} delay={0.03 * (i + 1)}>
                <div className="group relative rounded-xl overflow-hidden border border-brown/10 bg-white/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative aspect-[3/4] bg-light-beige overflow-hidden">
                    <Image
                      src={dignitary.photoPath}
                      alt={name}
                      width={183}
                      height={246}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent pt-8 pb-2 px-2">
                      <span className="inline-block text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange/80 text-white">
                        {title}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-body text-xs text-near-black/50 mb-1">
                      {organisation}
                    </p>
                    <p className="font-heading text-sm font-bold text-near-black leading-tight">
                      {name}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
