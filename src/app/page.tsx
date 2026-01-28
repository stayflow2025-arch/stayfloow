'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchForm } from '@/components/search-form';
import { PropertyCard } from '@/components/property-card';
import { AiRecommender } from '@/components/ai-recommender';
import { properties as initialProperties, mockUser } from '@/lib/data';
import type { Property } from '@/lib/data';
import Link from 'next/link';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';
import { EmailRetargetingCard } from '@/components/email-retargeting-card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useLanguage();
  const isGenius = mockUser.isGenius;
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  useEffect(() => {
    try {
        const approvedProperties: Property[] = JSON.parse(localStorage.getItem('approvedProperties') || '[]');
        const combined = [...initialProperties, ...approvedProperties];
        const propertyMap = new Map();
        combined.forEach(p => propertyMap.set(p.id, p));
        setProperties(Array.from(propertyMap.values()));
    } catch (error) {
        console.error("Could not parse approved properties from localStorage", error);
        setProperties(initialProperties);
    }
  }, []);

  const featuredProperties = properties.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative h-[60vh] min-h-[450px] w-full">
        <Image
          src="https://picsum.photos/seed/sahara-dunes-sunset/3840/2160"
          alt="Coucher de soleil sur les dunes du Sahara"
          data-ai-hint="sahara dunes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-green-900/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            {t('home_hero_title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-md">
            {t('home_hero_subtitle')}
          </p>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4">
          <Card className="shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <SearchForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-16">
        <PersonalizedRecommendations />
      </section>
      
      <section className="container mx-auto px-4">
        <EmailRetargetingCard />
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold mb-8 text-center">
          {t('featured_stays')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} isGenius={isGenius} />
          ))}
        </div>
        <div className="text-center mt-8">
            <Link href="/search" passHref>
                <Button size="lg" variant="outline">{t('view_all_accommodations')}</Button>
            </Link>
        </div>
      </section>
      
      <section className="container mx-auto px-4">
        <AiRecommender />
      </section>

    </div>
  );
}
