import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errorMessages";
import type * as T from "@/lib/types";

export function useBookings(status_filter?: T.BookingStatus | null, page = 1) {
  const query = useQuery({
    queryKey: ["bookings", { status_filter, page }],
    queryFn: () => bookingsApi.getUserBookings({ status_filter, page }),
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
}

export function useBookingDetail(bookingId: string) {
  const query = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => bookingsApi.getBookingDetail(bookingId),
    enabled: !!bookingId,
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bookingId: string) => bookingsApi.cancelUserBooking(bookingId),
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", bookingId] });
      toast.success("Réservation annulée.");
    },
  });

  return {
    ...mutation,
    cancel: mutation.mutateAsync,
    isCancelling: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
}
