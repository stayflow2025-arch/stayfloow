import type { ElementType } from 'react';

export type Amenity =
  | 'Wifi' | 'Piscine' | 'Cuisine' | 'Climatisation' | 'Parking'
  | 'Télévision' | 'Chauffage' | 'Lave-linge' | 'Espace de travail'
  | 'Sèche-cheveux' | 'Fer à repasser' | 'Balcon' | 'Vue sur la mer'
  | 'Jardin' | 'Jacuzzi' | 'Animaux autorisés';

export type CarFeature = 'Climatisation' | 'GPS' | 'Boîte automatique' | 'Siège bébé';
export type FuelType = 'Essence' | 'Diesel' | 'Électrique';

export type FacilityAmenity =
  | 'Restaurant' | 'Salle de sport' | 'Spa et centre de bien-être'
  | 'Bar' | 'Service d\'étage' | 'Réception ouverte 24h/24';

export type MealOption =
  | 'Petit-déjeuner inclus' | 'Demi-pension'
  | 'Pension complète' | 'Cuisine privée';

export type PlaceOfInterest =
  | 'Plage' | 'Centre-ville' | 'Musée' | 'Aéroport'
  | 'Montagne' | 'Parc national' | 'Site historique'
  | 'Magasin' | 'Centre commercial';

export const amenities: Amenity[] = [
  'Wifi','Piscine','Cuisine','Climatisation','Parking','Télévision','Chauffage',
  'Lave-linge','Espace de travail','Sèche-cheveux','Fer à repasser','Balcon',
  'Vue sur la mer','Jardin','Jacuzzi','Animaux autorisés'
];

export const carFeatures: CarFeature[] = [
  'Climatisation','GPS','Boîte automatique','Siège bébé'
];

export const propertyTypes = [
  'Appartement','Maison','Villa','Studio','Hôtel','Riad'
];

export const houseAndVillaRoomTypes = [
  '1 Chambre','2 Chambres','3 Chambres','4 Chambres et plus',
  'Cuisine','Salon','Salle à manger','1 Salle de bain','2 Salles de bain ou plus'
];

export const carTypes = ['Citadine','Berline','SUV','Utilitaire','Luxe','Sport'];

export const fuelTypes: FuelType[] = ['Essence','Diesel','Électrique'];

export const facilityAmenities: FacilityAmenity[] = [
  'Restaurant','Salle de sport','Spa et centre de bien-être',
  'Bar','Service d\'étage','Réception ouverte 24h/24'
];

export const mealOptions: MealOption[] = [
  'Petit-déjeuner inclus','Demi-pension','Pension complète','Cuisine privée'
];

export const topRatedFeatures = [
  'Propreté','Confort','Emplacement','Personnel'
];

export const placesOfInterest: PlaceOfInterest[] = [
  'Plage','Centre-ville','Musée','Aéroport','Montagne',
  'Parc national','Site historique','Magasin','Centre commercial'
];

export const algerianCities = [
  "Adrar","Aïn Defla","Aïn Témouchent","Alger","Annaba","Batna","Béchar","Béjaïa",
  "Biskra","Blida","Bordj Bou Arréridj","Bouira","Boumerdès","Chlef","Constantine",
  "Djelfa","El Bayadh","El Oued","El Tarf","Ghardaïa","Guelma","Illizi","Jijel",
  "Khenchela","Laghouat","M'Sila","Mascara","Médéa","Mila","Mostaganem","Naâma",
  "Oran","Ouargla","Oum El Bouaghi","Relizane","Saïda","Sétif","Sidi Bel Abbès",
  "Skikda","Souk Ahras","Tamanrasset","Tébessa","Tiaret","Tindouf","Tipaza",
  "Tissemsilt","Tizi Ouzou","Tlemcen"
];

export const egyptianCities = [
  "Alexandrie","Assouan","Assiout","Beheira","Beni Suef","Le Caire","Dakahlia",
  "Damiette","Fayoum","Gharbia","Gizeh","Ismaïlia","Kafr El Sheikh","Louxor",
  "Marsa Matrouh","Minya","Menoufia","Nouvelle Vallée","Nord Sinaï","Port Saïd",
  "Qalyubia","Qena","Mer Rouge","Sharqia","Sharm El Sheikh","Sohag","Sud Sinaï",
  "Suez","Tanta"
];

export const allCities = [...algerianCities, ...egyptianCities].sort();

