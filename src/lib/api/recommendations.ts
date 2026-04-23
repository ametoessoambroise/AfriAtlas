/**
 * RECOMMENDATIONS API Client — WorldAtlas Travel
 * =========================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/recommendations
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * Get User Recommendations Endpoint
 * Get personalized recommendations for authenticated user.
 * @method GET /api/v1/recommendations/recommendations
 * @auth   Bearer token required
 */
export async function getUserRecommendations(params?: { limit?: number }): Promise<Array<T.PlaceListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/recommendations`;

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

  return res.json() as Promise<Array<T.PlaceListResponse>>;
}

/**
 * Get Trending Places Endpoint
 * Get trending places (public).
 * @method GET /api/v1/recommendations/trending
 */
export async function getTrendingPlaces(params?: { limit?: number }): Promise<Array<T.PlaceListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/recommendations/trending`;

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

  const res = await fetch(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<Array<T.PlaceListResponse>>;
}

/**
 * Get Similar Places Endpoint
 * Get similar places to a given place (public).
 * @method GET /api/v1/recommendations/places/{slug}/similar
 */
export async function getSimilarPlaces(slug: string, params?: { limit?: number }): Promise<Array<T.PlaceListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/recommendations/places/${slug}/similar`;

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

  const res = await fetch(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<Array<T.PlaceListResponse>>;
}
