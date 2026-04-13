"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

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
                        isOpen ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="font-body text-base text-near-black/80 px-5 pb-5 leading-relaxed">
                        {t(`questions.${key}.answer`)}
                      </p>
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
