/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Place category enum for establishment types.
 *
 * This enum provides predefined categories, but the database column allows
 * custom user-defined categories as well. Use the enum values as defaults,
 * but users can specify any string value for custom categories.
 */
export type PlaceCategory =
  | "museum"
  | "park"
  | "hotel"
  | "restaurant"
  | "vr_room"
  | "market"
  | "boutique"
  | "supermarket"
  | "cafe"
  | "bar"
  | "beach"
  | "monument"
  | "activity"
  | "other";
/**
 * Budget range enum for price categorization.
 */
export type BudgetRange = "budget" | "moderate" | "expensive" | "luxury";
/**
 * Season enum for best visit times.
 */
export type Season = "spring" | "summer" | "autumn" | "winter" | "year_round";
/**
 * Place status enum for publication workflow.
 */
export type PlaceStatus = "draft" | "published" | "archived";
/**
 * Place status enum for publication workflow.
 */
export type PlaceStatus1 = "draft" | "published" | "archived";
/**
 * Storage provider enum for file uploads.
 */
export type StorageProvider = "local" | "cloudinary";

/**
 * Base place schema with common fields.
 */
export interface PlaceBase {
  name: string;
  category: PlaceCategory;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  opening_hours?: string | null;
  price_range?: string | null;
  budget_range?: BudgetRange | null;
  season?: Season | null;
  /**
   * List of facilities/services (e.g. 'WiFi', 'Parking', 'Piscine')
   */
  amenities?: string[] | null;
  /**
   * List of keywords/tags (e.g. 'romantique', 'famille', 'aventure')
   */
  tags?: string[] | null;
}
/**
 * Schema for creating a new place.
 */
export interface PlaceCreate {
  name: string;
  category: PlaceCategory;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  opening_hours?: string | null;
  price_range?: string | null;
  budget_range?: BudgetRange | null;
  season?: Season | null;
  /**
   * List of facilities/services (e.g. 'WiFi', 'Parking', 'Piscine')
   */
  amenities?: string[] | null;
  /**
   * List of keywords/tags (e.g. 'romantique', 'famille', 'aventure')
   */
  tags?: string[] | null;
  status?: PlaceStatus;
}
/**
 * Schema for filtering places.
 */
export interface PlaceFilter {
  category?: PlaceCategory | null;
  status?: PlaceStatus1 | null;
  city?: string | null;
  budget_range?: BudgetRange | null;
  season?: Season | null;
  is_featured?: boolean | null;
  owner_id?: string | null;
  page?: number;
  page_size?: number;
}
/**
 * Base schema for place images.
 */
export interface PlaceImageBase {
  alt_text?: string | null;
  display_order?: number;
  is_primary?: boolean;
}
/**
 * Schema for place image response.
 */
export interface PlaceImageResponse {
  alt_text?: string | null;
  display_order?: number;
  is_primary?: boolean;
  id: string;
  place_id: string;
  url: string;
  storage_provider: StorageProvider;
  cloudinary_public_id?: string | null;
  uploaded_by?: string | null;
  created_at: string;
}
/**
 * Schema for image upload response.
 */
export interface PlaceImageUploadResponse {
  id: string;
  place_id: string;
  url: string;
  storage_provider: StorageProvider;
  is_primary: boolean;
  created_at: string;
}
/**
 * Schema for place list item (without nested relationships).
 */
export interface PlaceListResponse {
  id: string;
  slug: string;
  name: string;
  category: PlaceCategory;
  description?: string | null;
  city?: string | null;
  country?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  status: PlaceStatus1;
  view_count: number;
  rating_avg: string;
  rating_count: number;
  is_featured: boolean;
  created_at: string;
  primary_image?: PlaceImageResponse | null;
  amenities?: string[] | null;
  tags?: string[] | null;
  has_catalog: boolean;
}
/**
 * Schema for nearby places request.
 */
export interface PlaceNearbyRequest {
  lat: number;
  lon: number;
  radius?: number;
  limit?: number;
}
/**
 * Product embedded in place detail (includes images for hotel / menus).
 */
export interface PlaceNestedProduct {
  id: string;
  place_id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  tags?: string[] | null;
  price: string;
  stock: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  images?: ProductImageResponse[];
}
/**
 * Schema for product image response.
 */
export interface ProductImageResponse {
  display_order?: number;
  is_primary?: boolean;
  id: string;
  product_id: string;
  url: string;
  storage_provider: StorageProvider;
  cloudinary_public_id?: string | null;
  created_at: string;
}
/**
 * Schema for place owner response (minimal user info).
 */
export interface PlaceOwnerResponse {
  id: string;
  fullname: string;
  email: string;
}
/**
 * Schema for place response with relationships.
 */
export interface PlaceResponse {
  name: string;
  category: PlaceCategory;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  opening_hours?: string | null;
  price_range?: string | null;
  budget_range?: BudgetRange | null;
  season?: Season | null;
  amenities?: string[] | null;
  tags?: string[] | null;
  id: string;
  slug: string;
  status: PlaceStatus1;
  owner_id?: string | null;
  view_count: number;
  rating_avg: string;
  rating_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  owner?: PlaceOwnerResponse | null;
  images?: PlaceImageResponse[];
  products?: PlaceNestedProduct[];
  vr_sessions?: VRSessionResponse[];
  /**
   * True si le lieu peut afficher une page catalogue (hôtel, resto, commerce…).
   */
  has_catalog: boolean;
}
/**
 * Schema for VR session response (nested in place).
 */
export interface VRSessionResponse {
  id: string;
  place_id: string;
  title: string;
  description?: string | null;
  duration_minutes: number;
  price: string;
  currency: string;
  max_participants: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
/**
 * Schema for place search request.
 */
export interface PlaceSearchRequest {
  query?: string | null;
  lat?: number | null;
  lon?: number | null;
  radius?: number | null;
  limit?: number;
}
/**
 * Schema for updating a place (all fields optional).
 */
export interface PlaceUpdate {
  name?: string | null;
  category?: PlaceCategory | null;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  opening_hours?: string | null;
  price_range?: string | null;
  budget_range?: BudgetRange | null;
  season?: Season | null;
  status?: PlaceStatus1 | null;
  /**
   * List of facilities/services (e.g. 'WiFi', 'Parking', 'Piscine')
   */
  amenities?: string[] | null;
  /**
   * List of keywords/tags (e.g. 'romantique', 'famille', 'aventure')
   */
  tags?: string[] | null;
}
