import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { CurrencyProvider } from "@/context/currency-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "StayFloow - Explore the world",
  description: "Discover amazing accommodations and experiences around the world",
  openGraph: {
    title: "StayFloow",
    description: "Discover amazing accommodations and experiences",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <LanguageProvider>
          <CurrencyProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
