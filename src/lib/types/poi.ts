/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for POI search result.
 */
export interface POIResponse {
  /**
   * Place name
   */
  name: string;
  /**
   * Latitude coordinate
   */
  lat?: number | null;
  /**
   * Longitude coordinate
   */
  lon?: number | null;
  /**
   * POI category
   */
  category?: string | null;
  /**
   * OpenStreetMap URL
   */
  osm_url?: string | null;
  /**
   * OpenStreetMap ID
   */
  osm_id?: number | null;
  /**
   * OpenStreetMap type (node/way)
   */
  osm_type?: string | null;
  /**
   * OpenStreetMap tags
   */
  tags?: {
    [k: string]: unknown;
  } | null;
}
/**
 * Query parameters for POI search.
 */
export interface POISearchParams {
  /**
   * Search by place name
   */
  name?: string | null;
  /**
   * Latitude coordinate (-90 to 90)
   */
  lat?: number | null;
  /**
   * Longitude coordinate (-180 to 180)
   */
  lon?: number | null;
  /**
   * POI category (gastronomy, culture, commerce)
   */
  category?: string | null;
}
