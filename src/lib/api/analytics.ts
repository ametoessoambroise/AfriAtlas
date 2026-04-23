/**
 * ANALYTICS API Client — WorldAtlas Travel
 * ===================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/analytics
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";
import { fetchWithAuth } from "./api-client";

// ---------------------------------------------------------------------------

/**
 * Get Place Analytics Endpoint
 * Get place analytics for owner (owner/admin only).
 * @method GET /api/v1/analytics/places/{slug}
 * @auth   Bearer token required
 */
export async function getPlaceAnalytics(
  slug: string,
  params?: { start_date?: string | null; end_date?: string | null },
): Promise<Record<string, unknown>> {
  const url = `${getApiBaseUrl()}/api/v1/analytics/places/${encodeURIComponent(slug)}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const res = await fetchWithAuth(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<Record<string, unknown>>;
}

/**
 * Get Global Analytics Endpoint
 * Get global platform analytics (admin only).
 * @method GET /api/v1/analytics/global
 * @auth   Bearer token required
 */
export async function getGlobalAnalytics(params?: {
  start_date?: string | null;
  end_date?: string | null;
}): Promise<Array<Record<string, unknown>>> {
  const url = `${getApiBaseUrl()}/api/v1/analytics/global`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const res = await fetchWithAuth(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<Array<Record<string, unknown>>>;
}

/**
 * Get User Visit History Endpoint
 * Get current user's visit history.
 * @method GET /api/v1/analytics/visits
 * @auth   Bearer token required
 */
export async function getUserVisitHistory(params?: {
  page?: number;
  per_page?: number;
}): Promise<T.PaginatedResponse<Record<string, unknown>>> {
  const url = `${getApiBaseUrl()}/api/v1/analytics/visits`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const res = await fetchWithAuth(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.PaginatedResponse<Record<string, unknown>>>;
}

/**
 * Record Visit Endpoint
 * Record a place visit (authenticated or anonymous).
 * @method POST /api/v1/analytics/visits
 * @auth   Bearer token required
 */
export async function recordVisit(body: {
  place_id: string;
  visit_type?: T.VisitType;
  session_id: string;
  ip_address?: string | null;
  user_agent?: string | null;
  referrer?: string | null;
}): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/analytics/visits`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return;
}
