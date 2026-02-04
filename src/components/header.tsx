"use client";

console.log("DEBUG: Header loaded");

import Link from "next/link";
import { Button } from "./ui/button";
import { MountainSnow, Menu } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Header() {
  console.log("DEBUG: Rendering Header");

  const { t } = useLanguage();

  // Protection SSR : éviter mismatch si le contexte change entre serveur et client
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state

  const navLinks = [
    { href: "/search", label: t("accommodations") },
    { href: "/cars", label: t("car_rental") },
    { href: "/circuits", label: t("tours") },
    { href: "/partner/onboarding", label: t("become_partner") },
  ];

  // Empêche un rendu différent entre serveur et client
  if (!isClient) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm h-16" />
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <MountainSnow className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tight">
            StayFloow
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Desktop user menu */}
          <div className="hidden md:flex items-center gap-1">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src="https://picsum.photos/seed/user-fatiha/100/100"
                        alt="Fatiha Voyageuse"
                      />
                      <AvatarFallback>FV</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Fatiha Voyageuse
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        fatiha.voyage@email.com
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/account/dashboard">Mon Compte</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>Mes Favoris</DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="ghost">{t("login")}</Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button>{t("signup")}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t("open_menu")}</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <MountainSnow className="h-6 w-6 text-primary" />
                      <span className="font-headline text-2xl font-bold tracking-tight">
                        StayFloow
                      </span>
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-4 p-4 text-lg font-medium">
                    {isLoggedIn && (
                      <Link
                        href="/account/dashboard"
                        className="text-foreground/80 transition-colors hover:text-foreground"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Mon Compte
                      </Link>
                    )}

                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-foreground/80 transition-colors hover:text-foreground"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto p-4 border-t space-y-2">
                    {isLoggedIn ? (
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsSheetOpen(false);
                        }}
                      >
                        Se déconnecter
                      </Button>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          passHref
                          className="block"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Button variant="outline" className="w-full">
                            {t("login")}
                          </Button>
                        </Link>

                        <Link
                          href="/signup"
                          passHref
                          className="block"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Button className="w-full">{t("signup")}</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
