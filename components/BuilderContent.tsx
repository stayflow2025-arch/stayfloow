// components/BuilderContent.tsx
"use client";

import { BuilderComponent } from "@builder.io/react";

interface BuilderContentProps {
  model: string;
  content?: any;
}

export default function BuilderContent({ model, content }: BuilderContentProps) {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <BuilderComponent model={model} content={content} />
    </div>
  );
}
