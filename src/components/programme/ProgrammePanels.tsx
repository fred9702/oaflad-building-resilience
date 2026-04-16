"use client";

import { useTranslations } from "next-intl";
import { Microphone, Users } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PANEL_ACCENTS = [
  {
    bg: "bg-crimson",
    soft: "bg-crimson/5",
    border: "border-crimson/20",
    text: "text-crimson",
    dot: "bg-crimson",
  },
  {
    bg: "bg-orange",
    soft: "bg-orange/5",
    border: "border-orange/20",
    text: "text-orange",
    dot: "bg-orange",
  },
] as const;

type Panelist = { name: string | null; role: string };
type Moderator = { name: string; role: string };

function PanelCard({ num, accent }: { num: 1 | 2; accent: (typeof PANEL_ACCENTS)[number] }) {
  const t = useTranslations("programme");
  const key = `panel${num}` as const;
  const moderator = t.raw(`${key}.moderator`) as Moderator | undefined;
  const panelists = (t.raw(`${key}.panelists`) as Panelist[] | undefined) ?? [];

  return (
    <div className={`relative ${accent.soft} border ${accent.border} rounded-2xl p-6 md:p-8 h-full flex flex-col`}>
      {/* Panel number bar */}
      <div className={`${accent.bg} rounded-lg px-4 py-2 inline-block self-start mb-5`}>
        <span className="font-heading text-sm font-bold text-white uppercase tracking-wider">
          {t(`${key}.title`)}
        </span>
      </div>

      <h3 className={`font-heading text-lg md:text-xl font-bold ${accent.text} leading-snug`}>
        {t(`${key}.topic`)}
      </h3>

      <p className="mt-2 font-body text-sm text-near-black/60">
        <span className="font-semibold text-near-black/70">{t("panelTimeLabel")}:</span>{" "}
        {t(`${key}.time`)}
      </p>

      {/* Moderator */}
      {moderator && (
        <div className="mt-6 pt-5 border-t border-near-black/10">
          <div className="flex items-center gap-2 mb-3">
            <Microphone size={16} weight="bold" className={accent.text} aria-hidden="true" />
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-near-black/60">
              {t("panelModeratorLabel")}
            </span>
          </div>
          <p className="font-heading text-base font-bold text-near-black">
            {moderator.name}
          </p>
          <p className="font-body text-sm text-near-black/70 leading-relaxed mt-0.5">
            {moderator.role}
          </p>
        </div>
      )}

      {/* Panelists */}
      {panelists.length > 0 && (
        <div className="mt-5 pt-5 border-t border-near-black/10">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} weight="bold" className={accent.text} aria-hidden="true" />
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-near-black/60">
              {t("panelSpeakersLabel")}
            </span>
          </div>
          <ul className="space-y-4">
            {panelists.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  {p.name && (
                    <p className="font-heading text-sm font-bold text-near-black">
                      {p.name}
                    </p>
                  )}
                  <p className={`font-body text-sm leading-relaxed ${p.name ? "text-near-black/70 mt-0.5" : "text-near-black/80"}`}>
                    {p.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ProgrammePanels() {
  const t = useTranslations("programme");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-light-beige">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-green bg-green/10 px-4 py-1.5 rounded-full mb-6">
              {t("panelsBadge")}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-crimson">
              {t("panelsTitle")}
            </h2>
            <p className="mt-4 font-body text-base md:text-lg text-near-black/70 max-w-2xl mx-auto">
              {t("panelsIntro")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {([1, 2] as const).map((num, i) => (
            <ScrollReveal key={num} delay={i * 0.1}>
              <PanelCard num={num} accent={PANEL_ACCENTS[i]} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
