/**
 * HEALTH API Client — WorldAtlas Travel
 * ================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/health
 */

import { getApiBaseUrl } from "./env";

// ---------------------------------------------------------------------------

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly endpoint: string,
  ) {
    super(`[HEALTH] HTTP ${status} — ${message} (${endpoint})`);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// ---------------------------------------------------------------------------

/**
 * Health Check
 * Health check endpoint to verify API is running.
 * @method GET /api/v1/health
 */
export async function healthCheck(): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/health`;

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
  return;
}
