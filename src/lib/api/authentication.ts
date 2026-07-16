/**
 * AUTHENTICATION API Client — Afriatlas Travel
 * ========================================
 * @module api/authentication
 */

import type * as T from "../types";
import { getApiBaseUrl } from "./env";
import { request } from "./api-client";

// ---------------------------------------------------------------------------

/**
 * Register
 * Register a new user account.
 * @method POST /api/v1/auth/register
 */
export async function register(body: T.RegisterRequest): Promise<T.TokenResponse> {
  const url = `${getApiBaseUrl()}/api/v1/auth/register`;
  return request<T.TokenResponse>(url, {
    method: "POST",
    body: JSON.stringify(body),
  }, "AUTHENTICATION");
}

/**
 * Login
 * Authenticate user and return JWT tokens.
 * @method POST /api/v1/auth/login
 */
export async function login(body: T.LoginRequest): Promise<T.TokenResponse> {
  const url = `${getApiBaseUrl()}/api/v1/auth/login`;
  return request<T.TokenResponse>(url, {
    method: "POST",
    body: JSON.stringify(body),
  }, "AUTHENTICATION");
}

/**
 * Refresh Token
 * Refresh access token using refresh token.
 * @method POST /api/v1/auth/refresh
 */
export async function refreshToken(body: { refresh_token: string }): Promise<{ access_token: string; token_type: string }> {
  const url = `${getApiBaseUrl()}/api/v1/auth/refresh`;
  return request<{ access_token: string; token_type: string }>(url, {
    method: "POST",
    body: JSON.stringify(body),
  }, "AUTHENTICATION");
}

/**
 * Logout
 * Logout user by revoking refresh token.
 * @method POST /api/v1/auth/logout
 */
export async function logout(params?: { refresh_token: string }): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/auth/logout`;
  const qs = params ? `?refresh_token=${encodeURIComponent(params.refresh_token)}` : "";
  return request<void>(url + qs, { method: "POST" }, "AUTHENTICATION");
}

/**
 * Logout All
 * Logout user from all devices.
 * @method POST /api/v1/auth/logout-all
 */
export async function logoutAll(): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/auth/logout-all`;
  return request<void>(url, { method: "POST" }, "AUTHENTICATION");
}

/**
 * Verify Email
 */
export async function verifyEmail(params: { token: string }): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/auth/verify-email?token=${encodeURIComponent(params.token)}`;
  return request<void>(url, { method: "GET" }, "AUTHENTICATION");
}

/**
 * Forgot Password
 */
export async function forgotPassword(params: { email: string }): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/auth/forgot-password?email=${encodeURIComponent(params.email)}`;
  return request<void>(url, { method: "POST" }, "AUTHENTICATION");
}

/**
 * Reset Password
 */
export async function resetPassword(params: { token: string; new_password: string }): Promise<void> {
  const url = `${getApiBaseUrl()}/api/v1/auth/reset-password`;
  return request<void>(url, {
    method: "POST",
    body: JSON.stringify(params),
  }, "AUTHENTICATION");
}

/**
 * Get Current User Profile
 * @method GET /api/v1/auth/me
 */
export async function getCurrentUserProfile(): Promise<T.UserResponse> {
  const url = `${getApiBaseUrl()}/api/v1/auth/me`;
  return request<T.UserResponse>(url, { method: "GET" }, "AUTHENTICATION");
}
