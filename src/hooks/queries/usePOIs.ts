import { useQuery } from '@tanstack/react-query';
import { poiService } from '@/lib/api/pois';
import type { POISearchParams } from '@/lib/types';

export const usePOISearch = (params: POISearchParams) => {
  return useQuery({
    queryKey: ['pois', 'search', params],
    queryFn: () => poiService.search(params),
    enabled: !!(params.name || (params.lat && params.lon)),
  });
};
