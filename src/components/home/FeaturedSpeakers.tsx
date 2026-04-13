"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { firstLadies } from "@/data/first-ladies";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const FEATURED = firstLadies
  .filter((fl) => fl.isHost || fl.isSpeaker || fl.isKeynote)
  .slice(0, 6);

export function FeaturedSpeakers() {
  const t = useTranslations("home.speakers");
  const tSpeakers = useTranslations("speakers");
  const locale = useLocale();

  return (
    <section className="bg-warm-cream py-16 md:py-24" aria-labelledby="speakers-heading">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <SectionBadge color="crimson">{t("badge")}</SectionBadge>
            </div>
            <Button href={`/${locale}/speakers`} variant="secondary-dark">
              {t("viewAll")}
            </Button>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll with snap; Desktop: grid */}
        <div
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {FEATURED.map((fl, index) => {
            const name = tSpeakers(`firstLadies.${fl.id}.name`);
            const country = tSpeakers(`firstLadies.${fl.id}.country`);

            return (
              <ScrollReveal key={fl.id} delay={index * 0.08}>
                <Link
                  href={`/${locale}/speakers#first-ladies`}
                  className="flex-shrink-0 snap-start flex flex-col items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-orange rounded-xl p-2"
                  aria-label={name}
                >
                  {/* Circular portrait */}
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-[3px] border-orange shadow-md group-hover:shadow-orange/30 group-hover:scale-105 transition-all duration-300">
                    {fl.photoPath ? (
                      <Image
                        src={fl.photoPath}
                        alt={name}
                        fill
                        className="object-cover"
                        style={{ objectPosition: fl.photoPosition ?? "center 15%" }}
                        sizes="(max-width: 768px) 128px, 144px"
                      />
                    ) : (
                      <div className="w-full h-full bg-light-beige flex items-center justify-center">
                        <span className="text-4xl">{fl.countryFlag}</span>
                      </div>
                    )}
                  </div>

                  {/* Name + flag */}
                  <div className="text-center">
                    <p className="font-heading text-sm font-semibold text-near-black leading-tight">
                      {name}
                    </p>
                    <p className="font-body text-xs text-near-black/60 mt-0.5">
                      {fl.countryFlag} {country.split(" ").slice(-1)[0]}
                    </p>
                    {(fl.isKeynote || fl.isHost) && (
                      <span className="inline-block mt-1 text-[10px] font-heading font-semibold uppercase tracking-wider text-crimson">
                        {fl.isHost ? tSpeakers("hostLabel") : tSpeakers("keynoteBadge")}
                      </span>
                    )}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
