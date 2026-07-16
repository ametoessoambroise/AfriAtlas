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

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {destination.name}
                </h1>
                <p className="text-lg text-white/80 max-w-xl leading-relaxed line-clamp-2">
                  {destination.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.round(destination.rating) ? "fill-primary text-primary" : "text-white/30"}`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-bold">
                    {destination.rating.toFixed(1)}
                  </span>
                  <span className="text-white/50 text-sm">(128 avis)</span>
                </div>

                <div className="flex gap-2">
                  {destination.tags?.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold text-white/90 bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-md uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Weather Widget (Desktop) */}
            <div className="hidden md:flex justify-end">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="w-64 rounded-md bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl text-white space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-4xl font-black">25°C</p>
                    <p className="text-sm font-medium text-white/70">
                      Ensoleillé
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-white/10">
                    <Sun className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                      Meilleure période
                    </p>
                    <p className="text-sm font-bold">Nov. à Mars</p>
                  </div>

                  <button className="flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors group">
                    Voir détails météo
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
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
