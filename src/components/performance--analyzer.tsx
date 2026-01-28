
"use client";
import React, { useState, useTransition } from "react";
import { analyzeSitePerformance } from "@/ai/flows/site-performance-analysis-flow";
import type { SitePerformanceOutput } from "@/ai/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";

export function PerformanceAnalyzer() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SitePerformanceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = () => {
    setError(null);
    setResult(null);

    startTransition(async () => {
      // Mocked data for demonstration. In a real app, this would come from analytics.
      const input = {
          totalVisits: 2580,
          totalBookings: 64,
          topSearchesWithoutBooking: [
            "Villa avec piscine Constantine",
            "Appartement Annaba vue mer",
            "Maison de vacances Skikda"
          ],
          avgLoadTime: 2.1,
          userFeedback: [
            "Je n'ai pas trouvé assez de villas à Constantine.",
            "Le site est un peu lent sur mobile.",
            "J'aimerais pouvoir filtrer par 'animaux autorisés'."
          ]
      };
      
      try {
        const response = await analyzeSitePerformance(input);
        setResult(response);
      } catch (e) {
        setError("Une erreur est survenue lors de l'analyse.");
        console.error(e);
      }
    });
  };

  const getPriorityBadgeVariant = (priority: 'Haute' | 'Moyenne' | 'Basse') => {
    switch (priority) {
      case 'Haute': return 'destructive';
      case 'Moyenne': return 'secondary';
      default: return 'outline';
    }
  };


  return (
    <Card className="bg-secondary/30">
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <Lightbulb className="h-8 w-8 text-primary" />
            Analyse de Performance IA
        </CardTitle>
        <CardDescription className="mt-2">
          Obtenez une analyse intelligente des performances de votre site et des recommandations pour améliorer la conversion.
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
                     <TrendingUp className="h-4 w-4" />
                    <AlertTitle>Résumé de la Performance</AlertTitle>
                    <AlertDescription>{result.performanceSummary}</AlertDescription>
                </Alert>

                <div>
                    <h4 className="font-semibold mb-2 text-lg">Observations Clés</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        {result.keyObservations.map((obs, i) => <li key={i}>{obs}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2 text-lg">Recommandations Actionnables</h4>
                    <div className="space-y-3">
                    {result.actionableRecommendations.map((rec, i) => (
                        <Card key={i} className="bg-background/70">
                            <CardContent className="p-4 flex items-start justify-between gap-4">
                                <p className="text-sm">{rec.recommendation}</p>
                                <Badge variant={getPriorityBadgeVariant(rec.priority)}>{rec.priority}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                    </div>
                </div>

            </div>
          ) : (
             <div className="text-center text-muted-foreground p-8">
                Cliquez sur le bouton pour lancer une nouvelle analyse.
            </div>
          )}
      </CardContent>
      <CardFooter className="border-t pt-6">
           <Button onClick={handleAnalysis} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                "Lancer une nouvelle analyse"
              )}
            </Button>
      </CardFooter>
    </Card>
  );
}
