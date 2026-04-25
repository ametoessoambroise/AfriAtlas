import React, { memo } from "react";
import { Crown, Sparkles } from "lucide-react";

interface SubscriptionGaugeProps {
  status?: string | null;
}

export const SubscriptionGauge = memo(({ status }: SubscriptionGaugeProps) => {
  const isPremium = status === "premium" || status === "active";
  const percentage = isPremium ? 100 : 25;
  const planName = isPremium ? "Premium" : "Gratuit";

  // SVG Gauge calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-card rounded-[32px] p-6 border border-border flex flex-col items-center justify-center h-full shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <p className="font-black text-foreground">Statut Plan</p>
        {isPremium && <Crown className="w-4 h-4 text-secondary" />}
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center mt-4">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90 transform">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-muted"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset,
              transition: "stroke-dashoffset 1.5s ease-in-out",
            }}
            strokeLinecap="round"
            className={isPremium ? "text-secondary" : "text-primary"}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-3xl font-black text-foreground font-premium">
            {percentage}%
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            {planName}
          </p>
        </div>
      </div>

      <div className="w-full mt-6 space-y-2 relative z-10">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-muted-foreground">Avantages débloqués</span>
          <span className="text-foreground">{isPremium ? "Tous" : "1/4"}</span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${isPremium ? "bg-secondary" : "bg-primary"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {!isPremium && (
          <button className="w-full mt-2 py-2.5 rounded-xl bg-secondary/10 text-secondary text-[11px] font-black uppercase tracking-widest hover:bg-secondary/20 transition-all flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3" />
            Passer au Premium
          </button>
        )}
      </div>
    </div>
  );
});
