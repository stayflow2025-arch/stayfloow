'use client';

import { getAllBlogPosts } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="hero-section relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg mb-4">Blog de Voyage</h1>
          <p className="text-xl text-white/95 drop-shadow-md max-w-2xl">
            Conseils, histoires et inspirations pour vos prochaines aventures
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Categories Filter */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Filtrer par catégorie</h2>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                Tous les articles
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <section className="mb-16">
              <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="relative h-96 md:h-full min-h-96 bg-slate-200">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-blue-600 uppercase mb-3">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-4xl font-bold mb-4 leading-tight">{featuredPost.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime} min de lecture
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`} className="inline-block w-fit">
                      <Button className="gap-2">
                        Lire l'article <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </section>
          )}

          {/* Blog Grid */}
          {otherPosts.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Autres articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post) => (
                  <Card
                    key={post.slug}
                    className="border-0 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                  >
                    <div className="relative h-48 bg-slate-200">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <span className="text-xs font-semibold text-blue-600 uppercase mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {post.readTime} min
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm">
                            Lire
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                Aucun article trouvé dans cette catégorie
              </p>
              <Button onClick={() => setSelectedCategory(null)}>Voir tous les articles</Button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-4">Abonnez-vous à notre Newsletter</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Recevez les derniers conseils de voyage et les histoires inspirantes directement dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-white"
            />
            <Button size="lg">S'abonner</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Nous ne partagerons jamais votre email avec des tiers.
          </p>
        </div>
      </section>
    </div>
  );
}
