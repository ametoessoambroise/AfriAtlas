import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/layout/PageWrapper";

/**
 * Skeleton de chargement pour PlaceCatalogPage.
 * Imite fidèlement le layout réel : hero + filtres pills + grille produits.
 */
export function PlaceCatalogSkeleton() {
  return (
    <PageWrapper>
      {/* Hero */}
      <Skeleton className="h-[280px] w-full rounded-none md:h-[320px] premium-shimmer" />

      <div className="container py-8">
        {/* Filtres pills */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Skeleton className="h-10 w-48 rounded-full premium-shimmer" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full premium-shimmer" />
          ))}
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-md border border-border bg-card"
            >
              <Skeleton className="aspect-square w-full rounded-none premium-shimmer" />
              <div className="space-y-2 p-3">
                <Skeleton className="h-4 w-3/4 premium-shimmer" />
                <Skeleton className="h-4 w-1/2 premium-shimmer" />
                <Skeleton className="h-8 w-full rounded-lg premium-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
