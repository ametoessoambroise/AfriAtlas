import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/layout/PageWrapper";

export function AlbumDetailSkeleton() {
  return (
    <PageWrapper>
      <div className="bg-card/50 backdrop-blur-lg sticky top-0 z-40 border-b border-border/50">
        <div className="container h-20 flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container py-12 space-y-12">
        {/* Header Skeleton */}
        <div className="relative overflow-hidden rounded-md border border-border p-8 md:p-12 flex flex-col md:flex-row gap-8 bg-card">
          <Skeleton className="aspect-[4/5] w-full max-w-[280px] rounded-md" />
          <div className="flex-1 space-y-4 py-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-6 mt-8">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <Skeleton className="h-[300px] w-full rounded-md" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Skeleton className="aspect-square rounded-md" />
                <Skeleton className="aspect-square rounded-md" />
                <Skeleton className="aspect-square rounded-md" />
              </div>
            </div>
          </div>
          <aside className="space-y-8">
            <Skeleton className="h-32 w-full rounded-md" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-20 w-full rounded-md" />
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}
