import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionsApi } from '@/lib/api';
import type { SubscribeRequest, UpgradeRequest } from '@/lib/types';

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ['subscriptions', 'plans'],
    queryFn: () => subscriptionsApi.listSubscriptionPlans(),
  });
};

export const useUserSubscription = () => {
  return useQuery({
    queryKey: ['subscriptions', 'me'],
    queryFn: () => subscriptionsApi.getUserSubscription(),
  });
};

export const useSubscriptionMutations = () => {
  const queryClient = useQueryClient();

  const subscribe = useMutation({
    mutationFn: (data: SubscribeRequest) => subscriptionsApi.subscribeToPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', 'me'] });
    },
  });

  const upgrade = useMutation({
    mutationFn: (data: UpgradeRequest) => subscriptionsApi.upgradeUserSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', 'me'] });
    },
  });

  const cancel = useMutation({
    mutationFn: () => subscriptionsApi.cancelUserSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', 'me'] });
    },
  });

  return {
    subscribe,
    upgrade,
    cancel,
  };
};
