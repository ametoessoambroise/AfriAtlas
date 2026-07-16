import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronRight, MapPin } from "lucide-react";
import { PlaceListResponse } from "@/lib/types/place";
import FavoriteCardSkeleton from "./skeletons/FavoriteCardSkeleton";

interface RecentFavoritesProps {
  favorites?: PlaceListResponse[];
  isLoading?: boolean;
}

export const RecentFavorites = memo(
  ({ favorites, isLoading }: RecentFavoritesProps) => {
    if (isLoading) {
      return (
        <div className="bg-card rounded-md p-6 border border-border space-y-4 animate-pulse">
          <div className="w-1/2 h-4 bg-muted rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-muted rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="w-full h-3 bg-muted rounded" />
                <div className="w-1/2 h-2 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    const items = favorites?.slice(0, 4) || [];

    return (
      <div className="bg-card rounded-md p-6 border border-border h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <p className="font-black text-foreground">Favoris Récents</p>
          <Link
            to="/favorites"
            className="text-primary hover:bg-primary/5 p-1.5 rounded-lg transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-5">
          {items.length > 0 ? (
            items.map((place) => (
              <Link
                key={place.id}
                to={`/places/${place.slug}`}
                className="flex items-center gap-4 group focus:outline-none"
              >
                <div className="w-12 h-12 rounded-md bg-muted border border-border flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform overflow-hidden">
                  <img
                    src={place.primary_image?.url || "/placeholder.jpg"}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">
                    {place.name}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-bold">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{place.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                    {place.category}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <Heart className="w-8 h-8 text-muted mx-auto mb-2" />
              <p className="text-xs font-bold text-muted-foreground">
                Aucun favori pour le moment
              </p>
            </div>
          )}
        </div>

        <Link
          to="/favorites"
          className="w-full mt-8 py-3 rounded-md border border-border text-xs font-black text-foreground hover:bg-muted transition-all flex items-center justify-center gap-2"
        >
          Voir tous mes favoris
        </Link>
      </div>
    );
  },
);
