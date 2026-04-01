import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SpeakersHero } from "@/components/speakers/SpeakersHero";
import { FirstLadiesSection } from "@/components/speakers/FirstLadiesSection";
import { SpeakersComingSoon } from "@/components/speakers/SpeakersComingSoon";
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
      <FirstLadiesSection />
      <SpeakersComingSoon />
      <SpeakersClosing />
    </>
  );
}
