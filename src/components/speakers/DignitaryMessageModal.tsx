"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Quotes } from "@phosphor-icons/react";
import type { Dignitary } from "@/data/dignitaries";
import { dignitaryMessageTexts, type DignitaryMessage } from "@/data/dignitary-messages";

interface DignitaryMessageModalProps {
  dignitary: Dignitary;
  message: DignitaryMessage;
  isOpen: boolean;
  onClose: () => void;
}

export function DignitaryMessageModal({
  dignitary,
  message,
  isOpen,
  onClose,
}: DignitaryMessageModalProps) {
  const t = useTranslations("speakers");
  const locale = useLocale();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const messageText = dignitaryMessageTexts[locale]?.[dignitary.id] ?? "";

  const name = t(`dignitaries.${dignitary.id}.name`);
  const title = t(`dignitaries.${dignitary.id}.title`);
  const organisation = t(`dignitaries.${dignitary.id}.organisation`);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 md:p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={name}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-near-black/60 hover:text-near-black hover:bg-near-black/10 transition-colors"
              aria-label={t("closeModal")}
            >
              <X size={24} weight="bold" />
            </button>

            <div className="flex items-center gap-4 mb-6 pr-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-light-beige">
                <Image
                  src={dignitary.photoPath}
                  alt={name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-near-black leading-tight">
                  {name}
                </p>
                <p className="font-body text-sm text-near-black/60 mt-1">
                  {title} · {organisation}
                </p>
              </div>
            </div>

            <Quotes size={32} weight="fill" className="text-crimson/30 mb-3" />
            <blockquote className="font-body text-near-black/90 leading-relaxed whitespace-pre-line mb-8 italic">
              {messageText || t("messagePlaceholder")}
            </blockquote>

            {(() => {
              const sig = message.signature[locale] ?? message.signature["en"];
              return (
                <div className="border-t border-near-black/10 pt-4">
                  <p className="font-heading text-sm font-bold text-near-black">
                    {sig.formal}
                  </p>
                  <p className="font-body text-sm text-near-black/60">
                    {sig.title}
                  </p>
                  {sig.role && (
                    <p className="font-body text-sm text-near-black/60">
                      {sig.role}
                    </p>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
