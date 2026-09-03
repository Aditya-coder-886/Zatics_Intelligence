"use server";

import { headers } from "next/headers";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import {
  appendBookingToSheet,
  createGoogleMeetEvent,
  isGoogleConfigured,
} from "@/lib/google";
import { adminBookingEmail, customerBookingEmail } from "@/lib/booking-emails";
import { resend, isResendConfigured } from "@/lib/resend";
import { getSupabaseServer, isSupabaseServerConfigured } from "@/lib/supabase-server";
import { checkRateLimit, getClientIpFromHeaders } from "@/lib/rate-limit";

const ADMIN_EMAIL = process.env.BOOKING_ADMIN_EMAIL || "adityayadav@gmail.com";

// In preview/dev we allow mock Meet; in production we fail-closed if Google not configured.
const isProduction = process.env.NODE_ENV === "production";

export type CreateBookingResult =
  | { success: true; meetLink: string }
  | { success: false; error: string };

function fromAddress() {
  return process.env.RESEND_FROM_EMAIL || "Zatics Intelligence <inquiry@zatics.com>";
}

async function persistBooking(
  booking: BookingFormValues,
  meetLink: string,
  calendarEventId: string | null
) {
  if (!isSupabaseServerConfigured()) {
    console.log("[Booking] Supabase not configured. Skipping insert.");
    return;
  }

  const supabase = getSupabaseServer();
  const { error } = await supabase.from("bookings").insert({
    company_name: booking.companyName,
    company_email: booking.companyEmail,
    booking_date: booking.date,
    booking_time: booking.time,
    budget: booking.budget,
    meet_link: meetLink,
    calendar_event_id: calendarEventId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function sendBookingEmails(booking: BookingFormValues, meetLink: string) {
  if (!isResendConfigured()) {
    console.log("[Booking] Resend not configured. Skipping emails.");
    return;
  }

  const customer = customerBookingEmail(booking, meetLink);
  const admin = adminBookingEmail(booking, meetLink);

  const [customerResult, adminResult] = await Promise.all([
    resend.emails.send({
      from: fromAddress(),
      to: booking.companyEmail,
      subject: customer.subject,
      html: customer.html,
    }),
    resend.emails.send({
      from: fromAddress(),
      to: ADMIN_EMAIL,
      subject: admin.subject,
      html: admin.html,
    }),
  ]);

  if (customerResult.error) {
    throw new Error(customerResult.error.message);
  }
  if (adminResult.error) {
    throw new Error(adminResult.error.message);
  }
}

export async function createBooking(input: unknown): Promise<CreateBookingResult> {
  // Allow optional honeypot field without failing schema (spam bots fill it)
  const raw = input as Record<string, unknown> | null;
  if (raw && typeof raw === "object" && "website" in raw) {
    const honeypot = String((raw as Record<string, unknown>).website ?? "").trim();
    if (honeypot) {
      // Silently succeed to avoid bot feedback, but do not create booking
      console.warn("[Booking] Honeypot triggered, dropping request.");
      return { success: false, error: "Invalid booking details." };
    }
  }

  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid booking details.";
    return { success: false, error: firstIssue };
  }

  const booking = parsed.data;

  // Rate limiting: 5 bookings per 10 min per IP + 3 per 10 min per email
  try {
    const hdrs = await headers();
    const ip = getClientIpFromHeaders(hdrs as unknown as Headers);
    const ipCheck = checkRateLimit(`booking:ip:${ip}`, 5, 10 * 60 * 1000);
    if (!ipCheck.allowed) {
      return { success: false, error: "Too many booking attempts. Please try again in a few minutes." };
    }
    const emailKey = booking.companyEmail.toLowerCase().trim();
    const emailCheck = checkRateLimit(`booking:email:${emailKey}`, 3, 10 * 60 * 1000);
    if (!emailCheck.allowed) {
      return { success: false, error: "Too many booking attempts for this email. Please try again later." };
    }
  } catch {
    // headers() may fail in some test contexts — do not block booking
  }

  try {
    let meetLink = "";
    let calendarEventId: string | null = null;

    if (isGoogleConfigured()) {
      const event = await createGoogleMeetEvent(booking);
      meetLink = event.meetLink;
      calendarEventId = event.eventId;
    } else if (isProduction) {
      console.error("[Booking] Google APIs not configured in production. Rejecting booking.");
      return { success: false, error: "Booking service is temporarily unavailable. Please email us directly at hello@zatics.com." };
    } else {
      console.log("[Booking] Google APIs not configured. Using preview Meet link (dev only).");
      meetLink = `https://meet.google.com/preview-${crypto.randomUUID().slice(0, 8)}`;
    }

    const sideEffects: Promise<void>[] = [
      persistBooking(booking, meetLink, calendarEventId),
      sendBookingEmails(booking, meetLink),
    ];

    if (isGoogleConfigured() && process.env.GOOGLE_SHEET_ID) {
      sideEffects.push(appendBookingToSheet(booking, meetLink));
    } else {
      console.log("[Booking] Google Sheet not configured. Skipping append.");
    }

    const results = await Promise.allSettled(sideEffects);
    const failures = results.filter((result) => result.status === "rejected");

    if (failures.length > 0) {
      failures.forEach((failure) => {
        if (failure.status === "rejected") {
          console.error("[Booking] Side-effect failed:", failure.reason);
        }
      });
      return {
        success: false,
        error:
          "Your Meet link was created, but we could not finish saving or notifying. Please try again or email us directly.",
      };
    }

    return { success: true, meetLink };
  } catch (error) {
    console.error("[Booking] Failed to create booking:", error);
    // Do not leak internal error messages to client (e.g., Google key errors, sheet not found)
    const message = error instanceof Error ? error.message : "";
    // Allow only safe user-facing messages (validation already handled above)
    const isSafeMessage = message.includes("Calendar event was created but no Google Meet link");
    return {
      success: false,
      error: isSafeMessage ? message : "Unable to complete your booking. Please try again or email hello@zatics.com.",
    };
  }
}
