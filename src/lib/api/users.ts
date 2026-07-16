/**
 * USERS API Client — Afriatlas Travel
 * ===============================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/users
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";

// ---------------------------------------------------------------------------

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly endpoint: string,
  ) {
    super(`[USERS] HTTP ${status} — ${message} (${endpoint})`);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// ---------------------------------------------------------------------------

/**
 * Get Current User Profile
 * Get current user profile.
 * @method GET /api/v1/users/me
 * @auth   Bearer token required
 */
export async function getCurrentUserProfile(): Promise<T.UserResponse> {
  const url = `${getApiBaseUrl()}/api/v1/users/me`;

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

  return res.json() as Promise<T.UserResponse>;
}

/**
 * Update User Profile
 * Update current user profile.
 * @method PUT /api/v1/users/me
 * @auth   Bearer token required
 */
export async function updateUserProfile(body: T.UserUpdate): Promise<T.UserResponse> {
  const url = `${getApiBaseUrl()}/api/v1/users/me`;

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

  return res.json() as Promise<T.UserResponse>;
}

/**
 * Update Avatar
 * Update user avatar URL.
 * @method PUT /api/v1/users/me/avatar
 * @auth   Bearer token required
 */
export async function updateAvatar(body: T.AvatarUpdate): Promise<T.UserResponse> {
  const url = `${getApiBaseUrl()}/api/v1/users/me/avatar`;

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

  return res.json() as Promise<T.UserResponse>;
}

/**
 * Upload Avatar File
 * Envoie le fichier via FormData vers POST /api/v1/users/me/avatar/upload
 * @method POST /api/v1/users/me/avatar/upload
 * @auth   Bearer token required
 */
export async function uploadAvatarFile(file: File, storage: "local" | "cloudinary" = "local"): Promise<T.UserResponse> {
  // Validate size client-side (max 2 MB)
  const MAX_SIZE_BYTES = 2 * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) {
    throw new ApiError(400, "L'image ne doit pas dépasser 2 Mo.", "client");
  }

  const url = `${getApiBaseUrl()}/api/v1/users/me/avatar/upload?storage=${storage}`;
  
  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${getAccessToken()}`,
    // Ne pas inclure "Content-Type", fetch le définit automatiquement avec le boundary pour FormData
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body: formData,
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.UserResponse>;
}


/**
 * Delete Avatar
 * Remove user avatar.
 * @method DELETE /api/v1/users/me/avatar
 * @auth   Bearer token required
 */
export async function deleteAvatar(): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/users/me/avatar`;

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
    throw new ApiError(res.status, errorBody, url);
  }

  return;
}

/**
 * Get User Dashboard
 * Get user dashboard statistics.
 * @method GET /api/v1/users/me/dashboard
 * @auth   Bearer token required
 */
export async function getUserDashboard(): Promise<T.UserDashboardResponse> {
  const url = `${getApiBaseUrl()}/api/v1/users/me/dashboard`;

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

  return res.json() as Promise<T.UserDashboardResponse>;
}
