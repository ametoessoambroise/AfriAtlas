import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WidgetSkeleton({ height = "340px" }: { height?: string }) {
  return (
    <div 
      className="bg-card border border-border p-6 rounded-md shadow-sm flex flex-col gap-6"
      style={{ height }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="w-32 h-5 rounded" />
          <Skeleton className="w-24 h-3 rounded" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
      
      <div className="flex-1 flex items-end gap-3 mb-2">
        <Skeleton className="flex-1 h-[40%] rounded-md" />
        <Skeleton className="flex-1 h-[70%] rounded-md" />
        <Skeleton className="flex-1 h-[85%] rounded-md" />
        <Skeleton className="flex-1 h-[55%] rounded-md" />
        <Skeleton className="flex-1 h-[45%] rounded-md" />
        <Skeleton className="flex-1 h-[35%] rounded-md" />
      </div>

      <Skeleton className="w-full h-12 rounded-md" />
    </div>
  );
}
