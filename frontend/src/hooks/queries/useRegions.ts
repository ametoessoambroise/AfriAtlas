import { useQuery } from '@tanstack/react-query';
import { regionsApi } from '@/lib/api';

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () => regionsApi.listCountries(),
  });
};

export const useRegions = (countryCode: string) => {
  return useQuery({
    queryKey: ['regions', countryCode],
    queryFn: () => regionsApi.listRegionsByCountry(countryCode),
    enabled: !!countryCode,
  });
};
