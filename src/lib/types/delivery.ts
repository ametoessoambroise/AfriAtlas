/**
 * Delivery Types — WorldAtlas Travel
 * Mapped from backend Pydantic schemas.
 */

export type DeliveryStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "out_for_delivery"
  | "nearby"
  | "delivered"
  | "cancelled"
  | "failed";

export type DeliveryType = "standard" | "express" | "locker";
export type ZoneType = "urban" | "suburban" | "rural" | "remote";

export interface DeliveryAddressBase {
  label: string;
  recipient_name: string;
  recipient_phone?: string;
  recipient_email?: string;
  street_address: string;
  apartment?: string;
  neighborhood?: string;
  city: string;
  region?: string;
  postal_code?: string;
  country: string;
  delivery_instructions?: string;
  access_code?: string;
}

export interface DeliveryAddressCreate extends DeliveryAddressBase {
  is_default?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface DeliveryAddressUpdate extends Partial<DeliveryAddressBase> {
  is_default?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface DeliveryAddressResponse extends DeliveryAddressBase {
  id: string;
  user_id: string;
  is_default: boolean;
  latitude?: number;
  longitude?: number;
  is_validated: boolean;
  formatted_address?: string;
  created_at: string;
  updated_at: string;
  last_used_at?: string;
}

export interface DeliveryAddressListResponse {
  id: string;
  label: string;
  is_default: boolean;
  recipient_name: string;
  recipient_phone?: string;
  city: string;
  street_address: string;
  latitude?: number;
  longitude?: number;
}

export interface PackageDimensions {
  length: number;
  width: number;
  height: number;
}

export interface DeliveryRequestCreate {
  order_id: string;
  address_id: string;
  delivery_type?: DeliveryType;
  requested_date?: string;
  weight_kg?: number;
  dimensions_cm?: PackageDimensions;
  package_count?: number;
  is_fragile?: boolean;
  requires_signature?: boolean;
}

export interface DeliveryFeeEstimateRequest {
  address_id: string;
  order_total: number;
  weight_kg?: number;
  delivery_type?: DeliveryType;
}

export interface DeliveryFeeEstimateResponse {
  zone_id?: string;
  zone_name?: string;
  base_fee: number;
  distance_fee: number;
  weight_fee: number;
  express_fee: number;
  total_fee: number;
  free_delivery_applied: boolean;
  currency: string;
  estimated_days_min: number;
  estimated_days_max: number;
  distance_km?: number;
  available: boolean;
}

export interface DeliveryRequestResponse {
  id: string;
  order_id: string;
  address_id?: string;
  zone_id?: string;
  delivery_type: DeliveryType;
  status: DeliveryStatus;
  weight_kg: number;
  package_count: number;
  is_fragile: boolean;
  requires_signature: boolean;
  
  // Pricing
  base_fee: number;
  distance_fee: number;
  weight_fee: number;
  express_fee: number;
  total_fee: number;
  currency: string;
  
  // Tracking
  tracking_number?: string;
  qr_code?: string;
  distance_km?: number;
  estimated_duration_minutes?: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  delivered_at?: string;
}

export interface DeliveryPreferences {
  id: string;
  user_id: string;
  preferred_delivery_type: DeliveryType;
  preferred_time_window?: "morning" | "afternoon" | "evening";
  notify_sms: boolean;
  notify_email: boolean;
  default_address_id?: string;
}
