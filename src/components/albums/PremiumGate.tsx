import React from "react";
import { Lock, Crown, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PremiumGateProps {
  children: React.ReactNode;
  className?: string;
  fallbackClassName?: string;
}

export function PremiumGate({ 
  children, 
  className,
  fallbackClassName 
}: PremiumGateProps) {
  const { user } = useAuth();
  
  // Logic: Only "premium" or "family" statuses are allowed.
  // We assume subscription_status exists and "free" is the baseline.
  const isPremium = user?.subscription_status === "premium" || user?.subscription_status === "family";

  if (isPremium) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border border-border bg-muted/30 p-8 text-center",
      fallbackClassName
    )}>
      {/* Blurred background effect for content */}
      <div className="absolute inset-0 opacity-10 blur-xl grayscale pointer-events-none select-none">
        {children}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
          <Crown className="h-6 w-6" />
        </div>
        
        <div className="space-y-2 max-w-sm mx-auto">
          <h3 className="text-xl font-bold tracking-tight">Fonctionnalité Premium</h3>
          <p className="text-sm text-muted-foreground">
            Les récits IA et la génération automatique de descriptions sont réservés aux membres Atlas Premium.
          </p>
        </div>

        <Button variant="default" className="mt-4 gap-2 rounded-xl group px-6">
          Passer à Premium
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
