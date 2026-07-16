/**
 * OWNER API Client — Afriatlas Travel
 * ===============================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/owner
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * List owner's place claims
 * List all place claims registered by the authenticated owner.
 * @method GET /api/v1/owner/claims
 * @auth   Bearer token required
 */
export async function listClaims(params?: { page?: number; per_page?: number }): Promise<Array<T.PlaceClaimResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/owner/claims`;

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
 * Register new place
 * Register a new place claim for the authenticated owner.
 * @method POST /api/v1/owner/claims
 * @auth   Bearer token required
 */
export async function createClaim(body: T.PlaceClaimCreate): Promise<T.PlaceClaimResponse> {
  const url = `${getApiBaseUrl()}/api/v1/owner/claims`;

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
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.PlaceClaimResponse>;
}

/**
 * Get claim details
 * Get detailed information about a specific place claim.
 * @method GET /api/v1/owner/claims/{id}
 * @auth   Bearer token required
 */
export async function getClaim(id: string): Promise<T.PlaceClaimResponse> {
  const url = `${getApiBaseUrl()}/api/v1/owner/claims/${id}`;

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

  return res.json() as Promise<T.PlaceClaimResponse>;
}

/**
 * Update claim
 * Update an existing place claim.
 * @method PUT /api/v1/owner/claims/{id}
 * @auth   Bearer token required
 */
export async function updateClaim(id: string, body: T.PlaceClaimUpdate): Promise<T.PlaceClaimResponse> {
  const url = `${getApiBaseUrl()}/api/v1/owner/claims/${id}`;

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
