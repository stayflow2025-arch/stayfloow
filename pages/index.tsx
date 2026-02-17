import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ← Change '/accueil' ici si ta page principale est différente (ex: '/home', '/dashboard')
    router.replace('/accueil');
  }, [router]);

  return null; // Pas de rendu visible pendant la redirection
}
