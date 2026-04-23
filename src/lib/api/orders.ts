/**
 * ORDERS API Client — WorldAtlas Travel
 * ================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/orders
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * Get User Orders
 * List current user's orders with optional status filter.
 * @method GET /api/v1/orders
 * @auth   Bearer token required
 */
export async function getUserOrders(params?: { status_filter?: T.OrderStatus | null; page?: number; per_page?: number }): Promise<T.PaginatedResponse<T.OrderListResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/orders`;

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
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.PaginatedResponse<T.OrderListResponse>>;
}

/**
 * Create New Order
 * Create a new order with Stripe payment.
 * @method POST /api/v1/orders
 * @auth   Bearer token required
 */
export async function createNewOrder(body: T.OrderCreate): Promise<T.OrderResponse> {
  const url = `${getApiBaseUrl()}/api/v1/orders`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.OrderResponse>;
}

/**
 * Get Order Detail Endpoint
 * Get order detail with items.
 * @method GET /api/v1/orders/{order_id}
 * @auth   Bearer token required
 */
export async function getOrderDetail(order_id: string): Promise<T.OrderDetailResponse> {
  const url = `${getApiBaseUrl()}/api/v1/orders/${order_id}`;

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

  return res.json() as Promise<T.OrderDetailResponse>;
}

/**
 * Confirm Order Payment
 * Confirm an order after payment verification.
 * @method POST /api/v1/orders/{order_id}/confirm
 * @auth   Bearer token required
 */
export async function confirmOrderPayment(order_id: string, body: T.OrderConfirmRequest): Promise<T.OrderDetailResponse> {
  const url = `${getApiBaseUrl()}/api/v1/orders/${order_id}/confirm`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.OrderDetailResponse>;
}

/**
 * Cancel User Order
 * Cancel order and initiate refund if paid.
 * @method POST /api/v1/orders/{order_id}/cancel
 * @auth   Bearer token required
 */
export async function cancelUserOrder(order_id: string): Promise<T.OrderResponse> {
  const url = `${getApiBaseUrl()}/api/v1/orders/${order_id}/cancel`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getAccessToken()}`,
  };

  const init: RequestInit = {
    method: "POST",
    headers,
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url);
  }

  return res.json() as Promise<T.OrderResponse>;
}
