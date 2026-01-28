
import type { ElementType } from 'react';

export type Amenity = 'Wifi' | 'Piscine' | 'Cuisine' | 'Climatisation' | 'Parking' | 'Télévision' | 'Chauffage' | 'Lave-linge' | 'Espace de travail' | 'Sèche-cheveux' | 'Fer à repasser' | 'Balcon' | 'Vue sur la mer' | 'Jardin' | 'Jacuzzi' | 'Animaux autorisés';
export type CarFeature = 'Climatisation' | 'GPS' | 'Boîte automatique' | 'Siège bébé';
export type FuelType = 'Essence' | 'Diesel' | 'Électrique';
export type FacilityAmenity = 'Restaurant' | 'Salle de sport' | 'Spa et centre de bien-être' | 'Bar' | 'Service d\'étage' | 'Réception ouverte 24h/24';
export type MealOption = 'Petit-déjeuner inclus' | 'Demi-pension' | 'Pension complète' | 'Cuisine privée';
export type PlaceOfInterest = 'Plage' | 'Centre-ville' | 'Musée' | 'Aéroport' | 'Montagne' | 'Parc national' | 'Site historique' | 'Magasin' | 'Centre commercial';


export const amenities: Amenity[] = ['Wifi', 'Piscine', 'Cuisine', 'Climatisation', 'Parking', 'Télévision', 'Chauffage', 'Lave-linge', 'Espace de travail', 'Sèche-cheveux', 'Fer à repasser', 'Balcon', 'Vue sur la mer', 'Jardin', 'Jacuzzi', 'Animaux autorisés'];
export const carFeatures: CarFeature[] = ['Climatisation', 'GPS', 'Boîte automatique', 'Siège bébé'];
export const propertyTypes = [
    'Appartement', 
    'Maison', 
    'Villa', 
    'Studio', 
    'Hôtel', 
    'Riad'
];
export const houseAndVillaRoomTypes = [
    '1 Chambre',
    '2 Chambres',
    '3 Chambres',
    '4 Chambres et plus',
    'Cuisine',
    'Salon',
    'Salle à manger',
    '1 Salle de bain',
    '2 Salles de bain ou plus',
];
export const carTypes = ['Citadine', 'Berline', 'SUV', 'Utilitaire', 'Luxe', 'Sport'];
export const fuelTypes: FuelType[] = ['Essence', 'Diesel', 'Électrique'];
export const facilityAmenities: FacilityAmenity[] = ['Restaurant', 'Salle de sport', 'Spa et centre de bien-être', 'Bar', 'Service d\'étage', 'Réception ouverte 24h/24'];
export const mealOptions: MealOption[] = ['Petit-déjeuner inclus', 'Demi-pension', 'Pension complète', 'Cuisine privée'];
export const topRatedFeatures = ['Propreté', 'Confort', 'Emplacement', 'Personnel'];
export const placesOfInterest: PlaceOfInterest[] = ['Plage', 'Centre-ville', 'Musée', 'Aéroport', 'Montagne', 'Parc national', 'Site historique', 'Magasin', 'Centre commercial'];


export const algerianCities = [
  "Adrar", "Aïn Defla", "Aïn Témouchent", "Alger", "Annaba", "Batna",
  "Béchar", "Béjaïa", "Biskra", "Blida", "Bordj Bou Arréridj", "Bouira",
  "Boumerdès", "Chlef", "Constantine", "Djelfa", "El Bayadh", "El Oued",
  "El Tarf", "Ghardaïa", "Guelma", "Illizi", "Jijel", "Khenchela", "Laghouat",
  "M'Sila", "Mascara", "Médéa", "Mila", "Mostaganem", "Naâma", "Oran",
  "Ouargla", "Oum El Bouaghi", "Relizane", "Saïda", "Sétif", "Sidi Bel Abbès",
  "Skikda", "Souk Ahras", "Tamanrasset", "Tébessa", "Tiaret", "Tindouf",
  "Tipaza", "Tissemsilt", "Tizi Ouzou", "Tlemcen"
];

export const egyptianCities = [
    "Alexandrie", "Assouan", "Assiout", "Beheira", "Beni Suef", "Le Caire",
    "Dakahlia", "Damiette", "Fayoum", "Gharbia", "Gizeh", "Ismaïlia",
    "Kafr El Sheikh", "Louxor", "Marsa Matrouh", "Minya", "Menoufia",
    "Nouvelle Vallée", "Nord Sinaï", "Port Saïd", "Qalyubia", "Qena",
    "Mer Rouge", "Sharqia", "Sharm El Sheikh", "Sohag", "Sud Sinaï", "Suez", "Tanta"
];

export const allCities = [...algerianCities, ...egyptianCities].sort();

export const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  // Algeria
  "Adrar": { lat: 27.874, lon: -0.293 },
  "Aïn Defla": { lat: 36.264, lon: 1.968 },
  "Aïn Témouchent": { lat: 35.300, lon: -1.140 },
  "Alger": { lat: 36.775, lon: 3.058 },
  "Annaba": { lat: 36.900, lon: 7.766 },
  "Batna": { lat: 35.555, lon: 6.177 },
  "Béchar": { lat: 31.616, lon: -2.216 },
  "Béjaïa": { lat: 36.750, lon: 5.066 },
  "Biskra": { lat: 34.850, lon: 5.733 },
  "Blida": { lat: 36.466, lon: 2.833 },
  "Bordj Bou Arréridj": { lat: 36.066, lon: 4.766 },
  "Bouira": { lat: 36.372, lon: 3.896 },
  "Boumerdès": { lat: 36.766, lon: 3.477 },
  "Chlef": { lat: 36.166, lon: 1.333 },
  "Constantine": { lat: 36.365, lon: 6.619 },
  "Djelfa": { lat: 34.666, lon: 3.250 },
  "El Bayadh": { lat: 33.683, lon: 1.016 },
  "El Oued": { lat: 33.356, lon: 6.863 },
  "El Tarf": { lat: 36.766, lon: 8.316 },
  "Ghardaïa": { lat: 32.489, lon: 3.673 },
  "Guelma": { lat: 36.466, lon: 7.433 },
  "Illizi": { lat: 26.483, lon: 8.466 },
  "Jijel": { lat: 36.816, lon: 5.766 },
  "Khenchela": { lat: 35.433, lon: 7.150 },
  "Laghouat": { lat: 33.800, lon: 2.883 },
  "M'Sila": { lat: 35.700, lon: 4.533 },
  "Mascara": { lat: 35.400, lon: 0.133 },
  "Médéa": { lat: 36.266, lon: 2.750 },
  "Mila": { lat: 36.450, lon: 6.266 },
  "Mostaganem": { lat: 35.933, lon: 0.083 },
  "Naâma": { lat: 33.266, lon: -0.316 },
  "Oran": { lat: 35.704, lon: -0.641 },
  "Ouargla": { lat: 31.950, lon: 5.333 },
  "Oum El Bouaghi": { lat: 35.866, lon: 7.116 },
  "Relizane": { lat: 35.733, lon: 0.550 },
  "Saïda": { lat: 34.833, lon: 0.150 },
  "Sétif": { lat: 36.191, lon: 5.405 },
  "Sidi Bel Abbès": { lat: 35.183, lon: -0.633 },
  "Skikda": { lat: 36.877, lon: 6.909 },
  "Souk Ahras": { lat: 36.283, lon: 7.950 },
  "Tamanrasset": { lat: 22.785, lon: 5.522 },
  "Tébessa": { lat: 35.400, lon: 8.116 },
  "Tiaret": { lat: 35.366, lon: 1.316 },
  "Tindouf": { lat: 27.666, lon: -8.133 },
  "Tipaza": { lat: 36.589, lon: 2.447 },
  "Tissemsilt": { lat: 35.600, lon: 1.816 },
  "Tizi Ouzou": { lat: 36.716, lon: 4.050 },
  "Tlemcen": { lat: 34.882, lon: -1.316 },
  // Egypt
  "Alexandrie": { lat: 31.200, lon: 29.918 },
  "Assouan": { lat: 24.088, lon: 32.899 },
  "Assiout": { lat: 27.178, lon: 31.185 },
  "Beheira": { lat: 31.050, lon: 30.500 },
  "Beni Suef": { lat: 29.074, lon: 31.097 },
  "Le Caire": { lat: 30.044, lon: 31.235 },
  "Dakahlia": { lat: 31.050, lon: 31.583 },
  "Damiette": { lat: 31.416, lon: 31.813 },
  "Fayoum": { lat: 29.309, lon: 30.842 },
  "Gharbia": { lat: 30.850, lon: 31.000 },
  "Gizeh": { lat: 29.987, lon: 31.211 },
  "Ismaïlia": { lat: 30.596, lon: 32.271 },
  "Kafr El Sheikh": { lat: 31.112, lon: 30.942 },
  "Louxor": { lat: 25.687, lon: 32.639 },
  "Marsa Matrouh": { lat: 31.354, lon: 27.245 },
  "Minya": { lat: 28.109, lon: 30.750 },
  "Menoufia": { lat: 30.550, lon: 30.933 },
  "Nouvelle Vallée": { lat: 25.500, lon: 28.000 },
  "Nord Sinaï": { lat: 30.500, lon: 33.500 },
  "Port Saïd": { lat: 31.265, lon: 32.301 },
  "Qalyubia": { lat: 30.333, lon: 31.250 },
  "Qena": { lat: 26.162, lon: 32.726 },
  "Mer Rouge": { lat: 26.000, lon: 34.000 },
  "Sharqia": { lat: 30.666, lon: 31.666 },
  "Sharm El Sheikh": { lat: 27.915, lon: 34.330 },
  "Sohag": { lat: 26.556, lon: 31.694 },
  "Sud Sinaï": { lat: 29.300, lon: 33.800 },
  "Suez": { lat: 29.973, lon: 32.526 },
  "Tanta": { lat: 30.788, lon: 31.001 },
};


