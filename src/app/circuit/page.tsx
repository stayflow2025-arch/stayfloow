"use client";

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { circuits as initialCircuits, mockUser, paymentSettings as initialPaymentSettings, pendingCircuits as initialPendingCircuits } from '@/lib/data';
// CORRECTION ICI : Suppression de BankDetails, PaymentSettings, PaymentMethod
import type { Circuit, PendingCircuit } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, ArrowLeft, Banknote, CreditCard, Check, Sparkles, User, Clock, FileText, CheckCircle, Users, CalendarIcon, Info } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/context/currency-context';
import { Checkbox } from '@/components/ui/checkbox';
import { sendBookingConfirmationEmail, sendNewBookingNotificationEmail } from '@/lib/mail';
import { CrossSellCard } from '@/components/cross-sell-card';
import { SiPaypal } from "@icons-pack/react-simple-icons";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { DateRange } from "react-day-picker";
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const bookingSchema = z.object({
    fullName: z.string().min(2, { message: "Le nom complet est requis." }),
    email: z.string().email({ message: "Adresse email invalide." }),
    phone: z.string().min(10, { message: "Numéro de téléphone invalide." }),
    adults: z.coerce.number().min(1, "Il doit y avoir au moins 1 adulte."),
    children: z.coerce.number().min(0),
    infants: z.coerce.number().min(0),
    paymentMethod: z.enum(['card', 'paypal'], {
        errorMap: () => ({ message: "Veuillez sélectionner une méthode de paiement." }),
    }),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvc: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions et la politique de confidentialité.",
    }),
}).superRefine((data, ctx) => {
    if (data.paymentMethod === 'card') {
        if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Le numéro de carte doit contenir 16 chiffres.",
                path: ['cardNumber'],
            });
        }
        if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Format MM/AA invalide.",
                path: ['expiryDate'],
            });
        }
        if (!data.cvc || !/^\d{3}$/.test(data.cvc)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Le CVC doit contenir 3 chiffres.",
                path: ['cvc'],
            });
        }
    }
});

function CircuitBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { formatPrice, currency } = useCurrency();
  const [circuit, setCircuit] = useState<any>(null); // Changé en any pour flexibilité
  const [paymentSettings, setPaymentSettings] = useState<any>(initialPaymentSettings); // Changé en any
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ number: '', email: '' });
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const circuitId = searchParams.get('id');
  const adultsParam = searchParams.get('adults');
  const childrenParam = searchParams.get('children');
  const infantsParam = searchParams.get('infants');
  
  const [dates, setDates] = useState<DateRange | undefined>(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    if (from && to) {
        return { from: new Date(from), to: new Date(to) };
    }
    return undefined;
  });

  useEffect(() => {
    if (dates?.from && dates.to) {
        setIsDatePopoverOpen(false);
    }
   }, [dates]);

  useEffect(() => {
    try {
        const savedSettings = localStorage.getItem('paymentSettings');
        if (savedSettings) {
            setPaymentSettings(JSON.parse(savedSettings));
        }
    } catch (error) {
        console.error("Could not load payment settings, using initial.", error);
    }
    
    const approvedCircuitsData: any[] = JSON.parse(localStorage.getItem('approvedCircuits') || '[]');
    const approvedCircuits: any[] = approvedCircuitsData.map(c => ({...c, images: [`https://picsum.photos/seed/approved-${c.id}/1920/1080`]}));

    const storedPending: any[] = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const allPendingCircuits = [...initialPendingCircuits, ...storedPending];

    const formattedPending: any[] = allPendingCircuits
        .filter(c => c.hasOwnProperty('circuitTitle')) 
        .map(p => ({
            id: p.id,
            title: p.circuitTitle,
            region: p.region,
            duration: 'N/A',
            pricePerPerson: p.pricePerPerson,
            themes: [],
            images: p.images || [`https://picsum.photos/seed/pending-${p.id}/1920/1080`],
            description: 'Aucune description fournie.',
            guide: { name: p.guideName, avatar: `https://picsum.photos/seed/host-${p.id}/100/100`, email: p.guideEmail, phone: p.guidePhone },
        }));

    const allCircuits = [...initialCircuits, ...approvedCircuits, ...formattedPending];
    const foundCircuit = allCircuits.find(p => String(p.id) === String(circuitId)) || null;

    if (foundCircuit) {
      setCircuit(foundCircuit);
    } else {
      notFound();
    }
  }, [searchParams, circuitId]);
  
  const enabledPaymentMethods = paymentSettings?.methods?.filter((m: any) => m.enabled && m.id !== 'transfer') || [];

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      adults: Number(adultsParam) || 1,
      children: Number(childrenParam) || 0,
      infants: Number(infantsParam) || 0,
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      agreeToTerms: false,
      paymentMethod: enabledPaymentMethods.find((m: any) => m.id === 'card')?.id || enabledPaymentMethods[0]?.id || 'card',
    },
  });

  const paymentMethod = form.watch("paymentMethod");
  const adults = form.watch("adults");
  const children = form.watch("children");
  const infants = form.watch("infants");

  if (!circuit) {
    return <div>Chargement...</div>;
  }
  
  const totalPayingGuests = (adults || 0) + (children || 0);
  const totalGuests = totalPayingGuests + (infants || 0);

  const totalPrice = (circuit.pricePerPerson || 0) * (totalPayingGuests || 1);
  const depositToPay = totalPrice * 0.20;
  const remainingToPay = totalPrice * 0.80;

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    const reservationNumber = `ST-CIRCUIT-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationDetails({ number: reservationNumber, email: values.email });

    await sendBookingConfirmationEmail({
        customerName: values.fullName,
        customerEmail: values.email,
        reservationNumber: reservationNumber,
        itemName: circuit.title,
        itemType: 'circuit',
        hostName: circuit.guide.name,
        hostEmail: circuit.guide.email,
        hostPhone: circuit.guide.phone,
        bookingDetails: {
            startDate: dates?.from?.toISOString(),
            endDate: dates?.to?.toISOString(),
            participants: totalGuests,
        }
    });

    await sendNewBookingNotificationEmail({
        partnerName: circuit.guide.name,
        partnerEmail: circuit.guide.email,
        customerName: values.fullName,
        customerEmail: values.email,
        customerPhone: values.phone,
        reservationNumber,
        itemName: circuit.title,
        bookingDetails: {
            startDate: dates?.from?.toISOString(),
            endDate: dates?.to?.toISOString(),
            participants: totalGuests,
        }
    });

    setIsBookingConfirmed(true);

    toast({
        title: "Votre réservation est confirmée !",
        description: `Réservation n° ${reservationNumber} confirmée.`,
    });
  }

  if (isBookingConfirmed) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="font-headline text-3xl font-bold mb-2">Merci pour votre réservation !</h1>
            <p className="text-muted-foreground mb-4">
                Détails envoyés à <strong>{reservationDetails.email}</strong> (N° <strong>{reservationDetails.number}</strong>).
            </p>
            <Separator className="my-8" />
            <CrossSellCard location={circuit.region} bookedItemType="circuit" />
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>
      <div className="flex items-center gap-4 mb-6">
          <h1 className="font-headline text-3xl font-bold">Confirmez et payez</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-8">
            <Card>
                <CardHeader><CardTitle>Vos informations</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-start gap-4">
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={circuit.images[0]} alt={circuit.title} fill className="object-cover" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">{circuit.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{circuit.region}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold text-lg w-full">
                        <span>Total de l'acompte (20%)</span>
                        <span>{formatPrice(depositToPay)}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Paiement</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                                {enabledPaymentMethods.map((method: any) => (
                                    <FormItem key={method.id}>
                                        <FormControl><RadioGroupItem value={method.id} id={`circuit-${method.id}`} className="peer sr-only" /></FormControl>
                                        <Label htmlFor={`circuit-${method.id}`} className="flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer peer-data-[state=checked]:border-primary">
                                            {method.id === 'card' && <CreditCard className="mb-2 h-6 w-6" />}
                                            {method.id === 'paypal' && <SiPaypal className="mb-2 h-6 w-6" />}
                                            <span className="text-xs uppercase">{method.id}</span>
                                        </Label>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}/>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Payer {formatPrice(depositToPay)}</Button>
                </CardFooter>
            </Card>
            
            <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms-checkbox"/>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <Label htmlFor='terms-checkbox'>J'accepte les conditions d'utilisation.</Label>
                        <FormMessage />
                    </div>
                    </FormItem>
                )}
            />
        </form>
      </Form>
    </div>
  );
}

export default function CircuitBookingPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <CircuitBookingForm />
        </Suspense>
    )
}
