import { useAuth } from "@/hooks/useAuth";
import { UserResponse } from "@/lib/types/user";
import { Badge } from "@/components/ui/badge";
import { Crown, Star } from "lucide-react";

interface WelcomeBannerProps {
  user: UserResponse;
}

export default function WelcomeBanner({ user }: WelcomeBannerProps) {
  const isPremium = user.subscription_status === "premium";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 rounded-[40px] shadow-2xl backdrop-blur-xl">
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-surface-alt">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.fullname} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-black text-primary/30">
                {user.fullname.charAt(0)}
              </div>
            )}
          </div>
          {isPremium && (
             <div className="absolute -top-2 -right-2 bg-yellow-400 p-1.5 rounded-full shadow-lg border-2 border-white">
                <Crown className="w-4 h-4 text-white" />
             </div>
          )}
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Bonjour, <span className="text-primary">{user.fullname.split(" ")[0]}</span> !
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
             <Badge variant={isPremium ? "default" : "secondary"} className="rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest">
                {isPremium ? "Membre Premium" : "Membre Standard"}
             </Badge>
             <span className="text-muted-foreground text-sm font-medium">
               Voyageur à {user.country || "Togo"}
             </span>
             <div className="flex items-center gap-1 text-sm font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
               <Star className="w-3.5 h-3.5 fill-current" />
               Explorer Atlas
             </div>
          </div>
        </div>
      </div>

      {/* Shapes de décorations glassmorphism */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </div>
  );
}
