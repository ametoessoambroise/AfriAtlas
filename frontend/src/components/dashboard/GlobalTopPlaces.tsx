import React, { memo } from "react";
import { Star, MapPin, ChevronRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { PlaceListResponse } from "@/lib/types/place";

interface GlobalTopPlacesProps {
  places?: PlaceListResponse[];
  isLoading?: boolean;
}

export const GlobalTopPlaces = memo(
  ({ places, isLoading }: GlobalTopPlacesProps) => {
    if (isLoading) {
      return (
        <div className="bg-card rounded-md p-6 border border-border space-y-4 animate-pulse">
          <div className="w-1/2 h-4 bg-muted rounded" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="w-full h-3 bg-muted rounded" />
                <div className="w-1/2 h-2 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    const items = places?.slice(0, 5) || [];

    return (
      <div className="bg-card rounded-md p-6 border border-border h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <p className="font-black text-foreground">Destinations en Vogue</p>
          <Link
            to="/explore"
            className="text-primary hover:bg-primary/5 p-1.5 rounded-lg transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {items.map((place) => (
            <Link
              key={place.id}
              to={`/destinations/${place.slug}`}
              className="flex items-center gap-4 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border-2 border-primary/10 p-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                <img
                  src={place.primary_image?.url || "/placeholder.jpg"}
                  alt={place.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">
                  {place.name}
                </p>
                <p className="text-[11px] text-muted-foreground font-bold truncate">
                  {place.city}, Togo
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted text-foreground text-[10px] font-black group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                <TrendingUp className="w-3 h-3 text-secondary" />
                POPULAIRE
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/explore"
          className="w-full mt-6 py-3 rounded-md bg-muted text-xs font-black text-foreground hover:bg-border transition-all flex items-center justify-center gap-2"
        >
          Découvrir plus de lieux
        </Link>
      </div>
    );
  },
);
