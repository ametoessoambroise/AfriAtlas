import React from "react";
import { Upload, X, CheckCircle2, Loader2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAlbumMutations } from "@/hooks/queries/useAlbums";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { PlaceListResponse } from "@/lib/types";

interface PhotoUploadZoneProps {
  albumId: string;
  associatedPlaces: PlaceListResponse[];
}

interface UploadQueueItem {
  file: File;
  id: string;
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
  placeId?: string;
}

export default function PhotoUploadZone({
  albumId,
  associatedPlaces,
}: PhotoUploadZoneProps) {
  const [queue, setQueue] = React.useState<UploadQueueItem[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const queryClient = useQueryClient();
  const { addImageToAlbum } = useAlbumMutations();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        id: Math.random().toString(36).substring(7),
        status: "pending" as const,
        progress: 0,
        placeId:
          associatedPlaces.length > 0
            ? associatedPlaces[0].id.toString()
            : undefined,
      }));
      setQueue((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFromQueue = (id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItemPlace = (id: string, placeId: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, placeId } : item)),
    );
  };

  const processUpload = async () => {
    if (queue.length === 0) return;
    setIsUploading(true);

    let successCount = 0;

    for (const item of queue) {
      if (item.status === "success") continue;

      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id ? { ...q, status: "uploading", progress: 20 } : q,
        ),
      );

      try {
        await addImageToAlbum.mutateAsync({
          albumId,
          file: item.file,
          data: {
            place_id: item.placeId ? item.placeId : undefined,
          },
        });

        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, status: "success", progress: 100 } : q,
          ),
        );
        successCount++;
        queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
      } catch (error) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, status: "error", progress: 0 } : q,
          ),
        );
        toast.error(`Erreur pour ${item.file.name}`);
      }
    }

    setIsUploading(false);
    if (successCount > 0) {
      toast.success(`${successCount} photo(s) ajoutée(s) avec succès !`);
      setTimeout(() => {
        setQueue((prev) => prev.filter((q) => q.status !== "success"));
      }, 2000);
    }
  };

  return (
    <>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group cursor-pointer hover:bg-muted/30 transition-all flex flex-col items-center justify-center min-h-[200px] h-full border-2 border-dashed border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 rounded-2xl"
      >
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
          <Upload className="h-5 w-5 text-primary" />
        </div>
        <p className="text-sm font-bold text-primary">Ajouter plus de photos</p>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={onFileChange}
      />

      {queue.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-md bg-card border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-muted/50 flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload en attente (
              {queue.filter((q) => q.status !== "success").length})
            </h3>
            <Button
              size="sm"
              onClick={processUpload}
              disabled={
                isUploading || queue.every((q) => q.status === "success")
              }
              className="h-8 text-xs font-bold gap-2"
            >
              {isUploading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : null}
              Uploader
            </Button>
          </div>
          <div className="max-h-[300px] overflow-y-auto p-4 space-y-3">
            {queue.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded overflow-hidden shrink-0">
                  <img
                    src={URL.createObjectURL(item.file)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">
                    {item.file.name}
                  </p>
                  {item.status === "uploading" ? (
                    <Progress value={item.progress} className="h-1 mt-1" />
                  ) : (
                    <select
                      className="text-[9px] uppercase tracking-widest font-bold bg-transparent border-none text-muted-foreground focus:ring-0 p-0 mt-0.5"
                      value={item.placeId}
                      onChange={(e) => updateItemPlace(item.id, e.target.value)}
                      disabled={item.status !== "pending"}
                    >
                      <option value="">Lieu ?</option>
                      {associatedPlaces.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  {item.status === "success" && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                  {item.status === "pending" && (
                    <button
                      onClick={() => removeFromQueue(item.id)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  {item.status === "uploading" && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
