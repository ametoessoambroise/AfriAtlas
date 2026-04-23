/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for AI-powered recommendation response.
 */
export interface RecommendationResponse {
  id: number;
  name: string;
  /**
   * AI-generated reason for recommendation
   */
  reason_ai: string;
  lat?: number | null;
  lon?: number | null;
  osm_url?: string | null;
  category_label?: string | null;
  tags?: {
    [k: string]: unknown;
  } | null;
  /**
   * Internal scoring from recommendation algorithm
   */
  internal_score?: number | null;
}
