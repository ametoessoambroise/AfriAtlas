/**
 * ANALYTICS Types — WorldAtlas Travel
 * ================================
 * Based on Pydantic schemas.
 */

export interface TimeSeriesPoint {
  date: string;
  views: number;
  unique_visitors: number;
}

export interface PlaceAnalyticsResponse {
  place_id: string;
  place_name: string;
  slug: string;

  // Overview stats
  total_views: number;
  unique_visitors: number;
  avg_time_spent_seconds?: number | null;
  bounce_rate?: number | null;

  // Review stats
  reviews_count: number;
  average_rating: string | number; // Decimal often comes as string in JSON

  // Conversion stats
  click_through_count: number;
  booking_count: number;
  conversion_rate?: number | null;

  // Geographic distribution (country -> count)
  visitors_by_country: Record<string, number>;

  // Time series data (optional, if date range provided)
  time_series?: TimeSeriesPoint[] | null;

  // Comparison to previous period
  views_change_percent?: number | null;
  visitors_change_percent?: number | null;
}

export interface GlobalMetricsResponse {
  total_destinations: number;
  total_places: number;
  total_users: number;
  total_reviews: number;
  total_bookings: number;

  // Activity metrics
  active_users_today: number;
  active_users_this_week: number;
  active_users_this_month: number;

  // Content metrics
  new_destinations_this_month: number;
  new_reviews_this_week: number;

  // Engagement metrics
  avg_session_duration_seconds?: number | null;
  total_page_views_today: number;
}

export interface GlobalAnalyticsResponse {
  period: "day" | "week" | "month" | "year" | "all";
  start_date?: string | null;
  end_date?: string | null;

  // Main metrics
  metrics: GlobalMetricsResponse;

  // Trends (comparison to previous period)
  metrics_change: Record<string, number>;

  // Top performing items
  top_destinations: any[];
  top_places: any[];

  // Geographic data
  top_countries: any[];
}

export interface UserVisitItem {
  id: string;
  visit_type: string;
  visited_at: string;

  // Related entity info
  entity_id?: string | null;
  entity_type?: "destination" | "place" | "product" | "vr_session" | null;
  entity_name?: string | null;

  // Visit details
  duration_seconds?: number | null;
  source?: string | null;
}

export interface UserVisitHistoryResponse {
  user_id: string;
  total_visits: number;
  unique_entities: number;

  // Recent visits (paginated)
  visits: UserVisitItem[];

  // Summary stats
  favorite_categories: any[];
  visits_by_month: any[];
}

export interface VisitRecordRequest {
  entity_type: "destination" | "place" | "product" | "vr_session";
  entity_id: string;
  visit_type?: "view" | "click" | "booking" | "purchase";
  duration_seconds?: number | null;
  source?: string;
  referrer?: string | null;
}

export interface VisitRecordResponse {
  visit_id: string;
  recorded: boolean;
  timestamp: string;
}

export interface AnalyticsFilter {
  start_date?: string | null;
  end_date?: string | null;
  period?: "day" | "week" | "month" | "year" | "all";
}
