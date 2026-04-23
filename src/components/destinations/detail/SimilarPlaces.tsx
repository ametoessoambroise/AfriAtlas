import { useMemo } from "react";
import DestinationCard from "@/components/cards/DestinationCard";
import { DestinationGridSkeleton } from "@/components/feedback/ApiQueryState";
import { usePlaces } from "@/hooks/queries/usePlaces";
import { mapPlaceListToDestination } from "@/lib/mappers/placeMapper";

export default function SimilarPlaces({ currentSlug, category }: { currentSlug: string; category?: string }) {
  const { data, isLoading } = usePlaces({ page_size: 48 });

  const similar = useMemo(() => {
    const items = data?.items ?? [];
    if (!currentSlug) return [];
    
    // Essayer de trouver la même catégorie d'abord
    const sameCat = items.filter((i) => i.slug !== currentSlug && i.category === category);
    const pool = sameCat.length >= 3 ? sameCat : items.filter((i) => i.slug !== currentSlug);
    
    return pool.slice(0, 3).map(mapPlaceListToDestination);
  }, [data?.items, currentSlug, category]);

  if (isLoading) {
    return (
      <div className="mt-16 pt-10 border-t border-border/40">
        <h2 className="mb-6 text-2xl font-bold">Vous aimerez aussi</h2>
        <DestinationGridSkeleton count={3} />
      </div>
    );
  }

  if (similar.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-border/40">
      <h2 className="mb-6 text-2xl font-bold">Vous aimerez aussi</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {similar.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </div>
    </div>
  );
}
