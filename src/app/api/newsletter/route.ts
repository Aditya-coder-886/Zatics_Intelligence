import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Server-side Zod validation
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    console.log(`[Newsletter API] Subscription requested: ${email}`);

    let supabaseError = null;
    let resendError = null;

    // 1. Supabase Storage and Duplicate Prevention (Conditional)
    if (isSupabaseConfigured()) {
      try {
        // Check for duplicates
        const { data: existing, error: checkError } = await supabase
          .from("newsletter_subscribers")
          .select("id")
          .eq("email", email)
          .single();

        if (checkError && checkError.code !== "PGRST116") { // PGRST116 means row not found
          console.error("Supabase check error:", checkError);
        }

        if (existing) {
          return NextResponse.json(
            { error: "This email address is already subscribed to Zatics briefs." },
            { status: 400 }
          );
        }

        // Insert new record
        const { error: insertError } = await supabase
          .from("newsletter_subscribers")
          .insert([{ email, created_at: new Date().toISOString() }]);

        if (insertError) {
          console.error("Supabase insert error:", insertError);
          supabaseError = insertError.message;
        }
      } catch (e) {
        console.error("Supabase newsletter execution failed:", e);
        supabaseError = "Database request exception";
      }
    } else {
      console.log("[Newsletter API] Supabase not configured. Mocking subscriber database write.");
    }

    // 2. Resend Welcome Email (Conditional)
    if (isResendConfigured()) {
      try {
        const { error } = await resend.emails.send({
          from: "Zatics Intelligence <briefs@zatics.com>",
          to: email,
          subject: "Welcome to Zatics Intelligence Briefings",
          text: `
Hello,

Thank you for subscribing to Zatics Intelligence briefings.

We will keep you updated with the latest in enterprise AI systems, cognitive workflow automation pipelines, and semantic data architectures.

Welcome aboard,
The Zatics Team
          `,
        });

        if (error) {
          console.error("Resend welcome email dispatch error:", error);
          resendError = error.message;
        }
      } catch (e) {
        console.error("Resend welcome email failed:", e);
        resendError = "Email dispatch exception";
      }
    } else {
      console.log("[Newsletter API] Resend not configured. Mocking welcome email delivery.");
    }

    return NextResponse.json({
      success: true,
      message: "Subscription active.",
      debug: {
        databaseStored: isSupabaseConfigured() && !supabaseError,
        emailDispatched: isResendConfigured() && !resendError,
      },
    });

  } catch (error) {
    console.error("[Newsletter API] Internal Server Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
