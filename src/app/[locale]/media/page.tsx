import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Camera } from "@phosphor-icons/react/dist/ssr";
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";
import { MediaSocials } from "@/components/media/MediaSocials";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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

  const galleryBadge = locale === "fr" ? "Galerie Photos" : "Photo Gallery";
  const galleryText = locale === "fr" ? "Photos après l'événement" : "Photos after the event";

  return (
    <>
      <ComingSoonPage namespace="media" backgroundImage="/images/photography/cap-femmes-gathering.jpg" />

      {/* Photo Gallery Placeholder */}
      <section className="bg-warm-cream py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <SectionBadge color="orange">{galleryBadge}</SectionBadge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="aspect-[4/3] bg-light-beige border border-brown/10 rounded-xl flex flex-col items-center justify-center gap-3">
                  <Camera size={32} className="text-brown/30" aria-hidden="true" weight="thin" />
                  <p className="font-body text-sm text-near-black/40 text-center px-4">
                    {galleryText}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <MediaSocials />
    </>
  );
}
