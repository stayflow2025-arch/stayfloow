"use client";

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { cars as initialCars, paymentSettings as initialPaymentSettings, pendingCars as initialPendingCars } from '@/lib/data';
import type { Car, PendingCar } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, CheckCircle, CalendarIcon, FileText } from 'lucide-react';
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

export const dynamic = 'force-static'; 

const bookingSchema = z.object({
    fullName: z.string().min(2, { message: "Le nom complet est requis." }),
    email: z.string().email({ message: "Adresse email invalide." }),
    phone: z.string().min(10, { message: "Numéro de téléphone invalide." }),
    paymentMethod: z.enum(['card', 'paypal']),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvc: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions.",
    }),
}).superRefine((data, ctx) => {
    if (data.paymentMethod === 'card') {
        if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "16 chiffres requis.", path: ['cardNumber'] });
        }
    }
});

function CarBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { formatPrice } = useCurrency();
  const [car, setCar] = useState<any>(null); // Passé en any pour forcer le passage
  const [paymentSettings, setPaymentSettings] = useState<any>(initialPaymentSettings);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ number: '', email: '' });
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const carId = searchParams.get('id');

  const [dates, setDates] = useState<DateRange | undefined>(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    if (from && to) return { from: new Date(from), to: new Date(to) };
    return { from: new Date(), to: addDays(new Date(), 3) };
  });

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('paymentSettings');
      if (savedSettings) setPaymentSettings(JSON.parse(savedSettings));
    } catch (e) {}

    const approvedCars: any[] = JSON.parse(localStorage.getItem('approvedCars') || '[]');
    const storedPending: any[] = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const allPendingCars = [...initialPendingCars, ...storedPending];

    const formattedPending = allPendingCars.map((p: any) => ({
        id: p.id,
        brand: p.carMake || p.make || p.brand || "Véhicule",
        make: p.carMake || p.make || p.brand || "Véhicule",
        model: p.carModel || p.model || "Modèle",
        pricePerDay: p.pricePerDay || 0,
        image: Array.isArray(p.images) ? p.images[0] : (p.image || "/placeholder-car.jpg"),
        images: Array.isArray(p.images) ? p.images : [p.image || "/placeholder-car.jpg"],
        location: p.location || "",
        type: p.carType || p.type || "Citadine",
        host: p.host || { name: p.hostName || "Hôte" }
    }));

    const allCars = [...initialCars, ...approvedCars, ...formattedPending];
    const foundCar = allCars.find(c => String(c.id) === String(carId));
    
    if (foundCar) setCar(foundCar);
  }, [carId]);
  
  const enabledPaymentMethods = paymentSettings.methods?.filter((m: any) => m.enabled && m.id !== 'transfer') || [];

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "", email: "", phone: "", cardNumber: "", expiryDate: "", cvc: "", agreeToTerms: false,
      paymentMethod: enabledPaymentMethods[0]?.id || 'card',
    },
  });

  if (!car) return <div className="p-8 text-center">Chargement...</div>;
  
  const days = dates?.from && dates?.to ? Math.ceil(Math.abs(dates.to.getTime() - dates.from.getTime()) / (1000 * 60 * 60 * 24)) : 1;
  const total = (car.pricePerDay * (days || 1)) * 1.20;

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    const reservationNumber = `ST-CAR-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationDetails({ number: reservationNumber, email: values.email });
    setIsBookingConfirmed(true);
    toast({ title: "Confirmé !" });
  }

  if (isBookingConfirmed) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Réservation réussie !</h1>
            <p>N° {reservationDetails.number}</p>
            <Separator className="my-8" />
            <CrossSellCard location={car.location || ""} bookedItemType="car" />
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="flex flex-row gap-4">
              <div className="relative w-24 h-20 rounded overflow-hidden">
                  <Image src={car.image || car.images?.[0]} alt="car" fill className="object-cover" />
              </div>
              <div>
                  <CardTitle className="text-lg">{car.brand || car.make} {car.model}</CardTitle>
                  <p className="text-sm text-muted-foreground">{formatPrice(car.pricePerDay)}/jour</p>
              </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                    <span>Total (frais inclus)</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card><CardHeader><CardTitle>Vos coordonnées</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><Input {...field} /></FormItem>)}/>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><Input {...field} /></FormItem>)}/>
                                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Tél</FormLabel><Input {...field} /></FormItem>)}/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card><CardFooter><Button type="submit" className="w-full">Payer {formatPrice(total)}</Button></CardFooter></Card>
                </form>
            </Form>
        </div>
      </div>
    </div>
  );
}

export default function CarBookingPage() {
    return (<Suspense fallback={<div>Chargement...</div>}><CarBookingForm /></Suspense>)
}
