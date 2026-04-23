import { useQuery } from '@tanstack/react-query';
import { listVrSessions, getVrSession } from '@/lib/api/vr_sessions';

export const useVREvents = () => {
  return useQuery({
    queryKey: ['vr-events'],
    queryFn: () => listVrSessions(),
  });
};

export const useVREvent = (id: string) => {
  return useQuery({
    queryKey: ['vr-events', id],
    queryFn: () => getVrSession(id),
    enabled: !!id,
  });
};
