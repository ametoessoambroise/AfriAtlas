// ---------------------------------------------------------------------------

// c:\Users\Dell-Laptop\Downloads\atlas-voyages\atlas-voyages-main\frontend\src\components\dashboard\GlobalTopPlaces.tsx
import { PlaceListResponse } from "@/lib/types/places";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface GlobalTopPlacesProps {
  places: PlaceListResponse[];
}

export function GlobalTopPlaces({ places }: GlobalTopPlacesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        Lieux populaires au Togo
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {places.map((place) => (
          <Link key={place.id} to={`/places/${place.slug}`} className="relative group aspect-square rounded-2xl overflow-hidden bg-surface-alt">
             <img 
               src={place.main_image || "/placeholder.jpg"} 
               alt={place.name} 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
             <div className="absolute bottom-2 left-2 right-2 flex flex-col">
                <p className="text-white text-xs font-black truncate">{place.name}</p>
                <div className="flex items-center gap-1 text-[8px] text-white/80">
                   <MapPin className="w-2 h-2" />
                   {place.city}
                </div>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
