import { getBlogPost, getAllBlogPosts } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <div className="space-y-0">
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-slate-200">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </section>

      {/* Content */}
      <article className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Retour aux Articles
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b pb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min de lecture</span>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
                p: ({ children }) => <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                li: ({ children }) => <li className="text-lg text-muted-foreground">{children}</li>,
                strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-slate-50 italic text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-blue-600 hover:text-blue-700 underline">
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share Section */}
          <div className="flex items-center gap-4 py-6 border-t border-b">
            <span className="font-semibold">Partager cet article:</span>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Author Info */}
          <div className="my-12 p-8 bg-slate-50 rounded-lg">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">À propos de l'auteur</h3>
                <p className="text-muted-foreground">
                  {post.author} est un passionné de voyage avec plus de 10 ans d'expérience. 
                  Chaque article partage des insights uniques basés sur des expériences authentiques.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold mb-8">Articles Connexes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.slug} className="border-0 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative h-48 bg-slate-200">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="pt-6">
                      <span className="text-xs font-semibold text-blue-600 uppercase">{relatedPost.category}</span>
                      <h3 className="text-xl font-bold my-2">{relatedPost.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(relatedPost.date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                        </span>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <Button variant="outline" size="sm">
                            Lire la suite
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-16 p-8 bg-blue-600 text-white rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt pour votre prochaine aventure?</h2>
            <p className="text-lg text-white/90 mb-6">
              Trouvez l'hébergement parfait pour vos voyages
            </p>
            <Link href="/search">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Explorez nos Propriétés
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

// Generate static params for better performance
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
