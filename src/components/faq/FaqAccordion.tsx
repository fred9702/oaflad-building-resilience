"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { useTranslations, useLocale } from "next-intl";

const QUESTION_KEYS = [
  "whatIs",
  "attending",
  "when",
  "pillars",
  "oaflad",
  "follow",
  "balance",
] as const;

const CATEGORY_ORDER = ["event", "attendance", "campaign"] as const;

type QuestionKey = (typeof QUESTION_KEYS)[number];
type CategoryKey = (typeof CATEGORY_ORDER)[number];

export function FaqAccordion() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const [openKey, setOpenKey] = useState<QuestionKey | null>(null);

  function toggle(key: QuestionKey) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  const grouped: Record<CategoryKey, QuestionKey[]> = {
    event: [],
    attendance: [],
    campaign: [],
  };

  for (const key of QUESTION_KEYS) {
    const category = t(`questions.${key}.category`) as CategoryKey;
    if (grouped[category]) {
      grouped[category].push(key);
    }
  }

  return (
    <div className="space-y-10">
      {CATEGORY_ORDER.map((category) => {
        const questions = grouped[category];
        if (questions.length === 0) return null;
        return (
          <div key={category}>
            <h2 className="font-heading text-lg font-bold text-brown uppercase tracking-widest mb-4 pb-2 border-b border-brown/15">
              {t(`categories.${category}`)}
            </h2>
            <div className="space-y-2">
              {questions.map((key) => {
                const isOpen = openKey === key;
                const panelId = `faq-panel-${key}`;
                const buttonId = `faq-btn-${key}`;
                return (
                  <div
                    key={key}
                    className="rounded-xl border border-brown/10 bg-white/60 overflow-hidden"
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-heading text-base font-semibold text-near-black hover:text-crimson transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange min-h-[44px]"
                    >
                      <span>{t(`questions.${key}.question`)}</span>
                      <CaretDown
                        size={18}
                        weight="bold"
                        className={`shrink-0 text-orange transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[500px]" : "max-h-0"
                      }`}
                    >
                      <div className="px-5 pb-5">
                        <p className="font-body text-base text-near-black/80 leading-relaxed">
                          {t(`questions.${key}.answer`)}
                        </p>
                        {(() => {
                          try {
                            const linkData = t.raw(`questions.${key}.link`) as { href: string; label: string; external?: boolean } | undefined;
                            if (!linkData) return null;
                            const isExternal = linkData.external || linkData.href.startsWith("http");
                            if (isExternal) {
                              return (
                                <a
                                  href={linkData.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-crimson hover:text-crimson/80 transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded"
                                >
                                  {linkData.label}
                                  <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                                </a>
                              );
                            }
                            return (
                              <Link
                                href={`/${locale}${linkData.href}`}
                                className="mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-crimson hover:text-crimson/80 transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded"
                              >
                                {linkData.label}
                                <ArrowRight size={14} weight="bold" aria-hidden="true" />
                              </Link>
                            );
                          } catch {
                            return null;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
