import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield } from "lucide-react";
import type { Destination } from "@/lib/models/ui";

interface PlaceHeroProps {
  destination: Destination;
}

export default function PlaceHero({ destination }: PlaceHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = destination.gallery && destination.gallery.length > 0
    ? destination.gallery
    : [destination.image];

  // Défilement automatique toutes les 3s
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[400px] w-full overflow-hidden bg-muted">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${destination.name} - Vue ${currentIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container relative mx-auto max-w-7xl z-10 px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="badge-rating text-xs px-2.5 py-1 text-white bg-white/20 backdrop-blur-md rounded-full border border-white/10 uppercase tracking-widest font-semibold shadow-sm">
              {destination.category}
            </span>
            <span className="text-sm font-medium text-white/90 drop-shadow-md">
              {destination.city}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl drop-shadow-lg tracking-tight">
            {destination.name}
          </h1>

          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-1.5 bg-background/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Star className="h-5 w-5 fill-primary text-primary" aria-hidden />
              <span className="font-bold text-white text-sm">{destination.rating.toFixed(1)}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-background/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Shield className="h-4 w-4 text-emerald-400" aria-hidden />
              <span className="text-sm font-medium text-white/90">
                Confort : {destination.safety}/5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Aller à l'image ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
