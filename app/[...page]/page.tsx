"use client";

import { builder, BuilderComponent } from "@builder.io/react";

// On initialise Builder.io avec la variable d'environnement Cloudflare Pages
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function CatchAllPage({
  params,
}: {
  params: { page?: string[] };
}) {
  // Sécurisation : si params.page n'est pas un tableau, on force un tableau vide
  const page = Array.isArray(params?.page) ? params.page : [];

  const urlPath = "/" + page.join("/");

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <BuilderComponent model="page" urlPath={urlPath} />
    </div>
  );
}
