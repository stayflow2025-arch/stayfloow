
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { MailQuestion } from "lucide-react";

export function EmailRetargetingCard() {
    return (
        <Card className="relative overflow-hidden group">
            <Image 
                src="https://picsum.photos/seed/algiers-casbah-rooftops/1200/400"
                alt="Vue sur la Casbah d'Alger"
                width={1200}
                height={400}
                className="object-cover w-full h-48 md:h-64 transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="algiers kasbah"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <CardContent className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="flex items-center gap-3 mb-2">
                    <MailQuestion className="h-8 w-8 text-secondary" />
                    <h3 className="font-headline text-2xl md:text-3xl font-bold">Toujours intéressé par Alger ?</h3>
                </div>
                <p className="max-w-2xl text-white/90 mb-4">
                    Les meilleures offres partent vite ! Ne manquez pas l'opportunité de découvrir la ville blanche.
                </p>
                <Link href="/search?location=Alger" passHref>
                    <Button variant="secondary" size="lg">Voir les meilleures offres</Button>
                </Link>
            </CardContent>
        </Card>
    )
}
