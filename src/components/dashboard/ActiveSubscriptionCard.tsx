// src/components/dashboard/ActiveSubscriptionCard.tsx
import { UserResponse } from "@/lib/types/user";
import { Zap, ShieldCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ActiveSubscriptionCard({ user }: { user: UserResponse }) {
  const isPremium = user.subscription_status === "premium";

  return (
    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333] p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
           {isPremium ? <ShieldCheck className="w-5 h-5 text-primary" /> : <Zap className="w-5 h-5 text-yellow-400" />}
           <span className="text-xs font-black uppercase tracking-widest">Plan Actuel</span>
        </div>
        
        <h3 className="text-2xl font-black mb-1">
          {isPremium ? "Atlas Premium" : "Atlas Free"}
        </h3>
        <p className="text-white/60 text-xs mb-6">
          {isPremium 
            ? "Accès illimité à toutes les expériences et réductions exclusives." 
            : "Profitez des fonctionnalités de base. Passez à Premium pour plus d'avantages."}
        </p>

        <Link 
          to="/subscription" 
          className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-2xl border border-white/10 text-sm font-bold"
        >
          {isPremium ? "Gérer mon abonnement" : "Découvrir Premium"}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
    </div>
  );
}
