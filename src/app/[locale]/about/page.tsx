import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutCampaign } from "@/components/about/AboutCampaign";
import { AboutGabon } from "@/components/about/AboutGabon";
import { AboutZonBrief } from "@/components/about/AboutZonBrief";
import { AboutClosing } from "@/components/about/AboutClosing";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutCampaign />
      <AboutGabon />
      <AboutZonBrief />
      <AboutClosing />
    </>
  );
}
