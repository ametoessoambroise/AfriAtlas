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
 * Base schema for bookings.
 */
export interface BookingBase {
  /**
   * Date and time of the booking
   */
  scheduled_at: string;
  /**
   * Number of people in the party
   */
  party_size: number;
  /**
   * Additional notes or requests
   */
  notes?: string | null;
}
/**
 * Schema for confirming a booking payment.
 */
export interface BookingConfirmRequest {
  /**
   * Stripe PaymentIntent ID
   */
  payment_intent_id: string;
}
/**
 * Schema for creating a new booking.
 */
export interface BookingCreate {
  /**
   * Date and time of the booking
   */
  scheduled_at: string;
  /**
   * Number of people in the party
   */
  party_size: number;
  /**
   * Additional notes or requests
   */
  notes?: string | null;
  /**
   * ID of the place to book
   */
  place_id: string;
}
/**
 * Schema for booking list item.
 */
export interface BookingListResponse {
  id: string;
  place_id: string;
  user_id: string;
  scheduled_at: string;
  party_size: number;
  status: BookingStatus;
  total_price?: string | null;
  created_at: string;
}
/**
 * Schema for booking response.
 */
export interface BookingResponse {
  /**
   * Date and time of the booking
   */
  scheduled_at: string;
  /**
   * Number of people in the party
   */
  party_size: number;
  /**
   * Additional notes or requests
   */
  notes?: string | null;
  id: string;
  place_id: string;
  user_id: string;
  status: BookingStatus;
  stripe_payment_intent_id?: string | null;
  total_price?: string | null;
  paid_at?: string | null;
  created_at: string;
  updated_at: string;
}
/**
 * Schema for updating a booking.
 */
export interface BookingUpdate {
  scheduled_at?: string | null;
  party_size?: number | null;
  notes?: string | null;
  status?: BookingStatus | null;
}
