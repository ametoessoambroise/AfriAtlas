import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-2xl shrink-0" />
        <div className="space-y-1.5">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-16 h-3 rounded" />
        </div>
      </div>
      <div className="text-right space-y-1.5">
        <Skeleton className="w-20 h-4 rounded ml-auto" />
        <Skeleton className="w-12 h-3 rounded ml-auto" />
      </div>
    </div>
  );
}
