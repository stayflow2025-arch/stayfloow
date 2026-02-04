// ===============================
// EMAIL TEMPLATES
// ===============================

export type EmailTemplateData = Record<string, any>;

export type EmailTemplateResult = {
  subject: string;
  body: string;
};

// ------------------------------
// 1. BOOKING CONFIRMATION
// ------------------------------
export async function bookingConfirmationEmail(data: EmailTemplateData): Promise<EmailTemplateResult> {
  return {
    subject: `Confirmation de réservation #${data.reservationNumber}`,
    body: `
      <p>Bonjour ${data.customerName},</p>
      <p>Votre réservation pour <strong>${data.itemName}</strong> a bien été confirmée.</p>
      ${data.detailsHtml || ""}
      <p>L'équipe StayFloow</p>
    `,
  };
}

// ------------------------------
// 2. PARTNER WELCOME
// ------------------------------
export async function partnerWelcomeEmail(data: EmailTemplateData): Promise<EmailTemplateResult> {
  return {
    subject: `Bienvenue sur StayFloow !`,
    body: `
      <p>Bonjour ${data.hostName},</p>
      <p>Votre ${data.submissionType} "<strong>${data.submissionName}</strong>" a bien été enregistré.</p>
      <p>Référence : <strong>${data.referenceNumber}</strong></p>
      <p><a href="${data.setupLink}">Configurer mon compte</a></p>
      <p>L'équipe StayFloow</p>
    `,
  };
}

// ------------------------------
// 3. FAVORITE REMINDER
// ------------------------------
export async function favoriteReminderEmail(data: EmailTemplateData): Promise<EmailTemplateResult> {
  return {
    subject: `Vous avez aimé ${data.propertyName}`,
    body: `
      <p>Bonjour ${data.customerName},</p>
      <p>Vous avez consulté <strong>${data.propertyName}</strong>.</p>
      <p>${data.propertyDescription}</p>
      <p><a href="${data.propertyUrl}">Voir la propriété</a></p>
      <p>L'équipe StayFloow</p>
    `,
  };
}

// ------------------------------
// 4. ADMIN NOTIFICATION
// ------------------------------
export async function newSubmissionAdminNotificationEmail(data: EmailTemplateData): Promise<EmailTemplateResult> {
  return {
    subject: `Nouvelle soumission : ${data.submissionName}`,
    body: `
      <p>Type : ${data.submissionType}</p>
      <p>Nom : ${data.submissionName}</p>
      <p>Partenaire : ${data.partnerName}</p>
      <p>Email : ${data.partnerEmail}</p>
      <p>Téléphone : ${data.partnerPhone}</p>
      <p><a href="${data.adminUrl}">Voir dans l'admin</a></p>
    `,
  };
}

// ------------------------------
// 5. PASSWORD RESET
// ------------------------------
export async function passwordResetEmail(data: EmailTemplateData): Promise<EmailTemplateResult> {
  return {
    subject: `Réinitialisation de votre mot de passe`,
    body: `
      <p>Bonjour,</p>
      <p><a href="${data.resetLink}">Réinitialiser mon mot de passe</a></p>
      <p>L'équipe StayFloow</p>
    `,
  };
}

// ------------------------------
// 6. NEW BOOKING NOTIFICATION (MANQUANT)
// ------------------------------
export async function newBookingNotificationEmail(data: EmailTemplateData): Promise<EmailTemplateResult> {
  return {
    subject: `Nouvelle réservation #${data.reservationNumber} pour ${data.itemName}`,
    body: `
      <p>Bonjour ${data.partnerName},</p>
      <p>Vous avez une nouvelle réservation pour <strong>${data.itemName}</strong>.</p>
      ${data.detailsHtml || ""}
      <p>Client : ${data.customerName}</p>
      <p>Email : ${data.customerEmail}</p>
      <p>Téléphone : ${data.customerPhone}</p>
      <p>L'équipe StayFloow</p>
    `,
  };
}

// ------------------------------
// ROUTEUR
// ------------------------------
export async function getEmailTemplate(
  templateName: string,
  data: EmailTemplateData
): Promise<EmailTemplateResult> {
  switch (templateName) {
    case "bookingConfirmation":
      return bookingConfirmationEmail(data);
    case "partnerWelcome":
      return partnerWelcomeEmail(data);
    case "favoriteReminder":
      return favoriteReminderEmail(data);
    case "newSubmissionAdminNotification":
      return newSubmissionAdminNotificationEmail(data);
    case "passwordReset":
      return passwordResetEmail(data);
    case "newBookingNotification": // ← LE TEMPLATE QUI MANQUAIT
      return newBookingNotificationEmail(data);
    default:
      throw new Error(`Unknown email template: ${templateName}`);
  }
}
