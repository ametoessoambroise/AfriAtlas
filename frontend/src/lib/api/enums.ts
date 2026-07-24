/**
 * Afriatlas API — Union Types (Enums OpenAPI)
 * AUTO-GENERATED — Ne pas modifier manuellement.
 */

/** Advertisement status enum for ad lifecycle. */
export type AdStatus = "draft" | "active" | "paused" | "completed" | "rejected";

/** Booking status enum for reservation lifecycle. */
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

/** Budget range enum for price categorization. */
export type BudgetRange = "budget" | "moderate" | "expensive" | "luxury";

/** Order status enum for order lifecycle. */
export type OrderStatus = "pending" | "paid" | "processing" | "completed" | "cancelled" | "refunded";

/** Payment status for revenue cycles. */
export type PaymentStatus = "pending" | "processing" | "paid" | "failed";

/** Revenue period type for aggregation. */
export type RevenuePeriod = "monthly" | "quarterly" | "yearly";

/** Place category enum for establishment types.

This enum provides predefined categories, but the database column allows
custom user-defined categories as well. Use the enum values as defaults,
but users can specify any string value for custom categories. */
export type PlaceCategory = "museum" | "park" | "hotel" | "restaurant" | "vr_room" | "market" | "boutique" | "supermarket" | "cafe" | "bar" | "beach" | "monument" | "activity" | "other";

/** Place status enum for publication workflow. */
export type PlaceStatus = "draft" | "published" | "archived";

/** Season enum for best visit times. */
export type Season = "spring" | "summer" | "autumn" | "winter" | "year_round";

/** Storage provider enum for file uploads. */
export type StorageProvider = "local" | "cloudinary";

/** Visit type enum for analytics tracking. */
export type VisitType = "view" | "favorite" | "review" | "booking" | "order";
