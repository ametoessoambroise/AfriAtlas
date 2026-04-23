import { Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import type { PlaceResponse } from "@/lib/types";
import { formatPlaceCategoryLabel } from "@/lib/mappers/placeMapper";

interface CatalogHeaderProps {
  place: PlaceResponse;
}

export default function CatalogHeader({ place }: CatalogHeaderProps) {
  const heroImg =
    place.images?.find((i) => i.is_primary)?.url ??
    place.images?.[0]?.url ??
    "/images/places/placeholder-place.jpg"; //TODO: Placeholder générique s'il n'y a pas d'image

  return (
    <div className="relative h-[280px] overflow-hidden md:h-[320px]">
      <img src={heroImg} alt={place.name} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to={`/destinations/${place.slug}`}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 drop-shadow-md transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Fiche du lieu
          </Link>
          <div className="mb-3">
             <span className="badge-rating inline-block text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/10 shadow-sm">
                {formatPlaceCategoryLabel(place.category)}
             </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl drop-shadow-lg tracking-tight">
            {place.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/90 drop-shadow-sm font-medium">
            <span className="inline-flex items-center gap-1.5 bg-black/20 rounded-full px-3 py-1 backdrop-blur-sm border border-white/10">
              <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
              {place.rating_avg ? parseFloat(place.rating_avg).toFixed(1) : "N/A"}
            </span>
            {place.city ? (
              <span className="inline-flex items-center gap-1.5 bg-black/20 rounded-full px-3 py-1 backdrop-blur-sm border border-white/10">
                {place.city}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
