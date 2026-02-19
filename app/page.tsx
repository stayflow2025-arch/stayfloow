// app/page.tsx
"use client";

import BuilderContent from "../components/BuilderContent"; // ← chemin relatif depuis app/page.tsx

export default function Home() {
  return <BuilderContent model="page" />;
}
