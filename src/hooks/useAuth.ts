import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticationApi } from '@/lib/api';
import { getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from '@/lib/api/token';
import type { LoginRequest, RegisterRequest } from '@/lib/types';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authenticationApi.getCurrentUserProfile(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authenticationApi.login(data),
    onSuccess: (data) => {
      if (data.access_token) setAccessToken(data.access_token);
      if (data.refresh_token) setRefreshToken(data.refresh_token);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authenticationApi.register(data),
    onSuccess: (data) => {
      if (data.access_token) setAccessToken(data.access_token);
      if (data.refresh_token) setRefreshToken(data.refresh_token);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const rt = getRefreshToken();
      return authenticationApi.logout(rt ? { refresh_token: rt } : undefined);
    },
    onSuccess: () => {
      clearTokens();
      queryClient.setQueryData(['auth', 'me'], null);
      queryClient.clear();
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authenticationApi.forgotPassword({ email }),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (params: { token: string; new_password: string }) => authenticationApi.resetPassword(params),
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) => authenticationApi.verifyEmail({ token }),
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    isForgotRequesting: forgotPasswordMutation.isPending,
    resetPassword: resetPasswordMutation.mutateAsync,
    isResetting: resetPasswordMutation.isPending,
    verifyEmail: verifyEmailMutation.mutateAsync,
    isVerifying: verifyEmailMutation.isPending,
  };
};
