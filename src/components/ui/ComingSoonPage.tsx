import { getTranslations } from "next-intl/server";

interface ComingSoonPageProps {
  namespace: string;
}

export async function ComingSoonPage({ namespace }: ComingSoonPageProps) {
  const t = await getTranslations(namespace);
  const tBadge = await getTranslations("comingSoon");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-navy) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        {/* Badge */}
        <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-orange bg-orange/10 px-4 py-1.5 rounded-full mb-8">
          {tBadge("badge")}
        </span>

        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-navy">
          {t("title")}
        </h1>

        <p className="mt-6 font-body text-lg text-near-black/70 max-w-xl mx-auto">
          {t("content")}
        </p>

        {/* Decorative gradient line */}
        <div
          className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-orange to-crimson rounded-full"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
