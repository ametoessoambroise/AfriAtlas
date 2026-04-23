import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { placesApi } from '@/lib/api';
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
  return useQuery({
    queryKey: ['places', params],
    queryFn: () => placesApi.getPlaces(params),
    ...queryDefaults,
  });
};

export const usePlace = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['places', slug],
    queryFn: () => placesApi.getPlace(slug!),
    enabled: Boolean(slug),
    ...queryDefaults,
  });
};

export const usePlaceSearch = (params?: { query?: string; lat?: number; lon?: number; radius?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['places', 'search', params],
    queryFn: () => placesApi.searchPlaces(params),
    enabled: !!(params?.query || (params?.lat && params?.lon)),
    ...queryDefaults,
  });
};

export const usePlaceMutations = () => {
  const queryClient = useQueryClient();

  const createPlace = useMutation({
    mutationFn: (data: PlaceCreate) => placesApi.createNewPlace(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });

  return {
    createPlace,
  };
};
