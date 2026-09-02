# Instant Booking Setup

This site books strategy calls from `BookACallModal`. Submit runs the `createBooking` server action, which creates a Google Calendar event with a Meet link, appends the row to Google Sheets, emails the client and `adityayadav@gmail.com` via Resend, and stores a backup row in Supabase.

Copy `.env.example` to `.env.local` and fill in the keys below.

## Required environment variables

| Key | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side inserts into `bookings` (bypasses RLS) |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `Zatics Intelligence <inquiry@zatics.com>` |
| `BOOKING_ADMIN_EMAIL` | Admin alert recipient. Defaults to `adityayadav@gmail.com` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account client email |
| `GOOGLE_PRIVATE_KEY` | Service account private key. Keep `\n` escaped as `\\n` in `.env.local` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Optional full JSON key file as a single line. Overrides email/key if set |
| `GOOGLE_WORKSPACE_IMPERSONATE_EMAIL` | Workspace user to impersonate so Meet links can be created |
| `GOOGLE_CALENDAR_ID` | Calendar ID. Use `primary` when impersonating a user |
| `GOOGLE_SHEET_ID` | Spreadsheet ID from the sheet URL |
| `GOOGLE_SHEET_RANGE` | Append range. Default `Sheet1!A:E` |
| `BOOKING_TIMEZONE` | IANA timezone for the calendar event. Default `America/New_York` |
| `BOOKING_DURATION_MINUTES` | Event length. Default `30` |

Without Google or Resend keys, the action still succeeds in preview mode (mock Meet link, skipped email/sheet). Configure every key for production.

## Google Cloud Console

1. Create or select a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable **Google Calendar API** and **Google Sheets API**.
3. Create a **service account** (IAM & Admin → Service Accounts).
4. Create a JSON key. Store `client_email` and `private_key` in `.env.local`.
5. Share the target Google Sheet with the service account email as **Editor**.
6. Share the target Google Calendar with the service account email as **Make changes to events**, or use domain-wide delegation below.

### Calendar and Meet scopes

Google Meet conference data is created on Calendar insert with:

- `https://www.googleapis.com/auth/calendar`
- `https://www.googleapis.com/auth/spreadsheets`

A service account cannot generate Meet links by itself. Use Google Workspace domain-wide delegation:

1. In Admin Console → Security → Access and data control → API controls → Domain-wide delegation, add the service account **client ID**.
2. Authorize those two scopes (comma-separated).
3. Set `GOOGLE_WORKSPACE_IMPERSONATE_EMAIL` to a Workspace user who has Google Meet enabled.
4. Set `GOOGLE_CALENDAR_ID=primary` so events land on that user’s calendar.

## Google Sheet columns

Row format matches the workflow:

`Company Name | Company Email | Date | Time | Meeting Link`

Put those headers in row 1 of `Sheet1`.

## Supabase `bookings` table

Run `supabase/bookings.sql` in the SQL editor. Prefer `SUPABASE_SERVICE_ROLE_KEY` on the server so inserts are not blocked by RLS.
