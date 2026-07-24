/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Storage provider enum for file uploads.
 */
export type StorageProvider = "local" | "cloudinary";

/**
 * Base product schema with common fields.
 */
export interface ProductBase {
  name: string;
  description?: string | null;
  category?: string | null;
  tags?: string[] | null;
  price: string;
  stock?: number;
  is_available?: boolean;
}
/**
 * Schema for creating a new product.
 */
export interface ProductCreate {
  name: string;
  description?: string | null;
  category?: string | null;
  tags?: string[] | null;
  price: string;
  stock?: number;
  is_available?: boolean;
}
/**
 * Base schema for product images.
 */
export interface ProductImageBase {
  display_order?: number;
  is_primary?: boolean;
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
 * Schema for product image upload response.
 */
export interface ProductImageUploadResponse {
  id: string;
  product_id: string;
  url: string;
  storage_provider: StorageProvider;
  is_primary: boolean;
  created_at: string;
}
/**
 * Schema for product list item (without nested relationships).
 */
export interface ProductListResponse {
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
  primary_image?: ProductImageResponse | null;
}
/**
 * Schema for product response with relationships.
 */
export interface ProductResponse {
  name: string;
  description?: string | null;
  category?: string | null;
  tags?: string[] | null;
  price: string;
  stock?: number;
  is_available?: boolean;
  id: string;
  place_id: string;
  created_at: string;
  updated_at: string;
  images?: ProductImageResponse[];
}
/**
 * Schema for updating a product (all fields optional).
 */
export interface ProductUpdate {
  name?: string | null;
  description?: string | null;
  category?: string | null;
  tags?: string[] | null;
  price?: string | null;
  stock?: number | null;
  is_available?: boolean | null;
}
