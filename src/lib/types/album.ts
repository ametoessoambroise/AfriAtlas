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
 * Place status enum for publication workflow.
 */
export type PlaceStatus = "draft" | "published" | "archived";
/**
 * Storage provider enum for file uploads.
 */
export type StorageProvider = "local" | "cloudinary";

/**
 * Schema for creating a travel album.
 */
export interface AlbumCreate {
  title: string;
  description?: string | null;
  is_public?: boolean;
}
/**
 * Schema for album description generation response.
 */
export interface AlbumDescriptionResponse {
  description: string;
  suggested_title?: string | null;
  keywords?: string[];
}
/**
 * Schema for album detail with places and images.
 */
export interface AlbumDetailResponse {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  is_public: boolean;
  cover_image_url?: string | null;
  created_at: string;
  updated_at: string;
  places?: AlbumPlaceResponse[];
  images?: AlbumImageResponse[];
}
/**
 * Schema for album place response.
 */
export interface AlbumPlaceResponse {
  id: string;
  album_id: string;
  place_id: string;
  note?: string | null;
  visited_at?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  added_at: string;
  place?: PlaceListResponse | null;
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
  status: PlaceStatus;
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
  [k: string]: unknown;
}
/**
 * Schema for album image response.
 */
export interface AlbumImageResponse {
  id: string;
  album_id: string;
  place_id?: string | null;
  url: string;
  storage_provider: string;
  cloudinary_public_id?: string | null;
  caption?: string | null;
  taken_at?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  created_at: string;
}
/**
 * Schema for uploading an image to an album.
 */
export interface AlbumImageCreate {
  place_id?: string | null;
  caption?: string | null;
  taken_at?: string | null;
  latitude?: string | null;
  longitude?: string | null;
}
/**
 * Schema for album list item.
 */
export interface AlbumListResponse {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  is_public: boolean;
  cover_image_url?: string | null;
  created_at: string;
  updated_at: string;
  place_count?: number;
  image_count?: number;
}
/**
 * Schema for adding a place to an album.
 */
export interface AlbumPlaceCreate {
  place_id: string;
  note?: string | null;
  visited_at?: string | null;
  latitude?: string | null;
  longitude?: string | null;
}
/**
 * Schema for album response.
 */
export interface AlbumResponse {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  is_public: boolean;
  cover_image_url?: string | null;
  created_at: string;
  updated_at: string;
}
/**
 * Schema for generating album story.
 */
export interface AlbumStoryGenerateRequest {
  /**
   * Tone of the story: adventure, romantic, family, or humorous
   */
  tone?: string;
  /**
   * Length: short (150-250 words), medium (300-500), long (600-800)
   */
  length?: string;
  /**
   * Language: fr (French) or en (English)
   */
  language?: string;
}
/**
 * Schema for album story response.
 */
export interface AlbumStoryResponse {
  story: string;
  generated_at: string;
  tokens_used?: number;
}
/**
 * Schema for streaming story chunks (SSE).
 */
export interface AlbumStoryStreamChunk {
  chunk?: string | null;
  done?: boolean;
}
/**
 * Schema for updating a travel album.
 */
export interface AlbumUpdate {
  title?: string | null;
  description?: string | null;
  is_public?: boolean | null;
  cover_image_url?: string | null;
}
