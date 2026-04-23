import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api";
import { toast } from "sonner";
import type * as T from "@/lib/types";

export function useBookings(status_filter?: T.BookingStatus | null, page = 1) {
  return useQuery({
    queryKey: ["bookings", { status_filter, page }],
    queryFn: () => bookingsApi.getUserBookings({ status_filter, page }),
  });
}

export function useBookingDetail(bookingId: string) {
  return useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => bookingsApi.getBookingDetail(bookingId),
    enabled: !!bookingId,
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) => bookingsApi.cancelUserBooking(bookingId),
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", bookingId] });
      toast.success("Réservation annulée.");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de l'annulation.");
    },
  });
}
