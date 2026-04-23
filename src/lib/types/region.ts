/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for Togo region/city response.
 */
export interface RegionResponse {
  /**
   * Region or city name
   */
  name: string;
  /**
   * Latitude coordinate
   */
  lat: number;
  /**
   * Longitude coordinate
   */
  lng: number;
  /**
   * Population count or N/A
   */
  population?: string | null;
  /**
   * Place type (city, town, etc.)
   */
  type: string;
}
