import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getDashboardStats, 
  listPendingClaims, 
  updateClaimStatus,
  listAllDestinations,
  updateDestination 
} from "@/lib/api/admin";
import { updatePlace } from "@/lib/api/places";
import { getGlobalAnalytics } from "@/lib/api/analytics";
import { toast } from "sonner";
import type * as T from "@/lib/types";


export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => getDashboardStats(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useGlobalAnalytics(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["global-analytics", startDate, endDate],
    queryFn: () => getGlobalAnalytics({ start_date: startDate, end_date: endDate }),
    staleTime: 10 * 60 * 1000,
  });
}


export function useAdminClaims(status?: string, page: number = 1) {
  return useQuery({
    queryKey: ["admin-claims", status, page],
    queryFn: () => listPendingClaims({ 
      page, 
      per_page: 20, 
      ...(status ? { status } : {}) 
    } as any),
    staleTime: 2 * 60 * 1000,
  });
}


export function useUpdateClaimStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: T.ClaimStatusUpdate }) => updateClaimStatus(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-claims"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success("Statut de la revendication mis à jour !");
    },

    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la mise à jour.");
    },
  });           
}

export function useAdminDestinations(page: number = 1, perPage: number = 20) {
  return useQuery({
    queryKey: ["admin-destinations", page, perPage],
    queryFn: () => listAllDestinations({ page, per_page: perPage }),
    staleTime: 2 * 60 * 1000,
  });
}

export function useAdminUpdatePlace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, body }: { slug: string; body: T.PlaceUpdate }) => updatePlace(slug, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
      toast.success("Lieu mis à jour !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur de mise à jour.");
    },
  });
}

export function useUpdateDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: T.DestinationUpdateAdmin }) => updateDestination(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-destinations"] });
      toast.success("Destination mise à jour avec succès !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la modification.");
    },
  });
}
