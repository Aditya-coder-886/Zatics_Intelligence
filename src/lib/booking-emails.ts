import {
  formatBookingDate,
  formatBudgetLabel,
  formatTimeLabel,
  type BookingFormValues,
} from "@/lib/validations/booking";

const brand = {
  bg: "#070b14",
  card: "#0d1320",
  border: "#1c2740",
  text: "#e8eef8",
  muted: "#8b9bb4",
  indigo: "#6366f1",
};

function shell(title: string, body: string) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:${brand.bg};font-family:Arial,Helvetica,sans-serif;color:${brand.text};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:${brand.card};border:1px solid ${brand.border};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 12px;">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${brand.indigo};">Zatics Intelligence</p>
                <h1 style="margin:0;font-size:22px;line-height:1.3;color:${brand.text};">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 32px;">${body}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;color:${brand.muted};font-size:13px;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:${brand.text};font-size:14px;">${value}</td>
  </tr>`;
}

function meetButton(url: string) {
  return `<p style="margin:24px 0 8px;">
    <a href="${url}" style="display:inline-block;background:${brand.indigo};color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;">
      Join Google Meet
    </a>
  </p>
  <p style="margin:0;font-size:12px;color:${brand.muted};word-break:break-all;">${url}</p>`;
}

export function customerBookingEmail(booking: BookingFormValues, meetLink: string) {
  const timezone = process.env.BOOKING_TIMEZONE || "America/New_York";
  const body = `
    <p style="margin:0 0 16px;color:${brand.muted};font-size:14px;line-height:1.6;">
      Your discovery call with Zatics Intelligence is confirmed. Save the details below and join with the Google Meet link at the scheduled time.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${detailRow("Company", booking.companyName)}
      ${detailRow("Email", booking.companyEmail)}
      ${detailRow("Date", formatBookingDate(booking.date))}
      ${detailRow("Time", `${formatTimeLabel(booking.time)} (${timezone})`)}
      ${detailRow("Budget", formatBudgetLabel(booking.budget))}
    </table>
    ${meetButton(meetLink)}
  `;

  return {
    subject: `Your Zatics call is booked — ${formatBookingDate(booking.date)}`,
    html: shell("Call confirmed", body),
  };
}

export function adminBookingEmail(booking: BookingFormValues, meetLink: string) {
  const timezone = process.env.BOOKING_TIMEZONE || "America/New_York";
  const body = `
    <p style="margin:0 0 16px;color:${brand.muted};font-size:14px;line-height:1.6;">
      A new instant booking was submitted from the website.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${detailRow("Company Name", booking.companyName)}
      ${detailRow("Company Email", booking.companyEmail)}
      ${detailRow("Date", formatBookingDate(booking.date))}
      ${detailRow("Time", `${formatTimeLabel(booking.time)} (${timezone})`)}
      ${detailRow("Budget", formatBudgetLabel(booking.budget))}
      ${detailRow("Meet Link", meetLink)}
    </table>
    ${meetButton(meetLink)}
  `;

  return {
    subject: `New booking: ${booking.companyName} — ${formatBookingDate(booking.date)}`,
    html: shell("New strategy call booked", body),
  };
}
