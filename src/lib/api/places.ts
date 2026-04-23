/**
 * Client HTTP Places — écrit manuellement à partir de backend/openapi.json
 *
 * Préfixe OpenAPI : /api/v1/places/places (router places sous /api/v1/places)
 */
import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { request } from "./api-client";

function buildQuery(params: Record<string, string | number | boolean | null | undefined>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (!entries.length) return "";
  return "?" + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString();
}

/** GET /api/v1/places/cities */
export async function getCities(): Promise<string[]> {
  const url = `${getApiBaseUrl()}/api/v1/places/cities`;
  return request<string[]>(url, { method: "GET" }, "PLACES");
}

/** GET /api/v1/places/places */
export async function getPlaces(params?: {
  category?: string | null;
  city?: string | null;
  budget_range?: string | null;
  season?: string | null;
  status?: string | null;
  is_featured?: boolean | null;
  query?: string;
  sort_by?: string;
  page?: number;
  page_size?: number;
}): Promise<T.PaginatedResponse<T.PlaceListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/places${params ? buildQuery(params as Record<string, string | number | boolean | null | undefined>) : ""}`;
  return request<T.PaginatedResponse<T.PlaceListResponse>>(url, { method: "GET" }, "PLACES");
}

/** POST /api/v1/places/places */
export async function createNewPlace(body: T.PlaceCreate): Promise<T.PlaceResponse> {
  const url = `${getApiBaseUrl()}/api/v1/places`;
  return request<T.PlaceResponse>(url, {
    method: "POST",
    body: JSON.stringify(body),
  }, "PLACES");
}

/** GET /api/v1/places/search */
export async function searchPlaces(params?: {
  query?: string | null;
  lat?: number | null;
  lon?: number | null;
  radius?: number | null;
  limit?: number;
}): Promise<T.PlaceListResponse[]> {
  const url = `${getApiBaseUrl()}/api/v1/places/search${params ? buildQuery(params as Record<string, string | number | boolean | null | undefined>) : ""}`;
  return request<T.PlaceListResponse[]>(url, { method: "GET" }, "PLACES");
}

/** GET /api/v1/places/nearby */
export async function getNearbyPlaces(params: {
  lat: number;
  lon: number;
  radius?: number;
  limit?: number;
}): Promise<T.PlaceListResponse[]> {
  const url = `${getApiBaseUrl()}/api/v1/places/nearby${buildQuery(params)}`;
  return request<T.PlaceListResponse[]>(url, { method: "GET" }, "PLACES");
}

/** GET /api/v1/places/{slug} */
export async function getPlace(slug: string): Promise<T.PlaceResponse> {
  const url = `${getApiBaseUrl()}/api/v1/places/${encodeURIComponent(slug)}`;
  return request<T.PlaceResponse>(url, { method: "GET" }, "PLACES");
}

/** PUT /api/v1/places/{slug} */
export async function updatePlace(slug: string, body: T.PlaceUpdate): Promise<T.PlaceResponse> {
  const url = `${getApiBaseUrl()}/api/v1/places/${encodeURIComponent(slug)}`;
  return request<T.PlaceResponse>(url, {
    method: "PUT",
    body: JSON.stringify(body),
  }, "PLACES");
}

/** DELETE /api/v1/places/{slug} */
export async function deletePlace(slug: string): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/places/${encodeURIComponent(slug)}`;
  return request<void>(url, { method: "DELETE" }, "PLACES");
}

/** POST /api/v1/places/{slug}/images */
export async function uploadPlaceImage(
  slug: string,
  body: FormData,
  params?: { storage?: string },
): Promise<T.PlaceImageUploadResponse> {
  const qs = params?.storage ? `?storage=${encodeURIComponent(params.storage)}` : "";
  const url = `${getApiBaseUrl()}/api/v1/places/${encodeURIComponent(slug)}/images${qs}`;
  return request<T.PlaceImageUploadResponse>(url, {
    method: "POST",
    body,
  }, "PLACES");
}

/** DELETE /api/v1/places/{slug}/images/{image_id} */
export async function deletePlaceImage(slug: string, image_id: string): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/places/${encodeURIComponent(slug)}/images/${encodeURIComponent(image_id)}`;
  return request<void>(url, { method: "DELETE" }, "PLACES");
}
