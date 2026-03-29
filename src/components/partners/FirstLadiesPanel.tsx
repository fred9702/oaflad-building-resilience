"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { firstLadies } from "@/data/first-ladies";
import { FirstLadyCard } from "./FirstLadyCard";

interface FirstLadiesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FirstLadiesPanel({ isOpen, onClose }: FirstLadiesPanelProps) {
  const t = useTranslations("partners");

  const host = firstLadies.find((l) => l.isHost);
  const attendees = firstLadies.filter((l) => !l.isHost);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Body scroll lock + escape listener
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

          {/* Modal container */}
          <motion.div
            className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-cream p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-near-black/60 hover:text-near-black hover:bg-near-black/10 transition-colors"
              aria-label="Close"
            >
              <X size={24} weight="bold" />
            </button>

            {/* Title */}
            <h3 className="font-heading text-lg font-bold text-crimson mb-6">
              {t("attendingTitle")}
            </h3>

            {/* Grid of First Lady cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {host && <FirstLadyCard lady={host} />}
              {attendees.map((lady) => (
                <FirstLadyCard key={lady.id} lady={lady} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
