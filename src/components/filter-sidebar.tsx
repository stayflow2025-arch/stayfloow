"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { amenities as allAmenities, propertyTypes as allPropertyTypes, facilityAmenities, mealOptions, topRatedFeatures, placesOfInterest } from '@/lib/data';
import { useCurrency } from '@/context/currency-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Image from 'next/image';
import { Star } from 'lucide-react';

export function FilterSidebar({ resultCount }: { resultCount: number }) {
  const { formatPrice, convertFromDZD, currency } = useCurrency();
  const maxPriceDZD = 50000;
  const maxPriceConverted = Math.ceil(convertFromDZD(maxPriceDZD));

  const [priceRange, setPriceRange] = useState([convertFromDZD(1000), convertFromDZD(25000)]);
  const starRatings = [5, 4, 3, 2, 1];
  const houseRules = ['Animaux autorisés'];

  return (
    <Card className="sticky top-24">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-xl">Filtres</CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[calc(100vh-12rem)] overflow-y-auto">
        <Accordion type="multiple" defaultValue={['budget', 'popular']} className="w-full">
          
          <AccordionItem value="budget">
            <AccordionTrigger className="p-4 font-semibold">Votre budget (par nuit)</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-4">
              <Slider
                value={priceRange}
                max={maxPriceConverted}
                step={currency === 'DZD' ? 1000 : 10}
                onValueChange={setPriceRange}
                className="mt-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{formatPrice(priceRange[0], true)}</span>
                <span>{formatPrice(priceRange[1], true)}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="popular">
            <AccordionTrigger className="p-4 font-semibold">Filtres populaires</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
              {['Piscine', 'Wifi', 'Parking', 'Climatisation', 'Vue sur la mer'].map(item => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`pop-${item}`} />
                  <Label htmlFor={`pop-${item}`} className="font-normal">{item}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

           <AccordionItem value="stars">
                <AccordionTrigger className="p-4 font-semibold">Classement par étoiles</AccordionTrigger>
                <AccordionContent className="p-4 pt-0 space-y-3">
                {starRatings.map(star => (
                    <div key={star} className="flex items-center space-x-2">
                    <Checkbox id={`star-${star}`} />
                    <Label htmlFor={`star-${star}`} className="font-normal flex items-center gap-1">
                        {star} <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    </Label>
                    </div>
                ))}
                </AccordionContent>
            </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger className="p-4 font-semibold">Note des commentaires</AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <RadioGroup defaultValue="any" className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="r-any" />
                    <Label htmlFor="r-any" className="font-normal">Tous</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="9" id="r-9" />
                    <Label htmlFor="r-9" className="font-normal">Fabuleux : 9+</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="8" id="r-8" />
                    <Label htmlFor="r-8" className="font-normal">Très bon : 8+</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7" id="r-7" />
                    <Label htmlFor="r-7" className="font-normal">Bon : 7+</Label>
                  </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="propertyType">
            <AccordionTrigger className="p-4 font-semibold">Type d'établissement</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
                {allPropertyTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type} />
                    <Label htmlFor={type} className="font-normal">{type}</Label>
                </div>
                ))}
            </AccordionContent>
          </AccordionItem>

           <AccordionItem value="amenities">
            <AccordionTrigger className="p-4 font-semibold">Équipements de l'hébergement</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
                {allAmenities.filter(a => a !== 'Animaux autorisés').map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox id={amenity} />
                    <Label htmlFor={amenity} className="font-normal">{amenity}</Label>
                </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="houseRules">
            <AccordionTrigger className="p-4 font-semibold">Règles de la maison</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
                {houseRules.map(rule => (
                <div key={rule} className="flex items-center space-x-2">
                    <Checkbox id={`rule-${rule}`} />
                    <Label htmlFor={`rule-${rule}`} className="font-normal">{rule}</Label>
                </div>
                ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="meals">
            <AccordionTrigger className="p-4 font-semibold">Repas</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
                {mealOptions.map(item => (
                <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={`meal-${item}`} />
                    <Label htmlFor={`meal-${item}`} className="font-normal">{item}</Label>
                </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="facilities">
            <AccordionTrigger className="p-4 font-semibold">Équipements de l'établissement</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
                {facilityAmenities.map(item => (
                <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={`fac-${item}`} />
                    <Label htmlFor={`fac-${item}`} className="font-normal">{item}</Label>
                </div>
                ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="poi">
            <AccordionTrigger className="p-4 font-semibold">Lieux d'intérêt</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
                {placesOfInterest.map(item => (
                <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={`poi-${item}`} />
                    <Label htmlFor={`poi-${item}`} className="font-normal">Distance de/du : {item}</Label>
                </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          
            <AccordionItem value="top-features">
            <AccordionTrigger className="p-4 font-semibold">Caractéristiques les mieux notées</AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
                {topRatedFeatures.map(item => (
                <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={`feat-${item}`} />
                    <Label htmlFor={`feat-${item}`} className="font-normal">{item}</Label>
                </div>
                ))}
            </AccordionContent>
          </AccordionItem>

        </Accordion>
        <div className="p-4 border-t">
            <Button className="w-full">Afficher les {resultCount} résultats</Button>
        </div>
      </CardContent>
    </Card>
  );
}
