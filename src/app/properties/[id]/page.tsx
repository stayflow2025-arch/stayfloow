
"use client";
import Image from 'next/image';
import { notFound, useRouter, useParams, useSearchParams } from 'next/navigation';
import { properties as initialProperties, reviews as allReviews, pendingListings as initialPendingListings, placesOfInterest as allPlacesOfInterest, type NearbyAttraction, mockUser } from '@/lib/data';
import type { Amenity, Property, PendingListing, PlaceOfInterest } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Wifi, Droplets, Utensils, Snowflake, ParkingCircle, Tv, MapPin, Thermometer, WashingMachine, Briefcase, Wind, Shirt, Building, Waves, Trees, Plus, Minus, Users, Plane, Landmark, Mountain, Sailboat, Train, ParkingSquare, Globe, Store, ShoppingCart, Sparkles, AlertCircle, Heart, Award, Bed, Square, Check, XCircle, Info, Calendar as CalendarIcon, User, Eye, Search, ChevronLeft, ChevronRight, X, Grid3x3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { useState, useEffect, Suspense, useMemo } from 'react';
import type { DateRange } from "react-day-picker";
import { fr } from 'date-fns/locale';
import { format, addDays, differenceInCalendarDays } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useCurrency } from '@/context/currency-context';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const roomOffers = [
    {
        id: 'room-1',
        title: 'Chambre Lit King-Size - Vue sur Lac',
        bedType: '1 très grand lit double',
        size: 19,
        view: 'Vue sur le lac',
        amenities: ['Articles de toilette gratuits', 'Serviettes', 'Bureau', 'Plateau / bouilloire', 'Sèche-cheveux'],
        maxGuests: 2,
        basePrice: 24500,
        finalPrice: 22000,
        options: {
            cancellation: 'Non remboursable',
            payment: 'Payez en ligne',
        }
    },
    {
        id: 'room-2',
        title: 'Chambre Lit King-Size - Vue sur Lac',
        bedType: '1 très grand lit double',
        size: 19,
        view: 'Vue sur le lac',
        amenities: ['Articles de toilette gratuits', 'Serviettes', 'Bureau', 'Plateau / bouilloire', 'Sèche-cheveux'],
        maxGuests: 2,
        basePrice: 26000,
        finalPrice: 25000,
        options: {
            cancellation: 'Annulation gratuite 48h avant',
            payment: 'Payez en ligne',
        }
    },
    {
        id: 'room-3',
        title: 'Chambre Double - Accessible aux Personnes à Mobilité Réduite',
        bedType: '1 lit double',
        amenities: [],
        maxGuests: 2,
        basePrice: 23000,
        finalPrice: 21500,
        options: {
            cancellation: 'Non remboursable',
            payment: 'Payez en ligne',
        }
    }
];

const amenityIcons: Record<Amenity, React.ElementType> = {
    'Wifi': Wifi,
    'Piscine': Waves,
    'Cuisine': Utensils,
    'Climatisation': Snowflake,
    'Parking': ParkingCircle,
    'Télévision': Tv,
    'Chauffage': Thermometer,
    'Lave-linge': WashingMachine,
    'Espace de travail': Briefcase,
    'Sèche-cheveux': Wind,
    'Fer à repasser': Shirt,
    'Balcon': Building,
    'Vue sur la mer': Waves,
    'Jardin': Trees,
    'Jacuzzi': Droplets,
    'Animaux autorisés': MapPin, // Placeholder
};

const placeOfInterestIcons: Record<PlaceOfInterest, React.ElementType> = {
    'Plage': Waves,
    'Aéroport': Plane,
    'Centre-ville': Landmark,
    'Montagne': Mountain,
    'Musée': Landmark,
    'Parc national': Trees,
    'Site historique': Landmark,
    'Port': Sailboat,
    'Gare': Train,
    'Parking': ParkingSquare,
    'Magasin': Store,
    'Centre commercial': ShoppingCart,
    'Monde': Globe,
};


