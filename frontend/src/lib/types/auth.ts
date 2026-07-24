/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for login request.
 */
export interface LoginRequest {
  email: string;
  password: string;
}
/**
 * Schema for registration request.
 */
export interface RegisterRequest {
  fullname: string;
  email: string;
  password: string;
  country?: string | null;
}
/**
 * Schema for authentication token response.
 */
export interface TokenResponse {
  access_token: string;
  token_type?: string;
  refresh_token: string;
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
