"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

const SOCIALS = [
  { icon: FacebookLogo, label: "Facebook", href: "https://www.facebook.com/share/1B4pNuGHt7/?mibextid=wwXIfr" },
  { icon: TwitterLogo, label: "Twitter / X", href: "https://x.com/resilience241" },
  { icon: InstagramLogo, label: "Instagram", href: "https://instagram.com/resilience_241" },
] as const;

export function PressTeaser() {
  const t = useTranslations("home.press");
  const locale = useLocale();

  return (
    <section className="bg-light-beige py-16 md:py-20" aria-labelledby="press-heading">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <ScrollReveal>
          <h2
            id="press-heading"
            className="font-heading text-2xl md:text-3xl font-bold text-near-black mb-4"
          >
            {t("headline")}
          </h2>

          <p className="font-body text-base text-near-black/70 mb-8">
            {t("followUs")}
          </p>

          {/* Social icons */}
          <div className="flex justify-center gap-5 mb-8">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-brown/10 text-brown hover:bg-orange hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange"
              >
                <Icon size={28} />
              </a>
            ))}
          </div>

          {/* Media contact */}
          <Button href={`/${locale}/contact`} variant="secondary-dark">
            {t("contact")}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
