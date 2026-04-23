/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Schema for creating a place claim.
 */
export interface PlaceClaimCreate {
  place_name: string;
  category?: string;
  google_place_id?: string | null;
  /**
   * Google Maps URL to extract coordinates from
   */
  google_maps_link?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  address_street?: string | null;
  address_city?: string | null;
  address_district?: string | null;
  short_description?: string | null;
  specialties?: string | null;
  opening_hours?: string | null;
  phone?: string | null;
  website?: string | null;
  email_contact?: string | null;
  cover_image_url?: string | null;
  extra_photos?: string | null;
  custom_description?: string | null;
  promotion_active?: boolean;
  promotion_text?: string | null;
}
/**
 * Schema for place claim response.
 */
export interface PlaceClaimResponse {
  id: number;
  owner_id: number;
  place_name: string;
  category: string;
  google_place_id?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  address_street?: string | null;
  address_city?: string | null;
  address_district?: string | null;
  short_description?: string | null;
  specialties?: string | null;
  opening_hours?: string | null;
  phone?: string | null;
  website?: string | null;
  email_contact?: string | null;
  cover_image_url?: string | null;
  extra_photos?: string | null;
  custom_description?: string | null;
  promotion_active: boolean;
  promotion_text?: string | null;
  status: string;
  admin_notes?: string | null;
  created_at: string;
  verified_at?: string | null;
  updated_at: string;
}
/**
 * Schema for updating place claim status (admin only).
 */
export interface PlaceClaimStatusUpdate {
  status: string;
  admin_notes?: string | null;
}
/**
 * Schema for updating a place claim.
 */
export interface PlaceClaimUpdate {
  place_name?: string | null;
  category?: string | null;
  short_description?: string | null;
  specialties?: string | null;
  opening_hours?: string | null;
  phone?: string | null;
  website?: string | null;
  email_contact?: string | null;
  cover_image_url?: string | null;
  extra_photos?: string | null;
  custom_description?: string | null;
  promotion_active?: boolean | null;
  promotion_text?: string | null;
}
