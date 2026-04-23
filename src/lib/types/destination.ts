/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for country response.
 */
export interface CountryResponse {
  id: number;
  name: string;
  iso_code: string;
  continent?: string | null;
  main_language?: string | null;
  currency?: string | null;
  description?: string | null;
  flag_url?: string | null;
}
/**
 * Base destination schema with common fields.
 */
export interface DestinationBase {
  name: string;
  city?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  short_description?: string | null;
  long_description?: string | null;
  average_budget?: string | null;
  best_season?: string | null;
  safety_level?: number;
}
/**
 * Schema for filtering destinations.
 */
export interface DestinationFilter {
  budget?: string | null;
  tags?: string[] | null;
  country_id?: number | null;
  min_safety_level?: number | null;
  page?: number;
  per_page?: number;
}
/**
 * Schema for destination media response.
 */
export interface DestinationMediaResponse {
  id: number;
  destination_id: number;
  media_type: string;
  media_url: string;
  is_cover: boolean;
}
/**
 * Schema for destination response with relationships.
 */
export interface DestinationResponse {
  name: string;
  city?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  short_description?: string | null;
  long_description?: string | null;
  average_budget?: string | null;
  best_season?: string | null;
  safety_level?: number;
  id: number;
  country_id: number;
  popularity_score: number;
  average_rating?: string;
  reviews_count?: number;
  created_at: string;
  country?: CountryResponse | null;
  media?: DestinationMediaResponse[];
  tags?: DestinationTagResponse[];
  translations?: {
    [k: string]: {
      [k: string]: string;
    };
  };
}
/**
 * Schema for destination tag response.
 */
export interface DestinationTagResponse {
  id: number;
  tag_name: string;
}
/**
 * Schema for region/region response.
 */
export interface RegionResponse {
  id: number;
  name: string;
  code?: string | null;
  country_id: number;
  description?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  created_at: string;
}
/**
 * Schema for translation response.
 */
export interface TranslationResponse {
  language_code: string;
  field_name: string;
  translated_text: string;
}
