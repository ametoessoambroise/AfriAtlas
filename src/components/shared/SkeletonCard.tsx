import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: "destination" | "product" | "compact";
}

export function SkeletonCard({
  className,
  variant = "destination",
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-md bg-white/[0.03] border border-white/5 overflow-hidden animate-pulse",
        className,
      )}
    >
      {/* Image Area */}
      <div
        className={cn(
          "bg-white/[0.02]",
          variant === "compact" ? "aspect-square" : "aspect-[4/5]",
        )}
      />

      {/* Content Area */}
      <div className="p-5 space-y-4">
        {/* Title & Badge */}
        <div className="flex justify-between items-start gap-4">
          <div className="h-5 bg-white/5 rounded-lg w-2/3" />
          <div className="h-4 bg-white/5 rounded-lg w-12" />
        </div>

        {/* Subtitle/Description */}
        <div className="space-y-2">
          <div className="h-3 bg-white/[0.03] rounded-md w-full" />
          {variant !== "compact" && (
            <div className="h-3 bg-white/[0.03] rounded-md w-4/5" />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-3 w-3 bg-white/[0.02] rounded-full" />
            ))}
          </div>
          <div className="h-6 bg-white/[0.05] rounded-md w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({
  count = 6,
  className,
  variant = "destination",
}: {
  count?: number;
  className?: string;
  variant?: SkeletonCardProps["variant"];
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  );
}
