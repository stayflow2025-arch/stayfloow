"use client";

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { circuits as initialCircuits, paymentSettings as initialPaymentSettings, pendingCircuits as initialPendingCircuits } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, CheckCircle, CalendarIcon, Info } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/context/currency-context';
import { Checkbox } from '@/components/ui/checkbox';
import { sendBookingConfirmationEmail, sendNewBookingNotificationEmail } from '@/lib/mail';
import { CrossSellCard } from '@/components/cross-sell-card';
import { SiPaypal } from "@icons-pack/react-simple-icons";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { DateRange } from "react-day-picker";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Schéma simplifié avec types explicites pour éviter l'erreur "unknown" de TypeScript
const bookingSchema = z.object({
    fullName: z.string().min(2, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(10, "Téléphone invalide"),
    adults: z.number().min(1),
    children: z.number().default(0),
    infants: z.number().default(0),
    paymentMethod: z.string(),
    agreeToTerms: z.boolean().refine(val => val === true, "Obligatoire"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

function CircuitBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { formatPrice } = useCurrency();
  
  const [circuit, setCircuit] = useState<any>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ number: '', email: '' });
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [dates, setDates] = useState<DateRange | undefined>(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    return (from && to) ? { from: new Date(from), to: new Date(to) } : undefined;
  });

  useEffect(() => {
    try {
        const approvedData: any[] = JSON.parse(localStorage.getItem('approvedCircuits') || '[]');
        const storedPending: any[] = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
        
        // Normalisation des données pour éviter les erreurs de propriétés manquantes
        const allPending = [...initialPendingCircuits, ...storedPending].map((p: any) => ({
            id: p.id,
            title: p.circuitTitle || p.title || 'Circuit',
            region: p.region || '',
            pricePerPerson: p.pricePerPerson || 0,
            images: p.images || [],
            guide: { 
                name: p.guideName || 'Guide', 
                email: p.guideEmail || '', 
                phone: p.guidePhone || '' 
            }
        }));

        const all = [...initialCircuits, ...approvedData, ...allPending];
        const found = all.find(p => String(p.id) === String(searchParams.get('id')));
        
        if (found) setCircuit(found); else notFound();
    } catch (e) { 
        console.error("Erreur chargement données:", e); 
    }
  }, [searchParams]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      adults: Number(searchParams.get('adults')) || 1,
      children: Number(searchParams.get('children')) || 0,
      infants: Number(searchParams.get('infants')) || 0,
      paymentMethod: 'card',
      agreeToTerms: false,
    },
  });

  if (!circuit) return <div className="p-20 text-center">Chargement...</div>;

  const { adults, children, infants, paymentMethod } = form.watch();
  const totalPaying = (Number(adults) || 0) + (Number(children) || 0);
  const totalPrice = (Number(circuit.pricePerPerson) || 0) * totalPaying;
  const deposit = totalPrice * 0.20;

  const onSubmit = async (values: BookingFormValues) => {
    const resNum = `ST-CIRCUIT-${Math.floor(1000 + Math.random() * 8999)}`;
    setReservationDetails({ number: resNum, email: values.email });

    try {
        await sendBookingConfirmationEmail({
            customerName: values.fullName,
            customerEmail: values.email,
            reservationNumber: resNum,
            itemName: circuit.title,
            itemType: 'circuit',
            hostName: circuit.guide?.name,
            hostEmail: circuit.guide?.email,
            hostPhone: circuit.guide?.phone,
            bookingDetails: { 
                startDate: dates?.from?.toISOString(), 
                endDate: dates?.to?.toISOString(), 
                participants: totalPaying + (Number(infants) || 0) 
            }
        });
    } catch (e) { console.error(e); }

    setIsBookingConfirmed(true);
    toast({ title: "Réservation confirmée !" });
  };

  if (isBookingConfirmed) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Merci pour votre confiance !</h1>
        <p className="text-muted-foreground mb-8">Votre réservation n°{reservationDetails.number} est validée. Un mail a été envoyé à {reservationDetails.email}.</p>
        <CrossSellCard location={circuit.region} bookedItemType="circuit" />
        <Link href="/"><Button className="mt-8">Retour à l'accueil</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Vos coordonnées</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Nom Complet</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                  </div>
                  <div className="space-y-2">
                    <Label>Dates souhaitées</Label>
                    <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dates?.from ? (dates.to ? `${format(dates.from, "dd/MM/yy")} - ${format(dates.to, "dd/MM/yy")}` : format(dates.from, "dd/MM/yy")) : "Sélectionner les dates"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="range" selected={dates} onSelect={setDates} locale={fr} disabled={{ before: new Date() }} /></PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Paiement sécurisé de l'acompte</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="bg-blue-50 border-blue-200"><Info className="h-4 w-4 text-blue-600" /><AlertTitle className="text-blue-800">Note importante</AlertTitle><AlertDescription className="text-blue-700">Seul l'acompte de 20% ({formatPrice(deposit)}) est prélevé aujourd'hui. Le solde sera réglé sur place.</AlertDescription></Alert>
                  
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                      <div>
                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                        <Label htmlFor="card" className="flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer peer-data-[state=checked]:border-primary hover:bg-slate-50">
                          <CreditCard className="mb-2" /> Carte Bancaire
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                        <Label htmlFor="paypal" className="flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer peer-data-[state=checked]:border-primary hover:bg-slate-50">
                          <SiPaypal className="mb-2" /> PayPal
                        </Label>
                      </div>
                    </RadioGroup>
                  )}/>

                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-2 gap-4 pt-4 animate-in fade-in">
                      <Input placeholder="Numéro de carte" className="col-span-2" />
                      <Input placeholder="MM/AA" />
                      <Input placeholder="CVC" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                <FormItem className="flex items-start space-x-3 p-4 border rounded-lg bg-slate-50">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <div className="leading-none"><Label className="text-sm cursor-pointer">J'accepte les conditions générales de vente et la politique d'annulation.</Label></div>
                  <FormMessage />
                </FormItem>
              )}/>

              <Button type="submit" className="w-full h-14 text-lg font-bold">Payer l'acompte ({formatPrice(deposit)})</Button>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-primary/20 shadow-lg">
            <div className="relative h-48 w-full">
              {circuit.images?.[0] && <Image src={circuit.images[0]} alt={circuit.title} fill className="object-cover rounded-t-xl" />}
            </div>
            <CardHeader><CardTitle className="text-xl">{circuit.title}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm"><span>Voyageurs</span><span className="font-bold">{totalPaying + (Number(infants) || 0)}</span></div>
              <div className="flex justify-between text-sm"><span>Prix par personne</span><span>{formatPrice(circuit.pricePerPerson)}</span></div>
              <Separator />
              <div className="flex justify-between text-base font-bold text-slate-700"><span>Total Circuit</span><span>{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between text-lg font-bold text-primary bg-primary/5 p-2 rounded"><span>À payer ce jour</span><span>{formatPrice(deposit)}</span></div>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wider">Paiement sécurisé SSL</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CircuitBookingPage() {
    return <Suspense fallback={<div className="p-20 text-center">Chargement...</div>}><CircuitBookingForm /></Suspense>;
}