export const cityCoordinates: Record<string,{lat:number;lon:number}> = {
  "Adrar":{lat:27.874,lon:-0.293},
  "Aïn Defla":{lat:36.264,lon:1.968},
  "Aïn Témouchent":{lat:35.300,lon:-1.140},
  "Alger":{lat:36.775,lon:3.058},
  "Annaba":{lat:36.900,lon:7.766},
  "Batna":{lat:35.555,lon:6.177},
  "Béchar":{lat:31.616,lon:-2.216},
  "Béjaïa":{lat:36.750,lon:5.066},
  "Biskra":{lat:34.850,lon:5.733},
  "Blida":{lat:36.466,lon:2.833},
  "Bordj Bou Arréridj":{lat:36.066,lon:4.766},
  "Bouira":{lat:36.372,lon:3.896},
  "Boumerdès":{lat:36.766,lon:3.477},
  "Chlef":{lat:36.166,lon:1.333},
  "Constantine":{lat:36.365,lon:6.619},
  "Djelfa":{lat:34.666,lon:3.250},
  "El Bayadh":{lat:33.683,lon:1.016},
  "El Oued":{lat:33.356,lon:6.863},
  "El Tarf":{lat:36.766,lon:8.316},
  "Ghardaïa":{lat:32.489,lon:3.673},
  "Guelma":{lat:36.466,lon:7.433},
  "Illizi":{lat:26.483,lon:8.466},
  "Jijel":{lat:36.816,lon:5.766},
  "Khenchela":{lat:35.433,lon:7.150},
  "Laghouat":{lat:33.800,lon:2.883},
  "M'Sila":{lat:35.700,lon:4.533},
  "Mascara":{lat:35.400,lon:0.133},
  "Médéa":{lat:36.266,lon:2.750},
  "Mila":{lat:36.450,lon:6.266},
  "Mostaganem":{lat:35.933,lon:0.083},
  "Naâma":{lat:33.266,lon:-0.316},
  "Oran":{lat:35.704,lon:-0.641},
  "Ouargla":{lat:31.950,lon:5.333},
  "Oum El Bouaghi":{lat:35.866,lon:7.116},
  "Relizane":{lat:35.733,lon:0.550},
  "Saïda":{lat:34.833,lon:0.150},
  "Sétif":{lat:36.191,lon:5.405},
  "Sidi Bel Abbès":{lat:35.183,lon:-0.633},
  "Skikda":{lat:36.877,lon:6.909},
  "Souk Ahras":{lat:36.283,lon:7.950},
  "Tamanrasset":{lat:22.785,lon:5.522},
  "Tébessa":{lat:35.400,lon:8.116},
  "Tiaret":{lat:35.366,lon:1.316},
  "Tindouf":{lat:27.666,lon:-8.133},
  "Tipaza":{lat:36.589,lon:2.447},
  "Tissemsilt":{lat:35.600,lon:1.816},
  "Tizi Ouzou":{lat:36.716,lon:4.050},
  "Tlemcen":{lat:34.882,lon:-1.316},
  "Alexandrie":{lat:31.200,lon:29.918},
  "Assouan":{lat:24.088,lon:32.899},
  "Assiout":{lat:27.178,lon:31.185},
  "Beheira":{lat:31.050,lon:30.500},
  "Beni Suef":{lat:29.074,lon:31.097},
  "Le Caire":{lat:30.044,lon:31.235},
  "Dakahlia":{lat:31.050,lon:31.583},
  "Damiette":{lat:31.416,lon:31.813},
  "Fayoum":{lat:29.309,lon:30.842},
  "Gharbia":{lat:30.850,lon:31.000},
  "Gizeh":{lat:29.987,lon:31.211},
  "Ismaïlia":{lat:30.596,lon:32.271},
  "Kafr El Sheikh":{lat:31.112,lon:30.942},
  "Louxor":{lat:25.687,lon:32.639},
  "Marsa Matrouh":{lat:31.354,lon:27.245},
  "Minya":{lat:28.109,lon:30.750},
  "Menoufia":{lat:30.550,lon:30.933},
  "Nouvelle Vallée":{lat:25.500,lon:28.000},
  "Nord Sinaï":{lat:30.500,lon:33.500},
  "Port Saïd":{lat:31.265,lon:32.301},
  "Qalyubia":{lat:30.333,lon:31.250},
  "Qena":{lat:26.162,lon:32.726},
  "Mer Rouge":{lat:26.000,lon:34.000},
  "Sharqia":{lat:30.666,lon:31.666},
  "Sharm El Sheikh":{lat:27.915,lon:34.330},
  "Sohag":{lat:26.556,lon:31.694},
  "Sud Sinaï":{lat:29.300,lon:33.800},
  "Suez":{lat:29.973,lon:32.526},
  "Tanta":{lat:30.788,lon:31.001}
};