function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();
  const [property, setProperty] = useState<Property | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;

    const initialDates = useMemo(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        if (from && to) {
            return { from: new Date(from), to: new Date(to) };
        }
        return { from: new Date(), to: addDays(new Date(), 3) };
    }, [searchParams]);

  useEffect(() => {
    if (!propertyId) return;

    // Load initial properties, approved properties from localStorage, and pending listings from localStorage
    const approvedProperties: Property[] = JSON.parse(localStorage.getItem('approvedProperties') || '[]');
    const storedPending: PendingListing[] = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const allPendingListings = [...initialPendingListings, ...storedPending];
    
    // Convert pending listings to Property format
    const formattedPending: Property[] = allPendingListings
      .filter(p => p.hasOwnProperty('propertyName')) 
      .map(p => ({
        id: p.id,
        name: p.propertyName,
        location: p.location,
        address: `${p.location}, Algérie`, // Placeholder
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

    // Create a unique list of properties by using a Map to handle duplicates
    const propertyMap = new Map<string, Property>();
    initialProperties.forEach(p => propertyMap.set(p.id, p)); // Start with initial
    approvedProperties.forEach(p => propertyMap.set(p.id, p)); // Override with approved
    formattedPending.forEach(p => propertyMap.set(p.id, p)); // Override with pending

    const foundProperty = propertyMap.get(propertyId);
    
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      setTimeout(() => notFound(), 0);
    }
  }, [propertyId]);

  const [dates, setDates] = useState<DateRange | undefined>(initialDates);
  const [adults, setAdults] = useState(Number(searchParams.get('adults') || 2));
  const [children, setChildren] = useState(Number(searchParams.get('children') || 0));
  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>({});
  
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isGuestsPopoverOpen, setIsGuestsPopoverOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  const nextImage = () => {
      if (!property) return;
      setLightboxIndex((prevIndex) => (prevIndex + 1) % property.images.length);
  };

  const prevImage = () => {
      if (!property) return;
      setLightboxIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
  };


  useEffect(() => {
    if (dates?.from && dates.to) {
      setIsDatePopoverOpen(false);
    }
  }, [dates]);

  const nights = useMemo(() => {
    if (dates?.from && dates.to) {
      return differenceInCalendarDays(dates.to, dates.from) || 1;
    }
    return 3;
  }, [dates]);

  const totalGuests = adults + children;

  const { totalBookingPrice, totalCapacity } = useMemo(() => {
    const totals = Object.entries(roomQuantities).reduce((acc, [offerId, quantity]) => {
        const offer = roomOffers.find(o => o.id === offerId);
        if (offer && quantity > 0) {
            acc.price += offer.finalPrice * nights * quantity;
            acc.capacity += offer.maxGuests * quantity;
        }
        return acc;
    }, { price: 0, capacity: 0 });
    return { totalBookingPrice: totals.price, totalCapacity: totals.capacity };
  }, [roomQuantities, nights]);

  const isCapacityExceeded = totalGuests > totalCapacity && totalBookingPrice > 0;
  
  if (!property) {
    return <div>Chargement...</div>;
  }
  
    const handleRoomQuantityChange = (offerId: string, quantity: number) => {
        setRoomQuantities(prev => ({ ...prev, [offerId]: quantity }));
    };

    const handleBooking = () => {
        const params = new URLSearchParams();
        if (dates?.from) params.set("from", dates.from.toISOString());
        if (dates?.to) params.set("to", dates.to.toISOString());
        params.set("nights", nights.toString());
        router.push(`/properties/${property.id}/book?${params.toString()}`);
    };

    const handleSearchUpdate = () => {
        const params = new URLSearchParams();
        if (propertyId) params.set("id", propertyId);
        if (dates?.from) params.set("from", format(dates.from, "yyyy-MM-dd"));
        if (dates?.to) params.set("to", format(dates.to, "yyyy-MM-dd"));
        params.set("adults", adults.toString());
        params.set("children", children.toString());
        router.push(`/properties/${property.id}?${params.toString()}`, { scroll: false });
        setIsDatePopoverOpen(false);
        setIsGuestsPopoverOpen(false);
    };

    const mainAmenities = property.amenities.slice(0, 5);
    const otherAmenities = property.amenities.slice(5);

  const { latitude, longitude } = property;
  const bbox = `${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;

  const getRatingText = (rating: number) => {
    if (rating >= 9) return 'Fabuleux';
    if (rating >= 8) return 'Très bien';
    if (rating >= 7) return 'Bien';
    return 'Agréable';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <h1 className="font-headline text-4xl font-bold">{property.name}</h1>
          {property.stars && (
            <div className="flex items-center">
              {[...Array(property.stars)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
          )}
        </div>
         <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {property.address} - <span className="font-semibold text-primary">Très bon emplacement</span> - <a href="#map" className="underline hover:text-primary-foreground">voir la carte</a>
        </p>
      </div>

      {/* Photo Gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[55vh] mb-8 relative">
        <div className="col-span-2 row-span-2 relative rounded-l-lg overflow-hidden cursor-pointer group" onClick={() => openLightbox(0)}>
            <Image src={property.images[0]} alt={property.name} fill className="object-cover" priority />
        </div>
        {property.images.slice(1, 5).map((image, index) => (
            <div key={index} className={cn("relative overflow-hidden cursor-pointer group", 
                index === 1 && "rounded-tr-lg", 
                index === 3 && "rounded-br-lg"
            )} onClick={() => openLightbox(index + 1)}>
                <Image src={image} alt={`${property.name} - photo ${index + 2}`} fill className="object-cover" />
                 {index === 3 && property.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold">
                        +{property.images.length - 5}
                    </div>
                )}
            </div>
        ))}
         <Button onClick={() => openLightbox(0)} variant="secondary" className="absolute bottom-4 right-4 z-10">
            <Grid3x3 className="mr-2 h-4 w-4" />
            Afficher toutes les photos
        </Button>
      </div>
      
       {lightboxOpen && (
            <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center animate-in fade-in-50">
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/10 hover:text-white rounded-full z-20" onClick={closeLightbox}>
                    <X className="h-8 w-8" />
                </Button>
                 <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 hover:text-white rounded-full z-20 h-12 w-12" onClick={prevImage}>
                    <ChevronLeft className="h-10 w-10" />
                </Button>
                 <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 hover:text-white rounded-full z-20 h-12 w-12" onClick={nextImage}>
                    <ChevronRight className="h-10 w-10" />
                </Button>
                <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
                     <Image src={property.images[lightboxIndex]} alt={`Photo ${lightboxIndex + 1}`} fill className="object-contain" />
                </div>
            </div>
        )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{property.description}</p>
                </CardContent>
            </Card>
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Équipements les plus appréciés</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mainAmenities.map(amenity => {
                        const Icon = amenityIcons[amenity] || Star;
                        return (
                            <div key={amenity} className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-primary" />
                                <span>{amenity}</span>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
            <Card className="mt-8" id="map">
                <CardHeader>
                    <CardTitle>Aux alentours de l'établissement</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        {property.nearbyAttractions?.map(attraction => {
                             const Icon = placeOfInterestIcons[attraction.type] || MapPin;
                             return (
                                <div key={attraction.name} className="flex justify-between text-sm mb-2">
                                    <span className="flex items-center gap-2">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                        {attraction.name}
                                    </span>
                                    <span className="text-muted-foreground">{attraction.distance} km</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full h-64 md:h-full rounded-lg overflow-hidden">
                       <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={mapSrc}
                        ></iframe>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{getRatingText(property.rating)} <Badge className="text-lg">{property.rating.toFixed(1)}</Badge></CardTitle>
                <CardDescription>{property.reviewsCount} expériences vécues</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' })}>Voir les disponibilités</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={property.host.avatar} alt={property.host.name} />
                  <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">Hôte : {property.host.name}</CardTitle>
                  <CardDescription>Prêt à vous accueillir</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Availability Section */}
      <div id="availability" className="mt-12 pt-8">
            <h1 className="text-3xl font-bold mb-4">Disponibilité</h1>
            <Card className="mb-8">
                <CardContent className="p-2 flex flex-col md:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="h-auto p-2 text-left font-normal">
                                    <CalendarIcon className="h-5 w-5 text-muted-foreground mr-2" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Dates</p>
                                        <p className="font-medium">
                                            {dates?.from ? format(dates.from, 'E dd MMM', { locale: fr }) : ''} - {dates?.to ? format(dates.to, 'E dd MMM', { locale: fr }) : ''}
                                        </p>
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={dates?.from}
                                    selected={dates}
                                    onSelect={setDates}
                                    numberOfMonths={2}
                                    locale={fr}
                                    disabled={{ before: new Date() }}
                                />
                            </PopoverContent>
                        </Popover>
                        <Separator orientation="vertical" className="h-8 hidden md:block" />
                        <Popover open={isGuestsPopoverOpen} onOpenChange={setIsGuestsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="h-auto p-2 text-left font-normal">
                                    <User className="h-5 w-5 text-muted-foreground mr-2" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Voyageurs</p>
                                        <p className="font-medium">
                                            {adults} adultes · {children} enfants
                                        </p>
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2"><h4 className="font-medium leading-none">Voyageurs</h4></div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between"><Label htmlFor="adults">Adultes</Label><div className="flex items-center gap-2"><Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(Math.max(1, adults - 1))} disabled={adults <= 1}><Minus className="h-4 w-4" /></Button><span className="w-8 text-center">{adults}</span><Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(adults + 1)}><Plus className="h-4 w-4" /></Button></div></div>
                                        <div className="flex items-center justify-between"><Label htmlFor="children">Enfants</Label><div className="flex items-center gap-2"><Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(Math.max(0, children - 1))} disabled={children <= 0}><Minus className="h-4 w-4" /></Button><span className="w-8 text-center">{children}</span><Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(children + 1)}><Plus className="h-4 w-4" /></Button></div></div>
                                    </div>
                                     <Button onClick={handleSearchUpdate} size="sm">Mettre à jour</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button onClick={handleSearchUpdate}>
                        <Search className="mr-2 h-4 w-4 md:hidden" />
                        <span className="hidden md:inline">Mettre à jour la recherche</span>
                    </Button>
                </CardContent>
            </Card>
             {isCapacityExceeded && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Capacité dépassée</AlertTitle>
                    <AlertDescription>
                        Le nombre de voyageurs ({totalGuests}) dépasse la capacité totale ({totalCapacity}) des chambres sélectionnées. Veuillez ajouter plus de chambres ou réduire le nombre de voyageurs.
                    </AlertDescription>
                </Alert>
            )}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-primary/10">
                        <TableRow>
                            <TableHead className="w-1/3 text-primary font-bold">Type de logement</TableHead>
                            <TableHead className="text-center text-primary font-bold">Capacité</TableHead>
                            <TableHead className="text-center text-primary font-bold">Tarif pour {nights} {nights > 1 ? 'nuits' : 'nuit'}</TableHead>
                            <TableHead className="w-1/4 text-primary font-bold">Vos options</TableHead>
                            <TableHead className="text-center text-primary font-bold">Nombre de chambres</TableHead>
                            <TableHead className="w-32"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roomOffers.map(offer => {
                            const discount = offer.basePrice > offer.finalPrice ? Math.round(((offer.basePrice - offer.finalPrice) / offer.basePrice) * 100) : 0;
                            const totalPrice = offer.finalPrice * nights;
                            const totalBasePrice = offer.basePrice * nights;
                            return (
                                <TableRow key={offer.id} className="align-top">
                                    <TableCell>
                                        <p className="font-bold text-primary hover:underline cursor-pointer">{offer.title}</p>
                                        <div className="text-sm mt-2 space-y-1 text-muted-foreground">
                                            {offer.bedType && <p className="flex items-center gap-2"><Bed className="h-4 w-4" />{offer.bedType}</p>}
                                            <p className="font-semibold text-foreground">Lit bébé gratuit toujours disponible</p>
                                            {offer.size && <p className="flex items-center gap-2"><Square className="h-4 w-4" />{offer.size} m²</p>}
                                            {offer.view && <p className="flex items-center gap-2"><Eye className="h-4 w-4" />{offer.view}</p>}
                                             {offer.amenities.length > 0 && <p className="flex items-center gap-2"><Wifi className="h-4 w-4" />Wi-Fi Gratuit</p>}
                                            <div className="pt-2">
                                                {offer.amenities.map(amenity => (
                                                    <p key={amenity} className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-green-600" /> {amenity}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center">
                                            {[...Array(offer.maxGuests)].map((_, i) => <User key={i} className="h-5 w-5" />)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {discount > 0 && <p className="text-sm line-through text-muted-foreground">{formatPrice(totalBasePrice)}</p>}
                                        <p className="text-xl font-bold">{formatPrice(totalPrice)}</p>
                                        <p className="text-xs text-muted-foreground">Taxes et frais compris</p>
                                        {discount > 0 && <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">-{discount}%</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-start gap-2">
                                            {offer.options.cancellation.startsWith('Annulation gratuite') ? (
                                                <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
                                            )}
                                             <p className={cn("font-semibold", offer.options.cancellation.startsWith('Annulation gratuite') ? 'text-green-600' : 'text-destructive')}>{offer.options.cancellation}</p>
                                        </div>
                                        <p className="text-sm mt-1 ml-6">{offer.options.payment}</p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Select onValueChange={(val) => handleRoomQuantityChange(offer.id, Number(val))} defaultValue="0">
                                            <SelectTrigger className="w-24">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[...Array(5).keys()].map(i => <SelectItem key={i} value={String(i)}>{i}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        <TableRow className="bg-transparent hover:bg-transparent">
                            <TableCell colSpan={4} />
                            <TableCell colSpan={2} className="p-4 text-center">
                                {totalBookingPrice > 0 && (
                                    <div className='text-center p-4 mb-4 bg-primary/10 rounded-lg'>
                                        <p className="font-semibold">Total de votre sélection :</p>
                                        <p className="text-2xl font-bold text-primary">{formatPrice(totalBookingPrice)}</p>
                                    </div>
                                )}
                                <Button size="lg" onClick={handleBooking} disabled={totalBookingPrice === 0 || isCapacityExceeded}>Je réserve</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
      </div>
    </div>
  );
}

export default function PropertyDetailPageWrapper() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <PropertyDetailPage />
    </Suspense>
  );
}
