// ===============================
// EMAIL TEMPLATES
// ===============================

// Template de confirmation de réservation
export function bookingConfirmationEmail(data: any) {
  return {
    subject: `Confirmation de réservation #${data.reservationNumber}`,
    body: `
      <p>Bonjour ${data.customerName},</p>

      <p>Votre réservation pour <strong>${data.itemName}</strong> a bien été confirmée.</p>

      ${data.detailsHtml || ""}

      <p>Merci pour votre confiance.</p>
      <p>L'équipe StayFloow</p>
    `,
  };
}

// Template de bienvenue partenaire
export function partnerWelcomeEmail(data: any) {
  return {
    subject: `Bienvenue sur StayFloow !`,
    body: `
      <p>Bonjour ${data.hostName},</p>

      <p>Votre ${data.submissionType} "<strong>${data.submissionName}</strong>" a bien été enregistré.</p>

      <p>Numéro de référence : <strong>${data.referenceNumber}</strong></p>

      <p>Pour configurer votre compte partenaire :</p>
      <p><a href="${data.setupLink}">Cliquez ici</a></p>

      <p>Merci et bienvenue !</p>
      <p>L'équipe StayFloow</p>
    `,
  };
}

// Template de rappel favoris
export function favoriteReminderEmail(data: any) {
  return {
    subject: `Vous avez aimé ${data.propertyName}`,
    body: `
      <p>Bonjour ${data.customerName},</p>

      <p>Vous avez récemment consulté <strong>${data.propertyName}</strong>.</p>

      <p>${data.propertyDescription}</p>

      <p><a href="${data.propertyUrl}">Voir la propriété</a></p>

      <p>L'équipe StayFloow</p>
    `,
  };
}

// Template de notification admin
export function newSubmissionAdminNotificationEmail(data: any) {
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

// Template de reset mot de passe
export function passwordResetEmail(data: any) {
  return {
    subject: `Réinitialisation de votre mot de passe`,
    body: `
      <p>Bonjour,</p>

      <p>Pour réinitialiser votre mot de passe, cliquez sur le lien suivant :</p>

      <p><a href="${data.resetLink}">Réinitialiser mon mot de passe</a></p>

      <p>L'équipe StayFloow</p>
    `,
  };
}

// ===============================
// ROUTEUR DE TEMPLATES
// ===============================
export function getEmailTemplate(templateName: string, data: any) {
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

    default:
      throw new Error(`Unknown email template: ${templateName}`);
  }
}
