/**
 * Cart types derived from Pydantic schemas.
 */

export interface CartItemBase {
  product_id: string; // UUID
  quantity: number;
}

export interface CartItemCreate {
  product_id: string;
  quantity: number;
}

export interface CartItemUpdate {
  quantity: number;
}

export interface CartItemResponse {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number | string; // Decimal representation
  subtotal: number | string;
  added_at: string; // datetime
}

export interface CartItemDetailResponse extends CartItemResponse {
  product_name: string;
  product_description?: string | null;
  product_image_url?: string | null;
  stock_available: number;
  is_available: boolean;
}

export interface CartResponse {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  item_count: number;
  total_items: number;
  subtotal: number | string;
}

export interface CartDetailResponse extends CartResponse {
  items: CartItemDetailResponse[];
}

export interface CartClearRequest {
  confirm: boolean;
}

export interface CheckoutResponse {
  message: string;
  items: any[];
  redirect_to: string;
}

export interface CartSummary {
  item_count: number;
  subtotal: number | string;
}
