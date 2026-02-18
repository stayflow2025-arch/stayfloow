'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { CheckCircle2, Users, MapPin, Smile } from 'lucide-react';

export default function AccueilPage() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: MapPin,
      title: 'Destinations Variées',
      description: 'Découvrez des propriétés dans les plus beaux endroits du monde',
    },
    {
      icon: Users,
      title: 'Communauté Mondiale',
      description: 'Connectez-vous avec des voyageurs et des hôtes du monde entier',
    },
    {
      icon: Smile,
      title: 'Expériences Uniques',
      description: 'Vivez des moments inoubliables et créez des souvenirs durables',
    },
    {
      icon: CheckCircle2,
      title: 'Garantie de Qualité',
      description: 'Tous nos partenaires sont vérifiés pour votre tranquillité d\'esprit',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Chercher',
      description: 'Explorez nos destinations et filtrez selon vos préférences',
    },
    {
      number: '2',
      title: 'Comparer',
      description: 'Consultez les avis et les détails des propriétés',
    },
    {
      number: '3',
      title: 'Réserver',
      description: 'Effectuez une réservation sécurisée en quelques clics',
    },
    {
      number: '4',
      title: 'Profiter',
      description: 'Commencez votre aventure et créez des souvenirs',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="hero-section relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000"
          alt="Bienvenue"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg mb-4">
            Bienvenue sur StayFloow
          </h1>
          <p className="text-xl text-white/95 drop-shadow-md max-w-2xl">
            Votre plateforme de voyage pour découvrir et réserver les meilleures expériences
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">À Propos de StayFloow</h2>
              <p className="text-lg text-muted-foreground mb-4">
                StayFloow est une plateforme innovante dédiée à transformer votre façon de voyager. 
                Nous connectons les voyageurs avec des propriétés uniques et des expériences 
                inoubliables dans le monde entier.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Que vous cherchiez une escapade en montagne, un séjour en ville ou une détente 
                balnéaire, StayFloow vous offre les meilleurs choix vérifiés et recommandés 
                par une communauté de voyageurs passionnés.
              </p>
              <Link href="/search">
                <Button size="lg">Commencer à Chercher</Button>
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                alt="À Propos"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">Pourquoi Nous Choisir?</h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Nous offrons une expérience de voyage complète et sécurisée
          </p>

          <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-8">
                    <Icon className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">Comment Ça Marche?</h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Quatre étapes simples pour commencer votre aventure
          </p>

          <div className="steps-grid grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-center">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[60%] w-[40%] h-0.5 bg-blue-200 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <p className="text-white/90">Propriétés</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100K+</div>
              <p className="text-white/90">Voyageurs Actifs</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <p className="text-white/90">Pays</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.8/5</div>
              <p className="text-white/90">Note Moyenne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="featured-blog py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4">Derniers Articles</h2>
          <p className="text-muted-foreground text-lg mb-12">
            Découvrez nos guides et conseils de voyage
          </p>

          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-64 bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
                  alt="Guide de voyage"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">10 Destinations à Visiter Absolument</h3>
                <p className="text-muted-foreground mb-4">
                  Découvrez nos destinations préférées et commencez à planifier votre prochain voyage...
                </p>
                <Link href="/blog/un-article">
                  <Button variant="outline" className="w-full">
                    Lire l'article
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-64 bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1552062407-291826ab63fd?auto=format&fit=crop&q=80&w=800"
                  alt="Conseils de réservation"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Guide Complet de Réservation</h3>
                <p className="text-muted-foreground mb-4">
                  Tout ce que vous devez savoir pour réserver votre séjour idéal en toute confiance...
                </p>
                <Button variant="outline" className="w-full">
                  Lire l'article
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à Commencer?</h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez notre communauté et découvrez votre prochaine destination de rêve
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                Explorer les Propriétés
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Retour à l'Accueil
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
