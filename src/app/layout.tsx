
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChatLoader } from '@/components/chat-loader';
import { PT_Sans } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';

const pt_sans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'DzairStay - Votre partenaire de voyage en Algérie et en Égypte',
  description: 'Réservez des hôtels, des villas, des appartements, des locations de voiture et des circuits uniques en Algérie et en Égypte. La plateforme de référence pour un séjour authentique.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className={`${pt_sans.variable} ${playfair_display.variable}`}>
      <body>
        <Providers>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pb-20 lg:pb-0">{children}</main>
              <Footer />
            </div>
            <ChatLoader />
            <Toaster />
        </Providers>
      </body>
    </html>
  );
}
