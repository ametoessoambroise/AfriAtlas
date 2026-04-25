import { motion } from "framer-motion";
import {
  Trash2,
  Calendar,
  MapPin,
  Loader2,
  Pencil,
  Camera,
  Eye,
  Share2,
  Heart,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { LazyImage } from "@/components/ui/lazy-image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { resolveAlbumImageUrl } from "@/lib/utils/imageUrl";
import { EditImageCaptionDialog } from "./EditImageCaptionDialog";
import type { AlbumImageResponse, PlaceListResponse } from "@/lib/types";

interface AlbumPhotoCardProps {
  albumId: string;
  image: AlbumImageResponse;
  place?: PlaceListResponse | null;
  onDelete: (imageId: string) => void;
  isDeleting?: boolean;
  viewMode?: "grid" | "list";
  index?: number;
}

export function AlbumPhotoCard({
  albumId,
  image,
  place,
  onDelete,
  isDeleting = false,
  viewMode = "grid",
  index = 0,
}: AlbumPhotoCardProps) {
  const [liked, setLiked] = useState(false);
  const imageUrl = resolveAlbumImageUrl(image);
  const placeName = place?.name || image.caption || "Photo de voyage";
  const placeCity = place?.city || "Lieu inconnu";
  const placeCategory = place?.category || "Souvenir";

  const formattedDate = image.taken_at
    ? format(new Date(image.taken_at), "dd MMMM yyyy", { locale: fr })
    : "Date inconnue";

  // Tags basés sur les données disponibles
  const tags: string[] = [];
  if (place?.category) tags.push(placeCategory);
  if (place?.city) tags.push(placeCity);
  if (image.latitude && image.longitude) tags.push("Géolocalisée");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="w-full"
    >
      <div
        className={`flex ${
          viewMode === "grid" ? "flex-col" : "flex-col sm:flex-row"
        } w-full rounded-3xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300`}
      >
        {/* ── Panneau Image ── */}
        <div
          className={`relative ${
            viewMode === "grid"
              ? "w-full aspect-[4/3]"
              : "sm:w-[46%] min-h-[280px] sm:min-h-0"
          } bg-[#E8E4DF] flex items-center justify-center overflow-hidden flex-shrink-0 group`}
        >
          {/* Label coin haut gauche */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#F5EFE8] text-neutral-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
              Photo de voyage
            </span>
          </div>

          {/* Action Buttons - Top Right */}
          <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Edit Button */}
            <EditImageCaptionDialog
              albumId={albumId}
              image={image}
              trigger={
                <button
                  className="w-10 h-10 rounded-full bg-white/95 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil className="h-4 w-4 text-neutral-700" />
                </button>
              }
            />

            {/* Delete Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  )}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer cette photo ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. La photo sera définitivement
                    supprimée de votre album.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(image.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Image principale */}
          <div
            className={`w-full h-full ${
              viewMode === "grid" ? "p-4" : "p-6"
            } flex items-center justify-center`}
          >
            <div
              className={`relative w-full ${
                viewMode === "grid"
                  ? "max-w-full aspect-[3/4]"
                  : "max-w-[85%] aspect-[3/4]"
              } rounded-[1.75rem] overflow-hidden border-[3px] border-white shadow-2xl transform hover:scale-105 transition-transform duration-500`}
            >
              <LazyImage
                src={imageUrl}
                alt={image.caption || placeName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── Panneau Infos ── */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 gap-5">
          {/* Top */}
          <div className="space-y-4">
            {/* Catégorie */}
            <div className="inline-flex items-center gap-2 bg-[#FDF3E7] text-[#C96A0A] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              <Camera className="w-3.5 h-3.5" />
              {placeCategory}
            </div>

            {/* Titre */}
            <h2
              className="text-[1.85rem] sm:text-[2.1rem] font-black text-[#1A1A2E] leading-[1.1] tracking-tight line-clamp-2"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {placeName}
            </h2>

            {/* Description */}
            {image.caption && (
              <p className="text-[15px] text-neutral-500 leading-relaxed max-w-sm line-clamp-3">
                {image.caption}
              </p>
            )}

            {/* Méta : lieu + date */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
              {place && (
                <>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    {placeCity}
                  </span>
                  <span className="w-px h-4 bg-neutral-200 hidden sm:block" />
                </>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-400" />
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-[#E8C99A] bg-[#FDF3E7] text-[#C96A0A] text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* CTA principal - Voir */}
            <button
              onClick={() => {
                // Ouvrir l'image en grand ou naviguer vers le lieu
                if (place?.slug) {
                  window.open(`/destinations/${place.slug}`, "_blank");
                }
              }}
              className="inline-flex items-center gap-2.5 bg-[#E8820C] hover:bg-[#CF7209] active:scale-[0.98] text-white font-semibold text-sm px-6 py-3 rounded-2xl transition-all duration-200 shadow-md shadow-orange-200"
            >
              <Eye className="w-4 h-4" />
              {place ? "Voir le lieu" : "Voir la photo"}
            </button>

            {/* Partager */}
            <button
              onClick={() => {
                // Logique de partage
                if (navigator.share) {
                  navigator.share({
                    title: placeName,
                    text: image.caption || placeName,
                    url: window.location.href,
                  });
                }
              }}
              className="inline-flex items-center gap-2 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.98] text-neutral-700 font-semibold text-sm px-5 py-3 rounded-2xl transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
              Partager
            </button>

            {/* Like */}
            <button
              onClick={() => setLiked((v) => !v)}
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 active:scale-[0.95] ${
                liked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-red-500" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
