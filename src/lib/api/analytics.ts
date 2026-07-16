/**
 * ANALYTICS API Client — Afriatlas Travel
 * ===================================
 */

import {
  PlaceAnalyticsResponse,
  GlobalAnalyticsResponse,
  UserVisitHistoryResponse,
  VisitRecordRequest,
  VisitRecordResponse,
  AnalyticsFilter,
} from "../types/analytics";
import { getApiBaseUrl } from "./env";
import { request } from "./api-client";

// ---------------------------------------------------------------------------

/**
 * Get Place Analytics Endpoint
 * Get place analytics for owner (owner/admin only).
 */
export async function getPlaceAnalytics(
  slug: string,
  params?: { start_date?: string | null; end_date?: string | null },
): Promise<PlaceAnalyticsResponse> {
  const url = `${getApiBaseUrl()}/api/v1/analytics/places/${encodeURIComponent(slug)}`;

  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  return request<PlaceAnalyticsResponse>(url + qs, { method: "GET" }, "ANALYTICS");
}

/**
 * Get Global Analytics Endpoint
 * Get global platform analytics (admin only).
 */
export async function getGlobalAnalytics(
  params?: AnalyticsFilter,
): Promise<GlobalAnalyticsResponse> {
  const url = `${getApiBaseUrl()}/api/v1/analytics/global`;

  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  return request<GlobalAnalyticsResponse>(url + qs, { method: "GET" }, "ANALYTICS");
}

/**
 * Get User Visit History Endpoint
 * Get current user's visit history.
 */
export async function getUserVisitHistory(params?: {
  page?: number;
  per_page?: number;
}): Promise<UserVisitHistoryResponse> {
  const url = `${getApiBaseUrl()}/api/v1/analytics/visits`;

  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  return request<UserVisitHistoryResponse>(url + qs, { method: "GET" }, "ANALYTICS");
}

/**
 * Record Visit Endpoint
 * Record a place visit (authenticated or anonymous).
 */
export async function recordVisit(
  body: VisitRecordRequest,
): Promise<VisitRecordResponse> {
  const url = `${getApiBaseUrl()}/api/v1/analytics/visits`;

  return request<VisitRecordResponse>(
    url,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    "ANALYTICS",
  );
}
