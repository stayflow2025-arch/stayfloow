"use client";

import Image from "next/image";
import Link from "next/link";
import { Car, Fuel, Gauge, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

import type { Car as CarType } from "@/lib/data";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { useCurrency } from "@/context/currency-context";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

type CarCardProps = {
  car: CarType;
  viewMode?: 'grid' | 'list';
};

export function CarCard({ car, viewMode = 'grid' }: CarCardProps) {
  const { formatPrice } = useCurrency();
  const imageUrl = car.images && car.images.length > 0 ? car.images[0] : "https://picsum.photos/seed/car-placeholder/1200/800";


  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row">
        <div className="relative w-full md:w-[350px] flex-shrink-0 h-64 group">
            <Image
                src={imageUrl}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
            />
        </div>
        <div className="flex flex-col md:flex-row flex-grow">
            <div className="flex-grow p-4 space-y-2">
                <CardTitle className="font-headline text-2xl leading-tight">
                  <Link href={`/cars/${car.id}`} className="hover:text-primary transition-colors">
                    {car.make} {car.model}
                  </Link>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{car.type}</Badge>
                    <span>·</span>
                    <span>{car.location}</span>
                </div>
                <div className="pt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Users className="h-4 w-4" /> {car.seats} places</div>
                    <div className="flex items-center gap-2"><Settings className="h-4 w-4" /> {car.transmission}</div>
                    <div className="flex items-center gap-2"><Fuel className="h-4 w-4" /> {car.fuelType}</div>
                    <div className="flex items-center gap-2"><Gauge className="h-4 w-4" /> {car.year}</div>
                </div>
            </div>
            <div className="p-4 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l flex-shrink-0 w-full md:w-56">
                <div>
                     {/* Placeholder for reviews */}
                </div>
                 <div className="text-right mt-4 w-full">
                    <p className="text-xl font-bold">
                        {formatPrice(car.pricePerDay)}
                    </p>
                    <p className="text-xs text-muted-foreground -mt-1">par jour</p>
                    <Button asChild className="mt-2 w-full">
                        <Link href={`/cars/book?id=${car.id}`}>Réserver maintenant</Link>
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
             <Carousel className="w-full h-56">
                <CarouselContent>
                    {(car.images && car.images.length > 0 ? car.images : [imageUrl]).map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-56 w-full">
                                <Link href={`/cars/${car.id}`} className="block h-full">
                                    <Image
                                        src={image}
                                        alt={`${car.make} ${car.model} photo ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Carousel>
        </div>
        <CardContent className="p-4 flex-grow">
             <div className="flex justify-between items-start">
                <div>
                    <div className="text-sm text-muted-foreground">{car.type}</div>
                    <h3 className="font-headline text-lg font-bold">
                         <Link href={`/cars/${car.id}`} className="hover:text-primary transition-colors">
                            {car.make} {car.model}
                        </Link>
                    </h3>
                </div>
                <Badge variant="outline">{car.year}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{car.location}</p>
        </CardContent>
        <CardContent className="p-4 pt-0">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{car.transmission}</span>
                <span>{car.seats} places</span>
                <span>{car.fuelType}</span>
            </div>
        </CardContent>
         <CardFooter className="p-4 pt-0 flex justify-between items-end">
            <p className="text-lg font-bold">
                {formatPrice(car.pricePerDay)}{" "}
                <span className="text-sm font-normal text-muted-foreground">/ jour</span>
            </p>
            <Button size="sm" asChild>
                <Link href={`/cars/book?id=${car.id}`}>Réserver</Link>
            </Button>
        </CardFooter>
    </Card>
  );
}
