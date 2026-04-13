"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { partners } from "@/data/partners";
import { PartnerCard } from "./PartnerCard";

export function PartnersGrid() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white" aria-label="Partners">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-brown) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner, i) => (
            <ScrollReveal key={partner.id} delay={i * 0.1}>
              <PartnerCard partner={partner} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
