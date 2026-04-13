import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Cap241Hero } from "@/components/cap241/Cap241Hero";
import { Cap241Pillars } from "@/components/cap241/Cap241Pillars";
import { Cap241Balance } from "@/components/cap241/Cap241Balance";
import { Cap241Nkok } from "@/components/cap241/Cap241Nkok";
import { Cap241Stats } from "@/components/cap241/Cap241Stats";
import { Cap241Closing } from "@/components/cap241/Cap241Closing";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "cap241", "/cap-241");
}

export default async function Cap241Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Cap241Hero />
      <Cap241Pillars />
      <Cap241Balance />
      <Cap241Nkok />
      <Cap241Stats />
      <Cap241Closing />
    </>
  );
}
