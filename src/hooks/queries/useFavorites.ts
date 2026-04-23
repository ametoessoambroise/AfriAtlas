import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from '@/lib/api';
import { toast } from 'sonner';
import { mapDestinationResponseToUi } from '@/lib/mappers/destinationMapper';

export const useFavorites = (params?: { page?: number; per_page?: number }) => {
  return useQuery({
    queryKey: ['favorites', params],
    queryFn: async () => {
      const response = await favoritesApi.listUserFavorites(params);
      return {
        ...response,
        items: response.items.map(d => ({
          ...mapDestinationResponseToUi(d),
          isFavorite: true
        }))
      };
    },
  });
};

export const useFavoriteMutations = () => {
  const queryClient = useQueryClient();

  const addFavorite = useMutation({
    mutationFn: (destinationId: string) => favoritesApi.addFavorite(destinationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: (destinationId: string) => favoritesApi.removeFavorite(destinationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });

  return {
    addFavorite,
    removeFavorite,
  };
};
