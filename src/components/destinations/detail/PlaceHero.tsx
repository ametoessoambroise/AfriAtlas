import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Shield,
  Sun,
  Cloud,
  Thermometer,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import type { Destination } from "@/lib/models/ui";

interface PlaceHeroProps {
  destination: Destination;
}

export default function PlaceHero({ destination }: PlaceHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images =
    destination.gallery && destination.gallery.length > 0
      ? destination.gallery
      : [destination.image];

  // Défilement automatique toutes les 3s
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5s pour laisser le temps de lire
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[550px] w-full overflow-hidden bg-slate-900">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${destination.name} - Vue ${currentIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,59,149,0.42),rgba(0,0,0,0.82))]" />

      <div className="absolute inset-0 flex flex-col justify-end pb-12">
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 md:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <MapPin className="h-3 w-3" />
                {destination.city}, Togo
              </div>

              <h1 className="text-[clamp(2.5rem,5vw+1rem,4rem)] font-semibold leading-[1.05] text-white drop-shadow-lg">
                {destination.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
                  <span className="text-sm font-bold text-white">{destination.rating.toFixed(1)}</span>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <Shield className="h-4 w-4 text-emerald-400" aria-hidden />
                  <span className="text-sm font-medium text-white/90">Confort : {destination.safety}/5</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md shadow-2xl">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">Disponibilité</div>
              <div className="mb-4 text-2xl font-bold text-white">À partir de 35 000 FCFA</div>
              <div className="grid gap-2 text-sm text-white/85">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-secondary" /> Réservation rapide</div>
                <div className="flex items-center gap-2"><Sun className="h-4 w-4 text-secondary" /> Expérience immersive</div>
                <div className="flex items-center gap-2"><Cloud className="h-4 w-4 text-secondary" /> Infos pratiques en un coup d’œil</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-6 right-8 flex flex-col gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`w-1 rounded-full transition-all duration-500 ${
                i === currentIndex ? "h-6 bg-primary" : "h-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
