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

      {/* Overlay */}
      <div className="flex items-center justify-center">
        {/* Card principale */}
        <div className="flex flex-col items-center text-center gap-5 max-w-sm mx-auto px-8 py-8 rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-md shadow-xl shadow-primary/5">
          {/* Icône */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full bg-secondary/30 blur-md" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 border border-secondary/40">
              <Crown className="h-5 w-5 text-secondary" strokeWidth={1.75} />
            </div>
          </div>

          {/* Texte */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Sparkles className="h-3 w-3 text-secondary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                Atlas Premium
              </span>
              <Sparkles className="h-3 w-3 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground leading-snug">
              Fonctionnalité réservée aux membres Premium
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Les récits IA et la génération automatique de descriptions sont
              réservés aux abonnés Atlas Premium.
            </p>
          </div>

          {/* CTA */}
          <Link to="/pricing">
            <Button
              variant="default"
              className="group w-full rounded-xl gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Passer à Premium
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>

          {/* Note rassurante */}
          <p className="text-[11px] text-muted-foreground">
            Sans engagement · Annulable à tout moment
          </p>
        </div>
      </div>
    </div>
  );
}
