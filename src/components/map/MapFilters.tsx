import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Navigation } from "lucide-react";
import { useMap } from "react-leaflet";
import type { Destination } from "@/lib/models/ui";
import { motion, AnimatePresence } from "framer-motion";

interface MapFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (v: string | null) => void;
  categories: string[];
  destinations: Destination[];
  onSelect: (slug: string) => void;
}

export default function MapFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  categories,
  destinations,
  onSelect,
}: MapFiltersProps) {
  const map = useMap();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectDestination = (dest: Destination) => {
    setSearch(dest.name);
    setIsOpen(false);
    onSelect(dest.slug);
    map.flyTo([dest.coordinates.lat, dest.coordinates.lng], 16, { duration: 1.5 });
  };

  const handleHoverDestination = (dest: Destination) => {
    map.flyTo([dest.coordinates.lat, dest.coordinates.lng], 15, { duration: 0.8 });
  };

  return (
    <div className="absolute top-4 left-1/2 z-[1000] -translate-x-1/2 w-[90%] max-w-md pointer-events-auto" ref={containerRef}>
      <div className="rounded-md bg-card/90 p-2 shadow-xl backdrop-blur-md border border-border/50 relative">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onClick={() => setIsOpen(true)}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Rechercher une destination..."
            className="w-full rounded-md bg-background py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm transition-all"
          />
        </div>
        
        {/* ── DROPDOWN AUTOCOMPLETE ── */}
        <AnimatePresence>
          {isOpen && search.trim().length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] bg-card/95 backdrop-blur-xl border border-border/50 rounded-md shadow-2xl overflow-hidden flex flex-col max-h-[320px] z-[1001]"
            >
              {destinations.length === 0 ? (
                <div className="p-5 text-center text-sm font-medium text-muted-foreground">
                  Aucune destination trouvée.
                </div>
              ) : (
                <ul className="overflow-y-auto no-scrollbar py-2">
                  {destinations.slice(0, 10).map((dest) => (
                    <li key={dest.id}>
                      <button
                        onClick={() => handleSelectDestination(dest)}
                        onMouseEnter={() => handleHoverDestination(dest)}
                        className="w-full text-left px-4 py-3 hover:bg-muted/80 transition-colors flex items-center gap-3 group"
                      >
                        <img 
                          src={dest.image || "/images/places/placeholder-place.jpg"} 
                          alt={dest.name} 
                          className="h-10 w-10 rounded-md object-cover shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110" 
                        />
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">
                            {dest.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                            <Navigation className="h-3 w-3" /> {dest.city} • {dest.category}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar px-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedCategory === null 
                 ? "bg-primary text-primary-foreground shadow-sm" 
                 : "bg-surface-alt text-muted-foreground hover:bg-border/60"
            }`}
          >
            Tous
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 capitalize rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedCategory === cat
                 ? "bg-primary text-primary-foreground shadow-sm" 
                 : "bg-surface-alt text-muted-foreground hover:bg-border/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
