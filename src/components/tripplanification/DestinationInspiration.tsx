import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const inspirations = [
  {
    id: 1,
    name: "Kpalimé",
    category: "Nature & Cascades",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Togoville",
    category: "Culture & Histoire",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Agbodrafo",
    category: "Plages & Détente",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Kara",
    category: "Traditions & Montagnes",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  } as const,
};

export default function DestinationInspiration() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-6 px-1 snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-1"
        style={{ WebkitOverflowScrolling: "touch" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {inspirations.map((item) => {
          const isFavorite = favorites.includes(item.id);
          return (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="min-w-[200px] sm:min-w-[260px] shrink-0 snap-start group cursor-pointer"
              style={{ willChange: "transform" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={260}
                  height={325}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge Rating */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20 text-[10px] font-semibold text-white uppercase shadow-sm">
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                    {item.rating}
                  </div>
                </div>

                {/* Heart Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "absolute top-4 right-4 w-10 h-10 rounded-xl backdrop-blur-md border flex items-center justify-center transition-colors shadow-lg z-10",
                    isFavorite
                      ? "bg-red-500 border-red-400 text-white"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/25"
                  )}
                  aria-label={
                    isFavorite
                      ? `Retirer ${item.name} des favoris`
                      : `Ajouter ${item.name} aux favoris`
                  }
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                </motion.button>

                {/* Content */}
                <div className="absolute bottom-5 left-6">
                  <p className="text-white/70 text-[10px] font-semibold uppercase tracking-widest mb-1">
                    {item.category}
                  </p>
                  <h4 className="text-white font-heading font-semibold text-lg uppercase tracking-tight leading-none">
                    {item.name}
                  </h4>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* View All Card */}
        <motion.div
          variants={cardVariants}
          className="min-w-[200px] sm:min-w-[260px] shrink-0 snap-start flex items-center justify-center"
        >
          <button className="flex flex-col items-center gap-4 group h-full w-full justify-center aspect-[4/5] rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all">
            <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center bg-card group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all shadow-sm">
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground group-hover:translate-x-1 transition-all" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
              Voir Tout
            </span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
