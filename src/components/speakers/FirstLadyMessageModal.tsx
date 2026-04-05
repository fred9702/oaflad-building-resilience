"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import type { FirstLady } from "@/data/first-ladies";
import { messageTexts, type FirstLadyMessage } from "@/data/first-lady-messages";

const LANGUAGE_LABELS: Record<string, string> = {
  pt: "Português",
  fr: "Français",
  en: "English",
};

interface FirstLadyMessageModalProps {
  lady: FirstLady;
  message: FirstLadyMessage;
  isOpen: boolean;
  onClose: () => void;
}

export function FirstLadyMessageModal({
  lady,
  message,
  isOpen,
  onClose,
}: FirstLadyMessageModalProps) {
  const t = useTranslations("speakers");
  const locale = useLocale();
  const [activeLang, setActiveLang] = useState(locale);

  // Reset to current locale when modal opens
  useEffect(() => {
    if (isOpen) setActiveLang(locale);
  }, [isOpen, locale]);

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

  // Extra languages beyond FR/EN (e.g. Portuguese for Angola)
  const extraLanguages = message.languages.filter((l) => l !== "fr" && l !== "en");
  const showToggle = extraLanguages.length > 0;

  // Use current locale by default; activeLang only matters for extra languages
  const displayLang = showToggle ? activeLang : locale;
  const messageText = messageTexts[displayLang]?.[lady.id] ?? "";

  const name = t(`firstLadies.${lady.id}.name`);
  const country = t(`firstLadies.${lady.id}.country`);
  const honorific = lady.honorificOverride
    ? t(lady.honorificOverride)
    : lady.isFirstGentleman ? t("honorificMr") : t("honorificMrs");

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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 md:p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={`${honorific} ${name}`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-near-black/60 hover:text-near-black hover:bg-near-black/10 transition-colors"
              aria-label={t("closeModal")}
            >
              <X size={24} weight="bold" />
            </button>

            {/* Header: photo + name */}
            <div className="flex items-center gap-4 mb-6 pr-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-light-beige">
                {lady.photoPath ? (
                  <Image
                    src={lady.photoPath}
                    alt={name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl">{lady.countryFlag}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-near-black leading-tight">
                  {honorific} {name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-base leading-none">{lady.countryFlag}</span>
                  <span className="font-body text-sm text-near-black/60">{country}</span>
                </div>
              </div>
            </div>

            {/* Language toggle — only shown when extra languages exist (e.g. Portuguese) */}
            {showToggle && (
              <div className="flex gap-1 mb-6 p-1 bg-near-black/5 rounded-full w-fit">
                {message.languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-4 py-1.5 rounded-full text-sm font-heading font-semibold transition-colors ${
                      activeLang === lang
                        ? "bg-crimson text-white"
                        : "text-near-black/60 hover:text-near-black"
                    }`}
                  >
                    {LANGUAGE_LABELS[lang] ?? lang}
                  </button>
                ))}
              </div>
            )}

            {/* Message body */}
            <div className="font-body text-near-black/90 leading-relaxed whitespace-pre-line mb-8">
              {messageText}
            </div>

            {/* Signature */}
            <div className="border-t border-near-black/10 pt-4">
              <p className="font-heading text-sm font-bold text-near-black">
                {message.signature.formal}
              </p>
              <p className="font-body text-sm text-near-black/60">
                {message.signature.title}
              </p>
              {message.signature.role && (
                <p className="font-body text-sm text-near-black/60">
                  {message.signature.role}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
