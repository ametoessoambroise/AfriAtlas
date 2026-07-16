/**
 * REVENUES API Client — Afriatlas Travel
 * ===================================
 * Integrated with Owner Revenue Management endpoints.
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";

/** 
 * Custom error class for Revenue API
 */
export class RevenueApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly endpoint: string,
  ) {
    super(`[REVENUE] HTTP ${status} — ${message} (${endpoint})`);
    this.name = "RevenueApiError";
    Object.setPrototypeOf(this, RevenueApiError.prototype);
  }
}

// ─── ADMIN ENDPOINTS ─────────────────────────────────────────────────────────

/**
 * List all owner revenues (Admin only)
 */
export async function listAllOwnerRevenues(params?: {
  period_type?: T.RevenuePeriod;
  payment_status?: T.PaymentStatus;
  start_date?: string;
  end_date?: string;
}): Promise<T.OwnerRevenueResponse[]> {
  const url = `${getApiBaseUrl()}/api/v1/admin/analytics/owner-revenues`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const qs = params
    ? "?" + new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const res = await fetch(url + qs, { method: "GET", headers });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new RevenueApiError(res.status, errorBody, url);
  }

  return res.json();
}

/**
 * Get global revenue statistics (Admin only)
 */
export async function getRevenueStats(): Promise<T.OwnerRevenueStats> {
  const url = `${getApiBaseUrl()}/api/v1/admin/analytics/owner-revenues/stats`;
  const headers = {
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const res = await fetch(url, { method: "GET", headers });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new RevenueApiError(res.status, errorBody, url);
  }

  return res.json();
}

/**
 * Get detailed revenue summary for a specific owner (Admin only)
 */
export async function getOwnerRevenueDetails(ownerId: number): Promise<T.OwnerRevenueSummary> {
  const url = `${getApiBaseUrl()}/api/v1/admin/analytics/owner-revenues/${ownerId}`;
  const headers = {
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const res = await fetch(url, { method: "GET", headers });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new RevenueApiError(res.status, errorBody, url);
  }

  return res.json();
}

/**
 * List all revenue periods for a specific owner (Admin only)
 */
export async function listOwnerRevenuePeriods(
  ownerId: number,
  params?: {
    period_type?: T.RevenuePeriod;
    payment_status?: T.PaymentStatus;
  }
): Promise<T.OwnerRevenueListResponse[]> {
  const url = `${getApiBaseUrl()}/api/v1/admin/analytics/owner-revenues/${ownerId}/periods`;
  const headers = {
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const qs = params
    ? "?" + new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const res = await fetch(url + qs, { method: "GET", headers });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new RevenueApiError(res.status, errorBody, url);
  }

  return res.json();
}

/**
 * Update payment status for a revenue record (Admin only)
 */
export async function updateRevenuePayment(
  revenueId: number,
  data: T.OwnerRevenueUpdate
): Promise<T.OwnerRevenueResponse> {
  const url = `${getApiBaseUrl()}/api/v1/admin/analytics/owner-revenues/${revenueId}/payment`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new RevenueApiError(res.status, errorBody, url);
  }

  return res.json();
}

/**
 * Export owner revenues to CSV (Admin only)
 */
export async function exportOwnerRevenuesCsv(params?: {
  period_type?: T.RevenuePeriod;
  payment_status?: T.PaymentStatus;
  start_date?: string;
  end_date?: string;
  owner_id?: number;
}): Promise<Blob> {
  const url = `${getApiBaseUrl()}/api/v1/admin/analytics/owner-revenues/export`;
  const headers = {
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const qs = params
    ? "?" + new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const res = await fetch(url + qs, { method: "GET", headers });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new RevenueApiError(res.status, errorBody, url);
  }

  return res.blob();
}

// ─── OWNER ENDPOINTS ─────────────────────────────────────────────────────────

/**
 * List current user's revenue periods (Owner only)
 */
export async function getMyRevenues(params?: {
  period_type?: T.RevenuePeriod;
  payment_status?: T.PaymentStatus;
}): Promise<T.OwnerRevenueListResponse[]> {
  const url = `${getApiBaseUrl()}/api/v1/owner/me/revenues`;
  const headers = {
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const qs = params
    ? "?" + new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const res = await fetch(url + qs, { method: "GET", headers });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new RevenueApiError(res.status, errorBody, url);
  }

  return res.json();
}

/**
 * Get revenue summary for current user (Owner only)
 */
export async function getMyRevenueSummary(): Promise<T.OwnerRevenueSummary> {
  const url = `${getApiBaseUrl()}/api/v1/owner/me/revenues/summary`;
  const headers = {
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const res = await fetch(url, { method: "GET", headers });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new RevenueApiError(res.status, errorBody, url);
  }

  return res.json();
}
