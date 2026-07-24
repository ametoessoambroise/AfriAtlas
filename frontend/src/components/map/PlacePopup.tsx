import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import type { Destination } from "@/lib/models/ui";
import { formatPlaceCategoryLabel } from "@/lib/utils/formatters";

interface PlacePopupProps {
  destination: Destination;
}

export default function PlacePopup({ destination }: PlacePopupProps) {
  return (
    <div className="w-[260px] -m-3 font-sans">
      <div className="relative h-32 w-full overflow-hidden rounded-t-xl">
         <img
           src={destination.image || "/images/places/placeholder-place.jpg"}
           alt={destination.name}
           className="h-full w-full object-cover"
         />
         <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">
            {formatPlaceCategoryLabel(destination.category)}
         </div>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-base font-extrabold leading-tight">{destination.name}</h3>
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 font-semibold text-primary">
            <Star className="h-3.5 w-3.5 fill-current" />
            {destination.rating > 0 ? destination.rating.toFixed(1) : "N/A"}
          </div>
          <div className="flex items-center gap-1">
             <MapPin className="h-3 w-3" />
             <span className="text-xs font-medium">{destination.city}</span>
          </div>
        </div>
        <p className="mb-4 line-clamp-2 text-xs text-muted-foreground">
          {destination.description}
        </p>
        <Link
          to={`/destinations/${destination.slug}`}
          className="block w-full text-center bg-primary text-primary-foreground py-2 text-xs font-bold rounded-lg shadow-md hover:opacity-90 transition-opacity"
        >
          Découvrir
        </Link>
      </div>
    </div>
  );
}
