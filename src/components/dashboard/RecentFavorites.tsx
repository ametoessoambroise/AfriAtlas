// c:\Users\Dell-Laptop\Downloads\atlas-voyages\atlas-voyages-main\frontend\src\components\dashboard\RecentFavorites.tsx
import { PlaceListResponse } from "@/lib/types/places";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface RecentFavoritesProps {
  favorites: PlaceListResponse[];
}

export function RecentFavorites({ favorites }: RecentFavoritesProps) {
  if (favorites.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-current" />
          Favoris Récents
        </h3>
        <Link to="/favorites" className="text-primary text-xs font-bold hover:underline">Voir tout</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {favorites.slice(0, 4).map((place) => (
          <Link key={place.id} to={`/places/${place.slug}`} className="group flex items-center gap-4 bg-card border border-border p-3 rounded-2xl hover:border-primary transition-all">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-alt shrink-0">
               <img src={place.main_image || "/placeholder.jpg"} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="min-w-0">
               <p className="font-bold text-sm truncate">{place.name}</p>
               <p className="text-[10px] text-muted-foreground truncate">{place.city}</p>
               <Badge variant="outline" className="mt-1 text-[9px] px-1 py-0">{place.category}</Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}