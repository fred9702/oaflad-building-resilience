import { setRequestLocale } from "next-intl/server";
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";

type Props = { params: Promise<{ locale: string }> };

export default async function ProgrammePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ComingSoonPage namespace="programme" />;
}
