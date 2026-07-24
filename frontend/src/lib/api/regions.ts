/**
 * REGIONS API Client — Afriatlas Travel
 * =================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/regions
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * List Countries
 * List all countries.
 * @method GET /api/v1/countries
 */
export async function listCountries(): Promise<Array<T.CountryResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/countries`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
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

  return res.json() as Promise<Array<T.CountryResponse>>;
}

/**
 * List Regions By Country
 * List regions for a specific country.
 * @method GET /api/v1/regions/{country_code}
 */
export async function listRegionsByCountry(country_code: string): Promise<Array<T.RegionResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/regions/${encodeURIComponent(country_code)}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
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

  return res.json() as Promise<Array<T.RegionResponse>>;
}
