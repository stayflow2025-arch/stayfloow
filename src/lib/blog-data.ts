export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'un-article',
    title: '10 Destinations à Visiter Absolument en 2025',
    excerpt: 'Découvrez les meilleures destinations pour voyager cette année. Que vous soyez amateur de nature, de culture ou de détente, nous avons quelque chose pour vous.',
    author: 'Marie Voyage',
    date: '2025-02-15',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
    category: 'Destinations',
    readTime: 8,
    content: `
# 10 Destinations à Visiter Absolument en 2025

Voyager est l'une des plus grandes joies de la vie. En 2025, il y a tant de destinations magnifiques à explorer. Voici notre sélection des 10 meilleures destinations à visiter cette année.

## 1. Maroc - Le Pays des Mille Couleurs

Le Maroc est une destination incontournable pour les voyageurs en quête d'exotisme et d'aventure. Entre les souks vibrants de Marrakech, les dunes infinies du Sahara et les plages paradisiaques du sud, le Maroc offre une expérience unique et inoubliable.

**Points forts:**
- La médina de Marrakech
- Le désert du Sahara
- Les montagnes de l'Atlas
- Les villes côtières comme Essaouira

## 2. Japon - Tradition et Modernité

Le Japon est une destination fascinante où la tradition ancestrale coexiste harmonieusement avec la technologie de pointe. Tokyo, Kyoto et Osaka offrent des expériences complètement différentes.

**À ne pas manquer:**
- Les temples de Kyoto
- La technologie de Tokyo
- Le Mont Fuji
- Les onsens (sources chaudes)

## 3. Pérou - L'Héritage Inca

Le Pérou est le berceau de la civilisation inca. Machu Picchu, la Vallée Sacrée et la magnifique Cusco en sont les joyaux.

**Expériences incontournables:**
- Machu Picchu
- Le Chemin de l'Inca
- La Vallée Sacrée
- Cusco et sa richesse culturelle

## 4. Thaïlande - Le Pays du Sourire

Avec ses temples bouddhistes spectaculaires, ses marchés flottants colorés et ses plages paradisiaques, la Thaïlande est une destination parfaite pour les voyageurs de tous niveaux.

## 5. Espagne - Passions et Traditions

L'Espagne combine l'art, la gastronomie et la joie de vivre. De Gaudí à Barcelone aux plages du sud, chaque région a sa propre personnalité.

## 6. Islande - Les Terres du Feu et Glace

L'Islande offre des paysages surréalistes: cascades géantes, glaciers, volcans et aurores boréales. C'est une destination pour les aventuriers.

## 7. Italie - Le Berceau de la Renaissance

Rome, Florence, Venise... L'Italie est un musée à ciel ouvert. La cuisine, l'art et l'architecture font de chaque coin une merveille.

## 8. Nouvelle-Zélande - Le Paradis du Bout du Monde

Les paysages spectaculaires de la Nouvelle-Zélande ont inspiré les films. Montagnes, fjords, geysers et une nature sauvage vous attendent.

## 9. Égypte - L'Ancienne Civilisation

Les pyramides de Gizeh, la Vallée des Rois et les croisières sur le Nil font de l'Égypte une destination historique unique.

## 10. Portugal - Les Charmes de l'Atlantique

Le Portugal offre une combinaison parfaite de plages magnifiques, de villes historiques et d'une gastronomie délicieuse. Porto et Lisbonne sont des villes vibrantespleines de vie.

## Conseils Pratiques pour Voyager

### Avant de Partir
- Vérifiez les exigences de visa
- Souscrivez une assurance voyage
- Consultez la météo et les saisons
- Planifiez votre budget

### Pendant le Voyage
- Restez flexible dans vos plans
- Interagissez avec les habitants
- Goûtez la cuisine locale
- Respectez la culture locale

### Conseil Final

Le voyage est plus que la destination. C'est l'expérience, les rencontres et les souvenirs qui en font quelque chose de spécial. Alors, n'attendez plus et commencez à planifier votre prochaine aventure!

---

**Avez-vous visité l'une de ces destinations? Partagez votre expérience en commentaire!**
    `,
  },
  {
    slug: 'guide-reservation',
    title: 'Guide Complet de Réservation: Tout ce que Vous Devez Savoir',
    excerpt: 'Un guide complet pour vous aider à réserver votre séjour idéal. Conseils, astuces et bonnes pratiques pour une réservation sans stress.',
    author: 'Jean Explorateur',
    date: '2025-02-10',
    image: 'https://images.unsplash.com/photo-1552062407-291826ab63fd?auto=format&fit=crop&q=80&w=1200',
    category: 'Conseils',
    readTime: 6,
    content: `
# Guide Complet de Réservation: Tout ce que Vous Devez Savoir

Réserver un séjour peut être stressant si vous ne savez pas comment procéder. Ce guide vous aidera à naviguer tout le processus de réservation avec confiance.

## Étape 1: Définir Votre Budget

Avant de commencer à chercher, définissez clairement votre budget. Cela inclut:
- L'hébergement
- Les transports
- Les activités
- La nourriture

## Étape 2: Choisir Votre Destination

Pensez à vos préférences:
- Le climat
- La distance
- La saison
- L'activité principale

## Étape 3: Rechercher et Comparer

Utilisez StayFloow pour:
- Filtrer par prix, localisation et avis
- Comparer les options
- Lire les avis des voyageurs
- Vérifier les photos et détails

## Étape 4: Réserver

Une fois que vous avez trouvé le lieu idéal:
1. Vérifiez les dates de disponibilité
2. Lisez les conditions d'annulation
3. Complétez votre profil
4. Effectuez le paiement sécurisé

## Conseils Importants

- **Lisez les avis** avec attention
- **Vérifiez la localisation** exacte
- **Comprenez les conditions** d'annulation
- **Communiquez** avec le propriétaire si besoin
- **Gardez les confirmations** pour la douane

Bon voyage!
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}
