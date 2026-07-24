import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FavoriteCardSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-md flex-shrink-0" />
      <div className="flex-1 space-y-2 min-w-0">
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-1/2 h-3 rounded" />
      </div>
      <Skeleton className="w-12 h-4 rounded" />
    </div>
  );
}