export const circuitThemes = ["Aventure", "Désert", "Culture", "Histoire", "Randonnée", "Gastronomie", "Balnéaire"];
export const circuitDurations = ["1 jour", "2-3 jours", "4-6 jours", "1 semaine", "2 semaines et plus"];

export type NearbyAttraction = {
    name: string;
    type: PlaceOfInterest;
    distance: number; // in km
};

export type Property = {
  id: string;
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
  images: string[];
  description: string;
  host: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  meals?: MealOption[];
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
    amenities: ['Wifi', 'Piscine', 'Climatisation', 'Télévision', 'Parking', 'Chauffage', 'Vue sur la mer', 'Balcon', 'Animaux autorisés'],
    meals: ['Petit-déjeuner inclus', 'Demi-pension', 'Pension complète'],
    images: [
      "https://picsum.photos/seed/el-aurassi-1/1920/1080",
      "https://picsum.photos/seed/el-aurassi-2/800/600",
      "https://picsum.photos/seed/el-aurassi-3/800/600",
      "https://picsum.photos/seed/el-aurassi-4/800/600",
      "https://picsum.photos/seed/el-aurassi-5/800/600",
    ],
    description: 'Niché sur les hauteurs d\'Alger, l\'Hôtel El-Aurassi offre une vue panoramique imprenable sur la baie. Un symbole de luxe et d\'hospitalité algéroise, cet établissement 5 étoiles combine élégance moderne et service d\'exception pour un séjour inoubliable.',
    host: {
      name: 'Direction El-Aurassi',
      avatar: 'https://picsum.photos/seed/host-aurassi/100/100',
      email: 'contact@el-aurassi.dz',
      phone: '+213 21 74 82 52',
    },
    isBoosted: true,
    isHighDemand: true,
    isWeekendOffer: true,
    nearbyAttractions: [
        { name: 'Jardin d\'Essai du Hamma', type: 'Parc national', distance: 2 },
        { name: 'Musée National du Bardo', type: 'Musée', distance: 1.5 },
        { name: 'Aéroport Houari Boumédiène', type: 'Aéroport', distance: 20 },
        { name: 'Casbah d\'Alger', type: 'Site historique', distance: 1 }
    ],
    checkIn: 'De 15:00 à 00:00',
    checkOut: 'De 00:00 à 11:00',
  },
  {
    id: '2',
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
    amenities: ['Wifi', 'Piscine', 'Cuisine', 'Climatisation', 'Parking', 'Sèche-cheveux', 'Espace de travail', 'Fer à repasser'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/royal-hotel-oran-facade/1920/1080',
      'https://picsum.photos/seed/royal-hotel-oran-room/800/600',
      'https://picsum.photos/seed/oran-santa-cruz/800/600',
      'https://picsum.photos/seed/mgallery-hotel-interior/800/600',
      'https://picsum.photos/seed/oran-hotel-spa/800/600',
    ],
    description: 'Un joyau architectural alliant élégance à la française et culture locale. Vivez une expérience mémorable au cœur vibrant d\'Oran, où chaque détail est pensé pour votre confort et votre bien-être.',
    host: {
      name: 'MGallery Collection',
      avatar: 'https://picsum.photos/seed/host-mgallery/100/100',
      email: 'resa@royalhoteloran.com',
      phone: '+213 41 98 20 00',
    },
     nearbyAttractions: [
        { name: 'Place du 1er Novembre', type: 'Centre-ville', distance: 0.5 },
        { name: 'Plage des Andalouses', type: 'Plage', distance: 25 },
        { name: 'Fort de Santa Cruz', type: 'Site historique', distance: 4 }
    ],
    checkIn: 'De 15:00 à 23:00',
    checkOut: 'Jusqu\'à 12:00',
  },
    {
    id: '8',
    name: 'Villa "La Brise Marine"',
    location: 'Tipaza',
    address: 'Route de la Corniche, Chenoua Plage, 42000 Tipaza, Algérie',
    latitude: 36.5896,
    longitude: 2.4475,
    price: 24000,
    rating: 9.1,
    reviewsCount: 110,
    type: 'Villa',
    amenities: ['Wifi', 'Piscine', 'Cuisine', 'Climatisation', 'Parking', 'Lave-linge', 'Vue sur la mer', 'Jardin'],
    meals: ['Cuisine privée'],
    images: [
        'https://picsum.photos/seed/tipaza-roman-ruins-view/1920/1080',
        'https://picsum.photos/seed/mediterranean-villa-algeria/800/600',
        'https://picsum.photos/seed/villa-pool-seaview-algeria/800/600',
        'https://picsum.photos/seed/tipaza-turquoise-coast/800/600',
        'https://picsum.photos/seed/private-algerian-cove/800/600',
    ],
    description: 'Magnifique villa contemporaine avec piscine privée et accès direct à une crique isolée. Profitez du calme absolu, de la mer Méditerranée et de la proximité des sites archéologiques romains de Tipaza.',
    host: {
        name: 'Yacine',
        avatar: 'https://picsum.photos/seed/host8/100/100',
        email: 'yacine.brise@email.com',
        phone: '+213 790 78 90 12',
    },
    nearbyAttractions: [
        { name: 'Plage Chenoua', type: 'Plage', distance: 2 },
        { name: 'Ruines Romaines de Tipaza', type: 'Site historique', distance: 1.5 },
        { name: 'Tombeau de la Chrétienne', type: 'Site historique', distance: 15 }
    ],
    checkIn: 'De 16:00 à 22:00',
    checkOut: 'Jusqu\'à 11:00',
  },
  {
    id: '4',
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
    amenities: ['Wifi', 'Parking', 'Télévision', 'Climatisation', 'Espace de travail'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/constantine-sidi-mcid-bridge/1920/1080',
      'https://picsum.photos/seed/hotel-cirta-view/800/600',
      'https://picsum.photos/seed/historic-hotel-constantine-lobby/800/600',
      'https://picsum.photos/seed/constantine-old-city/800/600',
      'https://picsum.photos/seed/rhummel-gorges-constantine/800/600',
    ],
    description: 'Un établissement historique et emblématique surplombant les gorges spectaculaires du Rhummel. L\'Hôtel Cirta est le point de départ idéal pour explorer la ville des ponts suspendus et son riche patrimoine.',
    host: {
      name: 'Famille Benslimane',
      avatar: 'https://picsum.photos/seed/host4/100/100',
      email: 'famille.benslimane@email.com',
      phone: '+213 661 44 55 66',
    },
     nearbyAttractions: [
        { name: 'Pont Sidi M\'Cid', type: 'Site historique', distance: 0.5 },
        { name: 'Palais d\'Ahmed Bey', type: 'Site historique', distance: 0.2 },
        { name: 'Musée national Cirta', type: 'Musée', distance: 0.5 }
    ],
    checkIn: 'À partir de 14:00',
    checkOut: 'Jusqu\'à 12:00',
  },
  {
    id: '5',
    name: 'La Gazelle d\'Or Resort',
    location: 'El Oued',
    address: 'Route de Guemar, 39000 El Oued, Algérie',
    latitude: 33.3562,
    longitude: 6.8631,
    price: 35000,
    rating: 9.8,
    stars: 5,
    reviewsCount: 95,
    type: 'Villa',
    amenities: ['Wifi', 'Piscine', 'Cuisine', 'Climatisation', 'Parking', 'Lave-linge', 'Jardin', 'Jacuzzi'],
    meals: ['Pension complète'],
    images: [
      'https://picsum.photos/seed/sahara-resort-gazelle-or/1920/1080',
      'https://picsum.photos/seed/luxury-desert-villa-pool/800/600',
      'https://picsum.photos/seed/el-oued-sand-dunes/800/600',
      'https://picsum.photos/seed/sahara-oasis-pool/800/600',
      'https://picsum.photos/seed/arabic-interior-design/800/600',
    ],
    description: 'Une retraite de luxe exclusive aux portes du Sahara. Découvrez un confort exceptionnel dans des villas privées avec piscine, au cœur d\'une oasis enchanteresse au milieu des dunes de sable doré.',
    host: {
      name: 'La Gazelle d\'Or',
      avatar: 'https://picsum.photos/seed/host-gazelle/100/100',
      email: 'booking@gazelledor.dz',
      phone: '+213 48 77 00 00',
    },
    isBoosted: true,
     nearbyAttractions: [
        { name: 'Aéroport d\'El Oued', type: 'Aéroport', distance: 15 },
        { name: 'Grand Erg Oriental', type: 'Montagne', distance: 5 },
        { name: 'Ville aux mille coupoles', type: 'Centre-ville', distance: 10 }
    ],
    checkIn: 'À partir de 16:00',
    checkOut: 'Jusqu\'à 12:00',
  },
   {
    id: '3',
    name: 'Riad "Le Charme de la Casbah"',
    location: 'Alger',
    address: 'Rue des Frères Khelifa, Casbah, 16000 Alger, Algérie',
    latitude: 36.7842,
    longitude: 3.0601,
    price: 15000,
    rating: 8.7,
    reviewsCount: 180,
    type: 'Riad',
    amenities: ['Wifi', 'Cuisine', 'Climatisation', 'Chauffage', 'Jardin'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/casbah-algiers-riad/1920/1080',
      'https://picsum.photos/seed/casbah-moorish-architecture/800/600',
      'https://picsum.photos/seed/traditional-algerian-courtyard/800/600',
      'https://picsum.photos/seed/casbah-rooftop-mediterranean-view/800/600',
      'https://picsum.photos/seed/algerian-mosaic-tiles/800/600',
    ],
    description: 'Plongez dans l\'histoire et l\'authenticité. Ce Riad restauré avec soin vous offre une oasis de paix et de fraîcheur, avec son patio verdoyant, au sein de la mythique Casbah d\'Alger.',
    host: {
      name: 'Djamila',
      avatar: 'https://picsum.photos/seed/host3/100/100',
      email: 'djamila.casbah@email.com',
      phone: '+213 555 11 22 33',
    },
    nearbyAttractions: [
        { name: 'Casbah d\'Alger', type: 'Site historique', distance: 0 },
        { name: 'Place des Martyrs', type: 'Centre-ville', distance: 1 },
        { name: 'Musée d\'Art Moderne (MAMA)', type: 'Musée', distance: 0.8 }
    ],
    checkIn: 'De 14:00 à 20:00',
    checkOut: 'Jusqu\'à 11:00',
  },
  {
    id: '7',
    name: 'Appart\'Hôtel Les Zianides',
    location: 'Tlemcen',
    address: 'Boulevard Pasteur, 13000 Tlemcen, Algérie',
    latitude: 34.8828,
    longitude: -1.3169,
    price: 16000,
    rating: 8.5,
    stars: 3,
    reviewsCount: 130,
    type: 'Appartement',
    amenities: ['Wifi', 'Cuisine', 'Climatisation', 'Espace de travail', 'Télévision'],
    meals: ['Cuisine privée'],
    images: [
        'https://picsum.photos/seed/zianides-tlemcen-hotel/1920/1080',
        'https://picsum.photos/seed/tlemcen-modern-apartment/800/600',
        'https://picsum.photos/seed/zianid-dynasty-architecture/800/600',
        'https://picsum.photos/seed/tlemcen-grand-mosque/800/600',
        'https://picsum.photos/seed/modern-andalusian-apartment/800/600',
    ],
    description: 'Le confort d\'un appartement moderne avec les services d\'un hôtel. Idéalement situé pour découvrir les trésors historiques et culturels de la capitale des Zianides.',
    host: {
      name: 'Lila',
      avatar: 'https://picsum.photos/seed/host7/100/100',
      email: 'lila.zianides@email.com',
      phone: '+213 550 12 34 56',
    },
    nearbyAttractions: [
      { name: 'Grande Mosquée de Tlemcen', type: 'Site historique', distance: 1 },
      { name: 'Plateau de Lalla Setti', type: 'Montagne', distance: 5 },
      { name: 'Aéroport de Tlemcen', type: 'Aéroport', distance: 22 }
    ],
    checkIn: 'De 15:00 à 00:00',
    checkOut: 'De 00:00 à 11:00',
  },
  {
    id: '6',
    name: 'Campement de Luxe à Djanet',
    location: 'Djanet',
    address: 'Erg Admer, Parc National du Tassili, 33000 Djanet, Algérie',
    latitude: 24.5552,
    longitude: 9.4853,
    price: 25000,
    rating: 9.9,
    reviewsCount: 75,
    type: 'Maison',
    amenities: ['Cuisine', 'Parking', 'Chauffage', 'Jardin'],
    meals: ['Pension complète'],
    images: [
      'https://picsum.photos/seed/tassili-najjer-camp/1920/1080',
      'https://picsum.photos/seed/sahara-luxury-tent-algeria/800/600',
      'https://picsum.photos/seed/djanet-rock-art-painting/800/600',
      'https://picsum.photos/seed/touareg-campfire-desert/800/600',
      'https://picsum.photos/seed/sahara-milky-way-night/800/600',
    ],
    description: 'Vivez la magie du désert du Tassili n\'Ajjer. Nos tentes de luxe, inspirées de l\'habitat traditionnel Touareg, offrent une expérience de glamping inoubliable sous un ciel étoilé spectaculaire.',
    host: {
      name: 'Ibrahim, Guide Touareg',
      avatar: 'https://picsum.photos/seed/host6/100/100',
      email: 'ibrahim.guide@email.com',
      phone: '+213 770 99 88 77',
    },
    nearbyAttractions: [
        { name: 'Parc National du Tassili', type: 'Parc national', distance: 0 },
        { name: 'Aéroport de Djanet', type: 'Aéroport', distance: 25 },
        { name: 'La Vache qui pleure', type: 'Site historique', distance: 10 }
    ],
    checkIn: 'Flexible',
    checkOut: 'Flexible',
  },
  // Annaba
  {
    id: '9',
    name: 'Hôtel Sabri',
    location: 'Annaba',
    address: 'Plage Saint-Cloud, 23000 Annaba, Algérie',
    latitude: 36.9245,
    longitude: 7.7523,
    price: 19000,
    rating: 8.0,
    stars: 4,
    reviewsCount: 280,
    type: 'Hôtel',
    amenities: ['Wifi', 'Piscine', 'Climatisation', 'Vue sur la mer', 'Parking'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/hotel-sabri-annaba/1920/1080',
      'https://picsum.photos/seed/annaba-beach-view/800/600',
      'https://picsum.photos/seed/sabri-hotel-pool/800/600',
      'https://picsum.photos/seed/sabri-hotel-room/800/600',
      'https://picsum.photos/seed/annaba-coastline/800/600',
    ],
    description: 'Situé sur la corniche, l\'Hôtel Sabri offre un accès direct à la plage et une vue imprenable sur la Méditerranée. Profitez de nos installations modernes pour un séjour relaxant.',
    host: {
      name: 'Groupe Sabri',
      avatar: 'https://picsum.photos/seed/host9/100/100',
      email: 'contact@sabri-hotel.com',
      phone: '+213 38 86 25 25',
    },
    nearbyAttractions: [{ name: 'Plage Saint-Cloud', type: 'Plage', distance: 0.1 }, { name: 'Basilique Saint-Augustin', type: 'Site historique', distance: 3 }],
    checkIn: 'De 15:00 à 00:00',
    checkOut: 'Jusqu\'à 11:00',
  },
  {
    id: '10',
    name: 'Le Majestic Annaba',
    location: 'Annaba',
    address: 'Cours de la Révolution, 23000 Annaba, Algérie',
    latitude: 36.9030,
    longitude: 7.7609,
    price: 15000,
    rating: 7.5,
    stars: 3,
    reviewsCount: 150,
    type: 'Hôtel',
    amenities: ['Wifi', 'Climatisation', 'Parking', 'Espace de travail'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/majestic-annaba/1920/1080',
      'https://picsum.photos/seed/majestic-lobby/800/600',
      'https://picsum.photos/seed/majestic-room/800/600',
      'https://picsum.photos/seed/annaba-city-center/800/600',
      'https://picsum.photos/seed/saint-augustin-basilica/800/600',
    ],
    description: 'Hôtel de charme au cœur d\'Annaba, Le Majestic est idéal pour les voyageurs d\'affaires et de loisirs, à quelques pas du cours de la Révolution et de la basilique Saint-Augustin.',
    host: {
      name: 'Direction Le Majestic',
      avatar: 'https://picsum.photos/seed/host10/100/100',
      email: 'resa@majestic-annaba.dz',
      phone: '+213 38 45 67 89',
    },
    nearbyAttractions: [{ name: 'Cours de la Révolution', type: 'Centre-ville', distance: 0.2 }, { name: 'Musée d\'Hippone', type: 'Musée', distance: 2 }],
    checkIn: 'De 14:00 à 00:00',
    checkOut: 'Jusqu\'à 12:00',
  },
  // Sétif
  {
    id: '11',
    name: 'Park Mall Hotel & Conference Center',
    location: 'Sétif',
    address: 'Avenue de l\'ALN, 19000 Sétif, Algérie',
    latitude: 36.1895,
    longitude: 5.4132,
    price: 21000,
    rating: 8.9,
    stars: 4,
    reviewsCount: 320,
    type: 'Hôtel',
    amenities: ['Wifi', 'Piscine', 'Climatisation', 'Parking'],
    meals: ['Petit-déjeuner inclus', 'Demi-pension'],
    images: [
      'https://picsum.photos/seed/park-mall-setif/1920/1080',
      'https://picsum.photos/seed/setif-park-mall-hotel/800/600',
      'https://picsum.photos/seed/setif-hotel-pool/800/600',
      'https://picsum.photos/seed/setif-conference-room/800/600',
      'https://picsum.photos/seed/ain-fouara-fountain/800/600',
    ],
    description: 'L\'hôtel le plus moderne de Sétif, directement connecté au plus grand centre commercial de la région. Alliant affaires et loisirs, il offre un confort et des services de premier ordre.',
    host: {
      name: 'Park Mall Hotel',
      avatar: 'https://picsum.photos/seed/host11/100/100',
      email: 'contact@setif-parkmall-hotel.com',
      phone: '+213 36 62 70 00',
    },
    isBoosted: true,
    nearbyAttractions: [
        { name: 'Park Mall Sétif', type: 'Centre commercial', distance: 0.1 },
        { name: 'Fontaine d\'Aïn El Fouara', type: 'Site historique', distance: 1 }, 
        { name: 'Musée National d\'Archéologie', type: 'Musée', distance: 1.5 }
    ],
    checkIn: 'De 15:00 à 00:00',
    checkOut: 'Jusqu\'à 12:00',
  },
  {
    id: '12',
    name: 'Hôtel Tadj El Mouada',
    location: 'Sétif',
    address: 'Rue des Frères Meslem, 19000 Sétif, Algérie',
    latitude: 36.1918,
    longitude: 5.4055,
    price: 12000,
    rating: 7.1,
    stars: 3,
    reviewsCount: 90,
    type: 'Hôtel',
    amenities: ['Wifi', 'Climatisation'],
    images: [
      'https://picsum.photos/seed/tadj-mouada-setif/1920/1080',
      'https://picsum.photos/seed/djemila-ruins/800/600',
      'https://picsum.photos/seed/tadj-mouada-room/800/600',
      'https://picsum.photos/seed/setif-cityscape/800/600',
      'https://picsum.photos/seed/setif-roman-ruins/800/600',
    ],
    description: 'Un hôtel confortable et économique, idéalement situé pour visiter Sétif et les magnifiques ruines romaines de Djemila, classées au patrimoine mondial de l\'UNESCO.',
    host: {
      name: 'Gestion Tadj El Mouada',
      avatar: 'https://picsum.photos/seed/host12/100/100',
      email: 'contact@tadj-mouada.dz',
      phone: '+213 36 93 11 11',
    },
    nearbyAttractions: [{ name: 'Ruines de Djémila', type: 'Site historique', distance: 50 }, { name: 'Parc d\'Attractions', type: 'Centre-ville', distance: 2 }],
    checkIn: 'À partir de 14:00',
    checkOut: 'Jusqu\'à 12:00',
  },
  // Béjaïa
  {
    id: '13',
    name: 'Hotel Les Hammadites',
    location: 'Béjaïa',
    address: 'Route de Tichy, 06000 Béjaïa, Algérie',
    latitude: 36.7561,
    longitude: 5.0811,
    price: 17500,
    rating: 7.8,
    stars: 4,
    reviewsCount: 190,
    type: 'Hôtel',
    amenities: ['Wifi', 'Piscine', 'Climatisation', 'Vue sur la mer'],
    meals: ['Demi-pension'],
    images: [
      'https://picsum.photos/seed/les-hammadites-bejaia/1920/1080',
      'https://picsum.photos/seed/gouraya-national-park/800/600',
      'https://picsum.photos/seed/bejaia-beach-hotel/800/600',
      'https://picsum.photos/seed/cap-carbon-lighthouse/800/600',
      'https://picsum.photos/seed/bejaia-port/800/600',
    ],
    description: 'Surplombant la mer, cet hôtel offre une vue spectaculaire sur la baie de Béjaïa et le parc national de Gouraya. Un havre de paix entre mer et montagne.',
    host: {
      name: 'Les Hammadites Resort',
      avatar: 'https://picsum.photos/seed/host13/100/100',
      email: 'resa@hammadites.com',
      phone: '+213 34 22 83 83',
    },
    nearbyAttractions: [{ name: 'Plage des Aiguades', type: 'Plage', distance: 0.2 }, { name: 'Parc National de Gouraya', type: 'Parc national', distance: 3 }],
    checkIn: 'De 15:00 à 00:00',
    checkOut: 'Jusqu\'à 11:00',
  },
  {
    id: '14',
    name: 'Le Cristal Hôtel',
    location: 'Béjaïa',
    address: 'Rue de la Liberté, 06000 Béjaïa, Algérie',
    latitude: 36.7533,
    longitude: 5.0645,
    price: 14000,
    rating: 7.3,
    stars: 3,
    reviewsCount: 115,
    type: 'Hôtel',
    amenities: ['Wifi', 'Climatisation', 'Parking'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/cristal-hotel-bejaia/1920/1080',
      'https://picsum.photos/seed/cristal-hotel-room/800/600',
      'https://picsum.photos/seed/bejaia-city-view/800/600',
      'https://picsum.photos/seed/yemma-gouraya/800/600',
      'https://picsum.photos/seed/tighremt-beach/800/600',
    ],
    description: 'Hôtel moderne situé au centre-ville de Béjaïa, offrant un accès facile aux commerces, restaurants et au port historique de la ville. Idéal pour un séjour pratique et confortable.',
    host: {
      name: 'Famille Kaci',
      avatar: 'https://picsum.photos/seed/host14/100/100',
      email: 'famille.kaci@cristalhotel.dz',
      phone: '+213 34 20 20 20',
    },
    nearbyAttractions: [{ name: 'Place du 1er Novembre', type: 'Centre-ville', distance: 0.1 }, { name: 'Aéroport de Béjaïa', type: 'Aéroport', distance: 7 }],
    checkIn: 'De 14:00 à 23:00',
    checkOut: 'Jusqu\'à 12:00',
  },
  // Ghardaïa
  {
    id: '15',
    name: 'Maison d\'hôtes "Le Palmier d\'Or"',
    location: 'Ghardaïa',
    address: 'Palmeraie de Ghardaïa, 47000 Ghardaïa, Algérie',
    latitude: 32.4896,
    longitude: 3.6735,
    price: 13000,
    rating: 9.4,
    reviewsCount: 125,
    type: 'Maison',
    amenities: ['Wifi', 'Jardin', 'Cuisine', 'Climatisation'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/ghardaia-palmier-or/1920/1080',
      'https://picsum.photos/seed/mzab-valley-architecture/800/600',
      'https://picsum.photos/seed/ghardaia-guesthouse-courtyard/800/600',
      'https://picsum.photos/seed/ghardaia-market/800/600',
      'https://picsum.photos/seed/traditional-mozabite-house/800/600',
    ],
    description: 'Vivez une expérience authentique dans une maison traditionnelle mozabite au cœur de la palmeraie. Profitez de l\'hospitalité légendaire de la région du M\'Zab.',
    host: {
      name: 'Brahim',
      avatar: 'https://picsum.photos/seed/host15/100/100',
      email: 'brahim.ghardaia@email.com',
      phone: '+213 661 98 76 54',
    },
    nearbyAttractions: [{ name: 'Marché de Ghardaïa', type: 'Centre-ville', distance: 1 }, { name: 'Cité de Beni Isguen', type: 'Site historique', distance: 2 }],
    checkIn: 'De 12:00 à 20:00',
    checkOut: 'Jusqu\'à 11:00',
  },
  {
    id: '16',
    name: 'Hôtel Le Rym',
    location: 'Ghardaïa',
    address: 'Route Nationale 1, 47000 Ghardaïa, Algérie',
    latitude: 32.4815,
    longitude: 3.6821,
    price: 9000,
    rating: 6.9,
    stars: 2,
    reviewsCount: 70,
    type: 'Hôtel',
    amenities: ['Wifi', 'Piscine', 'Climatisation', 'Parking'],
    images: [
      'https://picsum.photos/seed/hotel-rym-ghardaia/1920/1080',
      'https://picsum.photos/seed/hotel-rym-pool/800/600',
      'https://picsum.photos/seed/beni-isguen/800/600',
      'https://picsum.photos/seed/ghardaia-traditional-architecture/800/600',
      'https://picsum.photos/seed/ghardaia-minaret/800/600',
    ],
    description: 'Un hôtel confortable avec piscine, offrant une base pratique pour explorer les cinq cités de la pentapole du M\'Zab, classée au patrimoine mondial de l\'UNESCO.',
    host: {
      name: 'Direction Le Rym',
      avatar: 'https://picsum.photos/seed/host16/100/100',
      email: 'contact@lerym.dz',
      phone: '+213 29 88 33 44',
    },
    nearbyAttractions: [{ name: 'Centre-ville', distance: 3 }, { name: 'Aéroport de Ghardaïa', type: 'Aéroport', distance: 15 }],
    checkIn: 'De 14:00 à 00:00',
    checkOut: 'Jusqu\'à 12:00',
  },
  // Tamanrasset
  {
    id: '17',
    name: 'Hôtel Tahat',
    location: 'Tamanrasset',
    address: 'Avenue Emir Abdelkader, 11000 Tamanrasset, Algérie',
    latitude: 22.7850,
    longitude: 5.5228,
    price: 15000,
    rating: 7.6,
    stars: 3,
    reviewsCount: 110,
    type: 'Hôtel',
    amenities: ['Wifi', 'Piscine', 'Climatisation', 'Parking'],
    meals: ['Petit-déjeuner inclus'],
    images: [
      'https://picsum.photos/seed/hotel-tahat-tam/1920/1080',
      'https://picsum.photos/seed/tahat-hotel-pool/800/600',
      'https://picsum.photos/seed/hoggar-mountains-view/800/600',
      'https://picsum.photos/seed/tamanrasset-city/800/600',
      'https://picsum.photos/seed/askrem-sunset/800/600',
    ],
    description: 'L\'hôtel de référence à Tamanrasset. Base de départ pour les expéditions dans le massif du Hoggar et vers l\'Assekrem, il offre confort et services fiables au cœur de la capitale du Grand Sud.',
    host: {
      name: 'Hôtel Tahat',
      avatar: 'https://picsum.photos/seed/host17/100/100',
      email: 'resa@hoteltahat.dz',
      phone: '+213 29 34 45 74',
    },
    isBoosted: true,
    nearbyAttractions: [{ name: 'Aéroport de Tamanrasset', type: 'Aéroport', distance: 10 }, { name: 'Plateau de l\'Assekrem', type: 'Montagne', distance: 80 }],
    checkIn: 'De 14:00 à 00:00',
    checkOut: 'Jusqu\'à 12:00',
  },
  {
    id: '18',
    name: 'Gîte "L\'Escale du Hoggar"',
    location: 'Tamanrasset',
    address: 'Quartier Tahaggart, 11000 Tamanrasset, Algérie',
    latitude: 22.7915,
    longitude: 5.5321,
    price: 8000,
    rating: 8.6,
    reviewsCount: 65,
    type: 'Maison',
    amenities: ['Jardin', 'Cuisine', 'Parking'],
    meals: ['Pension complète'],
    images: [
      'https://picsum.photos/seed/gite-hoggar/1920/1080',
      'https://picsum.photos/seed/touareg-guesthouse/800/600',
      'https://picsum.photos/seed/hoggar-rock-formations/800/600',
      'https://picsum.photos/seed/gite-tam-interior/800/600',
      'https://picsum.photos/seed/saharan-garden/800/600',
    ],
    description: 'Un gîte d\'étape simple et chaleureux, tenu par une famille touarègue. Le lieu parfait pour s\'imprégner de la culture locale avant ou après une méharée dans le désert.',
    host: {
      name: 'Mohamed',
      avatar: 'https://picsum.photos/seed/host18/100/100',
      email: 'mohamed.gite@email.com',
      phone: '+213 771 23 45 67',
    },
    nearbyAttractions: [{ name: 'Centre-ville', distance: 2 }, { name: 'Aéroport de Tamanrasset', type: 'Aéroport', distance: 12 }],
    checkIn: 'Flexible',
    checkOut: 'Flexible',
  },
   // Biskra
    {
        id: '19',
        name: 'Hôtel Les Zibans',
        location: 'Biskra',
        address: 'Avenue de la République, 07000 Biskra, Algérie',
        latitude: 34.8500,
        longitude: 5.7333,
        price: 11000,
        rating: 7.2,
        stars: 3,
        reviewsCount: 140,
        type: 'Hôtel',
        amenities: ['Wifi', 'Piscine', 'Climatisation', 'Parking'],
        meals: ['Petit-déjeuner inclus'],
        images: [
            'https://picsum.photos/seed/les-zibans-biskra/1920/1080',
            'https://picsum.photos/seed/zibans-hotel-pool/800/600',
            'https://picsum.photos/seed/biskra-palm-grove/800/600',
            'https://picsum.photos/seed/les-zibans-room/800/600',
            'https://picsum.photos/seed/gateway-to-sahara/800/600',
        ],
        description: 'Situé à la porte du désert, l\'Hôtel Les Zibans est une oasis de fraîcheur avec sa grande piscine et ses jardins luxuriants. Idéal pour découvrir la région de Biskra et ses palmeraies.',
        host: {
            name: 'Direction Les Zibans',
            avatar: 'https://picsum.photos/seed/host19/100/100',
            email: 'contact@leszibans.dz',
            phone: '+213 33 74 15 88',
        },
        nearbyAttractions: [{ name: 'Jardin Landon', type: 'Parc national', distance: 1 }, { name: 'Marché central', type: 'Centre-ville', distance: 2 }],
        checkIn: 'À partir de 14:00',
        checkOut: 'Jusqu\'à 12:00',
    },
    {
        id: '20',
        name: 'Dar Saada',
        location: 'Biskra',
        address: 'Vieux Biskra, 07000 Biskra, Algérie',
        latitude: 34.8612,
        longitude: 5.7281,
        price: 9000,
        rating: 9.3,
        reviewsCount: 85,
        type: 'Maison',
        amenities: ['Wifi', 'Cuisine', 'Climatisation', 'Jardin'],
        meals: ['Petit-déjeuner inclus'],
        images: [
            'https://picsum.photos/seed/dar-saada-biskra/1920/1080',
            'https://picsum.photos/seed/biskra-guesthouse-courtyard/800/600',
            'https://picsum.photos/seed/traditional-date-palm-house/800/600',
            'https://picsum.photos/seed/dar-saada-interior/800/600',
            'https://picsum.photos/seed/saharan-hospitality/800/600',
        ],
        description: 'Maison d\'hôtes de charme au cœur de la vieille ville de Biskra. "Dar Saada" (La maison du bonheur) porte bien son nom, offrant une hospitalité authentique et un cadre paisible.',
        host: {
            name: 'Fatima',
            avatar: 'https://picsum.photos/seed/host20/100/100',
            email: 'fatima.saada@email.com',
            phone: '+213 662 34 56 78',
        },
        nearbyAttractions: [{ name: 'Vieux Biskra', type: 'Site historique', distance: 0.5 }, { name: 'Mosquée El Atik', type: 'Site historique', distance: 1 }],
        checkIn: 'Flexible',
        checkOut: 'Flexible',
    },
    // Skikda
    {
        id: '21',
        name: 'Hôtel La Belle Etoile',
        location: 'Skikda',
        address: 'Corniche de Stora, 21000 Skikda, Algérie',
        latitude: 36.8778,
        longitude: 6.9095,
        price: 13500,
        rating: 7.7,
        stars: 3,
        reviewsCount: 160,
        type: 'Hôtel',
        amenities: ['Wifi', 'Climatisation', 'Vue sur la mer', 'Parking'],
        images: [
            'https://picsum.photos/seed/belle-etoile-skikda/1920/1080',
            'https://picsum.photos/seed/skikda-beachfront-hotel/800/600',
            'https://picsum.photos/seed/skikda-roman-theatre/800/600',
            'https://picsum.photos/seed/belle-etoile-room/800/600',
            'https://picsum.photos/seed/skikda-coast/800/600',
        ],
        description: 'Hôtel moderne avec une vue imprenable sur la mer Méditerranée, situé sur la corniche de Skikda. Un excellent choix pour profiter des plages et du centre-ville animé.',
        host: {
            name: 'Gestion Belle Etoile',
            avatar: 'https://picsum.photos/seed/host21/100/100',
            email: 'contact@belleetoile-skikda.com',
            phone: '+213 38 75 80 90',
        },
        nearbyAttractions: [{ name: 'Grande Plage', type: 'Plage', distance: 0.2 }, { name: 'Théâtre Romain', type: 'Site historique', distance: 1.5 }],
        checkIn: 'De 15:00 à 22:00',
        checkOut: 'Jusqu\'à 12:00',
    },
    {
        id: '22',
        name: 'Maison de Vacances "Le Filao"',
        location: 'Skikda',
        address: 'Stora, 21000 Skikda, Algérie',
        latitude: 36.8967,
        longitude: 6.9419,
        price: 18000,
        rating: 8.4,
        reviewsCount: 45,
        type: 'Maison',
        amenities: ['Wifi', 'Cuisine', 'Climatisation', 'Balcon', 'Vue sur la mer', 'Jardin', 'Animaux autorisés'],
        meals: ['Cuisine privée'],
        images: [
            'https://picsum.photos/seed/maison-vacances-skikda/1920/1080',
            'https://picsum.photos/seed/skikda-stora-bay/800/600',
            'https://picsum.photos/seed/holiday-home-skikda/800/600',
            'https://picsum.photos/seed/skikda-garden-house/800/600',
            'https://picsum.photos/seed/skikda-port/800/600',
        ],
        description: 'Maison de vacances spacieuse avec jardin, idéale pour les familles. Située dans le quartier calme de Stora, elle offre un accès facile à la plage et au port de pêche.',
        host: {
            name: 'Karim',
            avatar: 'https://picsum.photos/seed/host22/100/100',
            email: 'karim.stora@email.com',
            phone: '+213 551 22 33 44',
        },
        nearbyAttractions: [{ name: 'Plage de Stora', type: 'Plage', distance: 0.5 }, { name: 'Port de Stora', type: 'Centre-ville', distance: 0.2 }],
        checkIn: 'De 16:00 à 20:00',
        checkOut: 'Jusqu\'à 11:00',
    },
    // Jijel
    {
        id: '23',
        name: 'Hôtel de la Plage',
        location: 'Jijel',
        address: 'Avenue de la Plage, 18000 Jijel, Algérie',
        latitude: 36.8206,
        longitude: 5.7667,
        price: 12000,
        rating: 6.8,
        stars: 2,
        reviewsCount: 130,
        type: 'Hôtel',
        amenities: ['Wifi', 'Climatisation', 'Vue sur la mer'],
        images: [
            'https://picsum.photos/seed/hotel-plage-jijel/1920/1080',
            'https://picsum.photos/seed/jijel-corniche/800/600',
            'https://picsum.photos/seed/jijel-caves/800/600',
            'https://picsum.photos/seed/hotel-plage-room/800/600',
            'https://picsum.photos/seed/jijel-emerald-coast/800/600',
        ],
        description: 'Un hôtel simple et convivial, les pieds dans l\'eau. Profitez d\'un accès direct à la plage et de la proximité des célèbres Grottes Merveilleuses de Jijel.',
        host: {
            name: 'Famille Bouzid',
            avatar: 'https://picsum.photos/seed/host23/100/100',
            email: 'bouzid.hotel@email.com',
            phone: '+213 34 49 50 60',
        },
        nearbyAttractions: [{ name: 'Plage du Casino', type: 'Plage', distance: 0 }, { name: 'Grottes Merveilleuses', type: 'Site historique', distance: 5 }],
        checkIn: 'De 14:00 à 22:00',
        checkOut: 'Jusqu\'à 12:00',
    },
    {
        id: '24',
        name: 'Résidence "Les Aftis"',
        location: 'Jijel',
        address: 'Route de la Plage, 18000 Jijel, Algérie',
        latitude: 36.8093,
        longitude: 5.7455,
        price: 15000,
        rating: 8.1,
        reviewsCount: 95,
        type: 'Appartement',
        amenities: ['Wifi', 'Cuisine', 'Climatisation', 'Parking', 'Piscine'],
        meals: ['Cuisine privée'],
        images: [
            'https://picsum.photos/seed/residence-aftis-jijel/1920/1080',
            'https://picsum.photos/seed/aftis-residence-pool/800/600',
            'https://picsum.photos/seed/jijel-modern-residence/800/600',
            'https://picsum.photos/seed/aftis-apartment-interior/800/600',
            'https://picsum.photos/seed/taza-national-park/800/600',
        ],
        description: 'Résidence moderne proposant des appartements de standing avec piscine, à quelques minutes de la plage. Le point de départ parfait pour explorer la corniche Jijelienne et le parc national de Taza.',
        host: {
            name: 'Manager Les Aftis',
            avatar: 'https://picsum.photos/seed/host24/100/100',
            email: 'contact@les-aftis.dz',
            phone: '+213 34 47 10 20',
        },
        isBoosted: true,
        nearbyAttractions: [{ name: 'Plage Kotama', type: 'Plage', distance: 0.8 }, { name: 'Parc National de Taza', type: 'Parc national', distance: 20 }],
        checkIn: 'De 16:00 à 21:00',
        checkOut: 'Jusqu\'à 11:00',
    },
    // Batna
    {
        id: '25',
        name: 'Hôtel Salim',
        location: 'Batna',
        address: 'Rue des Frères Lambese, 05000 Batna, Algérie',
        latitude: 35.5559,
        longitude: 6.1770,
        price: 9500,
        rating: 7.0,
        stars: 3,
        reviewsCount: 110,
        type: 'Hôtel',
        amenities: ['Wifi', 'Climatisation', 'Parking'],
        images: [
            'https://picsum.photos/seed/hotel-salim-batna/1920/1080',
            'https://picsum.photos/seed/timgad-roman-ruins/800/600',
            'https://picsum.photos/seed/hotel-salim-room/800/600',
            'https://picsum.photos/seed/aures-mountains/800/600',
            'https://picsum.photos/seed/batna-city-center/800/600',
        ],
        description: 'Hôtel confortable et bien situé au centre de Batna, capitale des Aurès. Une excellente base pour visiter les sites historiques de Timgad et Lambaesis.',
        host: {
            name: 'Direction Hôtel Salim',
            avatar: 'https://picsum.photos/seed/host25/100/100',
            email: 'contact@hotelsalim.com',
            phone: '+213 33 80 10 20',
        },
        nearbyAttractions: [{ name: 'Centre-ville de Batna', type: 'Centre-ville', distance: 0.5 }, { name: 'Ruines de Timgad', type: 'Site historique', distance: 35 }],
        checkIn: 'À partir de 14:00',
        checkOut: 'Jusqu\'à 12:00',
    },
    {
        id: '26',
        name: 'Auberge Ghoufi',
        location: 'Batna',
        address: 'Balcons de Ghoufi, 05000 Batna, Algérie',
        latitude: 35.0315,
        longitude: 6.1367,
        price: 7000,
        rating: 8.9,
        reviewsCount: 90,
        type: 'Maison',
        amenities: ['Jardin', 'Cuisine', 'Chauffage', 'Parking'],
        meals: ['Pension complète'],
        images: [
            'https://picsum.photos/seed/auberge-ghoufi/1920/1080',
            'https://picsum.photos/seed/ghoufi-canyons-balconies/800/600',
            'https://picsum.photos/seed/traditional-berber-house/800/600',
            'https://picsum.photos/seed/ghoufi-auberge-interior/800/600',
            'https://picsum.photos/seed/aures-mountain-landscape/800/600',
        ],
        description: 'Une auberge traditionnelle surplombant les magnifiques balcons de Ghoufi. Vivez une expérience immersive dans un cadre naturel spectaculaire au cœur des montagnes des Aurès.',
        host: {
            name: 'Massinissa',
            avatar: 'https://picsum.photos/seed/host26/100/100',
            email: 'massinissa.ghoufi@email.com',
            phone: '+213 772 45 67 89',
        },
        nearbyAttractions: [{ name: 'Balcons de Ghoufi', type: 'Montagne', distance: 0 }, { name: 'Canyon de l\'Oued Abiod', type: 'Parc national', distance: 1 }],
        checkIn: 'Flexible',
        checkOut: 'Flexible',
    },
    {
        id: '27',
        name: 'Villa des Ponts avec Piscine',
        location: 'Constantine',
        address: 'Chemin des Crêtes, 25000 Constantine, Algérie',
        latitude: 36.3750,
        longitude: 6.6290,
        price: 32000,
        rating: 9.6,
        reviewsCount: 68,
        type: 'Villa',
        amenities: ['Wifi', 'Piscine', 'Cuisine', 'Climatisation', 'Parking', 'Jardin', 'Animaux autorisés'],
        meals: ['Cuisine privée'],
        images: [
            'https://picsum.photos/seed/villa-piscine-constantine/1920/1080',
            'https://picsum.photos/seed/constantine-villa-pool/800/600',
            'https://picsum.photos/seed/luxury-villa-algeria/800/600',
            'https://picsum.photos/seed/constantine-pool-view/800/600',
            'https://picsum.photos/seed/villa-garden-constantine/800/600',
        ],
        description: 'Luxueuse villa avec une grande piscine privée et un jardin luxuriant, offrant une vue imprenable sur la ville de Constantine. Idéale pour un séjour en famille ou entre amis, elle allie confort moderne et tranquillité.',
        host: {
            name: 'Leila K.',
            avatar: 'https://picsum.photos/seed/host27/100/100',
            email: 'leila.constantine@email.com',
            phone: '+213 661 55 66 77',
        },
        nearbyAttractions: [
            { name: 'Pont Sidi M\'Cid', type: 'Site historique', distance: 3 },
            { name: 'Palais d\'Ahmed Bey', type: 'Site historique', distance: 2.5 },
        ],
        checkIn: 'De 16:00 à 22:00',
        checkOut: 'Jusqu\'à 11:00',
    },
    {
        id: '28',
        name: 'Le Panoramique - Appartement vue mer',
        location: 'Annaba',
        address: 'Corniche, Plage Chapuis, 23000 Annaba, Algérie',
        latitude: 36.9200,
        longitude: 7.7580,
        price: 21000,
        rating: 9.0,
        reviewsCount: 88,
        type: 'Appartement',
        amenities: ['Wifi', 'Cuisine', 'Climatisation', 'Balcon', 'Vue sur la mer', 'Lave-linge'],
        meals: ['Cuisine privée'],
        images: [
            'https://picsum.photos/seed/appartement-vue-mer-annaba/1920/1080',
            'https://picsum.photos/seed/annaba-apartment-seaview/800/600',
            'https://picsum.photos/seed/modern-apartment-balcony/800/600',
            'https://picsum.photos/seed/annaba-coast-view/800/600',
            'https://picsum.photos/seed/living-room-sea-view/800/600',
        ],
        description: 'Spacieux appartement moderne situé sur la corniche d\'Annaba, offrant une vue panoramique exceptionnelle sur la mer Méditerranée depuis son grand balcon. Entièrement équipé pour un confort optimal.',
        host: {
            name: 'Mehdi F.',
            avatar: 'https://picsum.photos/seed/host28/100/100',
            email: 'mehdi.annaba@email.com',
            phone: '+213 770 12 34 56',
        },
        nearbyAttractions: [
            { name: 'Plage Chapuis', type: 'Plage', distance: 0.3 },
            { name: 'Basilique Saint-Augustin', type: 'Site historique', distance: 2.5 },
        ],
        checkIn: 'De 15:00 à 21:00',
        checkOut: 'Jusqu\'à 12:00',
    },
    {
        id: '29',
        name: 'Le Rêve du Sinaï Resort & Spa',
        location: 'Sharm El Sheikh',
        address: 'Naama Bay, 46619 Sharm El Sheikh, Égypte',
        latitude: 27.915,
        longitude: 34.330,
        price: 45000,
        rating: 9.5,
        stars: 5,
        reviewsCount: 150,
        type: 'Hôtel',
        amenities: ['Wifi', 'Piscine', 'Climatisation', 'Parking', 'Vue sur la mer', 'Jacuzzi', 'Jardin'],
        meals: ['Pension complète'],
        images: [
          'https://picsum.photos/seed/sinai-dream-resort/1920/1080',
          'https://picsum.photos/seed/sharm-el-sheikh-pool/800/600',
          'https://picsum.photos/seed/red-sea-view-hotel/800/600',
          'https://picsum.photos/seed/luxury-egypt-resort/800/600',
          'https://picsum.photos/seed/sinai-spa-hotel/800/600',
        ],
        description: 'Un resort de luxe enchanteur offrant une vue imprenable sur la mer Rouge. Profitez de nos piscines, de notre spa de classe mondiale et de nos restaurants gastronomiques pour une escapade inoubliable au cœur du Sinaï.',
        host: {
          name: 'Sinai Resorts Group',
          avatar: 'https://picsum.photos/seed/host-sinai/100/100',
          email: 'booking@sinai-dream.com',
          phone: '+20 69 360 1234',
        },
        isBoosted: true,
        isHighDemand: true,
        nearbyAttractions: [
            { name: 'Naama Bay', type: 'Centre-ville', distance: 5 },
            { name: 'Parc national Ras Muhammad', type: 'Parc national', distance: 20 },
            { name: 'Aéroport de Sharm El Sheikh', type: 'Aéroport', distance: 10 }
        ],
        checkIn: 'De 14:00 à 00:00',
        checkOut: 'Jusqu\'à 12:00',
    }
];

