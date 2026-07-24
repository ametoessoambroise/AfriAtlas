/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Booking status enum for reservation lifecycle.
 */
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

/**
 * Additional VR booking information (Premium UI fields).
 */
export interface VRBookingAdditionalInfo {
  /**
   * Place ID for immersion destination
   */
  immersion_location_id?: string | null;
  /**
   * solo, couple, family, friends
   */
  participation_type?: string | null;
  /**
   * e.g., '26-40'
   */
  age_range?: string | null;
  /**
   * e.g., 'France'
   */
  nationality?: string | null;
  /**
   * e.g., 'Français'
   */
  language?: string | null;
  /**
   * beginner, intermediate, expert
   */
  experience_level?: string | null;
  /**
   * JSON string for health/preferences
   */
  health_preferences?: string | null;
  /**
   * Subscription plan ID for pricing tier
   */
  subscription_plan_id?: string | null;
}
/**
 * Base schema for VR bookings.
 */
export interface VRBookingBase {
  /**
   * Date and time of the booking
   */
  booking_date: string;
  /**
   * Time slot identifier
   */
  time_slot: string;
  /**
   * Number of participants
   */
  num_participants: number;
}
/**
 * Schema for creating a new VR booking.
 */
export interface VRBookingCreate {
  /**
   * Place ID for immersion destination
   */
  immersion_location_id?: string | null;
  /**
   * solo, couple, family, friends
   */
  participation_type?: string | null;
  /**
   * e.g., '26-40'
   */
  age_range?: string | null;
  /**
   * e.g., 'France'
   */
  nationality?: string | null;
  /**
   * e.g., 'Français'
   */
  language?: string | null;
  /**
   * beginner, intermediate, expert
   */
  experience_level?: string | null;
  /**
   * JSON string for health/preferences
   */
  health_preferences?: string | null;
  /**
   * Subscription plan ID for pricing tier
   */
  subscription_plan_id?: string | null;
  /**
   * Date and time of the booking
   */
  booking_date: string;
  /**
   * Time slot identifier
   */
  time_slot: string;
  /**
   * Number of participants
   */
  num_participants: number;
}
/**
 * Schema for VR booking list item.
 */
export interface VRBookingListResponse {
  id: string;
  vr_session_id: string;
  user_id: string;
  booking_date: string;
  time_slot: string;
  num_participants: number;
  total_price: string;
  status: BookingStatus;
  created_at: string;
}
/**
 * Schema for VR booking response.
 */
export interface VRBookingResponse {
  /**
   * Place ID for immersion destination
   */
  immersion_location_id?: string | null;
  /**
   * solo, couple, family, friends
   */
  participation_type?: string | null;
  /**
   * e.g., '26-40'
   */
  age_range?: string | null;
  /**
   * e.g., 'France'
   */
  nationality?: string | null;
  /**
   * e.g., 'Français'
   */
  language?: string | null;
  /**
   * beginner, intermediate, expert
   */
  experience_level?: string | null;
  /**
   * JSON string for health/preferences
   */
  health_preferences?: string | null;
  /**
   * Subscription plan ID for pricing tier
   */
  subscription_plan_id?: string | null;
  /**
   * Date and time of the booking
   */
  booking_date: string;
  /**
   * Time slot identifier
   */
  time_slot: string;
  /**
   * Number of participants
   */
  num_participants: number;
  id: string;
  vr_session_id: string;
  user_id: string;
  total_price: string;
  status: BookingStatus;
  payment_intent_id?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
/**
 * Base schema for VR sessions.
 */
export interface VRSessionBase {
  title: string;
  description?: string | null;
  /**
   * Duration in minutes
   */
  duration_minutes: number;
  price: string;
  currency?: string;
  /**
   * Maximum number of participants
   */
  max_participants: number;
  is_active?: boolean;
}
/**
 * Schema for creating a new VR session.
 */
export interface VRSessionCreate {
  title: string;
  description?: string | null;
  /**
   * Duration in minutes
   */
  duration_minutes: number;
  price: string;
  currency?: string;
  /**
   * Maximum number of participants
   */
  max_participants: number;
  is_active?: boolean;
}
/**
 * Schema for VR session list item.
 */
export interface VRSessionListResponse {
  id: string;
  place_id: string;
  place_slug: string;
  title: string;
  description?: string | null;
  duration_minutes: number;
  price: string;
  currency: string;
  max_participants: number;
  is_active: boolean;
  created_at: string;
}
/**
 * Schema for VR session response.
 */
export interface VRSessionResponse {
  title: string;
  description?: string | null;
  /**
   * Duration in minutes
   */
  duration_minutes: number;
  price: string;
  currency?: string;
  /**
   * Maximum number of participants
   */
  max_participants: number;
  is_active?: boolean;
  id: string;
  place_id: string;
  place_slug: string;
  created_at: string;
  updated_at: string;
}
/**
 * Schema for updating a VR session (all fields optional).
 */
export interface VRSessionUpdate {
  title?: string | null;
  description?: string | null;
  duration_minutes?: number | null;
  price?: string | null;
  currency?: string | null;
  max_participants?: number | null;
  is_active?: boolean | null;
}
