/**
 * OAUTH API Client — WorldAtlas Travel
 * ===============================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/oauth
 */

import { getApiBaseUrl } from "./env";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * Google Oauth Redirect
 * Redirect to Google OAuth2 consent screen.
 * @method GET /api/v1/oauth/auth/google
 */
export async function googleOauthRedirect(): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/oauth/auth/google`;

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

/**
 * Google Oauth Callback
 * Handle Google OAuth2 callback.
 * @method GET /api/v1/oauth/auth/google/callback
 */
export async function googleOauthCallback(params?: { code: string; state: string }): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/oauth/auth/google/callback`;

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

  return;
}

/**
 * Facebook Oauth Redirect
 * Redirect to Facebook OAuth2 consent screen.
 * @method GET /api/v1/oauth/auth/facebook
 */
export async function facebookOauthRedirect(): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/oauth/auth/facebook`;

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

/**
 * Facebook Oauth Callback
 * Handle Facebook OAuth2 callback.
 * @method GET /api/v1/oauth/auth/facebook/callback
 */
export async function facebookOauthCallback(params?: { code: string; state: string }): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/oauth/auth/facebook/callback`;

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

  return;
}
