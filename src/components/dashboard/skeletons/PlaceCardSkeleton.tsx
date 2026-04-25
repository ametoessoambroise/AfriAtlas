import { Skeleton } from "@/components/ui/skeleton";

export default function PlaceCardSkeleton() {
  return (
    <div className="aspect-square rounded-2xl overflow-hidden bg-surface-alt">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
