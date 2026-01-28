"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import type { Circuit as CircuitType } from "@/lib/data";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { useCurrency } from "@/context/currency-context";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

type CircuitCardProps = {
  circuit: CircuitType;
  viewMode?: 'grid' | 'list';
};

export function CircuitCard({ circuit, viewMode = 'grid' }: CircuitCardProps) {
  const { formatPrice } = useCurrency();

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row">
        <div className="relative w-full md:w-[350px] flex-shrink-0 h-64 group">
            <Image
                src={circuit.images[0]}
                alt={circuit.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
            />
        </div>
        <div className="flex flex-col md:flex-row flex-grow">
            <div className="flex-grow p-4 space-y-2">
                <CardTitle className="font-headline text-2xl leading-tight">
                  <Link href={`/circuits/${circuit.id}`} className="hover:text-primary transition-colors">
                    {circuit.title}
                  </Link>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {circuit.region}
                </div>
                <div className="text-sm text-muted-foreground pt-2 line-clamp-2">{circuit.description}</div>
                 <div className="pt-2 flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" /> {circuit.duration}</Badge>
                    {circuit.themes.slice(0, 3).map(theme => (
                        <Badge key={theme} variant="secondary">{theme}</Badge>
                    ))}
                </div>
            </div>
            <div className="p-4 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l flex-shrink-0 w-full md:w-56">
                <div>
                     {/* Placeholder for reviews */}
                </div>
                 <div className="text-right mt-4 w-full">
                    <p className="text-xs text-muted-foreground">à partir de</p>
                    <p className="text-xl font-bold">
                        {formatPrice(circuit.pricePerPerson)}
                    </p>
                    <p className="text-xs text-muted-foreground -mt-1">par personne</p>
                    <Button asChild className="mt-2 w-full">
                        <Link href={`/circuits/book?id=${circuit.id}`}>Voir les détails</Link>
                    </Button>
                </div>
            </div>
        </div>
      </Card>
    )
  }

  // Grid view
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="relative">
            <Carousel className="w-full h-64">
                <CarouselContent>
                    {circuit.images.map((image, index) => (
                        <CarouselItem key={index}>
                             <div className="relative h-64 w-full">
                                <Link href={`/circuits/${circuit.id}`} className="block h-full">
                                    <Image
                                        src={image}
                                        alt={`${circuit.title} photo ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </Link>
                             </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                 <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </Carousel>
            <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white drop-shadow-md">
                <Link href={`/circuits/${circuit.id}`} className="hover:underline">{circuit.title}</Link>
            </h3>
        </div>
        <CardContent className="p-4 flex-grow">
             <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                <span>{circuit.region}</span>
                <span>{circuit.duration}</span>
            </div>
             <div className="flex flex-wrap gap-2 mb-3">
                {circuit.themes.map(theme => <Badge key={theme} variant="secondary">{theme}</Badge>)}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">{circuit.description}</p>
        </CardContent>
         <CardFooter className="p-4 pt-0 flex justify-between items-end">
            <div>
                <p className="text-sm text-muted-foreground">à partir de</p>
                <p className="text-lg font-bold">
                    {formatPrice(circuit.pricePerPerson)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">/ pers.</span>
                </p>
            </div>
            <Button size="sm" asChild>
                <Link href={`/circuits/book?id=${circuit.id}`}>Découvrir</Link>
            </Button>
        </CardFooter>
    </Card>
  );
}
