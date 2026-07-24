import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recommendationsApi } from '@/lib/api';

export const useUserRecommendations = (params?: { limit?: number }) => {
  return useQuery({
    queryKey: ['recommendations', 'user', params],
    queryFn: () => recommendationsApi.getUserRecommendations(params),
  });
};

export const useTrendingPlaces = (params?: { limit?: number }) => {
  return useQuery({
    queryKey: ['recommendations', 'trending', params],
    queryFn: () => recommendationsApi.getTrendingPlaces(params),
  });
};

export const useSimilarPlaces = (slug: string, params?: { limit?: number }) => {
  return useQuery({
    queryKey: ['recommendations', 'similar', slug, params],
    queryFn: () => recommendationsApi.getSimilarPlaces(slug, params),
    enabled: !!slug,
  });
};
