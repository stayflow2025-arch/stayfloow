import { Resend } from "resend";
import { getEmailTemplate } from "./email-templates";
import type { Property } from "./data";

// ------------------------------
// CONFIG RESEND
// ------------------------------
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("RESEND_API_KEY is not set. Emails will not be sent.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// ------------------------------
// TYPES
// ------------------------------
type BaseEmailPayload = {
  to: string;
  templateName: string;
  data: Record<string, any>;
};

type BookingEmailPayload = BaseEmailPayload & {
  templateName: "bookingConfirmation";
  data: {
    reservationNumber: string;
    customerName: string;
    itemName: string;
    detailsHtml?: string;
  };
};

type PartnerWelcomeEmailPayload = BaseEmailPayload & {
  templateName: "partnerWelcome";
  data: {
    hostName: string;
    submissionType: string;
    submissionName: string;
    referenceNumber: string;
    setupLink: string;
  };
};

type FavoriteReminderEmailPayload = BaseEmailPayload & {
  templateName: "favoriteReminder";
  data: {
    customerName: string;
    propertyName: string;
    propertyDescription: string;
    propertyUrl: string;
  };
};

type NewSubmissionAdminNotificationPayload = BaseEmailPayload & {
  templateName: "newSubmissionAdminNotification";
  data: {
    submissionType: string;
    submissionName: string;
    partnerName: string;
    partnerEmail: string;
    partnerPhone: string;
    adminUrl: string;
  };
};

type PasswordResetEmailPayload = BaseEmailPayload & {
  templateName: "passwordReset";
  data: {
    resetLink: string;
  };
};

export type SendEmailPayload =
  | BookingEmailPayload
  | PartnerWelcomeEmailPayload
  | FavoriteReminderEmailPayload
  | NewSubmissionAdminNotificationPayload
  | PasswordResetEmailPayload;

// ------------------------------
// FONCTION PRINCIPALE D’ENVOI
// ------------------------------
export async function sendTemplatedEmail(payload: SendEmailPayload) {
  if (!resend) {
    console.warn("Resend client not configured. Skipping email send.");
    return { skipped: true };
  }

  const { to, templateName, data } = payload;

  const { subject, body } = await getEmailTemplate(templateName, data);

  const result = await resend.emails.send({
    from: "StayFloow <no-reply@stayfloow.com>",
    to,
    subject,
    html: body,
  });

  return result;
}
