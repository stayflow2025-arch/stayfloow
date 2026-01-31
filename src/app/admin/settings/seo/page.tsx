
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Wand2, Lightbulb, FileText, Key, Dot } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SeoOptimizerPage() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [pageType, setPageType] = useState('homepage');
  const [countryFocus, setCountryFocus] = useState('Both');
  const [entityName, setEntityName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("La fonctionnalité d'optimisation IA est temporairement désactivée pour maintenance.");
    setResult(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
       <div className="mb-6">
            <h1 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Search className="h-8 w-8 text-primary" />
                Optimiseur de Mots-Clés SEO
            </h1>
            <p className="text-muted-foreground mt-2">Utilisez l'IA pour générer des titres, des descriptions et des mots-clés optimisés afin d'améliorer votre classement sur les moteurs de recherche.</p>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de l'analyse</CardTitle>
          <CardDescription>
            Configurez le contexte pour que l'IA génère les recommandations les plus pertinentes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 items-end gap-4">
              <div className="space-y-2">
                <Label htmlFor="page-type">Type de page</Label>
                <Select value={pageType} onValueChange={(v) => setPageType(v as any)}>
                    <SelectTrigger id="page-type"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="homepage">Page d'accueil</SelectItem>
                        <SelectItem value="category">Page catégorie (Hôtels, Voitures...)</SelectItem>
                        <SelectItem value="search">Page de résultats de recherche</SelectItem>
                        <SelectItem value="listing">Page de détail (Hôtel, Ville...)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="country-focus">Marché Cible</Label>
                <Select value={countryFocus} onValueChange={(v) => setCountryFocus(v as any)}>
                    <SelectTrigger id="country-focus"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Algeria">Algérie</SelectItem>
                        <SelectItem value="Egypt">Égypte</SelectItem>
                        <SelectItem value="Both">Les deux</SelectItem>
                    </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="entity-name">Nom de l'entité (Optionnel)</Label>
                <Input 
                    id="entity-name"
                    placeholder="Ex: Alger, Hôtel El-Aurassi..."
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isPending} className="w-full md:w-auto">
                {isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyse...</>
                ) : (
                  <><Wand2 className="mr-2 h-4 w-4" /> Lancer l'optimisation</>
                )}
              </Button>
          </form>
        </CardContent>
      </Card>
      
       {(result || error) && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Résultats de l'Optimisation SEO</CardTitle>
            </CardHeader>
            <CardContent>
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {result && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                             <h4 className="font-semibold text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary"/>Titre & Méta Description</h4>
                             <div className="p-4 border rounded-md bg-muted/50">
                                 <p className="font-mono text-sm text-foreground"><strong>Titre:</strong> {result.suggestedTitle}</p>
                                 <p className="font-mono text-sm text-muted-foreground mt-2"><strong>Description:</strong> {result.suggestedDescription}</p>
                             </div>
                        </div>
                        <div className="space-y-2">
                             <h4 className="font-semibold text-lg flex items-center gap-2"><Key className="h-5 w-5 text-primary"/>Mots-Clés Suggérés</h4>
                             <div className="flex flex-wrap gap-2">
                                {result.primaryKeywords.map((kw: string) => <Badge key={kw} variant="default">{kw}</Badge>)}
                                {result.secondaryKeywords.map((kw: string) => <Badge key={kw} variant="secondary">{kw}</Badge>)}
                             </div>
                        </div>
                         <div className="space-y-2">
                             <h4 className="font-semibold text-lg flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>Recommandations Stratégiques</h4>
                             <ul className="space-y-2">
                                {result.strategicRecommendations.map((rec: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Dot className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{rec}</span>
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
       )}

    </div>
  );
}
