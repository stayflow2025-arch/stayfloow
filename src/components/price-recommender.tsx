"use client";

import React, { useState, useTransition } from "react";
import type { Property } from "@/lib/data";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";

/* ------------------------------------------------------------------
   TYPE LOCAL — remplace "@/ai/types"
-------------------------------------------------------------------*/
export type PriceRecommendationOutput = {
  recommendedPrice: number;
  confidence: number; // 0–100
  reasoning: string[];
  marketFactors: string[];
};

/* ------------------------------------------------------------------
   MOCK IA — remplace "@/ai/flows/price-recommendation-flow"
-------------------------------------------------------------------*/
async function getPriceRecommendation(property: Property) {
  console.log("DEBUG: Using fallback getPriceRecommendation()");

  return new Promise<PriceRecommendationOutput>((resolve) => {
    setTimeout(() => {
      const demandScore = property.demandScore ?? 60;

      const adjustment =
        demandScore > 70
          ? 1.15
          : demandScore > 50
          ? 1.05
          : 0.95;

      const recommendedPrice = Math.round(property.price * adjustment);

      resolve({
        recommendedPrice,
        confidence:
          demandScore > 70
            ? 92
            : demandScore > 50
            ? 78
            : 65,
        reasoning: [
          `Analyse basée sur la demande actuelle pour ${property.location}.`,
          `Le bien "${property.title}" présente un score de demande de ${demandScore}/100.`,
          `Le prix actuel (${property.price} DZD) a été ajusté selon les tendances du marché.`,
        ],
        marketFactors: [
          "Tendance générale du marché dans la région",
          "Disponibilité des biens similaires",
          "Historique des réservations",
          "Attractivité du quartier",
        ],
      });
    }, 1200);
  });
}

/* ------------------------------------------------------------------
   COMPOSANT PRINCIPAL
-------------------------------------------------------------------*/

export function PriceRecommender({ property }: { property: Property }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<PriceRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRecommendation = () => {
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const response = await getPriceRecommendation(property);

        if (!response) {
          setError("Impossible d'obtenir une recommandation de prix.");
          return;
        }

        setResult(response);
      } catch (e) {
        console.error("DEBUG: Error during price recommendation:", e);
        setError("Une erreur est survenue lors de l'analyse.");
      }
    });
  };

  return (
    <Card className="bg-secondary/30">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Recommandation de Prix IA
        </CardTitle>
        <CardDescription>
          Analyse intelligente du marché pour optimiser votre tarif.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result ? (
          <div className="space-y-6">
            <Alert>
              <AlertTitle>Prix Recommandé</AlertTitle>
              <AlertDescription className="text-lg font-semibold">
                {result.recommendedPrice} DZD
              </AlertDescription>
            </Alert>

            <div>
              <h4 className="font-semibold mb-2 text-lg">Confiance</h4>
              <Badge variant="secondary">{result.confidence}%</Badge>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-lg">Raisons</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {result.reasoning.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-lg">Facteurs du Marché</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {result.marketFactors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-8">
            Cliquez sur le bouton pour obtenir une recommandation de prix.
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-6">
        <Button onClick={handleRecommendation} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            "Obtenir une recommandation"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
