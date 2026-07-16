import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  ChevronRight,
  ChevronLeft,
  PencilLine,
  CheckCircle2,
  Hotel,
  Activity,
  Wallet,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { TripDraft, PlanningStep } from "@/lib/types/trip_planning";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PlanningFormCardProps {
  step: PlanningStep;
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
  onNext: () => void;
  onBack: () => void;
  setStep: (step: PlanningStep) => void;
}

const steps: { key: PlanningStep; label: string; icon: any }[] = [
  { key: "destinations", label: "Où ?", icon: MapPin },
  { key: "activities", label: "Activités", icon: Activity },
  { key: "accommodations", label: "Logement", icon: Hotel },
  { key: "budget", label: "Budget", icon: Wallet },
  { key: "preview", label: "Résumé", icon: Sparkles },
];

export default function PlanningFormCard({
  step,
  draft,
  updateDraft,
  onNext,
  onBack,
  setStep,
}: PlanningFormCardProps) {
  
  const currentStepIdx = steps.findIndex((s) => s.key === step);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl"
    >
      {/* ── HEADER : TITLE & EDIT ────────────────────────────────────────── */}
      <div className="px-8 py-6 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
              <Compass className="w-6 h-6 animate-pulse" />
           </div>
           <div>
              <div className="flex items-center gap-2 group cursor-pointer">
                 <h2 className="text-xl font-black uppercase tracking-tight text-foreground">
                    {draft.title}
                 </h2>
                 <PencilLine className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                 {draft.travelers} Voyageurs • {draft.travelStyle}
              </p>
           </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest">
           Projet en cours
        </Badge>
      </div>

      {/* ── STEPPER : NAVIGATION ─────────────────────────────────────────── */}
      <div className="px-8 py-4 border-b border-border overflow-x-auto scrollbar-hide bg-muted/10">
        <div className="flex items-center gap-2 min-w-[500px] justify-between">
          {steps.map((s, idx) => {
            const isActive = s.key === step;
            const isCompleted = currentStepIdx > idx;

            return (
              <React.Fragment key={s.key}>
                <button
                  onClick={() => setStep(s.key)}
                  className={cn(
                    "flex flex-col items-center gap-2 px-4 py-2 rounded-xl transition-all relative group",
                    isActive ? "bg-white shadow-sm ring-1 ring-border" : "hover:bg-muted/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : isCompleted
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <s.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[9px] font-black uppercase tracking-widest transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="step-indicator"
                      className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-border rotate-45 z-10"
                    />
                  )}
                </button>
                {idx < steps.length - 1 && (
                  <div className="h-px bg-border flex-1 mx-2 opacity-50" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── FORM CONTENT ─────────────────────────────────────────────────── */}
      <div className="p-8 md:p-10 min-h-[450px] relative">
        <AnimatePresence mode="wait">
          {step === "destinations" && (
            <motion.div
              key="destinations"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Destination */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> Destination souhaitée
                   </label>
                   <Input 
                      placeholder="Ex: Kpalimé, Plateau de Dayes..."
                      className="h-14 rounded-xl border-border bg-muted/20 focus:bg-white transition-all text-sm font-bold shadow-inner"
                   />
                </div>

                {/* Dates */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> Période envisagée
                   </label>
                   <button className="w-full h-14 rounded-xl border border-border bg-muted/20 hover:bg-white transition-all px-4 flex items-center justify-between shadow-inner text-sm font-bold">
                      <span className="text-muted-foreground">Sélectionner les dates</span>
                      <Calendar className="w-4 h-4 text-primary opacity-60" />
                   </button>
                </div>

                {/* Travelers */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                      <Users className="w-3.5 h-3.5 text-primary" /> Nombre de Voyageurs
                   </label>
                   <Select 
                    defaultValue="2" 
                    onValueChange={(val) => updateDraft({ travelers: parseInt(val) })}
                   >
                     <SelectTrigger className="h-14 rounded-xl border-border bg-muted/20 focus:bg-white transition-all text-sm font-bold shadow-inner">
                        <SelectValue placeholder="Combien êtes-vous ?" />
                     </SelectTrigger>
                     <SelectContent className="rounded-xl border-border bg-card">
                        <SelectItem value="1" className="font-bold text-xs uppercase tracking-widest py-3">Solo (1)</SelectItem>
                        <SelectItem value="2" className="font-bold text-xs uppercase tracking-widest py-3">Couple (2)</SelectItem>
                        <SelectItem value="3" className="font-bold text-xs uppercase tracking-widest py-3">Petit groupe (3)</SelectItem>
                        <SelectItem value="4" className="font-bold text-xs uppercase tracking-widest py-3">Famille / Amis (4+)</SelectItem>
                     </SelectContent>
                   </Select>
                </div>

                {/* Style */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                      <Compass className="w-3.5 h-3.5 text-primary" /> Style de l'aventure
                   </label>
                   <Select 
                    defaultValue="nature"
                    onValueChange={(val) => updateDraft({ travelStyle: val })}
                   >
                     <SelectTrigger className="h-14 rounded-xl border-border bg-muted/20 focus:bg-white transition-all text-sm font-bold shadow-inner">
                        <SelectValue placeholder="Quelle ambiance ?" />
                     </SelectTrigger>
                     <SelectContent className="rounded-xl border-border bg-card">
                        <SelectItem value="nature" className="font-bold text-xs uppercase tracking-widest py-3">Aventure & Nature</SelectItem>
                        <SelectItem value="luxury" className="font-bold text-xs uppercase tracking-widest py-3">Détente & Luxe</SelectItem>
                        <SelectItem value="culture" className="font-bold text-xs uppercase tracking-widest py-3">Culture & Histoire</SelectItem>
                        <SelectItem value="food" className="font-bold text-xs uppercase tracking-widest py-3">Gastronomie</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-start gap-4 animate-in zoom-in duration-500 delay-200">
                 <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                 </div>
                 <p className="text-xs text-muted-foreground leading-relaxed italic">
                    <span className="font-black text-primary uppercase mr-2 tracking-widest">Conseil IA :</span>
                    En choisissant "Aventure & Nature" au Togo, je vous suggère d'inclure les cascades de Kpalimé et le Parc National de Fazao-Malfakassa.
                 </p>
              </div>
            </motion.div>
          )}

          {/* Placeholder for steps not yet redesigned (placeholder style improved) */}
          {step !== "destinations" && (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center h-full py-12 text-center"
            >
              <div className="relative mb-8">
                 <div className="w-24 h-24 rounded-[30%] bg-primary/10 flex items-center justify-center text-primary animate-pulse">
                    <Compass className="w-12 h-12" />
                 </div>
                 <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                 </div>
              </div>
              
              <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground mb-3">
                L'IA analyse vos <span className="text-primary italic">{step}</span>
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm font-medium leading-relaxed mb-10">
                Nous sommes en train de peaufiner cette étape pour vous offrir la meilleure expérience de planification possible.
              </p>

              <div className="flex items-center gap-4 w-full max-w-xs">
                 <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                       className="h-full bg-primary"
                       animate={{ x: ["-100%", "100%"] }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── FOOTER : ACTIONS ─────────────────────────────────────────────── */}
      <div className="px-8 py-6 border-t border-border bg-muted/10 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentStepIdx === 0}
          className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest hover:bg-muted disabled:opacity-20"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour
        </Button>

        <Button
          onClick={onNext}
          className="h-12 px-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {step === "preview" ? "Enregistrer" : "Étape Suivante"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function Badge({ children, className, variant }: any) {
   return (
      <div className={cn("px-2 py-1 rounded text-[10px] font-bold", className)}>
         {children}
      </div>
   )
}
