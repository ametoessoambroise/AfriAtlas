import React from "react";
import {
  Upload,
  X,
  CheckCircle2,
  Loader2,
  ImagePlus,
  Calendar,
  MapPin,
  Camera,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAlbumMutations } from "@/hooks/queries/useAlbums";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractExifData, type ExifData } from "@/lib/utils/exifExtractor";
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
  exifData?: ExifData;
  isExtractingExif?: boolean;
}

export default function PhotoUploadZone({
  albumId,
  associatedPlaces,
}: PhotoUploadZoneProps) {
  const [queue, setQueue] = React.useState<UploadQueueItem[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [showExifModal, setShowExifModal] = React.useState(false);
  const queryClient = useQueryClient();
  const { addImageToAlbum } = useAlbumMutations();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Vérifier si des fichiers sont en cours d'extraction EXIF
  const isExtractingExif = queue.some((item) => item.isExtractingExif);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Créer les items de la queue avec statut "extracting EXIF"
      const newFiles: UploadQueueItem[] = files.map((file) => ({
        file,
        id: Math.random().toString(36).substring(7),
        status: "pending" as const,
        progress: 0,
        placeId:
          associatedPlaces.length > 0
            ? associatedPlaces[0].id.toString()
            : undefined,
        isExtractingExif: true,
      }));

      setQueue((prev) => [...prev, ...newFiles]);

      // Extraire les données EXIF en parallèle
      const exifPromises = files.map((file, index) =>
        extractExifData(file)
          .then((exifData) => {
            // Mettre à jour l'item avec les données EXIF
            setQueue((prev) =>
              prev.map((item) =>
                item.id === newFiles[index].id
                  ? { ...item, exifData, isExtractingExif: false }
                  : item,
              ),
            );

            // Afficher un toast si des données ont été trouvées
            if (exifData.dateTime || exifData.latitude || exifData.longitude) {
              const infos: string[] = [];
              if (exifData.dateTime) infos.push("📅 Date");
              if (exifData.latitude && exifData.longitude) infos.push("📍 GPS");
              console.log(
                `✅ EXIF trouvé pour ${file.name}: ${infos.join(", ")}`,
              );
            }

            return exifData;
          })
          .catch((error) => {
            console.error(`Error extracting EXIF for ${file.name}:`, error);
            setQueue((prev) =>
              prev.map((item) =>
                item.id === newFiles[index].id
                  ? { ...item, isExtractingExif: false }
                  : item,
              ),
            );
            return null;
          }),
      );

      // Attendre que toutes les extractions soient terminées
      const results = await Promise.all(exifPromises);
      const foundCount = results.filter(
        (r) => r && (r.dateTime || r.latitude || r.longitude),
      ).length;

      if (foundCount > 0) {
        toast.success(
          `📸 Métadonnées EXIF trouvées pour ${foundCount} photo(s) !`,
          {
            description: "Date et localisation pré-remplies automatiquement",
          },
        );
      }
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
            taken_at: item.exifData?.dateTime,
            latitude: item.exifData?.latitude?.toString(),
            longitude: item.exifData?.longitude?.toString(),
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
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
          <Upload className="h-5 w-5 text-white" />
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
            <div className="flex items-center gap-2">
              {isExtractingExif && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowExifModal(true)}
                  className="h-8 text-xs gap-1"
                >
                  <Info className="w-3 h-3" />
                  Extraction en cours...
                </Button>
              )}
              <Button
                size="sm"
                onClick={processUpload}
                disabled={
                  isUploading ||
                  isExtractingExif ||
                  queue.every((q) => q.status === "success")
                }
                className="h-8 text-xs font-bold gap-2"
              >
                {isUploading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : null}
                Uploader
              </Button>
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto p-4 space-y-3">
            {queue.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
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

                  {/* EXIF Info Badge */}
                  {item.isExtractingExif ? (
                    <div className="flex items-center gap-1 mt-1">
                      <Loader2 className="w-3 h-3 animate-spin text-primary" />
                      <span className="text-[9px] text-muted-foreground">
                        Extraction EXIF...
                      </span>
                    </div>
                  ) : item.exifData &&
                    (item.exifData.dateTime ||
                      item.exifData.latitude ||
                      item.exifData.longitude) ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.exifData.dateTime && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                          <Calendar className="w-2.5 h-2.5" />
                          Date
                        </span>
                      )}
                      {item.exifData.latitude && item.exifData.longitude && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                          <MapPin className="w-2.5 h-2.5" />
                          GPS
                        </span>
                      )}
                      {(item.exifData.cameraMake ||
                        item.exifData.cameraModel) && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">
                          <Camera className="w-2.5 h-2.5" />
                          {item.exifData.cameraModel ||
                            item.exifData.cameraMake}
                        </span>
                      )}
                    </div>
                  ) : null}

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

      {/* Modal explicatif pour l'extraction EXIF */}
      <Dialog open={showExifModal} onOpenChange={setShowExifModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Extraction des métadonnées en cours
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground mb-2">
                    Analyse des photos en cours...
                  </p>
                  <p className="text-sm">
                    Nous extrayons automatiquement les métadonnées EXIF de vos
                    photos pour pré-remplir :
                  </p>
                </div>
              </div>

              <div className="space-y-3 pl-8">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>
                    <strong>Date de prise</strong> - Quand la photo a été prise
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>
                    <strong>Localisation GPS</strong> - Où la photo a été prise
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Camera className="w-4 h-4 text-purple-600" />
                  <span>
                    <strong>Appareil photo</strong> - Modèle de l'appareil
                  </span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                <p className="font-medium text-amber-900 mb-1">
                  ℹ️ Bon à savoir
                </p>
                <p className="text-amber-800">
                  Certaines photos (screenshots, images téléchargées depuis les
                  réseaux sociaux) peuvent ne pas contenir ces informations.
                  C'est normal !
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Cette opération prend quelques secondes. Le bouton d'upload sera
                activé une fois l'extraction terminée.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
