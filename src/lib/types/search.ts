/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for location search result.
 */
export interface LocationSearchResult {
  /**
   * Location name (city, town, village, etc.)
   */
  name: string;
  /**
   * Full display name with address details
   */
  display_name: string;
  /**
   * Latitude coordinate
   */
  lat: number;
  /**
   * Longitude coordinate
   */
  lng: number;
  /**
   * Region or state name
   */
  region: string;
  /**
   * OSM place type
   */
  type?: string | null;
  /**
   * OpenStreetMap ID
   */
  osm_id?: number | null;
}
