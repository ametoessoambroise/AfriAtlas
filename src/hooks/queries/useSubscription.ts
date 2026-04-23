import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listSubscriptionPlans,
  subscribeToPlan,
  cancelUserSubscription,
  upgradeUserSubscription,
  getUserFamilyGroup,
  createUserFamilyGroup,
  inviteFamilyMember,
  removeFamilyMember,
} from "@/lib/api/subscriptions";
import type * as T from "@/lib/types";
import { toast } from "sonner";

// ── Plans ────────────────────────────────────────────────────────────────────

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: listSubscriptionPlans,
    staleTime: 10 * 60 * 1000,
  });
}

// ── Subscribe ─────────────────────────────────────────────────────────────────

export function useSubscribe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.SubscribeRequest) => subscribeToPlan(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Abonnement activé avec succès !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de l'abonnement.");
    },
  });
}

// ── Cancel ────────────────────────────────────────────────────────────────────

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelUserSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Abonnement résilié.");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la résiliation.");
    },
  });
}

// ── Upgrade ───────────────────────────────────────────────────────────────────

export function useUpgradeSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.UpgradeRequest) => upgradeUserSubscription(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success(`Passé au plan ${data.plan_name} !`);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la mise à niveau.");
    },
  });
}

// ── Family Group ──────────────────────────────────────────────────────────────

export function useFamilyGroup() {
  return useQuery({
    queryKey: ["family-group"],
    queryFn: getUserFamilyGroup,
    retry: false,
  });
}

export function useCreateFamilyGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.CreateFamilyGroupRequest) => createUserFamilyGroup(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-group"] });
      toast.success("Groupe familial créé !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la création du groupe.");
    },
  });
}

export function useInviteFamilyMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.InviteFamilyMemberRequest) => inviteFamilyMember(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-group"] });
      toast.success("Invitation envoyée !");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de l'envoi de l'invitation.");
    },
  });
}

export function useRemoveFamilyMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user_id: string) => removeFamilyMember(user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family-group"] });
      toast.success("Membre retiré du groupe.");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la suppression du membre.");
    },
  });
}
