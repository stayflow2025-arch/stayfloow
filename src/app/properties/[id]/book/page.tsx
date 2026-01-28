"use client";

import { notFound, useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import { properties as initialProperties, mockUser, paymentSettings as initialPaymentSettings, pendingListings as initialPendingListings } from '@/lib/data';
import type { Property, BankDetails, PaymentSettings, PaymentMethod, PendingListing } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, ArrowLeft, Banknote, CreditCard, Check, Sparkles, FileText, CheckCircle, LogIn, LogOut } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/context/currency-context';
import { Checkbox } from '@/components/ui/checkbox';
import { sendBookingConfirmationEmail, sendNewBookingNotificationEmail } from '@/lib/mail';
import { CrossSellCard } from '@/components/cross-sell-card';
import { SiPaypal } from "@icons-pack/react-simple-icons";

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

function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { toast } = useToast();
  const { formatPrice, currency, getCurrencySymbol } = useCurrency();
  const [property, setProperty] = useState<Property | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(initialPaymentSettings);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ number: '', email: '' });

  const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;
  const fromDate = searchParams.get('from');
  const toDate = searchParams.get('to');

  useEffect(() => {
    try {
        const savedSettings = localStorage.getItem('paymentSettings');
        if (savedSettings) {
            setPaymentSettings(JSON.parse(savedSettings));
        }
    } catch (error) {
        console.error("Could not load payment settings, using initial.", error);
    }
    
    // Unify all property sources
    const approvedProperties: Property[] = JSON.parse(localStorage.getItem('approvedProperties') || '[]');
    const storedPending: PendingListing[] = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const allPendingListings = [...initialPendingListings, ...storedPending];

    const formattedPending: Property[] = allPendingListings
      .filter(p => p.hasOwnProperty('propertyName'))
      .map(p => ({
        id: p.id,
        name: p.propertyName,
        location: p.location,
        address: `${p.location}, Algérie`,
        price: p.price,
        type: p.propertyType as any, 
        host: { name: p.hostName, email: p.hostEmail, phone: p.hostPhone, avatar: `https://picsum.photos/seed/host-${p.id}/100/100` },
        amenities: p.amenities || [],
        images: p.images || [`https://picsum.photos/seed/pending-${p.id}/1920/1080`],
        rating: 0,
        reviewsCount: 0,
        description: p.description || 'Aucune description fournie.',
        nearbyAttractions: p.nearbyAttractions || [],
        latitude: p.latitude || 0,
        longitude: p.longitude || 0,
    }));

    const propertyMap = new Map<string, Property>();
    initialProperties.forEach(p => propertyMap.set(p.id, p));
    approvedProperties.forEach(p => propertyMap.set(p.id, p));
    formattedPending.forEach(p => propertyMap.set(p.id, p));
    
    const foundProperty = propertyMap.get(propertyId);

    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      notFound();
    }
  }, [propertyId]);
  
  const isGenius = mockUser.isGenius;
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

  if (!property) {
    return <div>Chargement...</div>;
  }

  const nights = Number(searchParams.get('nights') || 1);
  const baseRent = property.price * nights;
  const geniusDiscount = isGenius ? baseRent * 0.10 : 0; // 10% discount for Genius users
  const totalRent = baseRent - geniusDiscount;
  const serviceFee = totalRent * 0.20;
  
  const totalToPayToday = totalRent + serviceFee;

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    console.log(values);
    const reservationNumber = `ST${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationDetails({ number: reservationNumber, email: values.email });
    
    let description = `Votre réservation pour ${property.name} est confirmée sous le numéro ${reservationNumber}. Un email de confirmation contenant les coordonnées de l'hôte a été envoyé à ${values.email}.`;

    // --- Send customer confirmation ---
    await sendBookingConfirmationEmail({
        customerName: values.fullName,
        customerEmail: values.email,
        reservationNumber: reservationNumber,
        itemName: property.name,
        itemType: 'hébergement',
        hostName: property.host.name,
        hostEmail: property.host.email,
        hostPhone: property.host.phone,
        bookingDetails: {
            startDate: fromDate,
            endDate: toDate,
            duration: nights,
        }
    });

    // --- Send partner notification ---
    await sendNewBookingNotificationEmail({
        partnerName: property.host.name,
        partnerEmail: property.host.email,
        customerName: values.fullName,
        customerEmail: values.email,
        customerPhone: values.phone,
        reservationNumber,
        itemName: property.name,
        bookingDetails: {
            startDate: fromDate,
            endDate: toDate,
            duration: nights,
        }
    });
    
    setIsBookingConfirmed(true);

    toast({
        title: "Votre réservation est confirmée !",
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
            <CrossSellCard location={property.location}/>
        </div>
    )
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux détails
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 lg:order-last">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={property.images[0]} alt={property.name} fill className="object-cover" data-ai-hint="algerian architecture" />
              </div>
              <div>
                  <p className="text-sm text-muted-foreground">{property.type}</p>
                  <CardTitle className="text-lg font-semibold leading-tight">{property.name}</CardTitle>
                   <div className="flex items-center gap-1 text-sm mt-1">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span>{property.rating} ({property.reviewsCount} avis)</span>
                    </div>
              </div>
            </CardHeader>
            <CardContent>
                <Separator className="my-4" />
                <h3 className="font-headline text-xl font-semibold mb-4">Détails du prix</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{formatPrice(property.price)} x {nights} {nights > 1 ? 'nuits' : 'nuit'}</span>
                        <span>{formatPrice(baseRent)}</span>
                    </div>
                    {isGenius && (
                        <div className="flex justify-between text-primary">
                            <span className="font-semibold">Réduction Génie (-10%)</span>
                            <span>-{formatPrice(geniusDiscount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span>Frais de service (20%)</span>
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
                {isGenius && (
                    <Badge variant="secondary" className="flex items-center gap-1 text-base bg-secondary border-primary/50 text-secondary-foreground py-1 px-3">
                        <Sparkles className="h-4 w-4" />
                        Génie
                    </Badge>
                )}
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Règlement du séjour
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="list-none space-y-4 text-sm text-muted-foreground">
                        {(property.checkIn || property.checkOut) && (
                            <li className="flex items-start gap-4">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                    {property.checkIn && (
                                        <div className="flex items-center gap-2">
                                            <LogIn className="h-4 w-4 text-primary" />
                                            <div>
                                                <span className="font-semibold text-foreground">Check-in</span>
                                                <p>{property.checkIn}</p>
                                            </div>
                                        </div>
                                    )}
                                    {property.checkOut && (
                                         <div className="flex items-center gap-2">
                                            <LogOut className="h-4 w-4 text-primary" />
                                            <div>
                                                <span className="font-semibold text-foreground">Check-out</span>
                                                <p>{property.checkOut}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        )}
                        <li>Les appartements, villas ou maisons sont sous la responsabilité de leur propriétaire.</li>
                        <li>Établissement généralement non-fumeur, veuillez vérifier auprès de l'hôte.</li>
                        <li>Les fêtes et rassemblements importants ne sont pas autorisés sans l'accord de l'hôte.</li>
                        <li>Veuillez respecter le calme et la tranquillité du voisinage.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Informations du voyageur</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-4">
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
                            </div>
                            
                            <Separator />

                            <CardTitle>Méthode de Paiement</CardTitle>

                            <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        {enabledPaymentMethods.map(method => (
                                            <FormItem key={method.id}>
                                                <FormControl>
                                                    <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                                                </FormControl>
                                                <Label htmlFor={method.id} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
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
                            
                            {paymentMethod === 'paypal' && (
                                <div className="space-y-4 animate-in fade-in-20 text-center">
                                    <p className="text-sm text-muted-foreground">Vous serez redirigé vers PayPal pour finaliser votre paiement.</p>
                                    <Button type="submit" size="lg" className="w-full bg-[#00457C] hover:bg-[#003057]">
                                        <SiPaypal className="mr-2 h-5 w-5" />
                                        Payer avec PayPal
                                    </Button>
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
                            
                            {paymentMethod !== 'paypal' && (
                                <Button type="submit" size="lg" className="w-full">
                                    {`Payer ${formatPrice(totalToPayToday)}`}
                                </Button>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}


export default function BookingPageWrapper() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <BookingPage />
    </Suspense>
  );