export type Car = {
  id: string;
  make: string;
  model: string;
  type: (typeof carTypes)[number];
  year: number;
  pricePerDay: number;
  location: string;
  transmission: 'Manuelle' | 'Automatique';
  fuelType: FuelType;
  seats: number;
  features: CarFeature[];
  images: string[];
  description: string;
  host: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
};

export const cars: Car[] = [
    {
        id: 'c1',
        make: 'Renault',
        model: 'Clio 5',
        type: 'Citadine',
        year: 2022,
        pricePerDay: 7000,
        location: 'Alger',
        transmission: 'Manuelle',
        fuelType: 'Essence',
        seats: 5,
        features: ['Climatisation', 'GPS'],
        images: [
            'https://picsum.photos/seed/renault-clio5-algeria/1200/800',
            'https://picsum.photos/seed/clio-interior/800/600',
            'https://picsum.photos/seed/algiers-city-driving/800/600',
            'https://picsum.photos/seed/renault-clio-front/800/600',
            'https://picsum.photos/seed/renault-clio-back/800/600',
        ],
        description: 'Citadine polyvalente et économique, parfaite pour les déplacements en ville.',
        host: {
            name: 'Ali Location',
            avatar: 'https://picsum.photos/seed/host-car1/100/100',
            email: 'ali.location@email.com',
            phone: '+213 555 99 88 77',
        }
    },
    {
        id: 'c2',
        make: 'Hyundai',
        model: 'Tucson',
        type: 'SUV',
        year: 2023,
        pricePerDay: 12000,
        location: 'Oran',
        transmission: 'Automatique',
        fuelType: 'Diesel',
        seats: 5,
        features: ['Climatisation', 'GPS', 'Boîte automatique'],
        images: [
            'https://picsum.photos/seed/hyundai-tucson-oran/1200/800',
            'https://picsum.photos/seed/suv-dashboard/800/600',
            'https://picsum.photos/seed/oran-coastal-road/800/600',
            'https://picsum.photos/seed/tucson-front-view/800/600',
            'https://picsum.photos/seed/tucson-interior-seats/800/600',
        ],
        description: 'SUV spacieux et confortable, idéal pour les familles et les longs trajets.',
        host: {
            name: 'Oran Auto',
            avatar: 'https://picsum.photos/seed/host-car2/100/100',
            email: 'contact@oran-auto.com',
            phone: '+213 770 11 22 33',
        }
    },
    {
        id: 'c3',
        make: 'Kia',
        model: 'Picanto',
        type: 'Citadine',
        year: 2021,
        pricePerDay: 4500,
        location: 'Alger',
        transmission: 'Automatique',
        fuelType: 'Essence',
        seats: 5,
        features: ['Climatisation'],
        images: [
            'https://picsum.photos/seed/kia-picanto-algiers/1200/800',
            'https://picsum.photos/seed/picanto-small-car/800/600',
            'https://picsum.photos/seed/algiers-kasbah-street/800/600',
            'https://picsum.photos/seed/kia-picanto-dashboard/800/600',
            'https://picsum.photos/seed/compact-car-side/800/600',
        ],
        description: "Petite voiture citadine très pratique et économique pour se déplacer facilement à Alger. Équipée de la climatisation, de l'ABS et d'un système audio Bluetooth. Idéale pour les couples ou les petits groupes.",
        host: {
            name: 'Alger Centre Location',
            avatar: 'https://picsum.photos/seed/host-car3/100/100',
            email: 'contact@algercentre-loc.com',
            phone: '+213 555 12 34 56',
        }
    }
];