export type NearbyAttraction = {
  name: string;
  type: PlaceOfInterest;
  distance: number;
};

export type Property = {
  id: string;
  slug: string;
  name: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  rating: number;
  stars?: number;
  reviewsCount: number;
  type: (typeof propertyTypes)[number];
  amenities: Amenity[];
  meals?: MealOption[];
  images: string[];
  description: string;
  host: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  tags?: string[];
  isBoosted?: boolean;
  isHighDemand?: boolean;
  isWeekendOffer?: boolean;
  nearbyAttractions?: NearbyAttraction[];
  checkIn?: string;
  checkOut?: string;
};

export const properties: Property[] = [
  {
    id: '1',
    slug: 'hotel-el-aurassi-alger',
    name: 'Hôtel El-Aurassi',
    location: 'Alger',
    address: '2 Boulevard Frantz Fanon, Alger Centre, 16000 Alger, Algérie',
    latitude: 36.7753,
    longitude: 3.0583,
    price: 22000,
    rating: 8.8,
    stars: 5,
    reviewsCount: 350,
    type: 'Hôtel',
    amenities: ['Wifi','Piscine','Climatisation','Télévision','Parking','Chauffage','Vue sur la mer','Balcon','Animaux autorisés'],
    meals: ['Petit-déjeuner inclus','Demi-pension','Pension complète'],
    images: [
      "https://picsum.photos/seed/el-aurassi-1/1920/1080",
      "https://picsum.photos/seed/el-aurassi-2/800/600",
      "https://picsum.photos/seed/el-aurassi-3/800/600",
      "https://picsum.photos/seed/el-aurassi-4/800/600",
      "https://picsum.photos/seed/el-aurassi-5/800/600"
    ],
    description: "Niché sur les hauteurs d'Alger, l'Hôtel El-Aurassi offre une vue panoramique imprenable sur la baie.",
    host: {
      name: 'Direction El-Aurassi',
      avatar: 'https://picsum.photos/seed/host-aurassi/100/100',
      email: 'contact@el-aurassi.dz',
      phone: '+213 21 74 82 52'
    },
    isBoosted: true,
    isHighDemand: true,
    isWeekendOffer: true,
    nearbyAttractions: [
      { name: "Jardin d'Essai du Hamma", type: 'Parc national', distance: 2 },
      { name: 'Musée National du Bardo', type: 'Musée', distance: 1.5 },
      { name: 'Aéroport Houari Boumédiène', type: 'Aéroport', distance: 20 },
      { name: "Casbah d'Alger", type: 'Site historique', distance: 1 }
    ],
    checkIn: 'De 15:00 à 00:00',
    checkOut: 'De 00:00 à 11:00'
  },

  {
    id: '2',
    slug: 'royal-hotel-oran-mgallery',
    name: 'Royal Hôtel Oran - MGallery',
    location: 'Oran',
    address: '1 Boulevard de la Soummam, 31000 Oran, Algérie',
    latitude: 35.7042,
    longitude: -0.6410,
    price: 28000,
    rating: 9.2,
    stars: 5,
    reviewsCount: 215,
    type: 'Hôtel',
    amenities: ['Wifi','Piscine','Cuisine','Climatisation','Parking','Sèche-cheveux','Espace de travail','Fer à repasser'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/royal-hotel-oran-facade/1920/1080',
      'https://picsum.photos/seed/royal-hotel-oran-room/800/600',
      'https://picsum.photos/seed/oran-santa-cruz/800/600',
      'https://picsum.photos/seed/mgallery-hotel-interior/800/600',
      'https://picsum.photos/seed/oran-hotel-spa/800/600'
    ],
    description: "Un joyau architectural alliant élégance à la française et culture locale.",
    host: {
      name: 'MGallery Collection',
      avatar: 'https://picsum.photos/seed/host-mgallery/100/100',
      email: 'resa@royalhoteloran.com',
      phone: '+213 41 98 20 00'
    },
    nearbyAttractions: [
      { name: 'Place du 1er Novembre', type: 'Centre-ville', distance: 0.5 },
      { name: 'Plage des Andalouses', type: 'Plage', distance: 25 },
      { name: 'Fort de Santa Cruz', type: 'Site historique', distance: 4 }
    ],
    checkIn: 'De 15:00 à 23:00',
    checkOut: "Jusqu'à 12:00"
  },

  {
    id: '8',
    slug: 'villa-la-brise-marine-tipaza',
    name: 'Villa "La Brise Marine"',
    location: 'Tipaza',
    address: 'Route de la Corniche, Chenoua Plage, 42000 Tipaza, Algérie',
    latitude: 36.5896,
    longitude: 2.4475,
    price: 24000,
    rating: 9.1,
    reviewsCount: 110,
    type: 'Villa',
    amenities: ['Wifi','Piscine','Cuisine','Climatisation','Parking','Lave-linge','Vue sur la mer','Jardin'],
    meals: ['Cuisine privée'],
    images: [
      'https://picsum.photos/seed/tipaza-roman-ruins-view/1920/1080',
      'https://picsum.photos/seed/mediterranean-villa-algeria/800/600',
      'https://picsum.photos/seed/villa-pool-seaview-algeria/800/600',
      'https://picsum.photos/seed/tipaza-turquoise-coast/800/600',
      'https://picsum.photos/seed/tipaza-turquoise-coast/800/600',
      'https://picsum.photos/seed/private-algerian-cove/800/600'
    ],
    description: "Magnifique villa contemporaine avec piscine privée et accès direct à une crique isolée.",
    host: {
      name: 'Yacine',
      avatar: 'https://picsum.photos/seed/host8/100/100',
      email: 'yacine.brise@email.com',
      phone: '+213 790 78 90 12'
    },
    nearbyAttractions: [
      { name: 'Plage Chenoua', type: 'Plage', distance: 2 },
      { name: 'Ruines Romaines de Tipaza', type: 'Site historique', distance: 1.5 },
      { name: 'Tombeau de la Chrétienne', type: 'Site historique', distance: 15 }
    ],
    checkIn: 'De 16:00 à 22:00',
    checkOut: "Jusqu'à 11:00"
  },

  {
    id: '4',
    slug: 'hotel-cirta-constantine',
    name: 'Hôtel Cirta Constantine',
    location: 'Constantine',
    address: '1 Avenue Rahmani Cherif, 25000 Constantine, Algérie',
    latitude: 36.3650,
    longitude: 6.6190,
    price: 18000,
    rating: 8.2,
    stars: 4,
    reviewsCount: 155,
    type: 'Hôtel',
    amenities: ['Wifi','Parking','Télévision','Climatisation','Espace de travail'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/constantine-sidi-mcid-bridge/1920/1080',
      'https://picsum.photos/seed/hotel-cirta-view/800/600',
      'https://picsum.photos/seed/historic-hotel-constantine-lobby/800/600',
      'https://picsum.photos/seed/constantine-old-city/800/600',
      'https://picsum.photos/seed/rhummel-gorges-constantine/800/600'
    ],
    description: "Un établissement historique et emblématique surplombant les gorges spectaculaires du Rhummel.",
    host: {
      name: 'Famille Benslimane',
      avatar: 'https://picsum.photos/seed/host4/100/100',
      email: 'famille.benslimane@email.com',
      phone: '+213 661 44 55 66'
    },
    nearbyAttractions: [
      { name: "Pont Sidi M'Cid", type: 'Site historique', distance: 0.5 },
      { name: "Palais d'Ahmed Bey", type: 'Site historique', distance: 0.2 },
      { name: 'Musée national Cirta', type: 'Musée', distance: 0.5 }
    ],
    checkIn: 'À partir de 14:00',
    checkOut: "Jusqu'à 12:00"
  }
];

