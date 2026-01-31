// src/ai/flows/tailor-recommendations-via-ui.ts

export async function tailorRecommendationsViaUI({
  userPreferences,
  recommendationToolEnabled,
  pastBookings,
  travelerProfiles,
}: {
  userPreferences: string;
  recommendationToolEnabled: boolean;
  pastBookings: string;
  travelerProfiles: string;
}) {
  // Simulation d’un traitement IA
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!recommendationToolEnabled) {
    return {
      accommodations:
        "Les recommandations personnalisées sont désactivées. Activez-les pour obtenir des suggestions adaptées.",
    };
  }

  // Génération simple de recommandations
  const generatedText = `
Préférences détectées : ${userPreferences}

Profil du voyageur : ${travelerProfiles}

Historique : ${pastBookings}

✨ Suggestions personnalisées :
- Appartement moderne avec vue panoramique
- Hôtel familial proche des restaurants et activités
- Bungalow calme avec terrasse privée
  `;

  return {
    accommodations: generatedText.trim(),
  };
}
