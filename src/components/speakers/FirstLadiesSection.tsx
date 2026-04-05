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
  const attendees = firstLadies
    .filter((l) => !l.isHost)
    .sort((a, b) => {
      const aHas = firstLadyMessageIds.has(a.id) ? 0 : 1;
      const bHas = firstLadyMessageIds.has(b.id) ? 0 : 1;
      return aHas - bHas;
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

        {/* Featured host card */}
        {host && (
          <ScrollReveal>
            <div className="mt-10 mb-8">
              <FirstLadyCard
                lady={host}
                featured
                hasMessage={firstLadyMessageIds.has(host.id)}
                onReadMessage={() => setSelectedLadyId(host.id)}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Attendees grid — 4 columns max for larger cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {attendees.map((lady, i) => (
            <ScrollReveal key={lady.id} delay={0.03 * (i + 1)}>
              <FirstLadyCard
                  lady={lady}
                  hasMessage={firstLadyMessageIds.has(lady.id)}
                  onReadMessage={() => setSelectedLadyId(lady.id)}
                />
            </ScrollReveal>
          ))}
        </div>
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
