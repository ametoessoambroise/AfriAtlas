import { useQuery, useMutation } from '@tanstack/react-query';
import { analyticsApi } from '@/lib/api';
import type { 
  AnalyticsFilter, 
  VisitRecordRequest 
} from '@/lib/types/analytics';

export const usePlaceAnalytics = (slug: string, params?: { start_date?: string; end_date?: string }) => {
  return useQuery({
    queryKey: ['analytics', 'place', slug, params],
    queryFn: () => analyticsApi.getPlaceAnalytics(slug, params),
    enabled: !!slug,
  });
};

export const useGlobalAnalytics = (params?: AnalyticsFilter) => {
  return useQuery({
    queryKey: ['analytics', 'global', params],
    queryFn: () => analyticsApi.getGlobalAnalytics(params),
  });
};

export const useUserVisitHistory = (params?: { page?: number; per_page?: number }) => {
  return useQuery({
    queryKey: ['analytics', 'visits', params],
    queryFn: () => analyticsApi.getUserVisitHistory(params),
  });
};

export const useAnalyticsMutations = () => {
  const recordVisit = useMutation({
    mutationFn: (body: VisitRecordRequest) => analyticsApi.recordVisit(body),
  });

  return {
    recordVisit,
  };
};
