import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";
import { MediaSocials } from "@/components/media/MediaSocials";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "media", "/media");
}

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ComingSoonPage namespace="media" backgroundImage="/images/photography/cap-femmes-gathering.jpg" />
      <MediaSocials />
    </>
  );
}
