"use client";

import { builder, BuilderComponent } from "@builder.io/react";

// Init Builder seulement côté serveur (pas de ! pour éviter crash si undefined)
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

export default async function CatchAllPage({ params }: { params: { page: string[] } }) {
  try {
    const page = params?.page || [];
    const urlPath = "/" + page.join("/");

    console.log("Fetching Builder.io for path:", urlPath);

    const content = await builder
      .get("page", {
        userAttributes: { urlPath },
        options: { cachebust: true }, // Force fresh fetch pour debug
      })
      .toPromise();

    if (!content?.data) {
      console.log("No Builder.io content for:", urlPath);
      return (
        <div style={{ padding: 40, color: "red" }}>
          <h1>Page non trouvée</h1>
          <p>Aucun contenu Builder.io pour le slug : {urlPath}</p>
          <p>Vérifie que tu as une page publiée dans Builder.io avec ce slug.</p>
        </div>
      );
    }

    return (
      <div style={{ padding: 0, margin: 0 }}>
        <BuilderComponent model="page" content={content.data} />
      </div>
    );
  } catch (error: any) {
    console.error("Builder.io error on Workers:", error);
    return (
      <div style={{ padding: 40, color: "red" }}>
        <h1>Erreur chargement page dynamique</h1>
        <p>{error.message || "Erreur inconnue"}</p>
        <p>Vérifie ta clé NEXT_PUBLIC_BUILDER_API_KEY dans .env et dans le Worker (Variables & Secrets)</p>
        <p>Ray ID: {process.env.CF_RAY || "inconnu"}</p>
      </div>
    );
  }
}
