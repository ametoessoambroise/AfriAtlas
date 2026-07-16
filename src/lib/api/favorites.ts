/**
 * FAVORITES API Client — Afriatlas Travel
 * ===================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/favorites
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * List User Favorites
 * List user's favorite destinations with pagination.
 * @method GET /api/v1/users/me/favorites
 * @auth   Bearer token required
 */
export async function listUserFavorites(params?: { page?: number; per_page?: number }): Promise<T.PaginatedResponse<T.DestinationResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/users/me/favorites`;

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
    throw new ApiError(res.status, errorBody, url, "FAVORITES");
  }

  return res.json() as Promise<T.PaginatedResponse<T.DestinationResponse>>;
}

/**
 * Add Favorite
 * Add a destination to user's favorites.
 * @method POST /api/v1/destinations/{destination_id}/favorite
 * @auth   Bearer token required
 */
export async function addFavorite(destination_id: string): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/destinations/${encodeURIComponent(destination_id)}/favorite`;

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
    throw new ApiError(res.status, errorBody, url, "FAVORITES");
  }

  return;
}

/**
 * Remove Favorite
 * Remove a destination from user's favorites.
 * @method DELETE /api/v1/destinations/{destination_id}/favorite
 * @auth   Bearer token required
 */
export async function removeFavorite(destination_id: string): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/destinations/${encodeURIComponent(destination_id)}/favorite`;

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
    throw new ApiError(res.status, errorBody, url, "FAVORITES");
  }

  return;
}
