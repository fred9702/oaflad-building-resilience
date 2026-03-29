import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersGrid } from "@/components/partners/PartnersGrid";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "partners", "/partners");
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PartnersHero />
      <PartnersGrid />
    </>
  );
}
