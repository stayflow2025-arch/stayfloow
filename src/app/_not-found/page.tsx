import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page non trouvée</h2>
        <p className="text-lg text-muted-foreground mb-8">
          La page que vous cherchez n'existe pas ou a été supprimée.
        </p>
        <Link href="/">
          <Button size="lg">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
}
