import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as deliveryApi from "@/lib/api/delivery";
import type {
  DeliveryAddressCreate,
  DeliveryAddressUpdate,
  DeliveryFeeEstimateRequest,
  DeliveryFeeEstimateResponse,
} from "@/lib/types/delivery";

export const DELIVERY_KEYS = {
  addresses: ["delivery", "addresses"],
  defaults: ["delivery", "addresses", "default"],
  preferences: ["delivery", "preferences"],
};

export function useDelivery() {
  const queryClient = useQueryClient();

  const addressesQuery = useQuery({
    queryKey: DELIVERY_KEYS.addresses,
    queryFn: deliveryApi.listAddresses,
  });

  const defaultAddressQuery = useQuery({
    queryKey: DELIVERY_KEYS.defaults,
    queryFn: deliveryApi.getDefaultAddress,
  });

  const createAddressMutation = useMutation({
    mutationFn: (data: DeliveryAddressCreate) => deliveryApi.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DELIVERY_KEYS.addresses });
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: DeliveryAddressUpdate }) =>
      deliveryApi.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DELIVERY_KEYS.addresses });
    },
  });

  const estimateFeeMutation = useMutation<
    DeliveryFeeEstimateResponse, 
    Error, 
    DeliveryFeeEstimateRequest
  >({
    mutationFn: (data: DeliveryFeeEstimateRequest) => deliveryApi.estimateFee(data),
  });

  return {
    addresses: addressesQuery.data || [],
    isLoadingAddresses: addressesQuery.isLoading,
    defaultAddress: defaultAddressQuery.data,
    
    createAddress: createAddressMutation.mutateAsync,
    isCreatingAddress: createAddressMutation.isPending,
    
    updateAddress: updateAddressMutation.mutateAsync,
    isUpdatingAddress: updateAddressMutation.isPending,
    
    estimateFee: estimateFeeMutation.mutateAsync,
    isEstimating: estimateFeeMutation.isPending,
  };
}
