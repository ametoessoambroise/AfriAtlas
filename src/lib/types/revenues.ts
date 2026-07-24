import { RevenuePeriod, PaymentStatus } from "../api/enums";

/** Base schema for owner revenue. */
export interface OwnerRevenueBase {
  period_type: RevenuePeriod;
  period_start: string;
  period_end: string;
  period_label: string;
}

/** Schema for creating owner revenue record. */
export interface OwnerRevenueCreate extends OwnerRevenueBase {
  owner_id: number;
  booking_revenue: number;
  order_revenue: number;
  total_revenue: number;
  platform_fee_rate: number;
  platform_fees: number;
  net_revenue: number;
  bookings_count: number;
  orders_count: number;
  total_transactions: number;
}

/** Schema for updating owner revenue (admin only). */
export interface OwnerRevenueUpdate {
  payment_status?: PaymentStatus;
  payment_method?: string | null;
  payment_reference?: string | null;
  admin_notes?: string | null;
}

/** Schema for owner revenue response. */
export interface OwnerRevenueResponse extends OwnerRevenueBase {
  id: number;
  owner_id: number;
  booking_revenue: number;
  order_revenue: number;
  total_revenue: number;
  platform_fee_rate: number;
  platform_fees: number;
  net_revenue: number;
  bookings_count: number;
  orders_count: number;
  total_transactions: number;
  payment_status: PaymentStatus;
  payment_method: string | null;
  payment_reference: string | null;
  paid_at: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  period_display: string;
  status_label: string;
}

/** Lightweight schema for listing owner revenues. */
export interface OwnerRevenueListResponse {
  id: number;
  owner_id: number;
  period_label: string;
  period_type: RevenuePeriod;
  total_revenue: number;
  net_revenue: number;
  payment_status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
}

/** Summary of owner revenues for a specific period. */
export interface OwnerRevenueSummary {
  owner_id: number;
  owner_name: string;
  owner_email: string;
  total_booking_revenue: number;
  total_order_revenue: number;
  total_gross_revenue: number;
  total_platform_fees: number;
  total_net_revenue: number;
  total_bookings: number;
  total_orders: number;
  total_transactions: number;
  pending_revenue: number;
  pending_count: number;
}

/** Statistics for owner revenues (admin dashboard). */
export interface OwnerRevenueStats {
  total_owners: number;
  total_revenue_periods: number;
  total_gross_revenue: number;
  total_platform_fees: number;
  total_net_paid_to_owners: number;
  pending_count: number;
  pending_amount: number;
  processing_count: number;
  processing_amount: number;
  paid_count: number;
  paid_amount: number;
  failed_count: number;
  failed_amount: number;
  current_month_revenue: number;
  previous_month_revenue: number;
  growth_percentage: number;
}

/** Schema for revenue transaction response. */
export interface OwnerRevenueTransactionResponse {
  id: number;
  revenue_id: number;
  owner_id: number;
  transaction_type: "booking" | "order";
  transaction_id: number;
  transaction_reference: string | null;
  gross_amount: number;
  platform_fee: number;
  net_amount: number;
  transaction_date: string;
  created_at: string;
}
