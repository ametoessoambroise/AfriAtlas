import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { LazyImage } from "@/components/ui/lazy-image";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";
import { cn } from "@/lib/utils";
import {
  Home,
  Map,
  Search,
  LayoutGrid,
  Eye,
  Users,
  ShieldCheck,
  BarChart3,
  Star,
  MapPin,
  Clock,
  Wifi,
  CreditCard,
  Car,
  ChevronRight,
  Megaphone,
  TrendingUp,
  CalendarCheck,
  Heart,
  ArrowRight,
  Quote,
  Bookmark,
  Globe,
  Plus,
  Flame,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Animation variants ─────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/* ── Données statiques ──────────────────────────────────────────────── */
const placements = [
  {
    icon: Home,
    title: "Page d'accueil",
    desc: "Votre bannière en haut de page, visible par tous les visiteurs.",
    // Thumbnail: miniature illustrative avec badge Sponsorisé (screenshot sidebar)
    thumbnail:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop",
  },
  {
    icon: Map,
    title: "Pages des pays et villes",
    desc: "Votre business mis en avant dans les pages des destinations.",
    thumbnail:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=120&auto=format&fit=crop",
  },
  {
    icon: Search,
    title: "Résultats de recherche",
    desc: "Votre établissement en tête des résultats de recherche.",
    thumbnail:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&auto=format&fit=crop",
  },
  {
    icon: LayoutGrid,
    title: "Pages catégories",
    desc: "Votre fiche en avant dans les catégories partenaires.",
    // Screenshot: "Pages catégories (Restaurants, Hôtels…)"
    titleFull: "Pages catégories\n(Restaurants, Hôtels…)",
    thumbnail:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=120&auto=format&fit=crop",
  },
];

const advantages = [
  {
    icon: Eye,
    title: "Visibilité maximale",
    desc: "Soyez vu par des milliers de voyageurs chaque jour.",
  },
  {
    icon: TrendingUp,
    title: "Plus de clients",
    desc: "Attirez plus de visiteurs intéressés par vos services.",
  },
  {
    icon: ShieldCheck,
    title: "Confiance renforcée",
    desc: "Badge et avis clients pour renforcer votre crédibilité.",
  },
  {
    icon: BarChart3,
    title: "Statistiques détaillées",
    desc: "Suivez les vues, clics et réservations de votre annonce.",
  },
];

const stats = [
  {
    icon: Eye,
    value: "+70%",
    label: "de visibilité",
    sub: "en moyenne pour nos partenaires",
  },
  {
    icon: CalendarCheck,
    value: "+50",
    label: "réservations / mois",
    sub: "en moyenne par établissement",
  },
  {
    icon: Heart,
    value: "+90%",
    label: "de satisfaction",
    sub: "de la part de nos partenaires",
  },
  {
    icon: Users,
    value: "10 000+",
    label: "voyageurs actifs",
    sub: "chaque mois sur la plateforme",
  },
];

// Testimonials array — screenshot shows dots (pagination between multiple)
const testimonials = [
  {
    quote:
      "Grâce à Afriatlas Travel, notre restaurant est passé de 10 à plus de 80 réservations par mois. La visibilité est incroyable !",
    author: "Eric K.",
    role: "Propriétaire – Le Bistrot, Lomé",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop",
  },
  {
    quote:
      "En seulement 3 mois, nous avons doublé notre clientèle. Afriatlas Travel est notre meilleur investissement marketing.",
    author: "Aïcha M.",
    role: "Gérante – Hôtel Savane, Kpalimé",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop",
  },
  {
    quote:
      "Le tableau de bord statistiques est excellent. Je vois exactement combien de voyageurs visitent ma fiche chaque jour.",
    author: "Kodjo A.",
    role: "Directeur – Lodge du Lac, Atakpamé",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
  },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop",
];

const searchResults = [
  {
    name: "Le Bistrot",
    location: "Lomé, Togo",
    rating: 4.8,
    reviews: 230,
    desc: "Une expérience culinaire unique avec une vue imprenable sur l'océan et des plats d'exception.",
    tags: ["Cuisine française", "Vue sur mer", "Parking"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop",
    sponsored: true,
    popular: true,
  },
  {
    name: "Chez Maman",
    location: "Lomé, Togo",
    rating: 4.3,
    reviews: 120,
    desc: "Cuisine togolaise traditionnelle dans une ambiance chaleureuse.",
    tags: ["Cuisine locale", "Convivial", "Abordable"],
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop",
    sponsored: false,
    popular: false,
  },
  {
    name: "Ocean Garden",
    location: "Lomé, Togo",
    rating: 4.2,
    reviews: 95,
    desc: "Restaurant en bord de mer, spécialités de fruits de mer.",
    tags: ["Fruits de mer", "Vue sur mer", "Terrasse"],
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&auto=format&fit=crop",
    sponsored: false,
    popular: false,
  },
];

// Screenshot shows 5 dishes + bouton "+" sur chaque carte
const popularDishes = [
  {
    name: "Poulet DG",
    price: "6 000 FCFA",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=200&auto=format&fit=crop",
  },
  {
    name: "Poisson braisé",
    price: "7 500 FCFA",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop",
  },
  {
    name: "Pâtes fruits de mer",
    price: "8 000 FCFA",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&auto=format&fit=crop",
  },
  {
    name: "Salade César",
    price: "5 000 FCFA",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop",
  },
  // 5ème plat visible dans le screenshot
  {
    name: "Jus de bissap",
    price: "1 500 FCFA",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?w=200&auto=format&fit=crop",
  },
];

/* ── Composants internes ────────────────────────────────────────────── */

function SponsoredBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-secondary-foreground",
        className,
      )}
    >
      <Megaphone className="h-2.5 w-2.5" />
      Sponsorisé
    </span>
  );
}

function PartnerBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary border border-primary/20 whitespace-nowrap">
      Partenaire Premium
    </span>
  );
}

/* ── Section : Exemple bannière ─────────────────────────────────────── */
function BannerExample() {
  return (
    <motion.div variants={fadeUp}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        ● Exemple de bannière sponsorisée en haut de page
      </p>
      <div className="rounded-md border border-border bg-card p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative h-20 w-24 sm:h-24 sm:w-32 shrink-0 overflow-hidden rounded-md">
            <LazyImage
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop"
              alt="Restaurant Le Bistrot"
              className="h-full w-full object-cover"
            />
            <SponsoredBadge className="absolute left-1.5 top-1.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <h4 className="font-heading font-bold text-foreground text-sm sm:text-base truncate">
                Restaurant Le Bistrot
              </h4>
              <PartnerBadge />
            </div>
            <p className="text-xs text-muted-foreground">
              Cuisine française & locale · Lomé
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-secondary text-secondary" />
              <span className="text-xs font-bold text-foreground">4.8</span>
              <span className="text-xs text-muted-foreground">(230 avis)</span>
            </div>
          </div>
          <Link
            to="/pricing"
            className="shrink-0 rounded-lg bg-primary px-3 py-2 sm:px-4 text-xs font-bold text-primary-foreground transition-colors hover:opacity-90 min-h-[40px] flex items-center"
          >
            Découvrir
          </Link>
        </div>
        {/* Dot indicators */}
        <div className="mt-3 flex justify-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === 0 ? "bg-primary w-4" : "bg-border w-1.5",
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section : Exemple résultats de recherche ───────────────────────── */
function SearchResultsExample() {
  return (
    <motion.div variants={fadeUp}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        ● Exemple dans les résultats de recherche
      </p>
      <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
        {/* Fake search bar — screenshot shows "Tous | Restaurants | Hôtels | Activités | Filtres" */}
        <div className="flex items-center gap-2 border-b border-border px-3 sm:px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm text-muted-foreground truncate flex-1">
            restaurant à Lomé
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="rounded-full px-2.5 py-1 text-[11px] font-bold text-muted-foreground hidden sm:inline">
              Tous
            </span>
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
              Restaurants
            </span>
            <span className="hidden sm:inline rounded-full px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
              Hôtels
            </span>
            <span className="hidden sm:inline rounded-full px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
              Activités
            </span>
            {/* Filtres button visible in screenshot */}
            <button className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-bold text-muted-foreground hover:bg-muted transition-colors">
              <SlidersHorizontal className="h-3 w-3" />
              Filtres
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="divide-y divide-border">
          {searchResults.map((r) => (
            <div
              key={r.name}
              className={cn(
                "flex gap-4 p-4 sm:p-5 group transition-all",
                r.sponsored && "bg-primary/[0.03] border-l-4 border-l-primary",
              )}
            >
              {/* Colonne 1 : Image */}
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-r-sm overflow-hidden shrink-0 border border-border/50 shadow-sm bg-muted">
                <img
                  src={r.image}
                  alt={r.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Colonne 2 : Tout le reste */}
              <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4 min-w-full">
                <div className="flex-1 min-w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {r.sponsored && <SponsoredBadge />}
                    <h4 className="font-bold text-foreground text-base truncate">
                      {r.name}
                    </h4>
                    {r.sponsored && <PartnerBadge />}
                  </div>

                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary/60" />
                    {r.location}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-1 bg-secondary/10 px-2 py-0.5 rounded-lg border border-secondary/20">
                      <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                      <span className="text-xs font-black text-secondary-foreground">
                        {r.rating}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        ({r.reviews} avis)
                      </span>
                    </div>
                    {/* Screenshot shows flame icon + "Populaire" in orange/accent */}
                    {r.popular && (
                      <span className="rounded-full bg-accent/10 px-2 py-1 text-[10px] font-black text-accent uppercase tracking-wider flex items-center gap-1 border border-accent/20 shadow-sm">
                        <Flame className="h-3 w-3" />
                        Populaire
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {r.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground border border-border/50 hover:border-primary/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 self-center sm:self-auto">
                  <button className="h-10 w-10 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground/30 hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  {/* Screenshot CTA: "Voir la fiche" (not just "Voir") */}
                  <Link
                    to="/pricing"
                    className={cn(
                      "rounded-md px-4 py-2.5 text-xs font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 text-center whitespace-nowrap",
                      r.sponsored
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 shadow-lg"
                        : "bg-background border border-border text-foreground hover:bg-muted shadow-sm",
                    )}
                  >
                    Voir la fiche
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Screenshot: "Voir plus de résultats ▾" avec chevron down */}
        <button className="flex w-full items-center justify-center gap-1 py-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px]">
          Voir plus de résultats <ChevronRight className="h-3 w-3 rotate-90" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Section : Exemple page partenaire ──────────────────────────────── */
function PartnerPageExample() {
  const galleryImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&auto=format&fit=crop",
  ];

  return (
    <motion.div variants={fadeUp}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        ● Exemple de page partenaire mise en avant
      </p>
      <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
        {/* Gallery — screenshot shows "+18 Photos" sur la 4ème cellule */}
        <div className="grid grid-cols-4 gap-0.5 h-40 sm:h-48">
          <div className="col-span-2 row-span-2 relative overflow-hidden">
            <LazyImage
              src={galleryImages[0]}
              alt="Gallery 1"
              className="h-full w-full object-cover"
            />
            <SponsoredBadge className="absolute left-2 top-2" />
          </div>
          {galleryImages.slice(1).map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <LazyImage
                src={img}
                alt={`Gallery ${i + 2}`}
                className="h-full w-full object-cover"
              />
              {/* Screenshot: "+18 Photos" on last cell */}
              {i === 2 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-[11px] font-bold">
                  +18 Photos
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-heading font-bold text-base sm:text-lg text-foreground">
              Le Bistrot
            </h4>
            <PartnerBadge />
            {/* Screenshot: checkmark verified badge bleu */}
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-secondary text-secondary" /> 4.8
              (230 avis)
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Lomé, Togo
            </span>
            <span className="flex items-center gap-1">
              {/* Screenshot: "Ouvert · 10:00 – 23:00" */}
              <Clock className="h-3 w-3" /> Ouvert · 10:00 – 23:00
            </span>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            {[
              { icon: MapPin, label: "Vue sur mer" },
              { icon: Car, label: "Parking" },
              { icon: Wifi, label: "Wi-Fi gratuit" },
              { icon: CreditCard, label: "Paiement CB" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1">
                <Icon className="h-3 w-3 shrink-0" /> {label}
              </span>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <button className="flex-1 sm:flex-none rounded-lg border border-border px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors min-h-[44px] flex items-center justify-center gap-1.5">
              Contacter
            </button>
            {/* Screenshot: bouton Réserver en vert/primary */}
            <button className="flex-1 sm:flex-none rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground min-h-[44px] flex items-center justify-center gap-1.5">
              Réserver
            </button>
          </div>

          {/* Mini nav tabs — scrollable on mobile */}
          <div className="flex gap-4 border-t border-border pt-3 text-xs font-medium text-muted-foreground overflow-x-auto no-scrollbar">
            {[
              "À propos",
              "Menu & Produits",
              "Avis (230)",
              "Photos",
              "Offres",
              "Localisation",
            ].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "cursor-default whitespace-nowrap shrink-0 pb-1",
                  i === 1
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "",
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Plats populaires — screenshot shows 5 dishes + "+" button on each + "Voir tout le menu ▾" */}
        <div className="border-t border-border p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-bold text-foreground">
              Nos plats populaires
            </h5>
            <button className="text-xs text-primary font-medium shrink-0 flex items-center gap-0.5 hover:underline">
              Voir tout le menu <ChevronRight className="h-3 w-3 rotate-90" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {popularDishes.map((dish) => (
              <div
                key={dish.name}
                className="shrink-0 w-24 sm:w-28 space-y-1.5"
              >
                <div className="relative h-20 sm:h-20 w-full rounded-lg overflow-hidden bg-muted aspect-square">
                  <LazyImage
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                  {dish.popular && (
                    <span className="absolute left-1 top-1 rounded bg-accent px-1.5 py-0.5 text-[8px] font-bold text-accent-foreground">
                      Populaire
                    </span>
                  )}
                  {/* Screenshot: bouton "+" en bas à droite de chaque carte plat */}
                  <button className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                    <Plus className="h-3.5 w-3.5 text-primary-foreground" />
                  </button>
                </div>
                <p className="text-xs font-bold text-foreground truncate">
                  {dish.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {dish.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Composant : Testimonial avec dots de pagination ────────────────── */
function TestimonialCarousel() {
  // Simple state-free version with dots matching screenshot
  // For full interactivity, wrap with useState + interval
  const active = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="rounded-md border border-border bg-card p-5 sm:p-6 shadow-sm"
    >
      <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 sm:mb-4">
        Ce que disent nos partenaires
      </h3>
      <div className="relative">
        <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
        <p className="pl-6 text-sm text-muted-foreground italic leading-relaxed">
          {testimonials[active].quote}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-3 pt-3 border-t border-border">
        <LazyImage
          src={testimonials[active].avatar}
          alt={testimonials[active].author}
          containerClassName="h-10 w-10 rounded-full overflow-hidden shrink-0"
        />
        <div>
          <p className="text-sm font-bold text-foreground">
            {testimonials[active].author}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonials[active].role}
          </p>
        </div>
      </div>
      {/* Dots de pagination — screenshot shows 3 dots sous le témoignage */}
      <div className="mt-3 flex justify-center gap-1.5">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? "bg-primary w-4" : "bg-border w-1.5",
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Composant : Mobile CTA flottant ────────────────────────────────── */
function MobileFloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:hidden"
    >
      <div className="rounded-md bg-card border border-border shadow-2xl shadow-black/20 p-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-foreground">
            Prêt à vous lancer ?
          </p>
          <p className="text-[11px] text-muted-foreground">
            Boostez votre visibilité
          </p>
        </div>
        <Link
          to="/pricing"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground min-h-[44px]"
        >
          Commencer <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── PAGE PRINCIPALE ────────────────────────────────────────────────── */
export default function PartnerLandingPage() {
  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative pt-20 sm:pt-28 lg:pt-36 pb-0 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        {/* On mobile : overlay fort pour lisibilité. Sur desktop : gradient lateral */}
        <div className="absolute inset-0 z-0 bg-background/85 sm:bg-gradient-to-r sm:from-background sm:via-background/95 sm:to-background/30 lg:to-transparent" />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left: Text content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-xl pt-4 pb-8 sm:pb-12"
            >
              {/* Pill label */}
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary mb-5"
              >
                <Globe className="h-3 w-3" />
                Afriatlas Travel
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-[3.5rem] font-heading font-bold text-foreground leading-[1.1] tracking-tight"
              >
                Faites découvrir
                <br />
                votre business
                <br />
                au <span className="text-primary">monde entier</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-sm sm:text-base font-bold text-foreground"
              >
                Boostez votre visibilité sur{" "}
                <span className="text-primary">Afriatlas Travel</span>
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-2 text-sm text-muted-foreground max-w-md font-body leading-relaxed"
              >
                Touchez des milliers de voyageurs chaque jour et transformez
                votre visibilité en plus de clients et de réservations.
              </motion.p>

              {/* Stat chips — mobile quick wins */}
              <motion.div
                variants={fadeUp}
                className="mt-5 flex flex-wrap gap-2"
              >
                {[
                  { icon: TrendingUp, text: "+70% de visibilité" },
                  { icon: CalendarCheck, text: "+50 réservations/mois" },
                  { icon: Users, text: "10 000+ voyageurs" },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-sm"
                  >
                    <Icon className="h-3 w-3 text-primary shrink-0" />
                    {text}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-7 flex xs:flex-row gap-3"
              >
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:opacity-90 active:scale-[0.98] min-h-[48px]"
                >
                  Lancer ma publicité <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-muted min-h-[48px]"
                >
                  Voir les tarifs
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Phone + traveller — desktop only */}
            <div className="hidden lg:flex items-end justify-center relative min-h-[520px]">
              {/* Traveller image — fichier local /public/traveller.png */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
                className="absolute bottom-0 left-0 z-10"
              >
                <img
                  src="/traveller.png"
                  alt="Voyageur Afriatlas"
                  className="h-[460px] w-auto object-contain drop-shadow-lg"
                />
              </motion.div>

              {/* Phone mockup — fichier local /public/phone.png */}
              <motion.div
                initial={{ opacity: 0, y: -60, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4,
                }}
                className="relative z-20 ml-24"
              >
                <img
                  src="/phone.png"
                  alt="Afriatlas Travel sur mobile"
                  className="h-[520px] w-auto object-contain drop-shadow-2xl scale-140"
                />
              </motion.div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute top-8 -right-4 z-30 flex items-center gap-3 rounded-md bg-card border border-border/60 px-4 py-3 shadow-xl shadow-black/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-primary">+70%</p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    de visibilité
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute top-1/2 -translate-y-1/2 -right-8 z-30 flex items-center gap-3 rounded-md bg-card border border-border/60 px-4 py-3 shadow-xl shadow-black/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary/20">
                  <Users className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">+50</p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    réservations / mois
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-12 -right-4 z-30 flex items-center gap-3 rounded-md bg-card border border-border/60 px-4 py-3 shadow-xl shadow-black/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10">
                  <Map className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Présence dans
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    plusieurs pays
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Fade vers la section suivante */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
      </section>

      {/* ── Main layout ── */}
      <section className="py-10 sm:py-16 lg:py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
              Fonctionnement
            </p>
            {/* Screenshot h2: "Comment votre publicité est mise en avant sur Afriatlas Travel" */}
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
              Comment votre publicité est mise en avant sur Afriatlas Travel
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Plus de visibilité. Plus de clients. Plus de réservations.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:gap-10 lg:grid-cols-3">
            {/* ── Left column : Examples ── */}
            <motion.div
              className="lg:col-span-2 space-y-10 sm:space-y-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
            >
              <BannerExample />
              <SearchResultsExample />
              <PartnerPageExample />
            </motion.div>

            {/* ── Right sidebar ── */}
            <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              {/* Placements — screenshot: chaque item a une miniature thumbnail à droite */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="rounded-md border border-border bg-card p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-4 sm:mb-5">
                  Où votre publicité apparaît
                </h3>

                {/* Mobile: horizontal scroll pills */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 sm:hidden">
                  {placements.map((p) => (
                    <div
                      key={p.title}
                      className="shrink-0 flex flex-col items-center gap-2 rounded-md border border-border bg-muted/40 p-3 w-28 text-center"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <p.icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-[11px] font-bold text-foreground leading-tight">
                        {p.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Desktop: vertical list WITH thumbnail miniature (screenshot delta) */}
                <div className="hidden sm:block space-y-5">
                  {placements.map((p) => (
                    <motion.div
                      key={p.title}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      {/* Icon */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <p.icon className="h-4 w-4 text-primary" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-foreground">
                          {p.titleFull
                            ? p.titleFull.split("\n").map((line, i) => (
                                <span key={i}>
                                  {line}
                                  {i === 0 && <br />}
                                </span>
                              ))
                            : p.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {p.desc}
                        </p>
                      </div>

                      {/* Thumbnail avec badge Sponsorisé — ajout screenshot */}
                      <div className="relative shrink-0 h-14 w-20 rounded-lg overflow-hidden border border-border/50">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 rounded bg-secondary px-1 py-0.5 text-[8px] font-bold text-secondary-foreground">
                          Sponsorisé
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Advantages */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="rounded-md border border-border bg-card p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-4 sm:mb-5">
                  Les avantages pour vous
                </h3>
                {/* Mobile: 2-col grid */}
                <div className="grid grid-cols-2 gap-3 sm:hidden">
                  {advantages.map((a) => (
                    <div
                      key={a.title}
                      className="rounded-md border border-border bg-muted/30 p-3 space-y-1.5"
                    >
                      <a.icon className="h-5 w-5 text-primary" />
                      <h4 className="text-xs font-bold text-foreground leading-tight">
                        {a.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground leading-snug">
                        {a.desc}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Desktop: vertical list */}
                <div className="hidden sm:block space-y-4">
                  {advantages.map((a) => (
                    <motion.div
                      key={a.title}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <a.icon className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {a.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {a.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link
                  to="/pricing"
                  className="mt-5 flex w-full items-center justify-center rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98] min-h-[48px]"
                >
                  Devenir partenaire
                </Link>
              </motion.div>

              {/* Testimonial with dots pagination — screenshot delta */}
              <TestimonialCarousel />

              {/* CTA card sidebar — "Prêt à booster votre business ?" visible in screenshot sidebar bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-md border border-primary/20 bg-primary/5 p-5 sm:p-6"
              >
                <h3 className="text-sm font-bold text-foreground mb-2">
                  Prêt à booster votre business ?
                </h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Rejoignez des centaines d&apos;entreprises qui nous font déjà
                  confiance chaque mois sur la plateforme.
                </p>
                <Link
                  to="/pricing"
                  className="flex w-full items-center justify-center rounded-md bg-primary py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98] min-h-[44px] mb-3"
                >
                  Lancer ma publicité
                </Link>
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Nous contacter <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── CTA Hero Section — matches screenshot design ── */}
        <div className="px-3 sm:px-4 mt-6 md:mt-8">
          <div className="rounded-md bg-white dark:bg-card border border-border/50 shadow-xl shadow-black/5 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* ── LEFT : Text content ── */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                {/* Pill badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 w-fit mb-6">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    Devenir Partenaire
                  </span>
                </div>

                {/* H1 */}
                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-heading font-extrabold text-foreground leading-[1.1] tracking-tight mb-4">
                  Attirez plus de clients
                  <br />
                  avec <span className="text-primary">Afriatlas Travel</span>
                </h2>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-sm">
                  Boostez votre visibilité et touchez des milliers de voyageurs
                  chaque jour grâce à notre plateforme.
                </p>

                {/* CTAs */}
                <div className="flex flex-col xs:flex-row gap-3 mb-10">
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:opacity-90 active:scale-[0.98] min-h-[48px]"
                  >
                    {/* Rocket icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                    Lancer ma publicité
                  </Link>

                  <div
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground cursor-pointer transition-all hover:bg-muted active:scale-[0.98] min-h-[48px]"
                  >
                    {/* Play circle icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    Voir comment ça marche
                  </div>
                </div>

                {/* Feature list — 3 rows from screenshot */}
                <div className="space-y-5">
                  {[
                    {
                      color: "bg-primary/10",
                      iconColor: "text-primary",
                      // Users icon
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      ),
                      title: "+10 000 utilisateurs actifs",
                      desc: "Une audience qualifiée et engagée chaque jour.",
                    },
                    {
                      color: "bg-violet-500/10",
                      iconColor: "text-violet-500",
                      // Target/AI icon
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      ),
                      title: "Ciblage intelligent avec IA",
                      desc: "Touchez les bonnes personnes, au bon moment.",
                    },
                    {
                      color: "bg-emerald-500/10",
                      iconColor: "text-emerald-500",
                      // BarChart icon
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                      ),
                      title: "Résultats mesurables en temps réel",
                      desc: "Suivez vos performances et optimisez vos campagnes.",
                    },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
                          f.color,
                          f.iconColor,
                        )}
                      >
                        {f.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {f.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT : Gallery grid ── */}
              <div className="relative hidden lg:block bg-muted/30 p-4">
                <GalleryGrid className="h-full">
                  {GALLERY_IMAGES.map((imageUrl, index) => (
                    <GalleryGridCell index={index} key={index}>
                      <img
                        className="size-full object-cover object-center"
                        width="100%"
                        height="100%"
                        src={imageUrl}
                        alt={`Destination Afriatlas ${index + 1}`}
                      />
                    </GalleryGridCell>
                  ))}
                </GalleryGrid>

                {/* Floating badge "+500 entreprises" — screenshot overlay on gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-8 left-8 z-10 flex items-center gap-3 rounded-md bg-foreground/90 backdrop-blur-sm px-4 py-3 shadow-xl"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-background leading-tight">
                      +500
                    </p>
                    <p className="text-[11px] text-background/70 leading-tight">
                      entreprises nous font
                      <br />
                      confiance
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ── Trust bar — logos partenaires ── */}
            <div className="border-t border-border px-8 py-5">
              <p className="text-center text-xs text-muted-foreground mb-4">
                Déjà plus de 500 entreprises nous font confiance
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                {[
                  {
                    name: "airbnb",
                    logo: (
                      <span className="flex items-center gap-1.5 text-[#FF5A5F] font-bold text-sm">
                        {/* Airbnb bélo icon simplified */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          className="w-10 h-10"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#ff5252"
                            d="M42.459,32.519c-1.037-3.336-9.539-19.596-12.12-24.5l-0.026-0.048C29.153,5.559,26.676,4,24,4 s-5.153,1.559-6.291,3.929L17.661,8.02C15.08,12.923,6.578,29.183,5.542,32.518C5.261,33.421,5,34.407,5,35.5 c0,4.687,3.813,8.5,8.5,8.5c4.654,0,7.612-1.949,10.5-5.184C26.888,42.051,29.846,44,34.5,44c4.687,0,8.5-3.813,8.5-8.5 C43,34.407,42.739,33.421,42.459,32.519z M23.999,34.662C22.33,32.515,20,28.881,20,26c0-2.206,1.794-4,4-4s4,1.794,4,4 C28,28.872,25.668,32.511,23.999,34.662z M34.5,41c-3.287,0-5.521-1.107-8.325-4.258C27.878,34.596,31,30.104,31,26 c0-3.86-3.141-7-7-7s-7,3.14-7,7c0,4.104,3.122,8.596,4.825,10.742C19.021,39.893,16.787,41,13.5,41C10.468,41,8,38.533,8,35.5 c0-0.653,0.162-1.308,0.406-2.09C9.17,30.95,15.3,18.948,20.316,9.417l0.076-0.146C21.055,7.891,22.471,7,24,7 s2.945,0.891,3.615,2.285l0.068,0.132C32.7,18.948,38.83,30.95,39.595,33.411C39.838,34.192,40,34.847,40,35.5 C40,38.533,37.532,41,34.5,41z"
                          />
                        </svg>
                        airbnb
                      </span>
                    ),
                  },
                  {
                    name: "Booking.com",
                    logo: (
                      <span className="font-extrabold text-sm text-[#003580]">
                        Booking<span className="text-[#003580]">.</span>
                        <span className="text-[#0077CC]">com</span>
                      </span>
                    ),
                  },
                  {
                    name: "Expedia",
                    logo: (
                      <span className="flex items-center gap-1.5 font-bold text-sm text-gray-700 dark:text-foreground">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-[#00355F] dark:fill-foreground"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        Expedia
                      </span>
                    ),
                  },
                  {
                    name: "ACCOR",
                    logo: (
                      <span className="flex items-center gap-1.5 font-black text-sm tracking-widest text-gray-800 dark:text-foreground uppercase">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                          <path d="M12 2L2 19h20L12 2z" fill="currentColor" />
                        </svg>
                        ACCOR
                      </span>
                    ),
                  },
                  {
                    name: "lastminute.com",
                    logo: (
                      <span className="font-bold text-sm text-gray-700 dark:text-foreground">
                        lastminute.com
                      </span>
                    ),
                  },
                  {
                    name: "Tripadvisor",
                    logo: (
                      <span className="flex items-center gap-1.5 font-bold text-sm text-gray-700 dark:text-foreground">
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                          <circle cx="7" cy="12" r="4" fill="#34E0A1" />
                          <circle cx="17" cy="12" r="4" fill="#34E0A1" />
                          <circle
                            cx="12"
                            cy="8"
                            r="5"
                            fill="#34E0A1"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                        </svg>
                        Tripadvisor
                      </span>
                    ),
                  },
                ].map((brand, i) => (
                  <div key={brand.name} className="flex items-center gap-0">
                    {i > 0 && (
                      <div className="hidden sm:block w-px h-4 bg-border mr-6 sm:mr-10" />
                    )}
                    <div className="opacity-60 hover:opacity-100 transition-opacity cursor-default">
                      {brand.logo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar — repositionnée en bas comme dans le screenshot ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border border-border text-foreground shadow-md rounded-md py-8 sm:py-10"
      >
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value} className="flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md bg-background/10">
                  <s.icon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-bold text-foreground">
                    {s.value}
                  </p>
                  <p className="text-[11px] sm:text-xs text-foreground/80 leading-tight">
                    {s.label}
                  </p>
                  <p className="hidden sm:block text-[10px] text-foreground/50">
                    {s.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Spacer pour le CTA flottant mobile */}
      <div className="h-20 sm:hidden" />

      {/* CTA flottant mobile */}
      <MobileFloatingCTA />
    </PageWrapper>
  );
}
