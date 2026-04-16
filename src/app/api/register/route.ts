import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { validateRegistrationToken } from "@/lib/registration-token";

async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim();
  const encoded = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      first_name,
      last_name,
      email,
      category,
      language_pref,
    } = body;

    const tokenValid = await validateRegistrationToken(body.token || null);
    if (!tokenValid) {
      return NextResponse.json(
        { error: "Invalid or expired registration token" },
        { status: 403 }
      );
    }

    if (!first_name || !last_name || !email || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const email_hash = await hashEmail(email);

    const { error } = await supabase.from("registrations").insert({
      title: title || null,
      first_name,
      last_name,
      email: email.toLowerCase().trim(),
      category,
      language_pref: language_pref || "fr",
      gdpr_consent: true,
      consent_timestamp: new Date().toISOString(),
      email_hash,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Duplicate email", code: "DUPLICATE_EMAIL" },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
