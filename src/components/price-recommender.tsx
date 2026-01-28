"use client";
import React, { useState, useTransition } from "react";
import type { Property } from "@/lib/data";
import { getPriceRecommendation } from "@/ai/flows/price-recommendation-flow";
import type { PriceRecommendationOutput } from "@/ai/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useCurrency } from "@/context/currency-context";

export function PriceRecommender({ agentProperties }: { agentProperties: Property[] }) {
  const [isPending, startTransition] = useTransition();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<PriceRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedPropertyId) {
        setError("Veuillez sélectionner une propriété.");
        return;
    }
    setError(null);
    setResult(null);

    const property = agentProperties.find(p => p.id === selectedPropertyId);
    if (!property) {
        setError("Propriété non trouvée.");
        return;
    }

    startTransition(async () => {
      // Mocked data for demonstration
      const input = {
          propertyId: property.id,
          currentPrice: property.price,
          location: property.location,
          propertyType: property.type,
          season: "high" as const,
          localEvents: "Festival culturel d'été",
          competitorPrices: [property.price * 0.9, property.price * 1.1, property.price * 1.25],
      };
      
      try {
        const response = await getPriceRecommendation(input);
        setResult(response);
      } catch (e) {
        setError("Une erreur est survenue lors de la génération de la recommandation.");
        console.error(e);
      }
    });
  };

  return (
    <Card className="bg-secondary/50 border-2 border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div>
                <CardTitle className="font-headline text-3xl flex items-center gap-2">
                    <Wand2 className="h-8 w-8 text-primary" />
                    Assistant Tarifaire IA
                </CardTitle>
                <CardDescription className="mt-2">
                  Obtenez des recommandations de prix basées sur les données du marché pour maximiser vos revenus.
                </CardDescription>
            </div>
            <form onSubmit={handleSubmit} className="flex items-end gap-2 min-w-[350px]">
                <div className="flex-grow">
                    <Label htmlFor="property-select">Propriété</Label>
                    <Select onValueChange={setSelectedPropertyId} value={selectedPropertyId}>
                        <SelectTrigger id="property-select">
                            <SelectValue placeholder="Sélectionnez une propriété" />
                        </SelectTrigger>
                        <SelectContent>
                            {agentProperties.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" disabled={isPending || !selectedPropertyId}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyse...
                    </>
                  ) : (
                    "Suggérer un Prix"
                  )}
                </Button>
            </form>
        </div>
      </CardHeader>
      {(result || error) && (
        <CardContent>
          {error && (
            <Alert variant="destructive">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <Alert variant="default" className="bg-card">
                 <AlertTitle className="font-bold text-lg text-primary">Recommandation pour {agentProperties.find(p=>p.id === selectedPropertyId)?.name}</AlertTitle>
                 <AlertDescription>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="md:col-span-1 border-r pr-6">
                            <p className="text-sm font-semibold text-muted-foreground">Prix Suggéré / Nuit</p>
                            <p className="text-4xl font-bold text-foreground">{formatPrice(result.suggestedPrice)}</p>
                             <p className="text-sm text-muted-foreground mt-2">Prix Actuel: {formatPrice(agentProperties.find(p=>p.id === selectedPropertyId)?.price || 0)}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm font-semibold text-muted-foreground">Justification de l'IA</p>
                            <p className="text-foreground/90 whitespace-pre-wrap">{result.justification}</p>
                        </div>
                    </div>
                </AlertDescription>
            </Alert>
          )}
        </CardContent>
      )}
    </Card>
  );
}
