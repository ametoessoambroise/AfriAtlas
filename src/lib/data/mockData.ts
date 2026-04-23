import type { Destination, Product, MenuItem, Room } from "@/lib/types";

export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    slug: "lome",
    name: "Lomé",
    city: "Lomé",
    type: "city",
    category: "Capitale",
    image:
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80",
    ],
    rating: 4.5,
    safety: 4,
    description: "Capitale vibrante du Togo, porte sur l'Atlantique",
    longDescription:
      "Lomé, la capitale du Togo, est une ville côtière fascinante qui mêle traditions africaines et modernité. Bordée par l'océan Atlantique, elle offre des plages magnifiques, un marché des fétiches unique au monde, et une gastronomie riche. Le grand marché de Lomé est l'un des plus grands et des plus colorés d'Afrique de l'Ouest.",
    coordinates: { lat: 6.1375, lng: 1.2123 },
    address: "Lomé, Togo",
    amenities: ["Plages", "Marchés", "Restaurants", "Musées", "Vie nocturne"],
    priceRange: "€€",
    openingHours: "Ouvert 24h/24",
    featured: true,
  },
  {
    id: "2",
    slug: "kpalime",
    name: "Kpalimé",
    city: "Kpalimé",
    type: "city",
    category: "Nature & Montagne",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80",
    ],
    rating: 4.7,
    safety: 5,
    description: "Joyau verdoyant au cœur des montagnes togolaises",
    longDescription:
      "Kpalimé est la capitale de la région des Plateaux et le paradis des amoureux de nature. Nichée dans les contreforts des monts Agou, elle est réputée pour ses cascades, ses forêts tropicales luxuriantes, ses plantations de café et cacao, et ses papillons multicolores. Un trekking jusqu'au mont Agou (point culminant du Togo à 986m) offre des panoramas à couper le souffle.",
    coordinates: { lat: 6.9, lng: 0.6333 },
    address: "Kpalimé, Plateaux, Togo",
    amenities: ["Trekking", "Cascades", "Forêts", "Artisanat", "Café-cacao"],
    priceRange: "€",
    openingHours: "Ouvert 24h/24",
    featured: true,
  },
  {
    id: "3",
    slug: "kara",
    name: "Kara",
    city: "Kara",
    type: "city",
    category: "Culture & Histoire",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=800&q=80",
      "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=800&q=80",
    ],
    rating: 4.3,
    safety: 4,
    description: "Carrefour culturel du nord, berceau des traditions Kabyè",
    longDescription:
      "Kara est la deuxième ville du Togo et le cœur culturel du nord. Connue pour ses marchés animés, ses cérémonies Evala (lutte traditionnelle) inscrites au patrimoine immatériel, et sa proximité avec les cascades de Kpime et le parc de la Kéran. La ville est le point de départ idéal pour découvrir l'authenticité du Togo septentrional.",
    coordinates: { lat: 9.5511, lng: 1.1861 },
    address: "Kara, Kara, Togo",
    amenities: ["Lutte Evala", "Marchés", "Cascades", "Safari", "Artisanat"],
    priceRange: "€",
    openingHours: "Ouvert 24h/24",
    featured: false,
  },
  {
    id: "4",
    slug: "tsevie",
    name: "Tsévié",
    city: "Tsévié",
    type: "city",
    category: "Détente & Authenticité",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    rating: 4.1,
    safety: 4,
    description: "Ville authentique, porte d'entrée vers l'arrière-pays",
    longDescription:
      "Tsévié, à seulement 30 km au nord de Lomé, est une ville authentique qui révèle le visage rural du Togo. Connue pour son marché hebdomadaire coloré, ses potiers traditionnels, et ses forêts sacrées, Tsévié offre une immersion culturelle hors des sentiers battus. Les villages environnants perpétuent des traditions ancestrales millénaires.",
    coordinates: { lat: 6.4246, lng: 1.2146 },
    address: "Tsévié, Maritime, Togo",
    amenities: [
      "Marché local",
      "Poterie",
      "Villages",
      "Forêts sacrées",
      "Randonnée",
    ],
    priceRange: "€",
    openingHours: "Ouvert 24h/24",
    featured: false,
  },
  {
    id: "5",
    slug: "le-champion",
    name: "Le Champion",
    city: "Lomé",
    type: "supermarket",
    category: "Commerce",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&q=80",
      "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=800&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    ],
    rating: 4.2,
    safety: 5,
    description: "Le supermarché de référence à Lomé",
    longDescription:
      "Le Champion est le supermarché incontournable de Lomé, offrant une large gamme de produits locaux et importés. Avec ses rayons bien achalandés, son personnel accueillant, et ses prix compétitifs, c'est le lieu de shopping idéal pour les résidents et les touristes.",
    coordinates: { lat: 6.1296, lng: 1.2194 },
    address: "Boulevard du 13 Janvier, Lomé",
    amenities: ["Parking", "Climatisation", "Livraison", "Carte bancaire"],
    priceRange: "€€",
    openingHours: "Lun-Sam 8h-21h, Dim 9h-18h",
    phone: "+228 22 21 XX XX",
    featured: false,
  },
  {
    id: "6",
    slug: "hotel-2-fevrier",
    name: "Hôtel 2 Février",
    city: "Lomé",
    type: "hotel",
    category: "Luxe",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    ],
    rating: 4.6,
    safety: 5,
    description:
      "L'hôtel emblématique de Lomé, vue imprenable sur le Golf de Guinée",
    longDescription:
      "L'Hôtel 2 Février est l'adresse la plus emblématique de Lomé. Dominant le Gulf de Guinée avec ses 30 étages, il offre une vue panoramique exceptionnelle sur la capitale et l'océan. Ses installations de classe mondiale — piscine à débordement, spa, restaurants gastronomiques, salles de conférence — en font le choix préféré des hommes d'affaires et des voyageurs exigeants.",
    coordinates: { lat: 6.1354, lng: 1.2122 },
    address: "Bd du Mono, Lomé",
    amenities: [
      "Piscine",
      "Spa",
      "Restaurant",
      "Bar",
      "Salle de sport",
      "Wifi",
      "Climatisation",
      "Room service",
      "Parking",
      "Vue mer",
    ],
    priceRange: "€€€€",
    openingHours: "Ouvert 24h/24",
    phone: "+228 22 21 XX XX",
    featured: true,
  },
  {
    id: "7",
    slug: "restaurant-akif",
    name: "Restaurant Akif",
    city: "Lomé",
    type: "restaurant",
    category: "Gastronomie",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
    ],
    rating: 4.8,
    safety: 5,
    description: "Cuisine togolaise & internationale dans un cadre raffiné",
    longDescription:
      "Le Restaurant Akif est l'adresse gastronomique incontournable de Lomé. Fondé par le chef Akif, ce restaurant fusion propose une cuisine qui marie les saveurs authentiques togolaises aux techniques culinaires internationales. Dans un cadre chaleureux et élégant, découvrez le fufu, le gboma dessi, les grillades, et des créations originales qui enchantent les palais les plus exigeants.",
    coordinates: { lat: 6.1419, lng: 1.2205 },
    address: "Quartier Bè, Lomé",
    amenities: [
      "Terrasse",
      "Climatisation",
      "Bar",
      "Wifi",
      "Réservation",
      "Livraison",
    ],
    priceRange: "€€€",
    openingHours: "Mar-Dim 12h-23h",
    phone: "+228 90 XX XX XX",
    featured: true,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Riz local parfumé",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
    category: "Épicerie",
    description: "Riz blanc parfumé du Togo, sac de 5kg",
    inStock: true,
    unit: "5kg",
  },
  {
    id: "p2",
    name: "Huile de palme rouge",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
    category: "Épicerie",
    description: "Huile de palme rouge naturelle, non raffinée, 1L",
    inStock: true,
    unit: "1L",
  },
  {
    id: "p3",
    name: "Café Kpalimé Bio",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
    category: "Boissons",
    description: "Café arabica bio des montagnes de Kpalimé, 250g",
    inStock: true,
    unit: "250g",
  },
  {
    id: "p4",
    name: "Pâte d'arachide",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80",
    category: "Épicerie",
    description: "Pâte d'arachide artisanale, 500g",
    inStock: true,
    unit: "500g",
  },
  {
    id: "p5",
    name: "Eau minérale Evi",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80",
    category: "Boissons",
    description: "Eau minérale naturelle du Togo, 1,5L",
    inStock: true,
    unit: "1,5L",
  },
  {
    id: "p6",
    name: "Savon local karité",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&q=80",
    category: "Beauté",
    description: "Savon artisanal au beurre de karité, lot de 3",
    inStock: true,
    unit: "lot de 3",
  },
  {
    id: "p7",
    name: "Haricots blancs locaux",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&q=80",
    category: "Épicerie",
    description: "Haricots blancs secs, qualité premium, 1kg",
    inStock: false,
    unit: "1kg",
  },
  {
    id: "p8",
    name: "Jus de bissap",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80",
    category: "Boissons",
    description: "Jus d'hibiscus naturel sans conservateurs, 1L",
    inStock: true,
    unit: "1L",
  },
  {
    id: "p9",
    name: "Miel d'acacia du Togo",
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80",
    category: "Épicerie",
    description: "Miel pur d'acacia récolté au Togo, 500g",
    inStock: true,
    unit: "500g",
  },
  {
    id: "p10",
    name: "Chips de banane plantain",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&q=80",
    category: "Snacks",
    description: "Chips croustillantes de banane plantain, 200g",
    inStock: true,
    unit: "200g",
  },
  {
    id: "p11",
    name: "Gingembre frais",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80",
    category: "Épicerie",
    description: "Gingembre frais bio, 500g",
    inStock: true,
    unit: "500g",
  },
  {
    id: "p12",
    name: "Chocolat cacao Togo",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&q=80",
    category: "Snacks",
    description: "Tablette chocolat noir 70% cacao du Togo, 100g",
    inStock: true,
    unit: "100g",
  },
];