export type Car = {
  id: string;
  brand: string;
  model: string;
  pricePerDay: number;
  features: CarFeature[];
  image: string;
};

export const cars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Corolla",
    pricePerDay: 5000,
    features: ["Climatisation", "GPS"],
    image: "https://picsum.photos/seed/car1/800/600"
  },
  {
    id: "2",
    brand: "Hyundai",
    model: "i20",
    pricePerDay: 4500,
    features: ["Climatisation"],
    image: "https://picsum.photos/seed/car2/800/600"
  }
];

export const mockUser = {
  id: "1",
  name: "Utilisateur Test",
  email: "test@example.com",
  role: "user",
  isGenius: false
};

export const paymentSettings = {
  currency: "DZD",
  taxRate: 0.19,
  serviceFee: 0.05
};

// ===============================
// PENDING ENTITIES & CIRCUITS
// ===============================

export type PendingCar = {
  id: string;
  brand: string;
  model: string;
  pricePerDay: number;
  features: CarFeature[];
  image: string;
};

export type PendingCircuit = {
  id: string;
  name: string;
  description: string;
  price: number;
  days: number;
  images: string[];
};

export type Circuit = {
  id: string;
  name: string;
  description: string;
  price: number;
  days: number;
  images: string[];
};

// Circuits disponibles (vide pour l’instant)
export const circuits: Circuit[] = [];

// Circuits en attente de validation
export const pendingCircuits: PendingCircuit[] = [];

// Voitures en attente de validation
export const pendingCars: PendingCar[] = [];
