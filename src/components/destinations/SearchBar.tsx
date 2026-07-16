import { useState, useEffect, useRef } from "react";
import { Search, MapPin, TrendingUp, ChevronRight, X } from "lucide-react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  useDestinations,
  useFeaturedDestinations,
} from "@/hooks/queries/useDestinations";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchParam = searchParams.get("search") || "";

  const [localValue, setLocalValue] = useState(searchParam);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync initial param from URL
  useEffect(() => {
    setLocalValue(searchParam);
  }, [searchParam]);

  // Data fetching
  const { data: featuredResults, isLoading: isFeaturedLoading } =
    useFeaturedDestinations();
  const { data: searchResults, isLoading: isSearching } = useDestinations({
    q: localValue.length >= 2 ? localValue : "",
  });

  const displayResults =
    localValue.length >= 2 ? searchResults : featuredResults;
  const isLoading = localValue.length >= 2 ? isSearching : isFeaturedLoading;
  const topResults = displayResults?.slice(0, 5) || [];

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localValue.trim()) {
      setIsOpen(false);
      navigate(`/destinations?search=${encodeURIComponent(localValue.trim())}`);
    }
  };

  return (
    <div className="relative w-full flex-1" ref={containerRef}>
      <form onSubmit={handleSearch} className="relative z-50">
        <Search
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="text"
          value={localValue}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setLocalValue(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Rechercher une destination, ville, hôtel..."
          className="w-full bg-transparent py-3 pl-12 pr-4 text-sm focus:outline-none text-foreground placeholder:text-muted-foreground/60"
          aria-label="Rechercher une destination"
        />
        {localValue && (
          <button
            type="button"
            onClick={() => setLocalValue("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-md shadow-2xl overflow-hidden z-40"
          >
            <div className="p-2">
              <p className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                {localValue.length >= 2 ? (
                  <>Résultats pour "{localValue}"</>
                ) : (
                  <>
                    <TrendingUp className="h-3 w-3" />
                    Destinations populaires
                  </>
                )}
              </p>

              <div className="space-y-1">
                {isLoading ? (
                  // Shimmer Skeletons
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2">
                      <Skeleton className="h-10 w-10 rounded-md shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  ))
                ) : topResults.length > 0 ? (
                  topResults.map((dest) => (
                    <Link
                      key={dest.id}
                      to={`/destinations/${dest.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-md bg-muted overflow-hidden shrink-0 border border-border group-hover:border-primary/30 transition-colors">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">
                          {dest.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-2.5 w-2.5" />
                          {dest.city}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-6 text-center">
                    <p className="text-sm text-muted-foreground font-medium">
                      Aucun résultat trouvé
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* See More Footer */}
            <Link
              to={`/destinations${localValue ? `?search=${encodeURIComponent(localValue)}` : ""}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-5 py-3.5 bg-muted/50 border-t border-border hover:bg-muted transition-colors group"
            >
              <span className="text-xs font-black text-primary">VOIR TOUT</span>
              <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                Explorer tout le catalogue
                <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
