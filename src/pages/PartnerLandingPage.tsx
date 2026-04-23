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
} from "lucide-react";

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
  },
  {
    icon: Map,
    title: "Pages des pays et villes",
    desc: "Votre business mis en avant dans les pages des destinations.",
  },
  {
    icon: Search,
    title: "Résultats de recherche",
    desc: "Votre établissement en tête des résultats de recherche.",
  },
  {
    icon: LayoutGrid,
    title: "Pages catégories",
    desc: "Votre fiche en avant dans les catégories partenaires.",
  },
];

const advantages = [
  {
    icon: Eye,
    title: "Visibilité maximale",
    desc: "Soyez vu par des milliers de voyageurs chaque jour.",
  },
  {
    icon: Users,
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
    icon: TrendingUp,
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
    sponsored: false,
    popular: false,
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
        ● Exemple de bannière sponsorisée
      </p>
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative h-20 w-24 sm:h-24 sm:w-32 shrink-0 overflow-hidden rounded-xl">
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
        ● Dans les résultats de recherche
      </p>
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Fake search bar */}
        <div className="flex items-center gap-2 border-b border-border px-3 sm:px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm text-muted-foreground truncate flex-1">
            restaurant à Lomé
          </span>
          {/* Mobile: show only active filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
              Restaurants
            </span>
            <span className="hidden sm:inline rounded-full px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
              Hôtels
            </span>
            <span className="hidden sm:inline rounded-full px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
              Activités
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="divide-y divide-border">
          {searchResults.map((r) => (
            <div
              key={r.name}
              className={cn(
                "flex items-start gap-3 p-3 sm:p-4",
                r.sponsored && "bg-primary/[0.03] border-l-2 border-l-primary",
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                  {r.sponsored && <SponsoredBadge />}
                  <h4 className="font-bold text-foreground text-sm">
                    {r.name}
                  </h4>
                  {r.sponsored && <PartnerBadge />}
                </div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  {r.location}
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-secondary text-secondary" />
                    <span className="text-xs font-bold">{r.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({r.reviews})
                    </span>
                  </div>
                  {r.popular && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                      ★ Populaire
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {r.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
                <Bookmark className="h-4 w-4 text-muted-foreground/40" />
                <Link
                  to="/pricing"
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-bold transition-colors min-h-[36px] flex items-center",
                    r.sponsored
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-foreground hover:bg-muted",
                  )}
                >
                  Voir
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button className="flex w-full items-center justify-center gap-1 py-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px]">
          Voir plus de résultats <ChevronRight className="h-3 w-3" />
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
        ● Page partenaire mise en avant
      </p>
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Gallery */}
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
              {i === 2 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-[11px] font-bold">
                  +16 Photos
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
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
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
              <Clock className="h-3 w-3" /> Ouvert · 10:00–23:00
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
            <button className="flex-1 sm:flex-none rounded-lg border border-border px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors min-h-[44px]">
              Contacter
            </button>
            <button className="flex-1 sm:flex-none rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground min-h-[44px]">
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
                  i === 0 && "text-primary font-bold border-b-2 border-primary",
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Plats populaires */}
        <div className="border-t border-border p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-bold text-foreground">
              Nos plats populaires
            </h5>
            <span className="text-xs text-primary font-medium shrink-0">
              Voir tout ▸
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {[
              { name: "Poulet DG", price: "6 000 FCFA", popular: false },
              { name: "Poisson braisé", price: "7 500 FCFA", popular: true },
              {
                name: "Pâtes fruits de mer",
                price: "8 000 FCFA",
                popular: false,
              },
              { name: "Salade César", price: "5 000 FCFA", popular: false },
            ].map((dish) => (
              <div
                key={dish.name}
                className="shrink-0 w-24 sm:w-28 space-y-1.5"
              >
                <div className="relative h-18 sm:h-20 w-full rounded-lg overflow-hidden bg-muted aspect-square">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=60"
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                  {dish.popular && (
                    <span className="absolute left-1 top-1 rounded bg-accent px-1.5 py-0.5 text-[8px] font-bold text-accent-foreground">
                      Populaire
                    </span>
                  )}
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

/* ── Composant : Mobile CTA flottant ────────────────────────────────── */
function MobileFloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:hidden"
    >
      <div className="rounded-2xl bg-card border border-border shadow-2xl shadow-black/20 p-3 flex items-center gap-3">
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
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground min-h-[44px]"
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
                WorldAtlas Travel
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
                <span className="text-primary">WorldAtlas Travel</span>
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
                className="mt-7 flex flex-col xs:flex-row gap-3"
              >
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:opacity-90 active:scale-[0.98] min-h-[48px]"
                >
                  Lancer ma publicité <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-muted min-h-[48px]"
                >
                  Voir les tarifs
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Phone + traveller — desktop only */}
            <div className="hidden lg:flex items-end justify-center relative min-h-[520px]">
              {/* Traveller image */}
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
                  alt="Voyageur WorldAtlas"
                  className="h-[460px] w-auto object-contain drop-shadow-lg"
                />
              </motion.div>

              {/* Phone */}
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
                  alt="WorldAtlas Travel sur mobile"
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
                className="absolute top-8 -right-4 z-30 flex items-center gap-3 rounded-2xl bg-card border border-border/60 px-4 py-3 shadow-xl shadow-black/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
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
                className="absolute top-1/2 -translate-y-1/2 -right-8 z-30 flex items-center gap-3 rounded-2xl bg-card border border-border/60 px-4 py-3 shadow-xl shadow-black/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/20">
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
                className="absolute bottom-12 -right-4 z-30 flex items-center gap-3 rounded-2xl bg-card border border-border/60 px-4 py-3 shadow-xl shadow-black/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
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

      {/* ── Stats bar ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-foreground py-8 sm:py-10"
      >
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value} className="flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-background/10">
                  <s.icon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-bold text-background">
                    {s.value}
                  </p>
                  <p className="text-[11px] sm:text-xs font-semibold text-background/80 leading-tight">
                    {s.label}
                  </p>
                  <p className="hidden sm:block text-[10px] text-background/50">
                    {s.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Main layout ── */}
      <section className="py-10 sm:py-16 lg:py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          {/* Section title — mobile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
              Fonctionnement
            </p>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
              Où votre annonce apparaît
            </h2>
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
              {/* Placements */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-4 sm:mb-5">
                  Où votre publicité apparaît
                </h3>
                {/* Mobile: horizontal scroll pills */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 sm:hidden">
                  {placements.map((p) => (
                    <div
                      key={p.title}
                      className="shrink-0 flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/40 p-3 w-28 text-center"
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
                {/* Desktop: vertical list */}
                <div className="hidden sm:block space-y-5">
                  {placements.map((p) => (
                    <motion.div
                      key={p.title}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <p.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {p.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {p.desc}
                        </p>
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
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-4 sm:mb-5">
                  Les avantages pour vous
                </h3>
                {/* Mobile: 2-col grid */}
                <div className="grid grid-cols-2 gap-3 sm:hidden">
                  {advantages.map((a) => (
                    <div
                      key={a.title}
                      className="rounded-xl border border-border bg-muted/30 p-3 space-y-1.5"
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
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98] min-h-[48px]"
                >
                  Devenir partenaire
                </Link>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 sm:mb-4">
                  Ce que disent nos partenaires
                </h3>
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
                  <p className="pl-6 text-sm text-muted-foreground italic leading-relaxed">
                    Grâce à WorldAtlas Travel, notre restaurant est passé de 10
                    à plus de 80 réservations par mois. La visibilité est
                    incroyable !
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-3 pt-3 border-t border-border">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop"
                    alt="Eric K."
                    containerClassName="h-10 w-10 rounded-full overflow-hidden shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">Eric K.</p>
                    <p className="text-xs text-muted-foreground">
                      Propriétaire – Le Bistrot, Lomé
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-4 mt-6 sm:mt-0 md:pt-4">
          {/* CTA with Gallery */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6 overflow-hidden">
            <ContainerStagger>
              <ContainerAnimated className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                Devenir Partenaire
              </ContainerAnimated>
              <ContainerAnimated className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Prêt à booster votre business ?
              </ContainerAnimated>
              <ContainerAnimated className="my-3 sm:my-4 text-sm text-muted-foreground leading-relaxed">
                Rejoignez des centaines d&apos;entreprises qui font confiance à
                WorldAtlas Travel pour attirer de nouveaux clients chaque jour.
              </ContainerAnimated>
              <ContainerAnimated>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98] min-h-[44px]"
                >
                  Lancer ma publicité
                </Link>
              </ContainerAnimated>
            </ContainerStagger>

            <GalleryGrid className="mt-5 sm:mt-6">
              {GALLERY_IMAGES.map((imageUrl, index) => (
                <GalleryGridCell index={index} key={index}>
                  <img
                    className="size-full object-cover object-center"
                    width="100%"
                    height="100%"
                    src={imageUrl}
                    alt={`Destination WorldAtlas ${index + 1}`}
                  />
                </GalleryGridCell>
              ))}
            </GalleryGrid>
          </div>
        </div>
      </section>

      {/* Spacer pour le CTA flottant mobile */}
      <div className="h-20 sm:hidden" />

      {/* CTA flottant mobile */}
      <MobileFloatingCTA />
    </PageWrapper>
  );
}
