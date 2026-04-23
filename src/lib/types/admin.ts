/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for updating place claim status (admin only).
 */
export interface ClaimStatusUpdate {
  status: string;
  admin_notes?: string | null;
}
/**
 * Schema for admin dashboard statistics.
 */
export interface DashboardStatsResponse {
  total_users: number;
  total_destinations: number;
  total_reviews: number;
  total_claims: number;
  pending_claims: number;
  total_favorites: number;
  total_albums: number;
}
/**
 * Schema for admin updating any destination field.
 */
export interface DestinationUpdateAdmin {
  name?: string | null;
  city?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  short_description?: string | null;
  long_description?: string | null;
  average_budget?: string | null;
  best_season?: string | null;
  safety_level?: number | null;
  popularity_score?: number | null;
  country_id?: number | null;
}
