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
      <Skeleton className="h-[280px] w-full rounded-none md:h-[320px]" />

      <div className="container py-8">
        {/* Filtres pills */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Skeleton className="h-10 w-48 rounded-full" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <Skeleton className="aspect-square w-full rounded-none" />
              <div className="space-y-2 p-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
