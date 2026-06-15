export type PlanningStep =
  | "destinations"
  | "activities"
  | "accommodations"
  | "budget"
  | "preview";

export interface TripDraft {
  id?: string;
  title: string;
  destinations: string[];
  startDate?: Date;
  endDate?: Date;
  travelers: number;
  travelStyle: string;
  budgetRange?: [number, number];
  activities?: string[];
  accommodations?: string[];
  itinerary?: ItineraryDay[];
  status: "draft" | "finalized";
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  description: string;
  location?: string;
}

export interface PlanningAIRecommendation {
  id: string;
  title: string;
  content: string;
  image?: string;
  type: "timing" | "activity" | "accommodation";
}

export interface BudgetEstimation {
  total: number;
  currency: string;
  breakdown: {
    flights: number;
    accommodation: number;
    activities: number;
    food: number;
    transport: number;
  };
  durationDays: number;
}
