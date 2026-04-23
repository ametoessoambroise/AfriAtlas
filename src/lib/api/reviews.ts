import { getApiBaseUrl } from "./env";
import { getAccessToken } from "./token";
import { ApiError } from "./error-handler";
import type { 
  ReviewCreate, 
  ReviewUpdate, 
  ReviewResponse, 
  ReviewModerateRequest,
  DestinationReviewsSummary,
  PaginatedReviewsResponse
} from "../types/reviews";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${getApiBaseUrl()}/api/v1${path}`;
  const token = getAccessToken();
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(res.status, text, url, "REVIEWS");
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

/**
 * Créer un avis
 */
export async function createReview(data: ReviewCreate): Promise<ReviewResponse> {
  return request<ReviewResponse>("/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Lister avis d'une destination (paginé)
 */
export async function getDestinationReviews(
  destinationId: string, 
  params?: { page?: number; per_page?: number }
): Promise<PaginatedReviewsResponse> {
  const qs = params ? `?${new URLSearchParams(params as any)}` : "";
  // Route corrigée pour correspondre au prefix /reviews du backend
  return request<PaginatedReviewsResponse>(`/reviews/destinations/${destinationId}/reviews${qs}`);
}

/**
 * Résumé des notes d'une destination
 */
export async function getDestinationReviewsSummary(destinationId: string): Promise<DestinationReviewsSummary> {
  // Route corrigée pour correspondre au prefix /reviews du backend
  return request<DestinationReviewsSummary>(`/reviews/destinations/${destinationId}/reviews/summary`);
}

/**
 * Mes avis
 */
export async function getMyReviews(): Promise<ReviewResponse[]> {
  return request<ReviewResponse[]>("/users/me/reviews");
}

/**
 * Modifier mon avis
 */
export async function updateReview(id: number, data: ReviewUpdate): Promise<ReviewResponse> {
  return request<ReviewResponse>(`/reviews/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Supprimer mon avis
 */
export async function deleteReview(id: number): Promise<void> {
  await request<void>(`/reviews/${id}`, {
    method: "DELETE",
  });
}

/**
 * Modération (admin)
 */
export async function moderateReview(id: number, data: ReviewModerateRequest): Promise<ReviewResponse> {
  return request<ReviewResponse>(`/admin/reviews/${id}/moderate`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
