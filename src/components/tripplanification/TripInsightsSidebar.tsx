import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, TrendingUp, ArrowUpRight } from "lucide-react";
import { TripDraft } from "@/lib/types/trip_planning";

interface TripInsightsSidebarProps {
  draft: TripDraft;
}

const BUDGET_BREAKDOWN = {
  transport: { label: "Vols & Transport", amount: 450, ratio: 0.36 },
  accommodation: { label: "Hébergement", amount: 600, ratio: 0.48 },
  activities: { label: "Activités", amount: 200, ratio: 0.16 },
};

const TOTAL_BUDGET = 1250;

function BudgetBar({ ratio, delay }: { ratio: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="w-full h-1 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500 rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? ratio : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

export default function TripInsightsSidebar({ draft }: TripInsightsSidebarProps) {
  return (
    <div className="space-y-6">
      {/* ── Card "Le saviez-vous ?" ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        whileHover={{ y: -4 }}
        style={{ willChange: "transform" }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
      >
        {/* Image hero lazy */}
        <div className="relative h-44 overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=600&auto=format&fit=crop"
            alt="Paysage togolais"
            loading="lazy"
            width={280}
            height={176}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-white/10">
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="text-white text-xs font-semibold uppercase tracking-tight">
              Le saviez-vous ?
            </p>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-5">
          <p className="text-muted-foreground text-xs leading-relaxed mb-5 font-medium">
            La période idéale pour explorer les plateaux du Togo s'étend de
            novembre à mars. Les températures y sont douces et la visibilité
            parfaite.
          </p>
          <button
            className="w-full h-10 rounded-xl bg-muted/30 border border-border text-foreground text-[10px] font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
            aria-label="En savoir plus sur la meilleure période pour voyager au Togo"
          >
            En savoir plus
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* ── Card Estimation Budget ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        whileHover={{ y: -4 }}
        style={{ willChange: "transform" }}
        className="bg-card border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden"
      >
        {/* Blob décoratif emerald */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-sm">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="text-foreground font-semibold text-sm uppercase tracking-tight">
            Estimation{" "}
            <span className="text-emerald-600">Budget</span>
          </h4>
        </div>

        {/* Montant */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-muted-foreground text-lg font-light">~</span>
            <span className="text-3xl font-heading font-semibold text-foreground tracking-tight">
              {TOTAL_BUDGET.toLocaleString("fr-FR")} €
            </span>
          </div>
          <p className="text-muted-foreground text-[10px] mt-1 uppercase tracking-widest font-semibold opacity-60">
            Estimation par personne
          </p>
        </div>

        {/* Barres de ventilation */}
        <div className="space-y-3.5 mb-6">
          {Object.values(BUDGET_BREAKDOWN).map((item, idx) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground">
                  {item.amount.toLocaleString("fr-FR")} €
                </span>
              </div>
              <BudgetBar ratio={item.ratio} delay={0.3 + idx * 0.1} />
            </div>
          ))}
        </div>

        <button
          className="w-full h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-200"
          aria-label="Voir le détail du calcul budgétaire"
        >
          Détail du calcul
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
}
