import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/lib/api';
import { mapDestinationResponseToUi } from '@/lib/mappers/destinationMapper';

export const useDestinations = (params?: { q: string; category?: string }) => {
  return useQuery({
    queryKey: ['destinations', params],
    queryFn: async () => {
      const data = await searchApi.searchDestinations(params || { q: '' });
      return data.map(mapDestinationResponseToUi);
    },
  });
};

export const useDestination = (slug: string) => {
  // Since there is no direct "getBySlug" in the new API, we search by name/slug
  return useQuery({
    queryKey: ['destinations', slug],
    queryFn: async () => {
      const results = await searchApi.searchDestinations({ q: slug });
      if (!results[0]) return null;
      return mapDestinationResponseToUi(results[0]);
    },
    enabled: !!slug,
  });
};

export const useFeaturedDestinations = () => {
  // Using search with empty query as a fallback for "all" or "featured"
  return useQuery({
    queryKey: ['destinations', 'featured'],
    queryFn: async () => {
      const data = await searchApi.searchDestinations({ q: '' });
      return data.map(mapDestinationResponseToUi);
    },
  });
};
