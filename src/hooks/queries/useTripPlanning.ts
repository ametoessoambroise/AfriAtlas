import { useState, useCallback } from "react";
import { TripDraft, PlanningStep } from "@/lib/types/trip_planning";

export function useTripPlanning() {
  const [step, setStep] = useState<PlanningStep>("destinations");
  const [draft, setDraft] = useState<TripDraft>({
    title: "Mon nouveau voyage",
    destinations: [],
    travelers: 2,
    travelStyle: "Aventure & Nature",
    status: "draft",
  });

  const updateDraft = useCallback((updates: Partial<TripDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const goToNextStep = useCallback(() => {
    const steps: PlanningStep[] = ["destinations", "activities", "accommodations", "budget", "preview"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [step]);

  const goToPreviousStep = useCallback(() => {
    const steps: PlanningStep[] = ["destinations", "activities", "accommodations", "budget", "preview"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [step]);

  return {
    step,
    setStep,
    draft,
    updateDraft,
    goToNextStep,
    goToPreviousStep,
  };
}
