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
    "/images/places/placeholder-place.jpg";

  return (
    <div className="relative h-[280px] overflow-hidden md:h-[320px]">
      <img src={heroImg} alt={place.name} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,59,149,0.35),rgba(0,0,0,0.78))]" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to={`/destinations/${place.slug}`}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Fiche du lieu
          </Link>
          <div className="mb-3">
            <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              {formatPlaceCategoryLabel(place.category)}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            {place.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-medium text-white/90">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
              {place.rating_avg ? parseFloat(place.rating_avg).toFixed(1) : "N/A"}
            </span>
            {place.city ? (
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 backdrop-blur-sm">
                {place.city}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
