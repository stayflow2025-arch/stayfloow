// app/[...page]/page.tsx
"use client";

import { builder } from "@builder.io/react";
import BuilderContent from "@/components/BuilderContent";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || "");

export default async function CatchAllPage({ params }: { params: Promise<{ page: string[] }> }) {
  try {
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

    return <BuilderContent model="page" content={content.data} />;
  } catch (error: any) {
    console.error("[Builder.io] Runtime error:", error);
    return (
      <div style={{ padding: 40, color: "red", textAlign: "center" }}>
        <h1>Erreur chargement page</h1>
        <p>{error.message || "Erreur inconnue"}</p>
        <p>Vérifie ta clé NEXT_PUBLIC_BUILDER_API_KEY et le slug dans Builder.io</p>
      </div>
    );
  }
}
