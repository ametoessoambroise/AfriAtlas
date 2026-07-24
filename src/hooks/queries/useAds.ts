import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAdvertisementsForAdmin,
  adminReviewAdvertisement,
  createNewAdvertisement,
  getUserAdvertisements,
  getPublicAds,
  recordAdImpression,
  recordAdClick,
} from "@/lib/api/advertisements";
import { toast } from "sonner";
import type { AdStatus } from "@/lib/api/enums";

// ─── ADMIN HOOKS ─────────────────────────────────────────────────────────────

export function useAdminAds(status?: AdStatus) {
  return useQuery({
    queryKey: ["admin-ads", status],
    queryFn: () => getAllAdvertisementsForAdmin({ status_filter: status }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useReviewAd() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ adId, status }: { adId: string; status: AdStatus }) =>
      adminReviewAdvertisement(adId, { ad_status: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads"] });
      toast.success("Statut de la publicité mis à jour !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la modération.");
    },
  });
}

export function useCreateAd() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Record<string, unknown>) => createNewAdvertisement(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads"] });
      toast.success("Campagne publicitaire créée !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur de création.");
    },
  });
}

// ─── PUBLIC HOOKS ─────────────────────────────────────────────────────────────

/**
 * Hook for public active advertisements.
 */
export function usePublicAds(params?: { page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ["public-ads", params],
    queryFn: () => getPublicAds(params),
    staleTime: 10 * 60 * 1000, // Les pubs sont semi-statiques
  });
}

/**
 * Hook to record ad impressions (silent).
 */
export function useRecordImpression() {
  return useMutation({
    mutationFn: (adId: string) => recordAdImpression(adId),
    onError: (err) => console.error("[ADS] Impression tracking failed:", err),
  });
}

/**
 * Hook to record ad clicks (silent).
 */
export function useRecordClick() {
  return useMutation({
    mutationFn: (adId: string) => recordAdClick(adId),
    onError: (err) => console.error("[ADS] Click tracking failed:", err),
  });
}
