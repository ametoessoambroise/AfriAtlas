import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/lib/api";
import { mapDestinationResponseToUi } from "@/lib/mappers/destinationMapper";
import { getErrorMessage } from "@/lib/utils/errorMessages";

export const useDestinations = (params: { page: number; q: string; page_size: number; category?: string }) => {
  const query = useQuery({
    queryKey: ["destinations", params],
    queryFn: async () => {
      const data = await searchApi.searchDestinations(params);
      return data.map(mapDestinationResponseToUi);
    },
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
};

export const useDestination = (slug: string) => {
  // Since there is no direct "getBySlug" in the new API, we search by name/slug
  const query = useQuery({
    queryKey: ["destinations", slug],
    queryFn: async () => {
      const results = await searchApi.searchDestinations({q: slug, page: 1, page_size: 10 });
      if (!results[0]) return null;
      return mapDestinationResponseToUi(results[0]);
    },  
    enabled: !!slug,
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
};

export const useFeaturedDestinations = () => {
  // Using search with empty query as a fallback for "all" or "featured"
  const query = useQuery({
    queryKey: ["destinations", "featured"],
    queryFn: async () => {
      const data = await searchApi.searchDestinations({
        q: "",
        page: 1,
        page_size: 6
      });
      return data.map(mapDestinationResponseToUi);
    },
  });

  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
  };
};
