import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "@/lib/api/products";
import type * as T from "@/lib/types";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errorHandler";

export function usePlaceProducts(slug: string | null) {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => listProducts(slug!),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000,
  });
}

// Alias for owner dashboard compatibility
export { usePlaceProducts as useProducts };

export function useCreateProduct(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T.ProductCreate) => createProduct(slug, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", slug] });
      toast.success("Produit créé !");
    },
    onError: (err: any) => toast.error(getErrorMessage(err)),
  });
}

export function useUpdateProduct(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: T.ProductUpdate }) =>
      updateProduct(slug, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", slug] });
      toast.success("Produit mis à jour !");
    },
    onError: (err: any) => toast.error(getErrorMessage(err)),
  });
}

export function useDeleteProduct(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(slug, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", slug] });
      toast.success("Produit supprimé.");
    },
    onError: (err: any) => toast.error(getErrorMessage(err)),
  });
}

export function useUploadProductImage(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, file }: { productId: string; file: File }) => {
      const fd = new FormData();
      fd.append("file", file);
      return uploadProductImage(slug, productId, fd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", slug] });
      toast.success("Image ajoutée !");
    },
    onError: (err: any) => toast.error(getErrorMessage(err)),
  });
}
