import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import StatCardSkeleton from "./StatCardSkeleton";
import WidgetSkeleton from "./WidgetSkeleton";
import FavoriteCardSkeleton from "./FavoriteCardSkeleton";
import { DashboardLayout } from "../DashboardLayout";

export default function DashboardSkeleton() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 space-y-10">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <Skeleton className="w-48 h-10 rounded-lg" />
          <Skeleton className="w-64 h-5 rounded" />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Row 2: Grid (Analytics, Booking, Favorites) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-[340px]">
            <WidgetSkeleton height="100%" />
          </div>
          <div className="lg:col-span-4 h-[340px]">
            <WidgetSkeleton height="100%" />
          </div>
          <div className="lg:col-span-3 h-[340px] bg-card rounded-[32px] p-6 border border-border space-y-6">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="w-32 h-5 rounded" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <FavoriteCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Row 3: Grid (Top Places, Gauge, Quick Actions) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-card rounded-[32px] p-6 border border-border space-y-5">
             <div className="flex justify-between items-center mb-2">
              <Skeleton className="w-40 h-5 rounded" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="w-3/4 h-3 rounded" />
                  <Skeleton className="w-1/2 h-2 rounded" />
                </div>
                <Skeleton className="w-16 h-6 rounded-lg" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 h-full min-h-[340px]">
             <WidgetSkeleton height="100%" />
          </div>
          <div className="lg:col-span-3 h-full min-h-[340px]">
             <WidgetSkeleton height="100%" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
