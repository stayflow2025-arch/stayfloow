// app/[...page]/page.tsx
"use client";

import { builder } from "@builder.io/react";
import BuilderContent from "../../components/BuilderContent";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || "");

export default async function CatchAllPage({ params }) {
  const resolved = await params;
  const page = resolved?.page || [];
  const path = "/" + page.join("/");

  console.log("[Builder.io] Fetching:", path);

  try {
    const content = await builder
      .get("page", {
        userAttributes: { urlPath: path },
        options: { cachebust: true },
      })
      .toPromise();

    if (!content?.data) {
      return (
        <div style={{ padding: 40, color: "red", textAlign: "center" }}>
          <h1>Page non trouvée</h1>
          <p>Slug : <strong>{path}</strong></p>
        </div>
      );
    }

    return <BuilderContent model="page" content={content.data} />; // ← model ajouté ici
  } catch (e) {
    console.error(e);
    return <div style={{ padding: 40, color: "red" }}>Erreur : {e.message}</div>;
  }
}
