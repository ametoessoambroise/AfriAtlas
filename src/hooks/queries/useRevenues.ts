import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/api/revenues";
import type * as T from "@/lib/types";
import { toast } from "sonner";

// ─── ADMIN HOOKS ───────────────────────────────────────────────────────────

/**
 * Hook to list all owner revenues with optional filters
 */
export function useAllOwnerRevenues(params?: {
  period_type?: T.RevenuePeriod;
  payment_status?: T.PaymentStatus;
  start_date?: string;
  end_date?: string;
}) {
  return useQuery({
    queryKey: ["admin", "owner-revenues", params],
    queryFn: () => api.listAllOwnerRevenues(params),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to get global revenue stats for the dashboard
 */
export function useRevenueStats() {
  return useQuery({
    queryKey: ["admin", "revenue-stats"],
    queryFn: () => api.getRevenueStats(),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to get revenue summary for a specific owner
 */
export function useOwnerRevenueSummary(ownerId: number | undefined) {
  return useQuery({
    queryKey: ["admin", "owner-revenue-summary", ownerId],
    queryFn: () => api.getOwnerRevenueDetails(ownerId!),
    enabled: !!ownerId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to list revenue periods for a specific owner
 */
export function useOwnerRevenuePeriods(
  ownerId: number | undefined,
  params?: { period_type?: T.RevenuePeriod; payment_status?: T.PaymentStatus }
) {
  return useQuery({
    queryKey: ["admin", "owner-revenue-periods", ownerId, params],
    queryFn: () => api.listOwnerRevenuePeriods(ownerId!, params),
    enabled: !!ownerId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to update a revenue payment status
 */
export function useUpdateRevenuePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      revenueId,
      data,
    }: {
      revenueId: number;
      data: T.OwnerRevenueUpdate;
    }) => api.updateRevenuePayment(revenueId, data),
    onSuccess: (_, { revenueId }) => {
      toast.success("Statut de paiement mis à jour avec succès");
      queryClient.invalidateQueries({ queryKey: ["admin", "owner-revenues"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "revenue-stats"] });
    },
    onError: (error: any) => {
      toast.error(`Erreur lors de la mise à jour : ${error.message}`);
    },
  });
}

// ─── OWNER HOOKS ───────────────────────────────────────────────────────────

/**
 * Hook for owners to see their own revenues
 */
export function useMyRevenues(params?: {
  period_type?: T.RevenuePeriod;
  payment_status?: T.PaymentStatus;
}) {
  return useQuery({
    queryKey: ["owner", "my-revenues", params],
    queryFn: () => api.getMyRevenues(params),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for owners to see their revenue summary
 */
export function useMyRevenueSummary() {
  return useQuery({
    queryKey: ["owner", "my-revenue-summary"],
    queryFn: () => api.getMyRevenueSummary(),
    staleTime: 5 * 60 * 1000,
  });
}
