"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
} from "@phosphor-icons/react";
import { LegalModal } from "@/components/ui/LegalModal";

const FOOTER_LOGOS: Record<string, string> = {
  fr: "/images/fr/navbar-logo.png",
  en: "/images/en/navbar-logo.png",
};
const FOOTER_LOGO_FALLBACK = "/images/common/mark.svg";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);
  const footerLogo = FOOTER_LOGOS[locale] ?? FOOTER_LOGO_FALLBACK;

  const conferenceLinks = [
    { key: "about", href: "/about" },
    { key: "cap241", href: "/cap-241" },
    { key: "programme", href: "/programme" },
    { key: "speakers", href: "/speakers" },
  ];

  const connectLinks = [
    { key: "partners", href: "/partners" },
    { key: "media", href: "/media" },
    { key: "contact", href: "/contact" },
    { key: "faq", href: "/faq" },
  ];

  return (
    <footer className="bg-brown text-warm-cream" role="contentinfo">
      {/* Orange → Crimson gradient divider */}
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(to right, #E07B39, #9B1C37)" }} aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src={footerLogo}
              alt="OAFLAD logo"
              width={140}
              height={42}
              className="h-auto w-[140px] brightness-0 invert"
            />
            <p className="font-body text-sm text-warm-cream/90 text-center md:text-left max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Col 2: Quick links — two sub-columns */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-warm-cream/60">
              {locale === "fr" ? "Liens rapides" : "Quick links"}
            </h3>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-2" aria-label="Footer navigation">
              {[...conferenceLinks, ...connectLinks].map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className="font-body text-sm text-warm-cream/90 hover:text-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded py-2 min-h-[44px] flex items-center"
                >
                  {tNav(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Social icons */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-warm-cream/60">
              {locale === "fr" ? "Suivez-nous" : "Follow us"}
            </h3>
            <div className="flex gap-4">
              {[
                { icon: FacebookLogo, label: "Facebook", href: "https://www.facebook.com/share/1B4pNuGHt7/?mibextid=wwXIfr" },
                { icon: TwitterLogo, label: "Twitter / X", href: "https://x.com/resilience241" },
                { icon: InstagramLogo, label: "Instagram", href: "https://instagram.com/resilience_241" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-warm-cream hover:text-orange hover:scale-110 hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-orange rounded-full flex items-center justify-center min-w-[44px] min-h-[44px] p-2"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-warm-cream/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Image
              src="/images/partners/oaflad-logo.png"
              alt="OAFLAD"
              width={100}
              height={32}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="font-body text-warm-cream/90">
              © {new Date().getFullYear()} OAFLAD.{" "}
              {locale === "fr" ? "Tous droits réservés." : "All rights reserved."}
            </p>
          </div>
          <div className="flex gap-4 font-body">
            <button
              onClick={() => setLegalModal("privacy")}
              className="text-warm-cream hover:text-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded min-h-[44px] py-2 px-3"
            >
              {t("privacy")}
            </button>
            <button
              onClick={() => setLegalModal("terms")}
              className="text-warm-cream hover:text-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded min-h-[44px] py-2 px-3"
            >
              {t("terms")}
            </button>
          </div>
        </div>

      </div>

      <LegalModal
        type={legalModal ?? "privacy"}
        isOpen={legalModal !== null}
        onClose={() => setLegalModal(null)}
      />
    </footer>
  );
}
