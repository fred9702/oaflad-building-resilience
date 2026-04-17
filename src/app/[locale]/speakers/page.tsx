import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SpeakersHero } from "@/components/speakers/SpeakersHero";
import { FirstLadiesSection } from "@/components/speakers/FirstLadiesSection";
import { DignitariesSection } from "@/components/speakers/DignitariesSection";
import { PresidentialQuote } from "@/components/speakers/PresidentialQuote";
import { SpeakersClosing } from "@/components/speakers/SpeakersClosing";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "speakers", "/speakers");
}

export default async function SpeakersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SpeakersHero />
      <PresidentialQuote />
      <FirstLadiesSection />
      <DignitariesSection />
      <SpeakersClosing />
    </>
  );
}
