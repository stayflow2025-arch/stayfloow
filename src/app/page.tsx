'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchForm } from '@/components/search-form';
import { PropertyCard } from '@/components/property-card';
import { properties as initialProperties, mockUser } from '@/lib/data';
import type { Property } from '@/lib/data';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { useState, useEffect } from 'react';
import { ArrowRight, Zap, Globe, Heart } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const isGenius = mockUser?.isGenius || false;

  const [properties, setProperties] = useState<Property[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const approvedProperties: Property[] = JSON.parse(
        localStorage.getItem('approvedProperties') || '[]'
      );

      const combined = [...initialProperties, ...approvedProperties];

      const propertyMap = new Map();
      combined.forEach((p) => {
        if (p && p.id) propertyMap.set(p.id, p);
      });

      setProperties(Array.from(propertyMap.values()));
    } catch (error) {
      setProperties(initialProperties);
    }
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  const featuredProperties = properties.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="hero-section relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg mb-2 leading-tight">
            {t('home_hero_title') || 'Discover the World'}
          </h1>
          <p className="text-lg md:text-xl text-white/95 drop-shadow-md max-w-2xl">
            {t('home_hero_subtitle') || 'Find unique stays and unforgettable experiences'}
          </p>
        </div>
      </section>

      {/* Search Card - Floating */}
      <div className="search-container relative z-20 -mt-20 px-4 mb-20">
        <div className="container mx-auto max-w-5xl">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <SearchForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose StayFloow?</h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Experience travel like never before with our curated selections and expert recommendations
          </p>

          <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Quick & Easy</h3>
                <p className="text-muted-foreground">
                  Find and book your perfect stay in minutes with our intuitive search and booking system
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Globe className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Worldwide Coverage</h3>
                <p className="text-muted-foreground">
                  Explore destinations across the globe with thousands of verified properties and experiences
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Heart className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Trusted Reviews</h3>
                <p className="text-muted-foreground">
                  Real feedback from real travelers to help you make the best choice for your trip
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="section-header flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold">Featured Stays</h2>
              <p className="text-muted-foreground mt-2">Handpicked properties for your next adventure</p>
            </div>
            <Link href="/search">
              <Button className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="properties-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.length > 0 ? (
              featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isGenius={isGenius}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-12">
                Loading properties...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of travelers discovering unique places around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 w-full sm:w-auto">
                Explore Now
              </Button>
            </Link>
            <Link href="/accueil">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
