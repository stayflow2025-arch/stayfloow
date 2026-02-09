"use client";

import { builder, BuilderComponent } from "@builder.io/react";
import type { PageProps } from "next";

// On initialise Builder.io avec la variable d'environnement Cloudflare Pages
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function CatchAllPage({ params }: PageProps) {
  // Next.js garantit que params est un objet, mais on sécurise
  const page = Array.isArray((params as any)?.page)
    ? (params as any).page
    : [];

  const urlPath = "/" + page.join("/");

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <BuilderComponent model="page" urlPath={urlPath} />
    </div>
  );
}
