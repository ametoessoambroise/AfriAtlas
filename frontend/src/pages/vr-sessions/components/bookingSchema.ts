import * as z from "zod";
import { Users } from "lucide-react";

export const bookingSchema = z.object({
  booking_date: z.date(),
  time_slot: z.string().min(1, "Veuillez sélectionner un créneau horaire."),
  immersion_location_id: z.string().min(1, "Veuillez choisir un lieu."),
  participation_type: z.enum(["solo", "couple", "family", "friends"]),
  num_participants: z.number().min(1).max(10),
  age_range: z.string().min(1, "Veuillez sélectionner une tranche d'âge."),
  nationality: z.string().min(1, "Veuillez sélectionner votre pays."),
  language: z.string().min(1, "Veuillez sélectionner une langue."),
  experience_level: z.enum(["beginner", "intermediate", "expert"]),
  health_preferences: z.object({
    motion_sickness: z.boolean().default(false),
    glasses: z.boolean().default(false),
    loud_noise_sensitive: z.boolean().default(false),
    other: z.boolean().default(false),
  }),
  subscription_plan_id: z.string().min(1, "Veuillez choisir un tarif."),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const PARTICIPATION_TYPES = [
  { id: "solo", label: "Solo", icon: Users },
  { id: "couple", label: "En couple", icon: Users },
  { id: "family", label: "En famille", icon: Users },
  { id: "friends", label: "Avec amis", icon: Users },
];
