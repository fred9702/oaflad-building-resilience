import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { Countdown } from "@/components/home/Countdown";
import { CTABanner } from "@/components/home/CTABanner";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <Countdown />
      <CTABanner />
    </>
  );
}
