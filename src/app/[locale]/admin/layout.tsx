import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <header className="bg-brown text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-heading text-lg font-bold">#BuildingResilience</span>
          <span className="text-white/50">|</span>
          <span className="font-body text-sm text-white/80">{user.email}</span>
        </div>
        <form action={`/api/auth/signout?locale=${locale}`} method="POST">
          <button
            type="submit"
            className="font-body text-sm text-white/80 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </form>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {children}
      </div>
    </div>
  );
}
