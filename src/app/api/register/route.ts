import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      first_name,
      last_name,
      email,
      phone,
      organisation,
      role,
      category,
      language_pref,
      gdpr_consent,
    } = body;

    if (!first_name || !last_name || !email || !category || !gdpr_consent) {
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

    const { error } = await supabase.from("registrations").insert({
      first_name,
      last_name,
      email: email.toLowerCase().trim(),
      phone: phone || null,
      organisation: organisation || null,
      role: role || null,
      category,
      language_pref: language_pref || "fr",
      gdpr_consent,
      consent_timestamp: new Date().toISOString(),
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
