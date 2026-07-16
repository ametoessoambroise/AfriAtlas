import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatCardSkeleton() {
  return (
    <div className="bg-card border border-border p-6 rounded-md shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-16 h-4 rounded" />
        <Skeleton className="w-9 h-9 rounded-full" />
      </div>
      <Skeleton className="w-24 h-10 mb-3 rounded-lg" />
      <div className="flex items-center gap-2">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-20 h-3 rounded" />
      </div>
    </div>
  );
}
