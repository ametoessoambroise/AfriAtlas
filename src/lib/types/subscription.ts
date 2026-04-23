/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Request to accept family invitation.
 */
export interface AcceptFamilyInviteRequest {
  token: string;
  group_id: string;
}
/**
 * Response after accepting family invitation.
 */
export interface AcceptFamilyInviteResponse {
  message?: string;
  family_group?: FamilyGroupResponse | null;
}
/**
 * Family group response with members.
 */
export interface FamilyGroupResponse {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  owner: {
    [k: string]: unknown;
  };
  subscription_plan: {
    [k: string]: unknown;
  };
  members: FamilyGroupMemberResponse[];
  member_count: number;
}
/**
 * Family group member response.
 */
export interface FamilyGroupMemberResponse {
  id: string;
  fullname: string;
  email: string;
  avatar_url?: string | null;
  joined_at?: string | null;
  role: string;
}
/**
 * Response after cancelling subscription.
 */
export interface CancelSubscriptionResponse {
  message?: string;
}
/**
 * Request to create a family group.
 */
export interface CreateFamilyGroupRequest {
  name: string;
}
/**
 * Request to invite a family member.
 */
export interface InviteFamilyMemberRequest {
  email: string;
}
/**
 * Response after inviting a family member.
 */
export interface InviteFamilyMemberResponse {
  message?: string;
}
/**
 * Response after removing a family member.
 */
export interface RemoveFamilyMemberResponse {
  message?: string;
}
/**
 * Response for Stripe webhook processing.
 */
export interface StripeWebhookResponse {
  status?: string;
  message?: string;
}
/**
 * Request to subscribe to a plan.
 */
export interface SubscribeRequest {
  plan_id: string;
  billing_period: string;
  payment_method_id?: string | null;
}
/**
 * Response after subscribing to a plan.
 */
export interface SubscribeResponse {
  subscription_id: string;
  customer_id: string;
  status: string;
  current_period_end: number;
  message?: string;
}
/**
 * Base subscription plan schema.
 */
export interface SubscriptionPlanBase {
  name: string;
  plan_type: string;
  price_monthly: number;
  price_yearly: number;
  max_family_members: number;
  features?: string[];
  is_active?: boolean;
}
/**
 * Subscription plan response schema.
 */
export interface SubscriptionPlanResponse {
  name: string;
  plan_type: string;
  price_monthly: number;
  price_yearly: number;
  max_family_members: number;
  features?: string[];
  is_active?: boolean;
  id: string;
  created_at: string;
  updated_at: string;
}
/**
 * Request to upgrade subscription plan.
 */
export interface UpgradeRequest {
  new_plan_id: string;
}
/**
 * Response after upgrading subscription.
 */
export interface UpgradeResponse {
  subscription_id: string;
  status: string;
  current_period_end: number;
  plan_name: string;
  message?: string;
}
