import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/api/cart";
import { useAuth } from "@/hooks/useAuth";
import type {
  CartDetailResponse,
  CartItemCreate,
  CartItemUpdate,
  CheckoutResponse,
} from "@/lib/types/cart";

export const CART_QUERY_KEY = ["cart"];

/**
 * useCart
 * Hook that provides access to the cart state and mutations.
 * If the user is authenticated, it queries the backend. Otherwise it returns an empty state.
 */
export function useCart() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: cartApi.getCart,
    enabled: isAuthenticated, // Ne lancer la requête que si l'utilisateur est connecté
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const addItemMutation = useMutation({
    mutationFn: (data: CartItemCreate) => cartApi.addItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: CartItemUpdate }) =>
      cartApi.updateItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: () => cartApi.checkout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  // Calculate generic derived values smoothly even if data isn't loaded (so UI doesn't visually break)
  const cartData = cartQuery.data;
  const items = cartData?.items || [];
  const itemCount = cartData?.item_count || 0;
  const totalItems = cartData?.total_items || 0;
  const subtotal = Number(cartData?.subtotal || 0);

  return {
    ...cartQuery,
    items,
    itemCount,
    totalItems,
    subtotal,
    // Mutations (we expose them as simpler functions or raw mutations based on preference)
    addItem: addItemMutation.mutateAsync,
    isAdding: addItemMutation.isPending,

    updateItem: updateItemMutation.mutateAsync,
    isUpdating: updateItemMutation.isPending,

    removeItem: removeItemMutation.mutateAsync,
    isRemoving: removeItemMutation.isPending,

    clearCart: clearCartMutation.mutateAsync,
    isClearing: clearCartMutation.isPending,

    checkout: checkoutMutation.mutateAsync,
    isCheckingOut: checkoutMutation.isPending,
  };
}
