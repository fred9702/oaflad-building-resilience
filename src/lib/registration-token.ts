import { createClient } from "@supabase/supabase-js";

/**
 * Validates a registration token against Supabase.
 * Returns true if the token exists, is active, and within its time window.
 * Uses the anon key (RLS policy restricts to active tokens).
 */
export async function validateRegistrationToken(
  token: string | null
): Promise<boolean> {
  if (!token) return false;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("registration_tokens")
    .select("is_active, opens_at, closes_at")
    .eq("token", token)
    .eq("is_active", true)
    .single();

  if (error || !data) return false;

  const now = new Date();
  if (data.opens_at && new Date(data.opens_at) > now) return false;
  if (data.closes_at && new Date(data.closes_at) < now) return false;

  return true;
}
