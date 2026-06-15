/**
 * VR SESSIONS API Client — WorldAtlas Travel
 * =====================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/vr_sessions
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------
/**
 * List Vr Sessions
 * List all VR sessions for a place.
 * @method GET /api/v1/places/{slug}/vr-sessions
 */
export async function listVrSessions(params?: { slug: string }): Promise<Array<T.VRSessionListResponse>> {
  const url = params?.slug 
    ? `${getApiBaseUrl()}/api/v1/places/${params.slug}/vr-sessions`
    : `${getApiBaseUrl()}/api/v1/vr-sessions/all`;

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
    throw new ApiError(res.status, errorBody, url, "VR_SESSIONS");
  }

  return res.json() as Promise<Array<T.VRSessionListResponse>>;
}


/**
 * Get Vr Session
 * Get details of a specific VR session.
 * @method GET /api/v1/vr-sessions/{session_id}
 */
export async function getVrSession(sessionId: string): Promise<T.VRSessionResponse> {
  const url = `${getApiBaseUrl()}/api/v1/vr-sessions/${sessionId}`;

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
    throw new ApiError(res.status, errorBody, url, "VR_SESSIONS");
  }

  return res.json() as Promise<T.VRSessionResponse>;
}
/**
 * Create Vr Session
 * Create a new VR session for a place (owner/admin only).
 * @method POST /api/v1/places/{slug}/vr-sessions
 * @auth   Bearer token required
 */
export async function createVrSession(body: T.VRSessionCreate, params: { slug: string }): Promise<T.VRSessionResponse> {
  const url = `${getApiBaseUrl()}/api/v1/places/${params.slug}/vr-sessions`;

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
    throw new ApiError(res.status, errorBody, url, "VR_SESSIONS");
  }

  return res.json() as Promise<T.VRSessionResponse>;
}

/**
 * Update Vr Session
 * Update a VR session (owner/admin only).
 * @method PUT /api/v1/places/{slug}/vr-sessions/{session_id}
 * @auth   Bearer token required
 */
export async function updateVrSession(session_id: string, body: T.VRSessionUpdate, params: { slug: string }): Promise<T.VRSessionResponse> {
  const url = `${getApiBaseUrl()}/api/v1/places/${params.slug}/vr-sessions/${session_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "VR_SESSIONS");
  }

  return res.json() as Promise<T.VRSessionResponse>;
}

/**
 * Delete Vr Session
 * Delete a VR session (owner/admin only).
 * @method DELETE /api/v1/places/{slug}/vr-sessions/{session_id}
 * @auth   Bearer token required
 */
export async function deleteVrSession(session_id: string, params: { slug: string }): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/places/${params.slug}/vr-sessions/${session_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "DELETE",
    headers,
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "VR_SESSIONS");
  }

  return;
}

/**
 * Book Vr Session
 * Book a VR session (authenticated users only).
 * @method POST /api/v1/places/{slug}/vr-sessions/{session_id}/book
 * @auth   Bearer token required
 */
export async function bookVrSession(session_id: string, body: T.VRBookingCreate, params: { slug: string }): Promise<T.VRBookingResponse> {
  const url = `${getApiBaseUrl()}/api/v1/places/${params.slug}/vr-sessions/${session_id}/book`;

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
    throw new ApiError(res.status, errorBody, url, "VR_SESSIONS");
  }

  return res.json() as Promise<T.VRBookingResponse>;
}

/**
 * List VR Bookings for a Session
 * List all bookings for a specific VR session (owner/admin only).
 */
export async function listVrBookings(sessionId: string): Promise<Array<T.VRBookingListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/vr-sessions/${sessionId}/bookings`;

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
    throw new ApiError(res.status, errorBody, url, "VR_SESSIONS");
  }

  return res.json() as Promise<Array<T.VRBookingListResponse>>;
}

/**
 * Update VR Booking Attendance
 * Record whether a participant attended the session.
 */
export async function updateAttendance(sessionId: string, bookingId: string, attended: boolean): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/vr-sessions/${sessionId}/bookings/${bookingId}/attendance`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify({ attended }),
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "VR_SESSIONS");
  }

  return;
}
