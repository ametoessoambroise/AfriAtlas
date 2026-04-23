/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

/**
 * Order status enum for order lifecycle.
 */
export type OrderStatus = "pending" | "paid" | "processing" | "completed" | "cancelled" | "refunded";

/**
 * Base schema for orders.
 */
export interface OrderBase {
  /**
   * Shipping address details
   */
  shipping_address?: {
    [k: string]: unknown;
  } | null;
}
/**
 * Schema for confirming an order payment.
 */
export interface OrderConfirmRequest {
  /**
   * Stripe PaymentIntent ID
   */
  payment_intent_id: string;
}
/**
 * Schema for creating a new order.
 */
export interface OrderCreate {
  /**
   * List of items in the order
   */
  items: OrderItemCreate[];
  /**
   * Shipping address details
   */
  shipping_address?: {
    [k: string]: unknown;
  } | null;
}
/**
 * Schema for creating an order item.
 */
export interface OrderItemCreate {
  /**
   * ID of the product
   */
  product_id: string;
  /**
   * Quantity of the product
   */
  quantity: number;
  /**
   * Unit price at time of order
   */
  unit_price: string;
}
/**
 * Schema for order detail with items.
 */
export interface OrderDetailResponse {
  id: string;
  user_id: string;
  status: OrderStatus;
  total_price: string;
  currency: string;
  shipping_address?: {
    [k: string]: unknown;
  } | null;
  stripe_payment_intent_id?: string | null;
  stripe_charge_id?: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItemResponse[];
}
/**
 * Schema for order item response.
 */
export interface OrderItemResponse {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  created_at: string;
}
/**
 * Base schema for order items.
 */
export interface OrderItemBase {
  /**
   * ID of the product
   */
  product_id: string;
  /**
   * Quantity of the product
   */
  quantity: number;
}
/**
 * Schema for order list item.
 */
export interface OrderListResponse {
  id: string;
  user_id: string;
  status: OrderStatus;
  total_price: string;
  currency: string;
  created_at: string;
}
/**
 * Schema for order response.
 */
export interface OrderResponse {
  id: string;
  user_id: string;
  status: OrderStatus;
  total_price: string;
  currency: string;
  shipping_address?: {
    [k: string]: unknown;
  } | null;
  stripe_payment_intent_id?: string | null;
  stripe_charge_id?: string | null;
  created_at: string;
  updated_at: string;
}
/**
 * Schema for updating an order.
 */
export interface OrderUpdate {
  status?: OrderStatus | null;
  shipping_address?: {
    [k: string]: unknown;
  } | null;
}
