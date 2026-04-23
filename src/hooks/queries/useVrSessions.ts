import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vrSessionsApi } from "@/lib/api";
import { toast } from "sonner";
import type * as T from "@/lib/types";

export function useVrSessions(slug?: string) {
  return useQuery({
    queryKey: ["vr-sessions", slug],
    queryFn: () => vrSessionsApi.listVrSessions(slug ? { slug } : undefined),
  });
}

export function useVrSession(sessionId: string) {
  return useQuery({
    queryKey: ["vr-sessions", sessionId],
    queryFn: () => vrSessionsApi.getVrSession(sessionId),
    enabled: !!sessionId,
  });
}

export function useBookVrSession(sessionId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ body, slug }: { body: T.VRBookingCreate; slug: string }) => 
      vrSessionsApi.bookVrSession(sessionId, body, { slug }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["vr-sessions"] });
      toast.success("Réservation effectuée avec succès !");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de la réservation.");
    }
  });
}

export function useCreateVrSession(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.VRSessionCreate) => vrSessionsApi.createVrSession(body, { slug }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vr-sessions", slug] });
      toast.success("Session VR créée !");
    },
    onError: (err: any) => toast.error(err?.message || "Erreur création session."),
  });
}

export function useUpdateVrSession(slug: string, sessionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.VRSessionUpdate) => vrSessionsApi.updateVrSession(sessionId, body, { slug }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vr-sessions", slug] });
      queryClient.invalidateQueries({ queryKey: ["vr-sessions", sessionId] });
      toast.success("Session mise à jour !");
    },
    onError: (err: any) => toast.error(err?.message || "Erreur modification session."),
  });
}

export function useDeleteVrSession(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => vrSessionsApi.deleteVrSession(sessionId, { slug }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vr-sessions", slug] });
      toast.success("Session supprimée.");
    },
    onError: (err: any) => toast.error(err?.message || "Erreur suppression session."),
  });
}

export function useVrSessionBookings(sessionId: string) {
  return useQuery({
    queryKey: ["vr-sessions", sessionId, "bookings"],
    queryFn: () => vrSessionsApi.listVrBookings(sessionId),
    enabled: !!sessionId,
  });
}

export function useUpdateVrAttendance(sessionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookingId, attended }: { bookingId: string; attended: boolean }) =>
      vrSessionsApi.updateAttendance(sessionId, bookingId, attended),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vr-sessions", sessionId, "bookings"] });
    },
    onError: (err: any) => toast.error(err?.message || "Erreur mise à jour présence."),
  });
}
