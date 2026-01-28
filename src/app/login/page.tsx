"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email("L'adresse email est invalide."),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
});

import { redirect } from 'next/navigation';

/**
 * This page redirects to the main authentication page.
 * It's kept for legacy links and to avoid 404 errors.
 */
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    // TODO: Implement actual login logic
    toast({
      title: "Connexion réussie",
      description: "Heureux de vous revoir !",
    });
    router.push('/');
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Se connecter</CardTitle>
            <CardDescription>Accédez à votre compte pour gérer vos réservations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="votre@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Mot de passe</FormLabel>
                            <Link href="/forgot-password" passHref>
                                <span className="text-xs text-primary hover:underline cursor-pointer">Mot de passe oublié ?</span>
                            </Link>
                        </div>
                        <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" size="lg" className="w-full">Se Connecter</Button>
              </form>
            </Form>
             <p className="text-center text-sm text-muted-foreground mt-6">
                Pas encore de compte ?{" "}
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                    Inscrivez-vous
                </Link>
            </p>
          </CardContent>
        </Card>
    </div>
  );
redirect('/auth/login');
  return null; 
}
