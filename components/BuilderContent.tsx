// components/BuilderContent.tsx
"use client";

import dynamic from 'next/dynamic';

const DynamicBuilder = dynamic(
  () => import('@builder.io/react').then(mod => mod.BuilderComponent),
  { ssr: false }
);

interface BuilderContentProps {
  model: string;
  content?: any;  // ← maintenant facultatif (optionnel)
}

export default function BuilderContent({ model, content }: BuilderContentProps) {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <DynamicBuilder model={model} content={content} />
    </div>
  );
}
