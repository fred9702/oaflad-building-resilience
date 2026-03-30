"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";

interface LegalModalProps {
  type: "privacy" | "terms";
  isOpen: boolean;
  onClose: () => void;
}

export function LegalModal({ type, isOpen, onClose }: LegalModalProps) {
  const t = useTranslations("legal");
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

  const contactLinkRenderer = (chunks: ReactNode) => (
    <Link
      href={`/${locale}/contact`}
      onClick={onClose}
      className="text-orange underline underline-offset-4 hover:text-orange/80 transition-colors"
    >
      {chunks}
    </Link>
  );

  const privacySections: { title: string; body: ReactNode }[] = [
    { title: t("dataCollectedTitle"), body: t("dataCollected") },
    { title: t("purposeTitle"), body: t("purpose") },
    { title: t("retentionTitle"), body: t("retention") },
    { title: t("rightsTitle"), body: t("rights") },
    { title: t("securityTitle"), body: t("security") },
    { title: t("contactTitle"), body: t.rich("contactText", { contactLink: contactLinkRenderer }) },
  ];

  const termsSections: { title: string; body: ReactNode }[] = [
    { title: t("useTitle"), body: t("use") },
    { title: t("ipTitle"), body: t("ip") },
    { title: t("registrationTitle"), body: t("registration") },
    { title: t("liabilityTitle"), body: t("liability") },
    { title: t("changesTitle"), body: t("changes") },
    { title: t("termsContactTitle"), body: t.rich("termsContactText", { contactLink: contactLinkRenderer }) },
  ];

  const title = type === "privacy" ? t("privacyTitle") : t("termsTitle");
  const lastUpdated =
    type === "privacy" ? t("privacyLastUpdated") : t("termsLastUpdated");
  const intro = type === "privacy" ? t("privacyIntro") : t("termsIntro");
  const sections = type === "privacy" ? privacySections : termsSections;

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
            className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8 md:p-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-near-black/60 hover:text-near-black hover:bg-near-black/10 transition-colors"
              aria-label={t("close")}
            >
              <X size={24} weight="bold" />
            </button>

            {/* Title */}
            <h2 className="font-heading text-2xl font-bold text-near-black mb-1">
              {title}
            </h2>
            <p className="font-body text-sm text-near-black/70 mb-6">
              {lastUpdated}
            </p>

            {/* Intro */}
            <p className="font-body text-near-black leading-relaxed mb-8">
              {intro}
            </p>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-heading text-base font-semibold text-brown mb-2">
                    {section.title}
                  </h3>
                  <p className="font-body text-near-black/90 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
