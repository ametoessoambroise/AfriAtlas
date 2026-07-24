import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownAZ, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";

export type SortType = "popular" | "recent" | "distance" | "rating";

export default function SortSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "popular";
  const [isGeolocating, setIsGeolocating] = useState(false);

  const applySort = (value: string, extras?: Record<string, string>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", value);
      next.set("page", "1");
      if (extras) {
        Object.entries(extras).forEach(([k, v]) => next.set(k, v));
      } else {
        // Remove stale coords when switching away from distance
        next.delete("lat");
        next.delete("lon");
      }
      return next;
    });
  };

  const onSortChange = (value: string) => {
    if (value !== "distance") {
      applySort(value);
      return;
    }

    // Distance sort — request geolocation first
    if (!navigator.geolocation) {
      toast.error("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setIsGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsGeolocating(false);
        applySort("distance", {
          lat: String(position.coords.latitude),
          lon: String(position.coords.longitude),
        });
        toast.success("Tri par distance activé ");
      },
      (error) => {
        setIsGeolocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("Accès à la localisation refusé. Vérifiez vos paramètres.");
        } else {
          toast.error("Impossible d'obtenir votre position.");
        }
        // Fall back to popular
        applySort("popular");
      },
      { timeout: 8000, maximumAge: 60_000 }
    );
  };

  return (
    <div className="flex items-center gap-2">
      {isGeolocating ? (
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      ) : (
        <ArrowDownAZ className="h-4 w-4 text-muted-foreground hidden sm:block" />
      )}
      <span className="text-sm font-medium text-muted-foreground mr-1 hidden sm:block">
        {isGeolocating ? "Localisation..." : ""}
      </span>
      <Select value={currentSort} onValueChange={onSortChange} disabled={isGeolocating}>
        <SelectTrigger className="w-[180px] bg-card h-9 border-border/60">
          <SelectValue placeholder="Trier par..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Popularité</SelectItem>
          <SelectItem value="rating">Mieux notés</SelectItem>
          <SelectItem value="recent">Plus récents</SelectItem>
          <SelectItem value="distance">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Le plus proche
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
