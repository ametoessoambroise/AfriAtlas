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
export async function searchDestinations(params?: { q: string; category?: string | null }): Promise<Array<T.DestinationResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/search`;

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
    throw new ApiError(res.status, errorBody, url, "SEARCH");
  }

  return res.json() as Promise<Array<T.DestinationResponse>>;
}
