import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { placesApi } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils/errorMessages';
import type { PlaceCreate } from '@/lib/types';

const queryDefaults = {
  staleTime: 2 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  retry: 1,
  refetchOnWindowFocus: false,
} as const;

export const usePlaces = (params?: { 
  category?: string; 
  city?: string; 
  budget_range?: string; 
  season?: string; 
  status?: string; 
  is_featured?: boolean; 
  query?: string;
  sort_by?: string;
  page?: number; 
  page_size?: number 
}) => {
  const query = useQuery({
    queryKey: ['places', params],
    queryFn: () => placesApi.getPlaces(params),
    ...queryDefaults,
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
};

export const usePlace = (slug: string | undefined) => {
  const query = useQuery({
    queryKey: ['places', slug],
    queryFn: () => placesApi.getPlace(slug!),
    enabled: Boolean(slug),
    ...queryDefaults,
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
};

export const usePlaceSearch = (params?: { query?: string; lat?: number; lon?: number; radius?: number; limit?: number }) => {
  const query = useQuery({
    queryKey: ['places', 'search', params],
    queryFn: () => placesApi.searchPlaces(params),
    enabled: !!(params?.query || (params?.lat && params?.lon)),
    ...queryDefaults,
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
};

export const usePlaceMutations = () => {
  const queryClient = useQueryClient();

  const createPlaceMutation = useMutation({
    mutationFn: (data: PlaceCreate) => placesApi.createNewPlace(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });

  return {
    createPlace: createPlaceMutation.mutateAsync,
    isCreating: createPlaceMutation.isPending,
    createError: createPlaceMutation.error ? getErrorMessage(createPlaceMutation.error) : null,
  };
};
