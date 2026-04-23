import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClaim, updateClaim, listClaims, createClaim } from "@/lib/api/owner";
import { getPlaceAnalytics } from "@/lib/api/analytics";
import { vrSessionsApi } from "@/lib/api";
import type * as T from "@/lib/types";
import { toast } from "sonner";

export function useCreateClaim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.PlaceClaimCreate) => createClaim(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-claims"] });
      toast.success("Demande de revendication envoyée avec succès !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de l'envoi de la demande.");
    },
  });
}


// ── Owner Claims list ─────────────────────────────────────────────────────────
export function useOwnerClaims() {
  return useQuery({
    queryKey: ["owner-claims"],
    queryFn: () => listClaims({ per_page: 50 }),
    staleTime: 5 * 60 * 1000,
  });
}

// ── Single claim ──────────────────────────────────────────────────────────────


export function useOwnerClaim(id: string) {
  return useQuery({
    queryKey: ["owner-claim", id],
    queryFn: () => getClaim(id),
    enabled: !!id,
  });
}

export function useUpdateClaim(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.PlaceClaimUpdate) => updateClaim(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-claim", id] });
      queryClient.invalidateQueries({ queryKey: ["owner-claims"] });
      toast.success("Modifications enregistrées !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la sauvegarde.");
    },
  });
}

// ── Place Analytics ───────────────────────────────────────────────────────────
export function usePlaceAnalytics(slug: string | null) {
  return useQuery({
    queryKey: ["place-analytics", slug],
    queryFn: () => getPlaceAnalytics(slug!),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000,
  });
}

// ── Recent VR Bookings for owner ─────────────────────────────────────────────
export function useOwnerRecentBookings() {
  return useQuery({
    queryKey: ["owner-recent-bookings"],
    queryFn: () => vrSessionsApi.listVrSessions(),
    staleTime: 2 * 60 * 1000,
  });
}

