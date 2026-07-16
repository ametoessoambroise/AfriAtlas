import { useState, useCallback } from "react";
import { TripDraft, PlanningStep } from "@/lib/types/trip_planning";

const PLANNING_STEPS: PlanningStep[] = [
  "destinations",
  "travelers",
  "dates",
  "preferences",
  "budget",
  "activities",
  "recap",
];

const DEFAULT_DRAFT: TripDraft = {
  title: "Mon nouveau voyage",
  // Destinations
  mainDestination: "",
  regionsCities: [],
  stayType: "decouverte",
  // Travelers
  adults: 2,
  children: 1,
  babies: 0,
  travelType: "couple",
  // Dates
  startDate: undefined,
  endDate: undefined,
  // Preferences
  travelStyle: "Authentique & Local",
  housingStyle: "confort",
  rhythm: "equilibre",
  interests: ["Histoire, Cuisine, Art"],
  transport: "mixte",
  specialRequests: "",
  // Budget
  totalBudget: 2800,
  currency: "EUR",
  budgetBreakdown: {
    transport: 30,
    lodging: 30,
    activities: 20,
    food: 15,
    other: 5,
  },
  // Activities
  selectedActivities: [],
  // Legacy
  destinations: [],
  travelers: 2,
  status: "draft",
};

export function useTripPlanning() {
  const [step, setStep] = useState<PlanningStep>("destinations");
  const [draft, setDraft] = useState<TripDraft>(DEFAULT_DRAFT);

  const updateDraft = useCallback((updates: Partial<TripDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const goToNextStep = useCallback(() => {
    const currentIndex = PLANNING_STEPS.indexOf(step);
    if (currentIndex < PLANNING_STEPS.length - 1) {
      setStep(PLANNING_STEPS[currentIndex + 1]);
      // Smooth scroll to top of form
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const goToPreviousStep = useCallback(() => {
    const currentIndex = PLANNING_STEPS.indexOf(step);
    if (currentIndex > 0) {
      setStep(PLANNING_STEPS[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const stepIndex = PLANNING_STEPS.indexOf(step);
  const progressRatio = (stepIndex + 1) / PLANNING_STEPS.length;

  return {
    step,
    setStep,
    draft,
    updateDraft,
    goToNextStep,
    goToPreviousStep,
    stepIndex,
    progressRatio,
    totalSteps: PLANNING_STEPS.length,
    steps: PLANNING_STEPS,
  };
}
