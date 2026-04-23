import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsApi } from "@/lib/api";
import type { ReviewCreate, ReviewUpdate, ReviewModerateRequest } from "@/lib/types";

export const useDestinationReviews = (destinationId: string, page: number = 1) => {
  return useQuery({
    queryKey: ["reviews", "destination", destinationId, page],
    queryFn: () => reviewsApi.getDestinationReviews(destinationId, { page }),
    enabled: !!destinationId,
  });
};

export const useDestinationReviewsSummary = (destinationId: string) => {
  return useQuery({
    queryKey: ["reviews", "summary", destinationId],
    queryFn: () => reviewsApi.getDestinationReviewsSummary(destinationId),
    enabled: !!destinationId,
  });
};

export const useMyReviews = () => {
  return useQuery({
    queryKey: ["reviews", "me"],
    queryFn: () => reviewsApi.getMyReviews(),
  });
};

export const useReviewMutations = () => {
  const queryClient = useQueryClient();

  const createReview = useMutation({
    mutationFn: (data: ReviewCreate) => reviewsApi.createReview(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", "destination", data.destination_id] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "me"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "summary", data.destination_id] });
      queryClient.invalidateQueries({ queryKey: ["destinations", data.destination_id] });
    },
  });

  const deleteReview = useMutation({
    mutationFn: (id: number) => reviewsApi.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
    },
  });

  const updateReview = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ReviewUpdate }) => reviewsApi.updateReview(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "summary", data.destination_id] });
      queryClient.invalidateQueries({ queryKey: ["destinations", data.destination_id] });
    },
  });

  const moderateReview = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ReviewModerateRequest }) => reviewsApi.moderateReview(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "summary", data.destination_id] });
    },
  });

  return {
    createReview,
    deleteReview,
    updateReview,
    moderateReview,
  };
};
