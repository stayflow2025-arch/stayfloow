
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function ContactPage() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const contactSchema = z.object({
    name: z.string().min(2, "Le nom est requis."),
    email: z.string().email("L'adresse email est invalide."),
    subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères."),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
  });

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
    toast({
      title: t('message_sent_title'),
      description: t('message_sent_desc'),
      variant: 'default',
      className: 'bg-accent text-accent-foreground'
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="font-headline text-4xl font-bold mb-4">{t('contact_us')}</h1>
          <p className="text-muted-foreground text-lg mb-8">
            {t('contact_desc')}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <a href="mailto:stayflow2025@gmail.com" className="text-lg hover:underline">stayflow2025@gmail.com</a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <span className="text-lg">+213 (0) 5 55 12 34 56</span>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t('send_message')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('your_name')}</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('your_email')}</FormLabel>
                    <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('subject')}</FormLabel>
                    <FormControl><Input placeholder="Question sur une réservation" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('your_message')}</FormLabel>
                    <FormControl><Textarea placeholder="Bonjour, je voudrais..." {...field} rows={5} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" size="lg">{t('submit')}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
