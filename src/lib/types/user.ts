/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for account deletion request.
 */
export interface AccountDeleteRequest {
  /**
   * Current password for confirmation
   */
  password: string;
  /**
   * Optional deletion reason
   */
  reason?: string | null;
  /**
   * Must be true to confirm deletion
   */
  confirm_delete: boolean;
}
/**
 * Schema for password change request.
 */
export interface PasswordChangeRequest {
  /**
   * Current password
   */
  current_password: string;
  /**
   * New password (min 8 chars)
   */
  new_password: string;
  /**
   * Confirm new password
   */
  confirm_password: string;
}
/**
 * Base user schema with common fields.
 */
export interface UserBase {
  fullname: string;
  email: string;
  country?: string | null;
  preferred_language?: string;
}
/**
 * Schema for user registration.
 */
export interface UserCreate {
  fullname: string;
  email: string;
  country?: string | null;
  preferred_language?: string;
  password: string;
}
/**
 * Schema for user dashboard statistics.
 */
export interface UserDashboardResponse {
  favorites_count: number;
  albums_count: number;
  reviews_count: number;
  user: UserResponse;
}
/**
 * Schema for user response with all fields.
 */
export interface UserResponse {
  fullname: string;
  email: string;
  country?: string | null;
  preferred_language?: string;
  id: string;
  role: string;
  subscription_status?: string | null;
  avatar_url?: string | null;
  created_at: string;
  last_login?: string | null;
  is_active: boolean;
  email_verified?: boolean;
}
/**
 * Schema for updating user profile.
 */
export interface UserUpdate {
  fullname?: string | null;
  country?: string | null;
  preferred_language?: string | null;
}