export type Circuit = {
    id: string;
    title: string;
    region: string;
    duration: string;
    pricePerPerson: number;
    themes: string[];
    images: string[];
    description: string;
    guide: {
        name: string;
        avatar: string;
        email: string;
        phone: string;
    };
};

export const circuits: Circuit[] = [
    {
        id: 'circ1',
        title: "La Magie du Tassili n'Ajjer",
        region: 'Djanet',
        duration: '1 semaine',
        pricePerPerson: 85000,
        themes: ['Aventure', 'Désert', 'Culture', 'Histoire'],
        images: [
            'https://picsum.photos/seed/tassili-landscape-main/1920/1080',
            'https://picsum.photos/seed/tassili-sandstone-arches/800/600',
            'https://picsum.photos/seed/prehistoric-cave-art-algeria/800/600',
            'https://picsum.photos/seed/erg-admer-dunes/800/600',
            'https://picsum.photos/seed/tassili-touareg-guide/800/600',
        ],
        description: "Un voyage inoubliable au cœur du plus grand musée à ciel ouvert du monde. Partez en 4x4 et à pied à la découverte des paysages surréalistes de roches sculptées par le vent, des dunes majestueuses et des peintures rupestres millénaires qui témoignent de l'histoire de l'humanité. Le soir, vous partagerez des moments uniques autour du feu avec nos guides touaregs.",
        guide: {
            name: 'Ayoub, Expert du Désert',
            avatar: 'https://picsum.photos/seed/guide-ayoub/100/100',
            email: 'ayoub.sahara@email.com',
            phone: '+213 777 55 66 77'
        }
    },
    {
        id: 'circ2',
        title: "Exploration de la Kabylie Authentique",
        region: 'Tizi Ouzou',
        duration: '4-6 jours',
        pricePerPerson: 48000,
        themes: ['Randonnée', 'Culture', 'Gastronomie'],
        images: [
            'https://picsum.photos/seed/kabylie-village-mountains/1920/1080',
            'https://picsum.photos/seed/djurdjura-hike/800/600',
            'https://picsum.photos/seed/traditional-kabyle-house/800/600',
            'https://picsum.photos/seed/kabyle-crafts-pottery/800/600',
            'https://picsum.photos/seed/kabyle-olive-oil/800/600',
        ],
        description: "Immergez-vous dans la culture berbère de Kabylie. Ce circuit vous mènera à travers des villages de montagne pittoresques, des paysages verdoyants du Djurdjura et à la rencontre d'artisans locaux. Dégustez la cuisine traditionnelle et découvrez l'hospitalité légendaire des Kabyles.",
        guide: {
            name: 'Idir, Guide de Montagne',
            avatar: 'https://picsum.photos/seed/guide-idir/100/100',
            email: 'idir.kabylie@email.com',
            phone: '+213 670 33 44 55',
        }
    },
    {
        id: 'circ3',
        title: "Traversée du désert en 4x4",
        region: 'Béchar',
        duration: '1 semaine',
        pricePerPerson: 92000,
        themes: ['Aventure', 'Désert'],
        images: [
            'https://picsum.photos/seed/bechar-4x4-desert/1920/1080',
            'https://picsum.photos/seed/taghit-dunes/800/600',
            'https://picsum.photos/seed/beni-abbes-oasis/800/600',
            'https://picsum.photos/seed/4x4-driving-dunes/800/600',
            'https://picsum.photos/seed/desert-camp-night/800/600',
        ],
        description: "Une aventure en 4x4 à travers les paysages variés du Grand Erg Occidental. Découvrez l'oasis rouge de Taghit, la palmeraie de Beni Abbès et les gravures rupestres de la région. Nuits en bivouac sous les étoiles pour une expérience désertique totale.",
        guide: {
            name: 'Hassan, Pilote du Désert',
            avatar: 'https://picsum.photos/seed/guide-hassan/100/100',
            email: 'hassan.bechar@email.com',
            phone: '+213 791 22 33 44',
        }
    },
];


