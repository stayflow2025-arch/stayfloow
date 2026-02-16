"use client";

import { builder, BuilderComponent } from "@builder.io/react";

// Initialisation Builder.io
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function CatchAllPage(props: any) {
  // Next.js 15 : params doit être awaited
  const params = await props.params;
  const page = Array.isArray(params?.page) ? params.page : [];
  const urlPath = "/" + page.join("/");

  // Récupération du contenu Builder.io
  const content = await builder
    .get("page", {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <BuilderComponent model="page" content={content} />
    </div>
  );
}