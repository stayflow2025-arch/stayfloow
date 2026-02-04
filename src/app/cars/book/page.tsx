
"use client";

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { cars as initialCars, mockUser, paymentSettings as initialPaymentSettings, pendingCars as initialPendingCars } from '@/lib/data';
import type { Car, BankDetails, PaymentSettings, PaymentMethod, PendingCar } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, ArrowLeft, Banknote, CreditCard, Check, Sparkles, Calendar, User, Clock, FileText, CheckCircle, CalendarIcon } from 'lucide-react';
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
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const bookingSchema = z.object({
    fullName: z.string().min(2, { message: "Le nom complet est requis." }),
    email: z.string().email({ message: "Adresse email invalide." }),
    phone: z.string().min(10, { message: "Numéro de téléphone invalide." }),
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


function CarBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { formatPrice, currency } = useCurrency();
  const [car, setCar] = useState<Car | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(initialPaymentSettings);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ number: '', email: '' });
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const carId = searchParams.get('id');

  const [dates, setDates] = useState<DateRange | undefined>(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    if (from && to) {
        return { from: new Date(from), to: new Date(to) };
    }
    return { from: new Date(), to: addDays(new Date(), 3) };
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

    const approvedCars: Car[] = JSON.parse(localStorage.getItem('approvedCars') || '[]');
    const storedPending: PendingCar[] = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const allPendingCars = [...initialPendingCars, ...storedPending];

    const formattedPending: Car[] = allPendingCars
      .filter(c => c.hasOwnProperty('carMake')) // Ensure it's a car submission
      .map(p => ({
        id: p.id,
        make: p.carMake,
        model: p.carModel,
        type: p.carType as any,
        year: new Date().getFullYear(),
        pricePerDay: p.pricePerDay,
        location: p.location,
        transmission: 'Manuelle', // Placeholder
        fuelType: 'Essence', // Placeholder
        seats: 5, // Placeholder
        features: [],
        images: p.images || [`https://picsum.photos/seed/pending-${p.id}/1200/800`],
        description: 'Aucune description fournie.',
        host: { name: p.hostName, avatar: `https://picsum.photos/seed/host-${p.id}/100/100`, email: p.hostEmail, phone: p.hostPhone },
    }));

    const allCars = [...initialCars, ...approvedCars, ...formattedPending];
    const foundCar = allCars.find(c => c.id === carId);
    
    if (foundCar) {
      setCar(foundCar);
    } else {
      notFound();
    }
  }, [searchParams, carId]);
  
  const enabledPaymentMethods = paymentSettings.methods.filter(m => m.enabled && m.id !== 'transfer');

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      agreeToTerms: false,
      paymentMethod: enabledPaymentMethods.find(m => m.id === 'card')?.id || enabledPaymentMethods[0]?.id,
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  if (!car) {
    return <div>Chargement...</div>;
  }
  
  const getNumberOfDays = () => {
    if (dates?.from && dates?.to) {
        const diffTime = Math.abs(dates.to.getTime() - dates.from.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const days = getNumberOfDays();
  const baseRent = car.pricePerDay * days;
  const serviceFee = baseRent * 0.20;
  const totalToPayToday = baseRent + serviceFee;

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    console.log(values);
    const reservationNumber = `ST-CAR-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationDetails({ number: reservationNumber, email: values.email });

    let description = `Votre réservation pour ${car.make} ${car.model} est confirmée sous le numéro ${reservationNumber}. Un email de confirmation contenant les coordonnées du loueur a été envoyé à ${values.email}.`;

    await sendBookingConfirmationEmail({
        customerName: values.fullName,
        customerEmail: values.email,
        reservationNumber: reservationNumber,
        itemName: `${car.make} ${car.model}`,
        itemType: 'véhicule',
        hostName: car.host.name,
        hostEmail: car.host.email,
        hostPhone: car.host.phone,
        bookingDetails: {
            startDate: dates?.from?.toISOString(),
            endDate: dates?.to?.toISOString(),
            duration: days,
        }
    });

    await sendNewBookingNotificationEmail({
        partnerName: car.host.name,
        partnerEmail: car.host.email,
        customerName: values.fullName,
        customerEmail: values.email,
        customerPhone: values.phone,
        reservationNumber,
        itemName: `${car.make} ${car.model}`,
        bookingDetails: {
            startDate: dates?.from?.toISOString(),
            endDate: dates?.to?.toISOString(),
            duration: days,
        }
    });
    
    setIsBookingConfirmed(true);

    toast({
        title: "Votre réservation de véhicule est confirmée !",
        description: description,
        variant: 'default',
        className: 'bg-accent text-accent-foreground'
    });
  }

  if (isBookingConfirmed) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="font-headline text-3xl font-bold mb-2">Merci pour votre réservation !</h1>
            <p className="text-muted-foreground mb-4">
                Un e-mail de confirmation a été envoyé à <strong>{reservationDetails.email}</strong> avec les détails complets de votre réservation n° <strong>{reservationDetails.number}</strong>.
            </p>
            <Separator className="my-8" />
            <CrossSellCard location={car.location} bookedItemType="car" />
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux véhicules
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={car.images[0]} alt={`${car.make} ${car.model}`} fill className="object-cover" data-ai-hint="car side" />
              </div>
              <div>
                  <p className="text-sm text-muted-foreground">{car.type}</p>
                  <CardTitle className="text-lg font-semibold leading-tight">{car.make} ${car.model}</CardTitle>
                   <div className="flex items-center gap-1 text-sm mt-1">
                        <Badge variant="outline">{car.year}</Badge>
                    </div>
              </div>
            </CardHeader>
            <CardContent>
                <Separator className="my-4" />
                <h3 className="font-headline text-xl font-semibold mb-4">Récapitulatif de la location</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{formatPrice(car.pricePerDay)} x {days} {days > 1 ? 'jours' : 'jour'}</span>
                        <span>{formatPrice(baseRent)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Frais de service (20%)</span>
                        <span>{formatPrice(serviceFee)}</span>
                    </div>
                </div>
              </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                    <Separator />
                    <div className="flex justify-between font-bold text-lg w-full">
                        <span>Total à payer</span>
                        <span>{formatPrice(totalToPayToday)}</span>
                    </div>
                </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
                <h1 className="font-headline text-3xl font-bold">Confirmez et payez</h1>
            </div>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vos informations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="dates">Dates de location</Label>
                                <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="dates"
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal mt-1",
                                                !dates && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dates?.from ? (
                                                dates.to ? (
                                                    <>
                                                        {format(dates.from, "dd LLL y", { locale: fr })} -{" "}
                                                        {format(dates.to, "dd LLL y", { locale: fr })}
                                                    </>
                                                ) : (
                                                    format(dates.from, "dd LLL y", { locale: fr })
                                                )
                                            ) : (
                                                <span>Choisissez vos dates</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            initialFocus
                                            mode="range"
                                            defaultMonth={dates?.from}
                                            selected={dates}
                                            onSelect={setDates}
                                            numberOfMonths={1}
                                            locale={fr}
                                            disabled={{ before: new Date() }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" placeholder="0555 123 456" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Règlement de la location
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                                <li>Le conducteur principal doit être âgé d'au moins 21 ans.</li>
                                <li>Un permis de conduire valide depuis au moins 1 an est requis.</li>
                                <li>La durée de location est calculée par tranches de 24h. Le véhicule doit être restitué à la même heure que celle de la prise en charge.</li>
                                <li>Le véhicule est fourni avec le plein de carburant et doit être restitué de même.</li>
                                <li>Une caution pourra vous être demandée à l'agence de location.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Paiement</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Méthode de paiement</FormLabel>
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                       {enabledPaymentMethods.map(method => (
                                            <FormItem key={method.id}>
                                                <FormControl>
                                                    <RadioGroupItem value={method.id} id={`car-${method.id}`} className="peer sr-only" />
                                                </FormControl>
                                                <Label htmlFor={`car-${method.id}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                    {method.id === 'card' && <CreditCard className="mb-3 h-6 w-6" />}
                                                    {method.id === 'paypal' && <SiPaypal className="mb-3 h-6 w-6" />}
                                                </Label>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            
                            {paymentMethod === 'card' && (
                                <div className="space-y-4 animate-in fade-in-20">
                                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                        <FormItem><FormLabel>Numéro de carte</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                            <FormItem><FormLabel>Date d'expiration</FormLabel><FormControl><Input placeholder="MM/AA" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="cvc" render={({ field }) => (
                                            <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                    </div>
                                </div>
                            )}

                             <FormField
                                control={form.control}
                                name="agreeToTerms"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                      <Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms-checkbox"/>
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <Label htmlFor='terms-checkbox'>
                                        J'accepte les <Link href="/terms" className="underline hover:text-primary">Conditions d'utilisation</Link> et la <Link href="/privacy" className="underline hover:text-primary">Politique de confidentialité</Link>.
                                      </Label>
                                      <FormMessage />
                                    </div>
                                  </FormItem>
                                )}
                              />
                        </CardContent>
                         <CardFooter>
                            <Button type="submit" size="lg" className="w-full">
                                {`Payer ${formatPrice(totalToPayToday)}`}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>

      </div>
    </div>
  );
}

export default function CarBookingPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <CarBookingForm />
        </Suspense>
    )
}