export const reviews = [
    {
      id: 'r1',
      propertyId: '1',
      author: 'Amina B.',
      rating: 5,
      comment: 'La vue depuis la chambre est absolument époustouflante. Service impeccable. Un séjour parfait !',
      date: '2023-10-15',
    },
    {
      id: 'r2',
      propertyId: '1',
      author: 'Karim D.',
      rating: 4,
      comment: 'Très bel hôtel, un classique à Alger. La piscine est magnifique. Le décor de la chambre mériterait un petit rafraîchissement.',
      date: '2023-09-22',
    },
    {
      id: 'r3',
      propertyId: '2',
      author: 'Famille Dubois',
      rating: 5,
      comment: 'Un service digne d\'un 5 étoiles. Le personnel est aux petits soins. Nous avons adoré le spa et le restaurant gastronomique.',
      date: '2023-08-10',
    },
    {
      id: 'r4',
      propertyId: '3',
      author: 'John S.',
      rating: 5,
      comment: 'An authentic and unforgettable experience. Djamila is a fantastic host who made us feel at home. The rooftop terrace is a hidden gem.',
      date: '2023-11-01',
    },
     {
      id: 'r5',
      propertyId: '4',
      author: 'Mehdi R.',
      rating: 4,
      comment: 'Emplacement incroyable avec une vue sur le pont Sidi M\'Cid. L\'hôtel est chargé d\'histoire. C\'était fascinant.',
      date: '2023-07-18',
    },
];

