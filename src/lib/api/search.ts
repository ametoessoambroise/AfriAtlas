/**
 * SEARCH API Client — WorldAtlas Travel
 * ================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/search
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { ApiError } from "./error-handler";
import { getAccessToken } from "./token";

// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

/**
 * Search Destinations
 * Full-text search for destinations.
 * @method GET /api/v1/search
 */
export async function searchDestinations(params?: {
  page: number;
  q?: string;
  page_size: number;
  category?: string | null;
}): Promise<Array<T.DestinationResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/search`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  // Map 'q' to 'query' for the backend
  const apiParams: Record<string, any> = {
    query: params?.q,
    category: params?.category,
    page: params?.page || 1,
    page_size: params?.page_size || 10,
    sort_by: "popular",
  };

  const qs =
    "?" +
    new URLSearchParams(
      Object.entries(apiParams)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)]),
    ).toString();

  const res = await fetch(url + qs, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, "SEARCH");
  }

  const data = await res.json();
  // The backend might return a paginated object or a direct array
  // If it's a paginated object { items: [], ... }, we return the items
  return (data.items || data) as Array<T.DestinationResponse>;
}
