/**
 * ADMIN API Client — Afriatlas Travel
 * ===============================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/admin
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * Get platform statistics
 * Get platform-wide statistics for admin dashboard.
 * @method GET /api/v1/admin/dashboard
 * @auth   Bearer token required
 */
export async function getDashboardStats(): Promise<T.DashboardStatsResponse> {
  const url = `${getApiBaseUrl()}/api/v1/admin/dashboard`;

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
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.DashboardStatsResponse>;
}

/**
 * List all destinations
 * List all destinations with pagination (admin only).
 * @method GET /api/v1/admin/destinations
 * @auth   Bearer token required
 */
export async function listAllDestinations(params?: { page?: number; per_page?: number }): Promise<Array<T.DestinationResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/admin/destinations`;

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
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<Array<T.DestinationResponse>>;
}

/**
 * Update destination
 * Update any field of a destination (admin only).
 * @method PUT /api/v1/admin/destinations/{id}
 * @auth   Bearer token required
 */
export async function updateDestination(id: string, body: T.DestinationUpdateAdmin): Promise<T.DestinationResponse> {
  const url = `${getApiBaseUrl()}/api/v1/admin/destinations/${encodeURIComponent(id)}`;

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
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.DestinationResponse>;
}

/**
 * List pending claims
 * List pending place claims with pagination (admin only).
 * @method GET /api/v1/admin/claims
 * @auth   Bearer token required
 */
export async function listPendingClaims(params?: { page?: number; per_page?: number }): Promise<Array<T.PlaceClaimResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/admin/claims`;

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
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<Array<T.PlaceClaimResponse>>;
}

/**
 * Approve/reject claim
 * Approve or reject a place claim by updating its status (admin only).
 * @method PUT /api/v1/admin/claims/{id}/status
 * @auth   Bearer token required
 */
export async function updateClaimStatus(id: string, body: T.ClaimStatusUpdate): Promise<T.PlaceClaimResponse> {
  const url = `${getApiBaseUrl()}/api/v1/admin/claims/${encodeURIComponent(id)}/status`;

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
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.PlaceClaimResponse>;
}
