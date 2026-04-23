/**
 * SUBSCRIPTIONS API Client — WorldAtlas Travel
 * =======================================
 * AUTO-GENERATED — Ne pas modifier manuellement.
 * Source    : openapi.json (Pydantic schemas FastAPI)
 * Regénérer : python scripts/generate_api_clients.py
 *
 * @module api/subscriptions
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";

// ---------------------------------------------------------------------------

/**
 * List Subscription Plans
 * List all available subscription plans.
 * @method GET /api/v1/subscriptions/plans
 */
export async function listSubscriptionPlans(): Promise<Array<T.SubscriptionPlanResponse>> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/plans`;

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

  return res.json() as Promise<Array<T.SubscriptionPlanResponse>>;
}

/**
 * Subscribe To Plan
 * Subscribe to a subscription plan (authenticated).
 * @method POST /api/v1/subscriptions/subscribe
 * @auth   Bearer token required
 */
export async function subscribeToPlan(body: T.SubscribeRequest): Promise<T.SubscribeResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/subscribe`;

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

  return res.json() as Promise<T.SubscribeResponse>;
}

/**
 * Cancel User Subscription
 * Cancel current subscription (authenticated).
 * @method POST /api/v1/subscriptions/cancel
 * @auth   Bearer token required
 */
export async function cancelUserSubscription(): Promise<T.CancelSubscriptionResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/cancel`;

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

  return res.json() as Promise<T.CancelSubscriptionResponse>;
}

/**
 * Upgrade User Subscription
 * Upgrade to a higher subscription plan (authenticated).
 * @method POST /api/v1/subscriptions/upgrade
 * @auth   Bearer token required
 */
export async function upgradeUserSubscription(body: T.UpgradeRequest): Promise<T.UpgradeResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/upgrade`;

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

  return res.json() as Promise<T.UpgradeResponse>;
}

/**
 * Stripe Webhook Handler
 * Stripe webhook handler (no authentication, signature verification).
 * @method POST /api/v1/subscriptions/webhook
 */
export async function stripeWebhookHandler(extraHeaders?: { "Stripe-Signature"?: string }): Promise<T.StripeWebhookResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/webhook`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(extraHeaders?.["Stripe-Signature"] ? { ["Stripe-Signature"]: extraHeaders["Stripe-Signature"]! } : {}),
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

  return res.json() as Promise<T.StripeWebhookResponse>;
}

/**
 * Get User Family Group
 * Get family group details (authenticated).
 * @method GET /api/v1/subscriptions/family
 * @auth   Bearer token required
 */
export async function getUserFamilyGroup(): Promise<T.FamilyGroupResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/family`;

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

  return res.json() as Promise<T.FamilyGroupResponse>;
}

/**
 * Create User Family Group
 * Create a family group (premium/family plan only).
 * @method POST /api/v1/subscriptions/family
 * @auth   Bearer token required
 */
export async function createUserFamilyGroup(body: T.CreateFamilyGroupRequest): Promise<T.FamilyGroupResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/family`;

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

  return res.json() as Promise<T.FamilyGroupResponse>;
}

/**
 * Invite Family Member Endpoint
 * Invite member to family group (owner only).
 * @method POST /api/v1/subscriptions/family/invite
 * @auth   Bearer token required
 */
export async function inviteFamilyMember(body: T.InviteFamilyMemberRequest): Promise<T.InviteFamilyMemberResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/family/invite`;

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

  return res.json() as Promise<T.InviteFamilyMemberResponse>;
}

/**
 * Accept Family Invitation
 * Accept family group invitation (authenticated).
 * @method POST /api/v1/subscriptions/family/accept
 * @auth   Bearer token required
 */
export async function acceptFamilyInvitation(body: T.AcceptFamilyInviteRequest): Promise<T.AcceptFamilyInviteResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/family/accept`;

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

  return res.json() as Promise<T.AcceptFamilyInviteResponse>;
}

/**
 * Remove Family Member Endpoint
 * Remove family member (owner only).
 * @method DELETE /api/v1/subscriptions/family/members/{user_id}
 * @auth   Bearer token required
 */
export async function removeFamilyMember(user_id: string): Promise<T.RemoveFamilyMemberResponse> {
  const url = `${getApiBaseUrl()}/api/v1/subscriptions/family/members/${user_id}`;

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

  return res.json() as Promise<T.RemoveFamilyMemberResponse>;
}
