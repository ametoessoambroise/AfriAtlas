/**
 * BOOKINGS API Client — Afriatlas Travel
 * ==================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/bookings
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";


// ---------------------------------------------------------------------------

/**
 * Get User Bookings
 * List current user's bookings with optional status filter.
 * @method GET /api/v1/bookings
 * @auth   Bearer token required
 */
export async function getUserBookings(params?: { status_filter?: T.BookingStatus | null; page?: number; per_page?: number }): Promise<T.PaginatedResponse<T.BookingListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/bookings`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const qs = params
    ? "?" + new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  const res = await fetch(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "BOOKINGS");
  }

  return res.json() as Promise<T.PaginatedResponse<T.BookingListResponse>>;
}

/**
 * Create New Booking
 * Create a new booking with Stripe payment.
 * @method POST /api/v1/bookings
 * @auth   Bearer token required
 */
export async function createNewBooking(body: T.BookingCreate): Promise<T.BookingResponse> {
  const url = `${getApiBaseUrl()}/api/v1/bookings`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "BOOKINGS");
  }

  return res.json() as Promise<T.BookingResponse>;
}

/**
 * Get Booking Detail
 * Get booking detail.
 * @method GET /api/v1/bookings/{booking_id}
 * @auth   Bearer token required
 */
export async function getBookingDetail(booking_id: string): Promise<T.BookingResponse> {
  const url = `${getApiBaseUrl()}/api/v1/bookings/${booking_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "BOOKINGS");
  }

  return res.json() as Promise<T.BookingResponse>;
}

/**
 * Confirm Booking Payment
 * Confirm a booking after payment verification.
 * @method POST /api/v1/bookings/{booking_id}/confirm
 * @auth   Bearer token required
 */
export async function confirmBookingPayment(booking_id: string, body: T.BookingConfirmRequest): Promise<T.BookingResponse> {
  const url = `${getApiBaseUrl()}/api/v1/bookings/${booking_id}/confirm`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "BOOKINGS");
  }

  return res.json() as Promise<T.BookingResponse>;
}

/**
 * Cancel User Booking
 * Cancel booking and initiate refund if paid.
 * @method POST /api/v1/bookings/{booking_id}/cancel
 * @auth   Bearer token required
 */
export async function cancelUserBooking(booking_id: string): Promise<T.BookingResponse> {
  const url = `${getApiBaseUrl()}/api/v1/bookings/${booking_id}/cancel`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "BOOKINGS");
  }

  return res.json() as Promise<T.BookingResponse>;
}

/**
 * Get Place Bookings
 * List bookings for a place (owner/admin only).
 * @method GET /api/v1/bookings/places/{slug}/bookings
 * @auth   Bearer token required
 */
export async function getPlaceBookings(slug: string, params?: { start_date?: string | null; end_date?: string | null; page?: number; per_page?: number }): Promise<T.PaginatedResponse<T.BookingListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/bookings/places/${slug}/bookings`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const qs = params
    ? "?" + new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  const res = await fetch(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "BOOKINGS");
  }

  return res.json() as Promise<T.PaginatedResponse<T.BookingListResponse>>;
}
