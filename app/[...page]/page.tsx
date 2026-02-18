"use client";

import { builder, BuilderComponent } from "@builder.io/react";

// Init Builder (safe si clé absente)
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

export default async function CatchAllPage({ params }: { params: Promise<{ page: string[] }> }) {
  try {
    // Await params (obligatoire Next.js 15 pour pages dynamiques)
    const resolvedParams = await params;
    const page = resolvedParams?.page || [];
    const urlPath = "/" + page.join("/");

    console.log("[Builder.io] Fetching for path:", urlPath);

    const content = await builder
      .get("page", {
        userAttributes: { urlPath },
        options: { cachebust: true },
      })
      .toPromise();

    if (!content?.data) {
      console.log("[Builder.io] No content for:", urlPath);
      return (
        <div style={{ padding: 40, color: "red", textAlign: "center" }}>
          <h1>Page non trouvée</h1>
          <p>Aucun contenu dans Builder.io pour le slug : <strong>{urlPath}</strong></p>
          <p>Crée une page dans Builder.io avec ce slug et publie-la.</p>
        </div>
      );
    }

    return (
      <div style={{ padding: 0, margin: 0 }}>
        <BuilderComponent model="page" content={content.data} />
      </div>
    );
  } catch (error: any) {
    console.error("[Builder.io] Runtime error:", error);
    return (
      <div style={{ padding: 40, color: "red", textAlign: "center" }}>
        <h1>Erreur chargement page</h1>
        <p>{error.message || "Erreur inconnue"}</p>
        <p>Vérifie :</p>
        <ul style={{ textAlign: "left" }}>
          <li>Ta clé NEXT_PUBLIC_BUILDER_API_KEY dans .env et dans Workers Variables</li>
          <li>Le model "page" existe dans Builder.io</li>
          <li>Le slug existe et est publié</li>
        </ul>
        <p>Ray ID: {process.env.CF_RAY || "inconnu"}</p>
      </div>
    );
  }
}
