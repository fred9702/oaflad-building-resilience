import { createClient } from "@supabase/supabase-js";

// Libreville is WAT (UTC+1), no DST.
const LIBREVILLE_UTC_OFFSET_HOURS = 1;
const VALID_START_HOUR_LBV = 6;  // 06:00 inclusive
const VALID_END_HOUR_LBV = 18;   // 18:00 exclusive

function isWithinDailyLibrevilleWindow(now: Date): boolean {
  const hourLbv = (now.getUTCHours() + LIBREVILLE_UTC_OFFSET_HOURS) % 24;
  return hourLbv >= VALID_START_HOUR_LBV && hourLbv < VALID_END_HOUR_LBV;
}

/**
 * Validates a registration token against Supabase.
 * Returns true if:
 *  - the token exists and is active
 *  - current time is within the DB opens_at / closes_at window
 *  - current time of day is between 06:00 and 18:00 Libreville time (WAT)
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

  // Defensive daily window: 06:00–18:00 Libreville time
  if (!isWithinDailyLibrevilleWindow(now)) return false;

  return true;
}
