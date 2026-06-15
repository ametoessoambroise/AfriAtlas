import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Info, TrendingUp, ArrowUpRight } from "lucide-react";
import { TripDraft } from "@/lib/types/trip_planning";

interface TripInsightsSidebarProps {
  draft: TripDraft;
}

export default function TripInsightsSidebar({
  draft,
}: TripInsightsSidebarProps) {
  return (
    <div className="space-y-8">
      {/* AI Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-background backdrop-blur-2xl border border-border rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000&auto=format&fit=crop"
            alt="Islande Recommendation"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="text-foreground font-bold">Recommandation IA</h4>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-1.5 py-0.5 rounded leading-none">
              IA
            </span>
          </div>
          <p className="text-foreground/50 text-sm leading-relaxed mb-6">
            Le meilleur moment pour visiter l'Islande est entre juin et
            septembre pour profiter des paysages verdoyants et des longues
            journées ensoleillées.
          </p>
          <button className="w-full h-12 rounded-xl bg-background border border-border text-muted-foreground text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-background/80 transition-all">
            Voir plus de conseils
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Budget Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-background backdrop-blur-2xl border border-border rounded-md p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="text-foreground font-bold">Estimation budget</h4>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-muted-foreground text-2xl font-premium">
              ~
            </span>
            <span className="text-4xl font-heading font-black text-foreground tracking-tight">
              2 340 €
            </span>
          </div>
          <p className="text-muted-foreground text-xs mt-2 uppercase tracking-widest font-bold">
            pour 10 jours
          </p>
        </div>

        <p className="text-muted-foreground text-[11px] leading-relaxed mb-8">
          Vols, hébergements, activités, repas et transports inclus.
        </p>

        {/* Small Sparkline Visualization */}
        <div className="h-12 w-full relative mb-8">
          <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
            <path
              d="M0,15 Q25,18 50,10 T100,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            />
            <circle
              cx="100"
              cy="5"
              r="3"
              fill="currentColor"
              className="text-primary animate-pulse"
            />
          </svg>
        </div>

        <button className="w-full h-12 rounded-xl bg-background border border-border text-muted-foreground text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
          Voir le détail
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
