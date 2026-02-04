<<<<<<< HEAD
export async function tailorRecommendationsViaUI(input: any) {
  return {
    message: "Recommandations générées.",
    input,
=======
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
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!recommendationToolEnabled) {
    return {
      accommodations:
        "Les recommandations personnalisées sont désactivées. Activez-les pour obtenir des suggestions adaptées.",
    };
  }

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
>>>>>>> aef7fe5b9a758da028e0f2e2d28b30a4b7b5e706
  };
}