export type PendingListing = {
    id: string;
    propertyName: string;
    location: string;
    latitude?: number;
    longitude?: number;
    price: number;
    propertyType: string;
    description: string;
    hostName: string;
    hostEmail: string;
    hostPhone: string;
    status: 'pending';
    amenities?: Amenity[];
    images?: string[];
    nearbyAttractions?: NearbyAttraction[];
    cleaningServiceRequested?: boolean;
    freeCancellation?: boolean;
};

export const pendingListings: PendingListing[] = [
    {
        id: 'p1',
        propertyName: 'Cabane dans les arbres à Tikjda',
        location: 'Bouira', // Tikjda is in Bouira
        latitude: 36.4633,
        longitude: 4.1436,
        price: 11000,
        propertyType: 'Maison',
        description: 'Une cabane rustique perchée dans les arbres, pour les amoureux de la nature.',
        hostName: 'Nassim',
        hostEmail: 'nassim.tikjda@email.com',
        hostPhone: '+213 661 11 22 33',
        status: 'pending',
        amenities: ['Jardin', 'Chauffage', 'Balcon'],
        images: [
            'https://picsum.photos/seed/tikjda-treehouse/1920/1080',
            'https://picsum.photos/seed/djurdjura-mountains/800/600',
            'https://picsum.photos/seed/algeria-cedar-forest/800/600',
            'https://picsum.photos/seed/treehouse-interior/800/600',
            'https://picsum.photos/seed/tikjda-ski-resort/800/600',
        ],
    },
    {
        id: 'p2',
        propertyName: 'Appartement design à Sétif',
        location: 'Sétif',
        latitude: 36.1900,
        longitude: 5.4100,
        price: 14000,
        propertyType: 'Appartement',
        description: 'Un appartement au design épuré, idéal pour les voyages d\'affaires ou un séjour en ville.',
        hostName: 'Ines',
        hostEmail: 'ines.setif@email.com',
        hostPhone: '+213 555 44 55 66',
        status: 'pending',
        amenities: ['Wifi', 'Climatisation', 'Cuisine', 'Espace de travail'],
        images: [
            'https://picsum.photos/seed/setif-design-apartment/1920/1080',
            'https://picsum.photos/seed/modern-algerian-flat/800/600',
            'https://picsum.photos/seed/setif-city-apartment/800/600',
            'https://picsum.photos/seed/minimalist-apartment-design/800/600',
            'https://picsum.photos/seed/setif-night-view/800/600',
        ],
    }
];

