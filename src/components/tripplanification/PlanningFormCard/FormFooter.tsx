import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight, Check } from "lucide-react";
import { PlanningStep } from "@/lib/types/trip_planning";
import { STEPS } from "./StepperNav";
import { cn } from "@/lib/utils";

interface FormFooterProps {
  step: PlanningStep;
  onNext: () => void;
  onBack: () => void;
}

export function FormFooter({ step, onNext, onBack }: FormFooterProps) {
  const currentStepIdx = STEPS.findIndex((s) => s.key === step);
  const isFirstStep = currentStepIdx === 0;
  const isLastStep = step === "recap";

  return (
    <div className="px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
      {/* Back button */}
      <button
        onClick={onBack}
        disabled={isFirstStep}
        aria-label="Étape précédente"
        className={cn(
          "flex items-center gap-2 h-11 px-5 rounded-xl border text-sm font-semibold transition-all",
          isFirstStep
            ? "border-slate-100 text-slate-300 cursor-not-allowed bg-white"
            : "border-slate-200 text-slate-600 bg-white hover:border-slate-300 hover:text-slate-800 active:scale-95",
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Retour</span>
      </button>

      {/* Step dots — mobile */}
      <div className="flex items-center gap-1.5 sm:hidden">
        {STEPS.map((s, idx) => (
          <div
            key={s.key}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === currentStepIdx
                ? "w-6 bg-blue-600"
                : idx < currentStepIdx
                  ? "w-4 bg-blue-300"
                  : "w-2 bg-slate-200",
            )}
          />
        ))}
      </div>

      {/* Step counter — desktop */}
      <p className="hidden sm:block text-xs text-slate-400 font-medium tabular-nums">
        Étape <strong className="text-slate-600">{currentStepIdx + 1}</strong> /{" "}
        {STEPS.length}
      </p>

      {/* Next / Save button */}
      <motion.button
        onClick={onNext}
        whileTap={{ scale: 0.97 }}
        aria-label={isLastStep ? "Enregistrer le voyage" : "Étape suivante"}
        className={cn(
          "flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-bold transition-all shadow-md",
          isLastStep
            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20",
        )}
      >
        {isLastStep ? (
          <>
            <Check className="w-4 h-4" />
            Enregistrer
          </>
        ) : (
          <>
            Suivant
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </div>
  );
}
