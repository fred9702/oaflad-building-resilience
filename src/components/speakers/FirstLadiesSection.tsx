"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { firstLadies } from "@/data/first-ladies";
import { firstLadyMessageIds, getFirstLadyMessage } from "@/data/first-lady-messages";
import { FirstLadyCard } from "./FirstLadyCard";
import { FirstLadyMessageModal } from "./FirstLadyMessageModal";

export function FirstLadiesSection() {
  const t = useTranslations("speakers");

  const [selectedLadyId, setSelectedLadyId] = useState<string | null>(null);
  const selectedLady = selectedLadyId
    ? firstLadies.find((l) => l.id === selectedLadyId)
    : null;
  const selectedMessage = selectedLadyId
    ? getFirstLadyMessage(selectedLadyId)
    : null;

  const host = firstLadies.find((l) => l.isHost);
  const speakers = firstLadies.filter((l) => l.isSpeaker || l.isKeynote);
  const attending = firstLadies.filter((l) => !l.isHost && !l.isSpeaker && !l.isKeynote);

  const cardProps = (lady: typeof firstLadies[number]) => ({
    lady,
    hasMessage: firstLadyMessageIds.has(lady.id),
    onReadMessage: () => setSelectedLadyId(lady.id),
  });

  return (
    <section id="first-ladies" className="relative py-20 md:py-28 overflow-hidden bg-white">

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-crimson bg-crimson/10 px-4 py-1.5 rounded-full mb-6">
            {t("firstLadiesBadge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-near-black leading-tight">
            {t("firstLadiesTitle")}
          </h2>
        </ScrollReveal>

        {/* Tier 1: Featured host card */}
        {host && (
          <ScrollReveal>
            <div className="mt-10 mb-12">
              <FirstLadyCard {...cardProps(host)} featured />
            </div>
          </ScrollReveal>
        )}

        {/* Tier 2: Confirmed speakers */}
        {speakers.length > 0 && (
          <div className="mb-12">
            <ScrollReveal>
              <span className="inline-block font-heading text-xs font-semibold uppercase tracking-widest text-orange bg-orange/10 px-3 py-1 rounded-full mb-5">
                {t("keynoteBadge")}
              </span>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {speakers.map((lady, i) => (
                <ScrollReveal key={lady.id} delay={0.03 * (i + 1)} className="h-full">
                  <FirstLadyCard
                    {...cardProps(lady)}
                    roleBadge={lady.isKeynote ? t(`firstLadies.${lady.id}.role`) : undefined}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Tier 3: Attending */}
        {attending.length > 0 && (
          <div>
            <ScrollReveal>
              <span className="inline-block font-heading text-xs font-semibold uppercase tracking-widest text-brown bg-brown/10 px-3 py-1 rounded-full mb-5">
                {t("attendingBadge")}
              </span>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {attending.map((lady, i) => (
                <ScrollReveal key={lady.id} delay={0.03 * (i + 1)} className="h-full">
                  <FirstLadyCard {...cardProps(lady)} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedLady && selectedMessage && (
        <FirstLadyMessageModal
          lady={selectedLady}
          message={selectedMessage}
          isOpen={!!selectedLadyId}
          onClose={() => setSelectedLadyId(null)}
        />
      )}
    </section>
  );
}
