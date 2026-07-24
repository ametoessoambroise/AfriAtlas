import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/lib/api';
import type { UserUpdate, AvatarUpdate } from '@/lib/types';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['users', 'profile'],
    queryFn: () => usersApi.getCurrentUserProfile(),
  });
};

export const useUserDashboard = () => {
  return useQuery({
    queryKey: ['users', 'dashboard'],
    queryFn: () => usersApi.getUserDashboard(),
  });
};

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const updateProfile = useMutation({
    mutationFn: (data: UserUpdate) => usersApi.updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'profile'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });

  const updateAvatar = useMutation({
    mutationFn: (data: AvatarUpdate) => usersApi.updateAvatar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'profile'] });
    },
  });

  const deleteAvatar = useMutation({
    mutationFn: () => usersApi.deleteAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'profile'] });
    },
  });

  return {
    updateProfile,
    updateAvatar,
    deleteAvatar,
  };
};
