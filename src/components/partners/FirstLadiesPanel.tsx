"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { firstLadies } from "@/data/first-ladies";
import { FirstLadyCard } from "./FirstLadyCard";

export function FirstLadiesPanel() {
  const t = useTranslations("partners");

  const host = firstLadies.find((l) => l.isHost);
  const attendees = firstLadies.filter((l) => !l.isHost);

  return (
    <div className="mt-6 pt-6 border-t border-crimson/15">
      <ScrollReveal>
        <h3 className="font-heading text-lg font-bold text-crimson mb-4">
          {t("attendingTitle")}
        </h3>
      </ScrollReveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {host && (
          <ScrollReveal>
            <FirstLadyCard lady={host} />
          </ScrollReveal>
        )}
        {attendees.map((lady, i) => (
          <ScrollReveal key={lady.id} delay={0.03 * (i + 1)}>
            <FirstLadyCard lady={lady} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
