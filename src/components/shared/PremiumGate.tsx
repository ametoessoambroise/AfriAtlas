import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Crown, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PremiumGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

/**
 * Composant pour verrouiller des fonctionnalités réservées aux membres Premium/PRO.
 */
export function PremiumGate({
  children,
  fallback,
  className,
  showIcon = true,
}: PremiumGateProps) {
  const { user } = useAuth();

  // Vérification du statut : premium, famille ou pro ont accès.
  const isPremium =
    user?.subscription_status === "premium" ||
    user?.subscription_status === "famille" ||
    user?.subscription_status === "pro";

  const isAdmin = user?.role === "admin";

  if (isPremium || isAdmin) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/5 p-8 text-center flex flex-col items-center justify-center min-h-[300px]",
        className,
      )}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-sm">
        <div className="inline-flex p-4 rounded-full bg-primary/20 border border-primary/20 animate-pulse">
          {showIcon && (
            <Crown className="h-8 w-8 text-primary shadow-[0_0_15px_rgba(240,185,11,0.5)]" />
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white tracking-tight">
            Expérience Premium
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Cette fonctionnalité est réservée aux membres{" "}
            <span className="text-white font-bold">Atlas PRO</span>. Rejoignez
            le club pour accéder aux itinéraires exclusifs et aux visites VR
            illimitées.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/pricing">
            <Button className="w-full bg-primary hover:bg-primary/90 text-zinc-950 font-black py-6 rounded-xl shadow-lg shadow-primary/20 group">
              Passer à PRO
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/20">
            <Lock className="h-3 w-3" />
            SSL Encrypted Payment
          </div>
        </div>

        {/* Benefits list (mini) */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          {[
            "Visites VR HD",
            "Accès Offline",
            "Guides Privés",
            "Support 24/7",
          ].map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-2 text-[9px] text-white/30 uppercase font-bold"
            >
              <div className="w-1 h-1 rounded-full bg-primary" />
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
