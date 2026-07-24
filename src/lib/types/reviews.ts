export interface ReviewUserInfo {
  id: string; // Mis à jour en string (UUID)
  fullname: string;
  avatar_url?: string | null;
}

export interface ReviewCreate {
  /** UUID of a Place (preferred — modern path) */
  place_id?: string;
  /** UUID of a Destination (legacy path — kept for backward compat) */
  destination_id?: string;
  rating: number;
  comment?: string;
}

export interface ReviewUpdate {
  rating?: number;
  comment?: string;
}

export interface ReviewResponse {
  id: number;
  user_id: string; // Mis à jour en string (UUID)
  destination_id: string; // Mis à jour en string (UUID)
  rating: number;
  comment?: string | null;
  created_at: string;
  updated_at?: string | null;
  user?: ReviewUserInfo | null;
}

export interface ReviewListResponse {
  id: number;
  rating: number;
  comment?: string | null;
  created_at: string;
  user: ReviewUserInfo;
}

export interface ReviewModerateRequest {
  is_approved: boolean;
  moderation_notes?: string;
}

export interface DestinationReviewsSummary {
  destination_id: string; // Mis à jour en string (UUID)
  average_rating: number;
  total_reviews: number;
  rating_distribution: Record<number, number>;
}

export interface PaginatedReviewsResponse {
  items: ReviewListResponse[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}
