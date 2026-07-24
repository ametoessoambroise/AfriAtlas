import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api";
import { toast } from "sonner";
import type * as T from "@/lib/types";

export function useOrders(status_filter?: T.OrderStatus | null, page = 1) {
  return useQuery({
    queryKey: ["orders", { status_filter, page }],
    queryFn: () => ordersApi.getUserOrders({ status_filter, page }),
  });
}

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => ordersApi.getOrderDetail(orderId),
    enabled: !!orderId,
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => ordersApi.cancelUserOrder(orderId),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
      toast.success("Commande annulée avec succès.");
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "Erreur lors de l'annulation de la commande.",
      );
    },
  });
}
