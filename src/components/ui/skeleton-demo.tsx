import { Skeleton } from "./skeleton";

/**
 * Demo component to visually verify the skeleton shimmer animation
 * This component demonstrates various skeleton use cases as specified in the design document
 */
export function SkeletonDemo() {
  return (
    <div className="space-y-8 p-8 bg-background">
      <div>
        <h2 className="text-lg font-bold mb-4">Skeleton Loading States Demo</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Demonstrating shimmer animation (left-to-right, 2s duration) as per
          Requirement 16
        </p>
      </div>

      {/* Stats Card Skeleton */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Stats Card Skeleton</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-card border border-border p-6 rounded-[32px] shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-12 h-12 rounded-2xl" />
                <Skeleton className="w-20 h-8" />
              </div>
              <Skeleton className="w-16 h-3 mb-2" />
              <Skeleton className="w-24 h-9" />
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Card Skeleton */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Favorite Card Skeleton</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-card border border-border p-3 rounded-2xl"
            >
              <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Item Skeleton */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Order Item Skeleton</h3>
        <div className="bg-card border border-border rounded-[32px] overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border-b border-border last:border-b-0"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Place Card Skeleton */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Place Card Skeleton</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Welcome Banner Skeleton */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Welcome Banner Skeleton</h3>
        <div className="bg-card border border-border p-8 rounded-[40px]">
          <div className="flex items-center gap-6">
            <Skeleton className="w-24 h-24 rounded-full shrink-0" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-10 w-64" />
              <div className="flex gap-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Card Skeleton */}
      <div>
        <h3 className="text-sm font-semibold mb-3">
          Subscription Card Skeleton
        </h3>
        <div className="bg-card border border-border p-6 rounded-[32px] max-w-sm">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-full mb-6" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
