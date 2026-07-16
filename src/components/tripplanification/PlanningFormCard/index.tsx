import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TripDraft, PlanningStep } from "@/lib/types/trip_planning";
import { StepperNav } from "./StepperNav";
import { FormFooter } from "./FormFooter";
import { StepDestinations } from "./steps/StepDestinations";
import { StepTravelers } from "./steps/StepTravelers";
import { StepDates } from "./steps/StepDates";
import { StepPreferences } from "./steps/StepPreferences";
import { StepBudget } from "./steps/StepBudget";
import { StepActivities } from "./steps/StepActivities";
import { StepRecap } from "./steps/StepRecap";

interface PlanningFormCardProps {
  step: PlanningStep;
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
  onNext: () => void;
  onBack: () => void;
  setStep: (step: PlanningStep) => void;
}

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/60"
    >
      {/* Stepper */}
      <StepperNav currentStep={step} onStepClick={setStep} />

      {/* Form content */}
      <div className="p-6 sm:p-8 lg:p-10 min-h-[480px]">
        <AnimatePresence mode="wait">
          {step === "destinations" && (
            <StepDestinations
              key="destinations"
              draft={draft}
              updateDraft={updateDraft}
            />
          )}
          {step === "travelers" && (
            <StepTravelers
              key="travelers"
              draft={draft}
              updateDraft={updateDraft}
            />
          )}
          {step === "dates" && (
            <StepDates key="dates" draft={draft} updateDraft={updateDraft} />
          )}
          {step === "preferences" && (
            <StepPreferences
              key="preferences"
              draft={draft}
              updateDraft={updateDraft}
            />
          )}
          {step === "budget" && (
            <StepBudget key="budget" draft={draft} updateDraft={updateDraft} />
          )}
          {step === "activities" && (
            <StepActivities
              key="activities"
              draft={draft}
              updateDraft={updateDraft}
            />
          )}
          {step === "recap" && <StepRecap key="recap" draft={draft} />}
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <FormFooter step={step} onNext={onNext} onBack={onBack} />
    </motion.div>
  );
}
