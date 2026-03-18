import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { RegisterForm } from "./RegisterForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("register");

  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-navy text-center mb-10">
          {t("title")}
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
}
