/**
 * ALBUMS API Client — Afriatlas Travel
 * ================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/albums
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { fetchWithAuth } from "./api-client";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * Get User Albums
 * List current user's albums.
 * @method GET /api/v1/albums
 * @auth   Bearer token required
 */
export async function getUserAlbums(): Promise<Array<T.AlbumListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/albums`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<Array<T.AlbumListResponse>>;
}

/**
 * Create New Album
 * Create a new album.
 * @method POST /api/v1/albums
 * @auth   Bearer token required
 */
export async function createNewAlbum(
  body: T.AlbumCreate,
): Promise<T.AlbumResponse> {
  const url = `${getApiBaseUrl()}/api/v1/albums`;

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

  return res.json() as Promise<T.AlbumResponse>;
}

/**
 * Get Album Detail Endpoint
 * Get album detail with places and images.
 * @method GET /api/v1/albums/{album_id}
 * @auth   Bearer token required
 */
export async function getAlbumDetail(
  album_id: string,
): Promise<T.AlbumDetailResponse> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.AlbumDetailResponse>;
}

/**
 * Update Album Endpoint
 * Update album metadata.
 * @method PUT /api/v1/albums/{album_id}
 * @auth   Bearer token required
 */
export async function updateAlbum(
  album_id: string,
  body: T.AlbumUpdate,
): Promise<T.AlbumResponse> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.AlbumResponse>;
}

/**
 * Delete Album Endpoint
 * Delete album.
 * @method DELETE /api/v1/albums/{album_id}
 * @auth   Bearer token required
 */
export async function deleteAlbum(album_id: string): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "DELETE",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return;
}

/**
 * Add Place To Album Endpoint
 * Add a place to album.
 * @method POST /api/v1/albums/{album_id}/places
 * @auth   Bearer token required
 */
export async function addPlaceToAlbum(
  album_id: string,
  body: T.AlbumPlaceCreate,
): Promise<T.AlbumPlaceResponse> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}/places`;

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

  return res.json() as Promise<T.AlbumPlaceResponse>;
}

/**
 * Remove Place From Album Endpoint
 * Remove place from album.
 * @method DELETE /api/v1/albums/{album_id}/places/{place_id}
 * @auth   Bearer token required
 */
export async function removePlaceFromAlbum(
  album_id: string,
  place_id: string,
): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}/places/${place_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "DELETE",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return;
}

/**
 * Upload Album Image Endpoint
 * Upload image to album.
 * @method POST /api/v1/albums/{album_id}/images
 * @auth   Bearer token required
 */
export async function uploadAlbumImage(
  album_id: string,
  body: FormData,
  params?: {
    place_id?: string;
    caption?: string;
    taken_at?: string;
    latitude?: number;
    longitude?: number;
  },
): Promise<T.AlbumImageResponse> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}/images`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body,
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

  return res.json() as Promise<T.AlbumImageResponse>;
}

/**
 * Delete Album Image Endpoint
 * Delete image from album.
 * @method DELETE /api/v1/albums/{album_id}/images/{image_id}
 * @auth   Bearer token required
 */
export async function deleteAlbumImage(
  album_id: string,
  image_id: string,
): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}/images/${image_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "DELETE",
    headers,
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return;
}

/**
 * Update Album Image Endpoint
 * Update image metadata (caption, date, coordinates).
 * @method PATCH /api/v1/albums/{album_id}/images/{image_id}
 * @auth   Bearer token required
 */
export async function updateAlbumImage(
  album_id: string,
  image_id: string,
  body: T.AlbumImageUpdate,
): Promise<T.AlbumImageResponse> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}/images/${image_id}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.AlbumImageResponse>;
}

/**
 * Generate a story from album photos
 * Generate an immersive travel story based on the album photos. Requires Premium or Family plan.
 * @method POST /api/v1/albums/{album_id}/generate-story
 * @auth   Bearer token required
 */
export async function generateAlbumStory(
  album_id: string,
  body: T.AlbumStoryGenerateRequest,
): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}/generate-story`;

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

/**
 * Generate album description
 * Generate a captivating description and title suggestion for the album. Requires Premium or Family plan.
 * @method POST /api/v1/albums/{album_id}/generate-description
 * @auth   Bearer token required
 */
export async function generateAlbumDescription(
  album_id: string,
  params?: { language?: string },
): Promise<T.AlbumDescriptionResponse> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}/generate-description`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
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

  return res.json() as Promise<T.AlbumDescriptionResponse>;
}

/**
 * Stream album story
 * Stream an immersive travel story based on the album photos.
 * @method POST /api/v1/albums/{album_id}/generate-story/stream
 * @auth   Bearer token required
 */
export async function streamAlbumStory(
  album_id: string,
  body: { tone: string },
  onChunk: (chunk: string) => void,
): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/albums/${album_id}/generate-story/stream`;

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

  if (!res.body) {
    throw new Error(
      "La réponse du serveur est vide. Veuillez réessayer plus tard.",
    );
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}
