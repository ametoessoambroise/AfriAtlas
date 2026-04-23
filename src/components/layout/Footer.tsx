import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaces } from "@/lib/api/places";
import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { LazyImage } from "@/components/ui/lazy-image";

const footerColumns = [
  {
    title: "Destinations",
    links: [
      { label: "Lomé", href: "/destinations/lome" },
      { label: "Kpalimé", href: "/destinations/kpalime" },
      { label: "Kara", href: "/destinations/kara" },
      { label: "Tsévié", href: "/destinations/tsevie" },
    ],
  },
  {
    title: "Pages",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Destinations", href: "/destinations" },
      { label: "Carte interactive", href: "/carte" },
    ],
  },
  {
    title: "Services",
    links: [
      {
        label: "Hôtel 2 Février",
        href: "/destinations/hotel-2-fevrier/catalog",
      },
      {
        label: "Restaurant Akif",
        href: "/destinations/restaurant-akif/catalog",
      },
      { label: "Le Champion", href: "/destinations/le-champion/catalog" },
    ],
  },
];

const legalLinks = [
  { label: "Conditions générales", href: "/terms" },
  { label: "Politique de confidentialité", href: "/privacy" },
  { label: "Accessibilité", href: "/accessibility" },
];

const socialIcons = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "X (Twitter)", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
] as const;

function DestinationSlideshow() {
  const [images, setImages] = useState<{url: string, name: string}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await getPlaces({ page_size: 10, sort_by: "-rating_avg" });
        const placesWithImages = res.items
          .filter((p: any) => p.primary_image?.url)
          .map((p: any) => ({ url: p.primary_image.url, name: p.name }));
        
        if (placesWithImages.length > 0) {
          setImages(placesWithImages);
        } else {
          setImages([
            { url: "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80", name: "Aventure au Togo" }
          ]);
        }
      } catch (e) {
        setImages([
          { url: "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80", name: "Aventure au Togo" }
        ]);
      }
    }
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div className="relative w-80 h-56 rounded-2xl bg-white/5 animate-pulse" />;
  }

  return (
    <div className="relative w-80 h-56 rounded-2xl shadow-xl border border-white/10 overflow-hidden group">
      {images.map((img, idx) => (
        <LazyImage
          key={idx}
          src={img.url}
          alt={img.name}
          containerClassName={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white font-semibold truncate">{images[currentIndex]?.name}</p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background text-foreground relative w-full pt-20 pb-10 border-t border-border/40 mt-20">
      {/* Background blobs for a modern glass effect */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
        <div className="bg-primary absolute top-1/3 left-1/4 h-64 w-64 rounded-full opacity-10 blur-3xl" />
        <div className="bg-amber-500 absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 mb-16 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid items-center gap-8 md:grid-cols-2 relative z-10">
            <div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                Restez connecté avec l'aventure.
              </h3>
              <p className="text-foreground/70 mb-6">
                Rejoignez des milliers de voyageurs et recevez nos meilleures
                recommandations de destinations, offres exclusives et guides de
                voyage pour le Togo.
              </p>
              {/* TODO: implémenter l'inscription à la newsletter */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Adresse e-mail pour la newsletter
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Votre adresse e-mail"
                  className="min-h-11 flex-1 rounded-xl border border-foreground/20 bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                />
                <button
                  type="button"
                  className="min-h-11 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/30 active:scale-[0.98] touch-manipulation"
                >
                  S&apos;abonner
                </button>
              </div>
            </div>
            <div className="hidden justify-end md:flex">
              <div className="relative">
                <div className="bg-primary/20 absolute inset-0 -rotate-6 rounded-2xl" />
                <div className="bg-amber-500/20 absolute inset-0 rotate-3 rounded-2xl" />
                <DestinationSlideshow />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links & Info */}
        <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Socials */}
          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="mb-6 flex items-center space-x-3">
              <LazyImage
                src="/favicon.ico"
                alt="WorldAtlas"
                containerClassName="w-[50px] h-[50px] rounded-lg overflow-hidden shrink-0"
              />
              <span className="text-2xl font-bold tracking-tight">
                WorldAtlas{" "}
                <span className="text-primary font-black">Travel</span>
              </span>
            </div>
            <p className="text-foreground/60 mb-6 leading-relaxed max-w-sm">
              Découvrez le Togo comme jamais. Destinations authentiques,
              expériences uniques, souvenirs inoubliables. Plongez au cœur de
              l'Afrique de l'Ouest.
            </p>

            <ul className="space-y-3 mb-6 text-foreground/70 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:contact@worldatlas.tg"
                  className="hover:text-primary transition-colors"
                >
                  contact@worldatlas.tg
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a
                  href="tel:+22898409999"
                  className="hover:text-primary transition-colors"
                >
                  +228 98 40 99 99
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Lomé, Togo</span>
              </li>
            </ul>

            <div className="flex gap-3">
              {socialIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground touch-manipulation"
                    aria-label={`WorldAtlas sur ${item.label}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-lg font-bold text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-foreground/60 hover:text-primary transition-colors font-medium text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal */}
        <div className="border-border/40 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-foreground/50 mb-4 text-sm md:mb-0 font-medium">
            &copy; {new Date().getFullYear()} WorldAtlas Travel. Tous droits
            réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/50 hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
