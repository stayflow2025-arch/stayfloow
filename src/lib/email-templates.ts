
// This file acts as a service to manage email templates.
// It uses default templates for server-side rendering.
// Customization is handled by a client-side hook that can override these defaults.

export type EmailTemplate = {
    subject: string;
    body: string;
};

export type EmailTemplateName = 'partnerWelcome' | 'bookingConfirmation' | 'newBookingNotification' | 'favoriteReminder' | 'newSubmissionAdminNotification' | 'passwordReset';

export const defaultTemplates: Record<EmailTemplateName, EmailTemplate> = {
    partnerWelcome: {
        subject: `Bienvenue : Votre {{submissionType}} est approuvé`,
        body: `Bonjour {{hostName}},

Nous sommes ravis de vous accueillir dans la communauté de partenaires StayFloow ! Merci de nous faire confiance pour votre {{submissionType}}.

Bonne nouvelle ! Votre soumission pour "{{submissionName}}" a été approuvée et est maintenant en ligne.
Votre numéro de référence est le : <strong>{{referenceNumber}}</strong>.

Pour finaliser la création de votre compte et accéder à votre tableau de bord, veuillez définir votre mot de passe en cliquant sur le lien ci-dessous :
<a href="{{setupLink}}" style="display: inline-block; background-color: #10b981; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 10px;">Configurer mon compte et mon mot de passe</a>

{{cleaningServiceMessage}}

<strong>Rappel de nos services et règlement :</strong>
- La qualité de votre annonce (photos, description) est essentielle pour attirer les clients.
- La communication avec les clients doit être rapide et professionnelle.
- StayFloow retient une commission de <strong>20%</strong> sur chaque réservation confirmée pour les services de mise en relation, de paiement sécurisé et de marketing.

Nous sommes impatients de collaborer avec vous !

Cordialement,
L'équipe StayFloow
`
    },
    bookingConfirmation: {
        subject: `Confirmation de votre réservation StayFloow #{{reservationNumber}}`,
        body: `Bonjour {{customerName}}, et merci pour votre confiance !

Nous avons le plaisir de vous confirmer votre réservation pour <strong>{{itemName}}</strong>.
Votre numéro de réservation est le : <strong>{{reservationNumber}}</strong>.

<strong>Détails de la réservation :</strong>
{{detailsHtml}}

<strong>Coordonnées de votre {{itemType}} :</strong>
Vous pouvez désormais contacter directement votre {{itemType}} pour toute question ou pour finaliser les détails de votre arrivée.
Nom : {{hostName}}
Email : {{hostEmail}}
Téléphone : {{hostPhone}}

Nous vous souhaitons un excellent séjour !

Cordialement,
L'équipe StayFloow
`
    },
    newBookingNotification: {
        subject: `Nouvelle réservation pour {{itemName}} (#{{reservationNumber}})`,
        body: `Bonjour {{partnerName}},

Félicitations ! Vous avez une nouvelle réservation pour <strong>{{itemName}}</strong>.
Un événement a été ajouté en pièce jointe. Vous pouvez l'ajouter à votre calendrier pour ne pas oublier la réservation.

<strong>Détails de la réservation :</strong>
Numéro de réservation : {{reservationNumber}}
{{detailsHtml}}

<strong>Informations sur le client :</strong>
Nom : {{customerName}}
Email : {{customerEmail}}
Téléphone : {{customerPhone}}

N'hésitez pas à contacter le client pour l'accueillir et confirmer les détails de son arrivée.

Cordialement,
L'équipe StayFloow
`
    },
    favoriteReminder: {
        subject: `Un de vos favoris vous attend, {{customerName}} !`,
        body: `Bonjour {{customerName}},

Vous avez récemment montré de l'intérêt pour <strong>{{propertyName}}</strong> et nous ne voudrions pas que vous passiez à côté !

<div style="border: 1px solid #eee; border-radius: 8px; margin: 16px 0; overflow: hidden;">
  <img src="{{propertyImage}}" alt="Image de {{propertyName}}" style="width: 100%; height: auto; max-height: 300px; object-fit: cover;">
  <div style="padding: 16px;">
    <h3 style="margin-top: 0; font-size: 1.2em;">{{propertyName}}</h3>
    <p style="color: #666; font-size: 0.9em;">{{propertyDescription}}</p>
    <a href="{{propertyUrl}}" style="display: inline-block; background-color: #10b981; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 10px;">Voir les disponibilités</a>
  </div>
</div>

Les disponibilités partent vite. N'attendez pas pour réserver le séjour de vos rêves !

Cordialement,
L'équipe StayFloow
`
    },
    newSubmissionAdminNotification: {
        subject: `Nouvelle soumission en attente : {{submissionName}}`,
        body: `Bonjour Admin,

Une nouvelle soumission de type <strong>{{submissionType}}</strong> est en attente de votre approbation.

<strong>Détails :</strong>
- Nom de l'annonce : {{submissionName}}
- Nom du partenaire : {{partnerName}}
- Email du partenaire : {{partnerEmail}}
- Téléphone du partenaire : {{partnerPhone}}

Veuillez vous connecter à votre <a href="{{adminUrl}}">panneau d'administration</a> pour l'examiner.

Cordialement,
Votre système StayFloow
`
    },
    passwordReset: {
        subject: `Réinitialisez votre mot de passe StayFloow`,
        body: `Bonjour,

Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour continuer.

<a href="{{resetLink}}" style="display: inline-block; background-color: #10b981; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 10px;">Réinitialiser mon mot de passe</a>

Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.

Cordialement,
L'équipe StayFloow
`
    }
};

const renderTemplate = (templateString: string, data: Record<string, any>): string => {
    let processed = templateString;
    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        processed = processed.replace(regex, data[key]);
    }
    // Convert newlines to <br> for HTML email, except inside the HTML block for the favorite reminder
    if (!data.propertyImage) { // A simple check to see if it's the favorite email
        return processed.replace(/\n/g, '<br>');
    }
    return processed;
}


// This function should only be called from server components/actions.
// It always returns the default template.
// Client components should use the useEmailTemplate hook to get potentially customized templates.
export async function getEmailTemplate(name: EmailTemplateName, data: Record<string, any>): Promise<EmailTemplate> {
    const templateSource = defaultTemplates[name];
    
    const processedData = { ...data };

    // Specific logic for cleaning service message in partner welcome email
    if (name === 'partnerWelcome' && processedData.cleaningServiceRequested) {
        processedData.cleaningServiceMessage = `
            <div style="background-color: #f0f8ff; border-left: 4px solid #1e90ff; padding: 12px; margin: 16px 0; line-height: 1.6;">
              <strong>Service de Nettoyage :</strong> Vous avez souscrit à notre service de nettoyage professionnel pour 9000 DZD. Notre équipe vous contactera prochainement pour organiser l'intervention avant vos premières réservations.
            </div>
        `;
    } else if (name === 'partnerWelcome') {
        processedData.cleaningServiceMessage = '';
    }

    const processedSubject = renderTemplate(templateSource.subject, processedData).replace(/<br>/g, ''); // Subject should not have line breaks
    
    let processedBody : string;
    // For favorite reminder, we don't want to replace \n with <br> as it's already HTML
    if (name === 'favoriteReminder' || name === 'passwordReset' || name === 'partnerWelcome') {
        processedBody = renderTemplate(templateSource.body, processedData);
    } else {
        processedBody = renderTemplate(templateSource.body, processedData).replace(/\n/g, '<br>');
    }
    
    return { subject: processedSubject, body: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">${processedBody}</div>` };
}

    

}
