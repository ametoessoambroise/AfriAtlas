import React from "react";
import { Crown, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PremiumGateProps {
  children: React.ReactNode;
  className?: string;
  fallbackClassName?: string;
}

export function PremiumGate({
  children,
  className,
  fallbackClassName,
}: PremiumGateProps) {
  const { user } = useAuth();

  const isPremium =
    user?.subscription_status === "premium" ||
    user?.subscription_status === "family";

  if (isPremium) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("", fallbackClassName)}>
      {/* Contenu flouté en arrière-plan */}
      <div
        className="pointer-events-none select-none blur-sm opacity-30 grayscale"
        aria-hidden="true"
      >
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
      </div>
    </div>
  );
}