export type PendingCar = {
    id: string;
    carMake: string;
    carModel: string;
    carType: string;
    location: string;
    pricePerDay: number;
    hostName: string;
    hostEmail: string;
    hostPhone: string;
    status: 'pending';
    images?: string[];
};

export const pendingCars: PendingCar[] = [
    {
        id: 'pc1',
        carMake: 'Peugeot',
        carModel: 'Landtrek',
        carType: 'Utilitaire',
        location: 'Tamanrasset',
        pricePerDay: 18000,
        hostName: 'Sahara Aventure',
        hostEmail: 'contact@sahara-aventure.dz',
        hostPhone: '+213 780 00 11 22',
        status: 'pending',
        images: ['https://picsum.photos/seed/peugeot-landtrek-sahara/1200/800']
    }
];

export type PendingCircuit = {
    id: string;
    circuitTitle: string;
    region: string;
    pricePerPerson: number;
    guideName: string;
    guideEmail: string;
    guidePhone: string;
    status: 'pending';
    images?: string[];
};

export const pendingCircuits: PendingCircuit[] = [
    {
        id: 'pcirc1',
        circuitTitle: 'Exploration de la Kabylie Authentique',
        region: 'Tizi Ouzou',
        pricePerPerson: 45000,
        guideName: 'Idir',
        guideEmail: 'idir.kabylie@email.com',
        guidePhone: '+213 670 33 44 55',
        status: 'pending',
        images: ['https://picsum.photos/seed/kabylie-mountains/1920/1080'],
    }
];


