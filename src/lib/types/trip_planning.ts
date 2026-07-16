export type PlanningStep =
  | "destinations"
  | "travelers"
  | "dates"
  | "preferences"
  | "budget"
  | "activities"
  | "recap";

// Keep backward compat for any remaining refs
export type LegacyPlanningStep =
  | "destinations"
  | "activities"
  | "accommodations"
  | "budget"
  | "preview";

export type TravelType = "couple" | "famille" | "amis" | "solo";
export type StayType = "decouverte" | "detente" | "aventure" | "culture";
export type TravelRhythm = "lent" | "equilibre" | "intense";
export type HousingStyle = "economique" | "confort" | "premium" | "luxe";
export type TransportMode = "mixte" | "voiture" | "transports" | "avion";

export interface TripDraft {
  id?: string;
  title: string;
  // Destinations step
  mainDestination: string;
  regionsCities: string[];
  stayType: StayType;
  // Travelers step
  adults: number;
  children: number;
  babies: number;
  travelType: TravelType;
  // Dates step
  startDate?: Date;
  endDate?: Date;
  // Preferences step
  travelStyle: string;
  housingStyle: HousingStyle;
  rhythm: TravelRhythm;
  interests: string[];
  transport: TransportMode;
  specialRequests?: string;
  // Budget step
  totalBudget: number;
  currency: string;
  budgetBreakdown: {
    transport: number;
    lodging: number;
    activities: number;
    food: number;
    other: number;
  };
  // Activities step
  selectedActivities: string[];
  // Legacy compat
  destinations: string[];
  travelers: number;
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
