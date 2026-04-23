/**
 * ADVERTISEMENTS API Client — WorldAtlas Travel
 * ========================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/advertisements
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";
import { fetchWithAuth } from "./api-client";

// ---------------------------------------------------------------------------

/**
 * Get User Advertisements
 * List current user's advertisements.
 * @method GET /api/v1/advertisements/ads
 * @auth   Bearer token required
 */
export async function getUserAdvertisements(params?: { status_filter?: T.AdStatus | null }): Promise<Array<Record<string, unknown>>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads`;

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

  const res = await fetchWithAuth(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Array<Record<string, unknown>>>;
}

/**
 * Create New Advertisement
 * Create a new advertisement.
 * @method POST /api/v1/advertisements/ads
 * @auth   Bearer token required
 */
export async function createNewAdvertisement(body: Record<string, unknown>): Promise<Record<string, unknown>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Record<string, unknown>>;
}

/**
 * Get Advertisement Detail
 * Get advertisement detail.
 * @method GET /api/v1/advertisements/ads/{ad_id}
 * @auth   Bearer token required
 */
export async function getAdvertisementDetail(ad_id: string): Promise<Record<string, unknown>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads/${ad_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Record<string, unknown>>;
}

/**
 * Update Advertisement
 * Update advertisement (draft only).
 * @method PUT /api/v1/advertisements/ads/{ad_id}
 * @auth   Bearer token required
 */
export async function updateAdvertisement(ad_id: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads/${ad_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Record<string, unknown>>;
}

/**
 * Submit Advertisement Endpoint
 * Submit advertisement for review.
 * @method POST /api/v1/advertisements/ads/{ad_id}/submit
 * @auth   Bearer token required
 */
export async function submitAdvertisement(ad_id: string): Promise<Record<string, unknown>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads/${ad_id}/submit`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Record<string, unknown>>;
}

/**
 * Record Ad Impression Endpoint
 * Record impression (internal/CDN).
 * @method POST /api/v1/advertisements/ads/{ad_id}/impression
 */
export async function recordAdImpression(ad_id: string): Promise<Record<string, unknown>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads/${ad_id}/impression`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const init: RequestInit = {
    method: "POST",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Record<string, unknown>>;
}

/**
 * Record Ad Click Endpoint
 * Record click (internal).
 * @method POST /api/v1/advertisements/ads/{ad_id}/click
 */
export async function recordAdClick(ad_id: string): Promise<Record<string, unknown>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads/${ad_id}/click`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const init: RequestInit = {
    method: "POST",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Record<string, unknown>>;
}

/**
 * Get All Advertisements For Admin
 * List all ads for admin review.
 * @method GET /api/v1/advertisements/ads/admin/ads
 * @auth   Bearer token required
 */
export async function getAllAdvertisementsForAdmin(params?: { status_filter?: T.AdStatus | null }): Promise<Array<Record<string, unknown>>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads/admin/ads`;

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

  const res = await fetchWithAuth(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Array<Record<string, unknown>>>;
}

/**
 * Admin Review Advertisement Endpoint
 * Approve or reject advertisement (admin only).
 * @method PUT /api/v1/advertisements/ads/admin/ads/{ad_id}/review
 * @auth   Bearer token required
 */
export async function adminReviewAdvertisement(ad_id: string, body: {
  ad_status: T.AdStatus;
}): Promise<Record<string, unknown>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads/admin/ads/${ad_id}/review`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<Record<string, unknown>>;
}

/**
 * Get Public Advertisements
 * Display active advertisements for the public.
 * @method GET /api/v1/advertisements/ads
 */
export async function getPublicAds(params?: { page?: number; per_page?: number }): Promise<T.PaginatedResponse<T.AdvertisementListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/advertisements/ads`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
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

  const res = await fetchWithAuth(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "ADVERTISEMENTS");
  }

  return res.json() as Promise<T.PaginatedResponse<T.AdvertisementListResponse>>;
}
