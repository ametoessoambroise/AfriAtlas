import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  ChevronRight,
  PencilLine,
  CheckCircle2,
} from "lucide-react";
import { TripDraft, PlanningStep } from "@/lib/types/trip_planning";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlanningFormCardProps {
  step: PlanningStep;
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
  onNext: () => void;
  onBack: () => void;
  setStep: (step: PlanningStep) => void;
}

const steps: { key: PlanningStep; label: string }[] = [
  { key: "destinations", label: "Destinations" },
  { key: "activities", label: "Activités" },
  { key: "accommodations", label: "Hébergements" },
  { key: "budget", label: "Budget" },
  { key: "preview", label: "Aperçu" },
];

export default function PlanningFormCard({
  step,
  draft,
  updateDraft,
  onNext,
  onBack,
  setStep,
}: PlanningFormCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background backdrop-blur-3xl border border-border rounded-md overflow-hidden shadow-sm"
    >
      {/* Top Meta Bar */}
      <div className="px-10 py-8 border-b border-border flex items-center justify-between">
        <div>
          <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">
            Mon voyage
          </p>
          <div className="flex items-center gap-3">
            <h2 className="text-foreground text-3xl font-black">
              {draft.title}
            </h2>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <PencilLine className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground text-sm mt-1 font-medium">
            10 jours • {draft.travelers} voyageurs • Avril 2026
          </p>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-background border border-border text-muted-foreground text-xs font-bold uppercase tracking-widest">
          Brouillon
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="px-10 py-6 border-b border-border overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[500px]">
          {steps.map((s, idx) => {
            const isActive = s.key === step;
            const isCompleted = steps.findIndex((st) => st.key === step) > idx;

            return (
              <React.Fragment key={s.key}>
                <button
                  onClick={() => setStep(s.key)}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      isActive
                        ? "bg-primary text-foreground scale-110 shadow-lg shadow-primary/30"
                        : isCompleted
                          ? "bg-primary/20 text-primary"
                          : "bg-background text-muted-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-px bg-background mx-4" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Form Content */}
      <div className="p-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === "destinations" && (
            <motion.div
              key="destinations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Destination Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-muted-foreground text-sm font-bold ml-1">
                    <MapPin className="w-4 h-4 text-primary" /> Où veux-tu aller
                    ?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ex : Islande, Japon, Bali..."
                      className="w-full h-16 bg-white/5 border border-border rounded-md px-6 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Dates Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-muted-foreground text-sm font-bold ml-1">
                    <Calendar className="w-4 h-4 text-primary" /> Dates du
                    voyage
                  </label>
                  <div className="relative group">
                    <div className="w-full h-16 bg-white/5 border border-border rounded-md px-6 flex items-center justify-between text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <span>Sélectionner les dates</span>
                      <Calendar className="w-5 h-5 text-white/20" />
                    </div>
                  </div>
                </div>

                {/* Travelers Select */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-muted-foreground text-sm font-bold ml-1">
                    <Users className="w-4 h-4 text-primary" /> Voyageurs
                  </label>
                  <select className="w-full h-16 bg-white/5 border border-border rounded-md px-6 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                    <option className="bg-card">1 voyageur</option>
                    <option className="bg-card" selected>
                      2 voyageurs
                    </option>
                    <option className="bg-card">3 voyageurs</option>
                    <option className="bg-card">4+ voyageurs</option>
                  </select>
                </div>

                {/* Style Select */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-muted-foreground text-sm font-bold ml-1">
                    <Compass className="w-4 h-4 text-primary" /> Style de voyage
                  </label>
                  <select className="w-full h-16 bg-white/5 border border-border rounded-md px-6 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                    <option className="bg-card">Détente & Luxe</option>
                    <option className="bg-card" selected>
                      Aventure & Nature
                    </option>
                    <option className="bg-card">Culture & Histoire</option>
                    <option className="bg-card">Gastronomie</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8">
                <button className="text-muted-foreground text-sm font-bold hover:text-foreground transition-colors flex items-center gap-2">
                  Options avancées
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
                <Button
                  onClick={onNext}
                  className="h-14 px-10 rounded-md bg-primary hover:bg-primary/90 text-foreground font-bold flex items-center gap-3 shadow-xl shadow-primary/20"
                >
                  Continuer
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Placeholder for other steps */}
          {step !== "destinations" && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center justify-center h-full py-10"
            >
              <div className="w-20 h-20 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-6 animate-pulse">
                <Compass className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 uppercase tracking-widest">
                {step}
              </h3>
              <p className="text-muted-foreground/40 max-w-sm text-center">
                Cette étape sera disponible prochainement dans cette démo de
                planification IA.
              </p>

              <div className="flex gap-4 mt-12">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Retour
                </Button>
                <Button
                  onClick={onNext}
                  className="bg-primary text-white px-8 h-12 rounded-xl"
                >
                  Continuer
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
