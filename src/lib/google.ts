import { google, type calendar_v3 } from "googleapis";
import type { BookingFormValues } from "@/lib/validations/booking";
import { formatBudgetLabel } from "@/lib/validations/booking";

const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

type ServiceAccountJson = {
  client_email?: string;
  private_key?: string;
};

function parseServiceAccount(): { email: string; key: string } | null {
  const jsonBlob = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (jsonBlob) {
    try {
      const parsed = JSON.parse(jsonBlob) as ServiceAccountJson;
      if (parsed.client_email && parsed.private_key) {
        return {
          email: parsed.client_email,
          key: parsed.private_key.replace(/\\n/g, "\n"),
        };
      }
    } catch {
      console.error("[Google] GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.");
    }
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (email && key) {
    return { email, key };
  }

  return null;
}

export function isGoogleConfigured(): boolean {
  return parseServiceAccount() !== null;
}

function getJwtClient(scopes: string[]) {
  const credentials = parseServiceAccount();
  if (!credentials) {
    throw new Error("Google service account credentials are not configured.");
  }

  return new google.auth.JWT({
    email: credentials.email,
    key: credentials.key,
    scopes,
    subject: process.env.GOOGLE_WORKSPACE_IMPERSONATE_EMAIL || undefined,
  });
}

function bookingTimezone(): string {
  return process.env.BOOKING_TIMEZONE || "America/New_York";
}

function bookingDurationMinutes(): number {
  const parsed = Number(process.env.BOOKING_DURATION_MINUTES);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 30;
}

function addMinutesToDateTime(date: string, time: string, minutes: number) {
  const [hours, mins] = time.split(":").map(Number);
  let total = hours * 60 + mins + minutes;
  const dayOffset = Math.floor(total / (24 * 60));
  total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const endHours = String(Math.floor(total / 60)).padStart(2, "0");
  const endMins = String(total % 60).padStart(2, "0");

  if (dayOffset === 0) {
    return { date, time: `${endHours}:${endMins}` };
  }

  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + dayOffset);
  return {
    date: next.toISOString().slice(0, 10),
    time: `${endHours}:${endMins}`,
  };
}

export async function createGoogleMeetEvent(booking: BookingFormValues): Promise<{
  meetLink: string;
  eventId: string;
}> {
  const auth = getJwtClient([CALENDAR_SCOPE]);
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const timeZone = bookingTimezone();
  const duration = bookingDurationMinutes();
  const end = addMinutesToDateTime(booking.date, booking.time, duration);
  const requestId = crypto.randomUUID();

  const event: calendar_v3.Schema$Event = {
    summary: `Discovery Call — ${booking.companyName}`,
    description: [
      `Company: ${booking.companyName}`,
      `Email: ${booking.companyEmail}`,
      `Budget: ${formatBudgetLabel(booking.budget)}`,
      "",
      "Booked via Zatics Intelligence website.",
    ].join("\n"),
    start: {
      dateTime: `${booking.date}T${booking.time}:00`,
      timeZone,
    },
    end: {
      dateTime: `${end.date}T${end.time}:00`,
      timeZone,
    },
    attendees: [
      { email: booking.companyEmail },
      { email: process.env.BOOKING_ADMIN_EMAIL || "adityayadav@gmail.com" },
    ],
    conferenceData: {
      createRequest: {
        requestId,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "none",
    requestBody: event,
  });

  const meetLink =
    response.data.hangoutLink ||
    response.data.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri;

  if (!meetLink) {
    throw new Error(
      "Calendar event was created but no Google Meet link was returned. Enable Meet for the impersonated Workspace user and share the calendar with the service account."
    );
  }

  return {
    meetLink,
    eventId: response.data.id || requestId,
  };
}

export async function appendBookingToSheet(
  booking: BookingFormValues,
  meetLink: string
): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured.");
  }

  const auth = getJwtClient([SHEETS_SCOPE]);
  const sheets = google.sheets({ version: "v4", auth });
  const range = process.env.GOOGLE_SHEET_RANGE || "Sheet1!A:E";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          booking.companyName,
          booking.companyEmail,
          booking.date,
          booking.time,
          meetLink,
        ],
      ],
    },
  });
}