export type User = {
    id: string;
    name: string;
    email: string;
    bookingCount: number;
    isGenius: boolean;
};

// Mock user data for prototyping the Genius loyalty program
export const mockUser: User = {
    id: 'user1',
    name: 'Fatiha Voyageuse',
    email: 'fatiha.voyage@email.com',
    bookingCount: 4, // This user has made 4 bookings
    isGenius: true, // Qualifies for the Genius discount
};

export type Agent = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    region: string;
    propertiesOnboarded: number;
    totalEarnings: number;
    status: 'active' | 'inactive';
    remuneration: {
        base: number; // e.g., 800 DA per property
        bonusThreshold: number; // e.g., 7 properties
        bonusAmount: number; // e.g., 1000 DA per property after threshold
    };
};


export const agents: Agent[] = [
    {
        id: 'agent-1',
        name: 'Amine Djoudi',
        email: 'amine.djoudi@stay-flow.com',
        avatar: 'https://picsum.photos/seed/agent1/100/100',
        region: 'Alger',
        propertiesOnboarded: 9,
        totalEarnings: (7 * 800) + (2 * 1000), // Example calculation
        status: 'active',
        remuneration: {
            base: 800,
            bonusThreshold: 7,
            bonusAmount: 1000,
        }
    },
    {
        id: 'agent-2',
        name: 'Lina Ait-Kaci',
        email: 'lina.aitkaci@stay-flow.com',
        avatar: 'https://picsum.photos/seed/agent2/100/100',
        region: 'Oran',
        propertiesOnboarded: 5,
        totalEarnings: 5 * 800,
        status: 'active',
         remuneration: {
            base: 800,
            bonusThreshold: 7,
            bonusAmount: 1000,
        }
    },
    {
        id: 'agent-3',
        name: 'Khaled Bensalah',
        email: 'khaled.bensalah@stay-flow.com',
        avatar: 'https://picsum.photos/seed/agent3/100/100',
        region: 'Constantine',
        propertiesOnboarded: 12,
        totalEarnings: (7 * 800) + (5 * 1000),
        status: 'active',
         remuneration: {
            base: 800,
            bonusThreshold: 7,
            bonusAmount: 1000,
        }
    },
    {
        id: 'agent-4',
        name: 'Sarah Meziani',
        email: 'sarah.meziani@stay-flow.com',
        avatar: 'https://picsum.photos/seed/agent4/100/100',
        region: 'Sud',
        propertiesOnboarded: 3,
        totalEarnings: 3 * 500,
        status: 'inactive',
         remuneration: {
            base: 500,
            bonusThreshold: 7,
            bonusAmount: 1000,
        }
    },
];

export const mockAgent: Agent = agents[0]; // Using Amine Djoudi as the logged-in agent for the dashboard

export type BankDetails = {
    bankName: string;
    iban: string;
    beneficiary: string;
};

export type PaymentMethod = {
    id: 'card' | 'paypal' | 'transfer';
    name: string;
    enabled: boolean;
};

export type PaymentSettings = {
    paypal: {
        email: string;
    };
    bankTransfer: {
        dzd: BankDetails;
        foreign: BankDetails;
    };
    methods: PaymentMethod[];
};

export const paymentSettings: PaymentSettings = {
    paypal: {
        email: 'votre-email@paypal.com',
    },
    bankTransfer: {
        dzd: {
            bankName: "Banque Nationale d'Algérie (BNA)",
            iban: "DZ00 1234 5678 9012 3456 7890",
            beneficiary: "StayFlow SARL (Compte DZD)"
        },
        foreign: {
            bankName: "Société Générale Algérie",
            iban: "DZ00 9876 5432 1098 7654 3210",
            beneficiary: "StayFlow SARL (Compte Devises)"
        }
    },
    methods: [
        { id: 'card', name: 'Carte de crédit', enabled: true },
        { id: 'paypal', name: 'PayPal', enabled: true },
        { id: 'transfer', name: 'Virement bancaire', enabled: true },
    ]
};

    

    


    






    


    
