/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Review statistics for a destination.
 */
export interface DestinationReviewsSummary {
  destination_id: number;
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    [k: string]: unknown;
  };
}
/**
 * Paginated reviews response.
 */
export interface PaginatedReviewsResponse {
  items: ReviewListResponse[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}
/**
 * Lightweight schema for listing reviews.
 */
export interface ReviewListResponse {
  id: number;
  rating: number;
  comment?: string | null;
  created_at: string;
  user: ReviewUserInfo;
}
/**
 * Minimal user info for review display.
 */
export interface ReviewUserInfo {
  id: number;
  fullname: string;
  avatar_url?: string | null;
}
/**
 * Schema for creating a review.
 */
export interface ReviewCreate {
  /**
   * ID of the destination being reviewed
   */
  destination_id: number;
  /**
   * Rating from 1 to 5 stars
   */
  rating: number;
  /**
   * Review text content
   */
  comment?: string | null;
}
/**
 * Schema for moderating a review (admin).
 */
export interface ReviewModerateRequest {
  is_approved?: boolean;
  moderation_notes?: string | null;
}
/**
 * Schema for review response with user info.
 */
export interface ReviewResponse {
  id: number;
  user_id: number;
  destination_id: number;
  rating: number;
  comment?: string | null;
  created_at: string;
  updated_at?: string | null;
  user?: ReviewUserInfo | null;
}
/**
 * Schema for updating a review.
 */
export interface ReviewUpdate {
  rating?: number | null;
  comment?: string | null;
}
