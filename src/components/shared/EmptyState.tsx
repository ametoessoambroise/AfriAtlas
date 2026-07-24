import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center rounded-xl bg-muted/30 border border-border",
        className,
      )}
    >
      <div className="p-4 rounded-full bg-primary/10 mb-4">
        <Icon className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-xs mb-6 text-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="rounded-full px-8"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
