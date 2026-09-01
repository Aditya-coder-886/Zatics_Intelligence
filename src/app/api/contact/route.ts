import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  companySize: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Server-side Zod validation
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid form input. Please verify your fields.", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, company, phone, companySize, message } = validation.data;

    console.log(`[Contact API] Form Submission Received:`, { name, email, company, companySize });

    let supabaseError = null;
    let resendError = null;

    // 1. Supabase Storage (Conditional)
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("contacts")
          .insert([
            {
              name,
              email,
              company,
              phone: phone || null,
              company_size: companySize,
              message,
              created_at: new Date().toISOString(),
            },
          ]);
        
        if (error) {
          console.error("Supabase insert error:", error);
          supabaseError = error.message;
        }
      } catch (e) {
        console.error("Supabase execution failed:", e);
        supabaseError = "Database request exception";
      }
    } else {
      console.log("[Contact API] Supabase not configured. Mocking database insert.");
    }

    // 2. Resend Email Notification (Conditional)
    if (isResendConfigured()) {
      try {
        const { error } = await resend.emails.send({
          from: "Zatics Intelligence <inquiry@zatics.com>",
          to: "sales@zatics.com", // configure recipient
          subject: `New Lead: ${name} (${company})`,
          text: `
Name: ${name}
Work Email: ${email}
Company: ${company}
Company Size: ${companySize}
Phone: ${phone || "Not provided"}

Message:
${message}
          `,
        });

        if (error) {
          console.error("Resend dispatch error:", error);
          resendError = error.message;
        }
      } catch (e) {
        console.error("Resend execution failed:", e);
        resendError = "Email dispatch exception";
      }
    } else {
      console.log("[Contact API] Resend not configured. Mocking email delivery.");
    }

    // Always succeed in development/preview if keys are missing
    return NextResponse.json({
      success: true,
      message: "Form submission processed successfully.",
      debug: {
        databaseStored: isSupabaseConfigured() && !supabaseError,
        emailDispatched: isResendConfigured() && !resendError,
      },
    });

  } catch (error) {
    console.error("[Contact API] Internal Server Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
