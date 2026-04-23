import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCities } from "@/hooks/queries/useCities";
import SortSelect from "@/components/destinations/SortSelect";
import {
  LayoutGrid,
  MapPin,
  Bed,
  Utensils,
  ShoppingBag,
  Landmark,
  Activity,
  SlidersHorizontal,
} from "lucide-react";

const categoryTypes = [
  { value: "all", label: "Toutes les catégories", icon: LayoutGrid },
  { value: "city", label: "Villes & Lieux", icon: MapPin },
  { value: "hotel", label: "Hôtels", icon: Bed },
  { value: "restaurant", label: "Restaurants", icon: Utensils },
  { value: "supermarket", label: "Commerces", icon: ShoppingBag },
];

export function CategoryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const updateParam = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === "all") {
        next.delete("category");
      } else {
        next.set("category", value);
      }
      next.set("page", "1");
      return next;
    });
  };

  return (
    <div
      className="flex w-full overflow-x-auto no-scrollbar gap-4 py-3 items-center"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
      }}
    >
      {categoryTypes.map((t) => {
        const isActive = currentCategory === t.value;
        const Icon = t.icon;
        return (
          <motion.button
            key={t.value}
            onClick={() => updateParam(t.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative flex items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-bold transition-colors duration-300 flex-shrink-0 font-body overflow-hidden",
              isActive
                ? "text-white shadow-lg shadow-secondary/20"
                : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 shadow-sm",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-secondary rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon
              className={`w-4 h-4 z-10 ${isActive ? "text-white" : "text-secondary"}`}
            />
            <span className="z-10">{t.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function CityFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCity = searchParams.get("city") || "Toutes";

  const { data: citiesResponse } = useCities();
  // We use a predefined list to match the design or fallback to the fetched ones
  const baseCities = ["Toutes", "Lomé", "Kpalimé", "Kara", "Tsévié", "Aného"];
  const cities =
    citiesResponse && citiesResponse.length > 0 ? citiesResponse : baseCities;

  // Ensure "Toutes" is always the first element
  const displayCities = ["Toutes", ...cities.filter((c) => c !== "Toutes")];

  const updateParam = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === "Toutes") {
        next.delete("city");
      } else {
        next.set("city", value);
      }
      next.set("page", "1");
      return next;
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-6">
      {/* Left side: Explorer par ville + Pills */}
      <div
        className="flex items-center gap-4 md:gap-6 w-full md:w-auto overflow-x-auto no-scrollbar py-2"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap pl-1">
          Villes
        </span>
        <div className="flex items-center gap-3">
          {displayCities.map((city) => {
            const isActive = currentCity === city;
            return (
              <motion.button
                key={city}
                onClick={() => updateParam(city)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative rounded-full px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-bold transition-colors duration-300 whitespace-nowrap flex-shrink-0 font-body overflow-hidden",
                  isActive
                    ? "text-white shadow-lg shadow-primary/20"
                    : "bg-white/40 backdrop-blur-md text-foreground border border-border/60 hover:border-primary/40 hover:text-primary shadow-sm",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCity"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{city}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right side: SortSelect */}
      <SortSelect />
    </div>
  );
}

// Composant de compatibilité par défaut
export default function FilterPanel() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <CategoryFilters />
      <CityFilters />
    </div>
  );
}
