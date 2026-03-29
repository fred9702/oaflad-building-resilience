import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ComingSoonPage namespace="contact" />;
}
