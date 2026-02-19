"use client";

import dynamic from 'next/dynamic';

const DynamicBuilder = dynamic(
  () => import('@builder.io/react').then(mod => mod.BuilderComponent),
  { ssr: false } // ← C'EST ÇA QUI ÉVITE LE CRASH SERVEUR
);

export default function BuilderContent({ model = "page", content }) {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <DynamicBuilder model={model} content={content} />
    </div>
  );
}
