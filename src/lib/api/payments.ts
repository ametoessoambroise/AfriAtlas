/**
 * PAYMENTS API Client — WorldAtlas Travel
 * ==================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/payments
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * Create Checkout
 * Create a Stripe checkout session for subscription.
 * @method POST /api/v1/payments/checkout/{plan_id}
 * @auth   Bearer token required
 */
export async function createCheckout(plan_id: string): Promise<T.CheckoutSessionResponse> {
  const url = `${getApiBaseUrl()}/api/v1/payments/checkout/${plan_id}`;

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

  return res.json() as Promise<T.CheckoutSessionResponse>;
}

/**
 * Stripe Webhook
 * Handle Stripe webhook events.
 * @method POST /api/v1/payments/webhook
 */
export async function stripeWebhook(): Promise<T.WebhookResponse> {
  const url = `${getApiBaseUrl()}/api/v1/payments/webhook`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
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

  return res.json() as Promise<T.WebhookResponse>;
}
