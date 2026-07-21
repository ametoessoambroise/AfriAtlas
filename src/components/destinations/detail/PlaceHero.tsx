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
      {/* Background Slideshow */}
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-12">
        <div className="container relative mx-auto max-w-7xl z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-end">
            {/* Left Column: Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-white uppercase tracking-wider">
                  <MapPin className="h-3 w-3" />
                  {destination.city}, Togo
                </div>
              </div>

              <h1 className="mb-4 text-[clamp(2.5rem,5vw+1rem,4rem)] font-heading font-semibold italic text-white drop-shadow-lg tracking-tight">
                {destination.name}
              </h1>

              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-1.5 bg-background/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Star
                    className="h-5 w-5 fill-primary text-primary"
                    aria-hidden
                  />
                  <span className="font-bold text-white text-sm">
                    {destination.rating.toFixed(1)}
                  </span>
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
        </div>
      </div>
      {/* Indicator Dots */}
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
