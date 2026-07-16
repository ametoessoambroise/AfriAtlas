import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/layout/PageWrapper";

/**
 * Skeleton de chargement pour la page DestinationDetail.
 * Imite fidèlement le layout réel : hero + colonne principale + sidebar.
 */
export function DestinationDetailSkeleton() {
  return (
    <PageWrapper>
      {/* Hero */}
      <Skeleton className="h-[400px] w-full rounded-none" />

      <div className="container py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Colonne principale (2/3) */}
          <div className="space-y-10 lg:col-span-2">
            {/* À propos */}
            <div className="space-y-3">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/6" />
            </div>
            {/* Galerie */}
            <div>
              <Skeleton className="mb-4 h-7 w-1/4" />
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/3] rounded-md" />
                ))}
              </div>
            </div>
            {/* Commodités */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-4">
            <div className="space-y-4 rounded-md border border-border p-6">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
