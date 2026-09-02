"use server";

import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import {
  appendBookingToSheet,
  createGoogleMeetEvent,
  isGoogleConfigured,
} from "@/lib/google";
import { adminBookingEmail, customerBookingEmail } from "@/lib/booking-emails";
import { resend, isResendConfigured } from "@/lib/resend";
import { getSupabaseServer, isSupabaseServerConfigured } from "@/lib/supabase-server";

const ADMIN_EMAIL = process.env.BOOKING_ADMIN_EMAIL || "adityayadav@gmail.com";

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
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid booking details.";
    return { success: false, error: firstIssue };
  }

  const booking = parsed.data;

  try {
    let meetLink = "";
    let calendarEventId: string | null = null;

    if (isGoogleConfigured()) {
      const event = await createGoogleMeetEvent(booking);
      meetLink = event.meetLink;
      calendarEventId = event.eventId;
    } else {
      console.log("[Booking] Google APIs not configured. Using preview Meet link.");
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
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to complete your booking. Please try again.",
    };
  }
}