export const ROOMS: Room[] = [
  {
    id: "r1",
    name: "Chambre Standard Vue Ville",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    ],
    capacity: 2,
    amenities: ["Wifi", "Climatisation", "TV", "Minibar", "Coffre-fort"],
    description:
      "Chambre confortable avec vue sur la ville de Lomé. Literie haut de gamme, salle de bain moderne.",
    available: true,
  },
  {
    id: "r2",
    name: "Chambre Supérieure Vue Mer",
    price: 125000,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    ],
    capacity: 2,
    amenities: [
      "Wifi",
      "Climatisation",
      "TV",
      "Minibar",
      "Coffre-fort",
      "Balcon",
      "Vue mer",
    ],
    description:
      "Chambre supérieure avec balcon privé offrant une vue imprenable sur le Golfe de Guinée.",
    available: true,
  },
  {
    id: "r3",
    name: "Suite Junior",
    price: 195000,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    ],
    capacity: 3,
    amenities: [
      "Wifi",
      "Climatisation",
      "TV",
      "Minibar",
      "Coffre-fort",
      "Salon séparé",
      "Jacuzzi",
      "Vue mer panoramique",
    ],
    description:
      "Suite spacieuse avec salon séparé, jacuzzi et vue panoramique à 180° sur l'océan Atlantique.",
    available: true,
  },
  {
    id: "r4",
    name: "Suite Présidentielle",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    ],
    capacity: 4,
    amenities: [
      "Wifi",
      "Climatisation",
      "TV 4K",
      "Bar privé",
      "Jacuzzi",
      "Salle à manger",
      "Terrasse privée",
      "Butler 24h/24",
      "Vue mer 360°",
    ],
    description:
      "L'expérience ultime au sommet de l'hôtel. Suite présidentielle avec terrasse panoramique, butler personnel et accès à tous les services premium.",
    available: false,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Salade d'avocat & crevettes",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    category: "Entrées",
    description:
      "Avocat crémeux, crevettes grillées, vinaigrette citronnée au piment",
    isPopular: false,
  },
  {
    id: "m2",
    name: "Soupe d'arachide",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    category: "Entrées",
    description:
      "Soupe onctueuse à la pâte d'arachide, légumes du jardin et épices locales",
    isPopular: true,
  },
  {
    id: "m3",
    name: "Accras de crevettes",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
    category: "Entrées",
    description:
      "Beignets croustillants aux crevettes fraiches, sauce tartare maison",
    isPopular: false,
  },
  {
    id: "m4",
    name: "Fufu & Gboma Dessi",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80",
    category: "Plats",
    description:
      "Plat emblématique togolais : fufu de manioc onctueux avec ragoût de feuilles d'épinards et viande de bœuf",
    isPopular: true,
  },
  {
    id: "m5",
    name: "Poisson braisé & Riz",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80",
    category: "Plats",
    description:
      "Tilapia entier braisé au feu de bois, servi avec riz parfumé et sauce graine",
    isPopular: true,
  },
  {
    id: "m6",
    name: "Poulet DG",
    price: 11000,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=400&q=80",
    category: "Plats",
    description:
      "Poulet grillé façon Directeur Général, plantin frit, tomates, oignons et épices secrètes",
    isPopular: true,
  },
  {
    id: "m7",
    name: "Côte de bœuf grillée",
    price: 15500,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",
    category: "Plats",
    description:
      "Côte de bœuf 400g, cuisson au choix, sauce chimichurri, légumes rôtis",
    isPopular: false,
  },
  {
    id: "m8",
    name: "Pâtes aux fruits de mer",
    price: 10500,
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80",
    category: "Plats",
    description:
      "Linguine, crevettes, calamars, palourdes, sauce tomate fraîche et basilic",
    isPopular: false,
  },
  {
    id: "m9",
    name: "Fondant au chocolat Togo",
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80",
    category: "Desserts",
    description:
      "Fondant chaud au cacao pur du Togo, cœur coulant, glace vanille",
    isPopular: true,
  },
  {
    id: "m10",
    name: "Salade de fruits tropicaux",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80",
    category: "Desserts",
    description:
      "Mangue, papaye, ananas, fruit de la passion, coulis de citron vert et menthe",
    isPopular: false,
  },
  {
    id: "m11",
    name: "Jus de gingembre frais",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
    category: "Boissons",
    description:
      "Gingembre frais pressé, citron, miel de karité — la boisson signature Akif",
    isPopular: true,
  },
  {
    id: "m12",
    name: "Cocktail Bissap Twist",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80",
    category: "Boissons",
    description:
      "Hibiscus, citron vert, sirop de sucre de canne, glaçons — sans alcool",
    isPopular: false,
  },
];
