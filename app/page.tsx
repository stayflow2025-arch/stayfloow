import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/accueil'); // ← Change ici si tu préfères /admin ou une autre page qui marche
}
