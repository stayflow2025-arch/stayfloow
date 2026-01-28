
'use client';
import { properties } from "@/lib/data";
import { PropertyCard } from "./property-card";
import { Eye, LayoutGrid, Lightbulb, List } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useLanguage } from "@/context/language-context";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function PersonalizedRecommendations() {
  const { t } = useLanguage();
  // Simulating recently viewed and similar properties
  const recentlyViewed = properties.slice(2, 6);
  const similarToLastViewed = properties.slice(4, 8);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
                <Eye className="h-7 w-7 text-primary" />
                <h2 className="text-3xl font-headline font-bold">{t('recently_viewed')}</h2>
            </div>
            <div className="flex items-center gap-2">
                 <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                    <LayoutGrid className="h-5 w-5" />
                 </Button>
                 <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                    <List className="h-5 w-5" />
                 </Button>
            </div>
        </div>
        <div className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
        )}>
            {recentlyViewed.map((property) => (
                <PropertyCard key={property.id} property={property} viewMode={viewMode} />
            ))}
        </div>
      </div>
      <div>
         <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
                <Lightbulb className="h-7 w-7 text-primary" />
                <h2 className="text-3xl font-headline font-bold">{t('inspired_by_visit')}</h2>
            </div>
             <div className="flex items-center gap-2">
                 <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                    <LayoutGrid className="h-5 w-5" />
                 </Button>
                 <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                    <List className="h-5 w-5" />
                 </Button>
            </div>
        </div>
         <div className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
        )}>
            {similarToLastViewed.map((property) => (
                 <PropertyCard key={property.id} property={property} viewMode={viewMode} />
            ))}
        </div>
      </div>
    </div>
  );
}
