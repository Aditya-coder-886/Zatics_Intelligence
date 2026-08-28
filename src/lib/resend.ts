import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "re_placeholder_key";

export const resend = new Resend(resendApiKey);

export const isResendConfigured = () => {
  return (
    process.env.RESEND_API_KEY !== undefined &&
    process.env.RESEND_API_KEY !== "" &&
    !process.env.RESEND_API_KEY.includes("placeholder")
  );
};
