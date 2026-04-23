import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { albumsApi } from "@/lib/api";
import type {
  AlbumCreate,
  AlbumUpdate,
  AlbumPlaceCreate,
  AlbumImageCreate,
} from "@/lib/types";

export const useAlbums = () => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: () => albumsApi.getUserAlbums(),
  });
};

export const useAlbum = (id: string) => {
  return useQuery({
    queryKey: ["albums", id],
    queryFn: () => albumsApi.getAlbumDetail(id),
    enabled: !!id,
  });
};

export const useAlbumMutations = () => {
  const queryClient = useQueryClient();

  const createAlbum = useMutation({
    mutationFn: (data: AlbumCreate) => albumsApi.createNewAlbum(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });

  const updateAlbum = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AlbumUpdate }) =>
      albumsApi.updateAlbum(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["albums", data.id] });
    },
  });

  const deleteAlbum = useMutation({
    mutationFn: (id: string) => albumsApi.deleteAlbum(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });

  const addPlaceToAlbum = useMutation({
    mutationFn: ({
      albumId,
      data,
    }: {
      albumId: string;
      data: AlbumPlaceCreate;
    }) => albumsApi.addPlaceToAlbum(albumId, data),
    onSuccess: (_, { albumId }) => {
      queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
    },
  });

  const addImageToAlbum = useMutation({
    mutationFn: ({
      albumId,
      file,
      data,
    }: {
      albumId: string;
      file: File;
      data?: AlbumImageCreate;
    }) => {
      const formData = new FormData();
      formData.append("file", file);

      const params = data
        ? {
            place_id: data.place_id ?? undefined,
            caption: data.caption ?? undefined,
            taken_at: data.taken_at ?? undefined,
            latitude: data.latitude ? Number(data.latitude) : undefined,
            longitude: data.longitude ? Number(data.longitude) : undefined,
          }
        : undefined;

      return albumsApi.uploadAlbumImage(albumId, formData, params);
    },
    onSuccess: (_, { albumId }) => {
      queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
    },
  });

  const uploadAlbumCover = useMutation({
    mutationFn: async ({ albumId, file }: { albumId: string; file: File }) => {
      // 1. Upload the image to the album
      const formData = new FormData();
      formData.append("file", file);
      const imageRes = await albumsApi.uploadAlbumImage(albumId, formData, {
        caption: "Cover Image",
      });

      // 2. Update the album's cover
      return albumsApi.updateAlbum(albumId, { cover_image_url: imageRes.url });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["albums", data.id] });
    },
  });

  return {
    createAlbum,
    updateAlbum,
    deleteAlbum,
    addPlaceToAlbum,
    addImageToAlbum,
    uploadAlbumCover,
  };
};
