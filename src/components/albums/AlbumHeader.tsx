import React from "react";
import {
  Calendar,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import type { AlbumDetailResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { albumsApi } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { resolveAlbumCoverUrl } from "@/lib/utils/imageUrl";
import { EditAlbumDialog } from "./EditAlbumDialog";

interface AlbumHeaderProps {
  album: AlbumDetailResponse;
}

export function AiDescriptionButton({ albumId }: { albumId: string }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const isPremium =
    user?.subscription_status === "premium" ||
    user?.subscription_status === "family";

  const handleGenerate = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isPremium) {
      toast.error("Cette fonctionnalité nécessite un compte Premium.");
      return;
    }

    try {
      setIsGenerating(true);
      const result = await albumsApi.generateAlbumDescription(albumId);
      await albumsApi.updateAlbum(albumId, {
        title: result.suggested_title || undefined,
        description: result.description || undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
      toast.success("Titre et description générés avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la génération de la description.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleGenerate}
      disabled={isGenerating}
      className="gap-2 rounded-xl border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      {isGenerating ? "Génération..." : "IA - Titre & Description"}
    </Button>
  );
}

export default function AlbumHeader({ album }: AlbumHeaderProps) {
  const dateStr = format(new Date(album.created_at), "MMMM yyyy", {
    locale: fr,
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-2xl">
      {/* Background Cover with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={resolveAlbumCoverUrl(album.cover_image_url)}
          alt=""
          className="h-full w-full object-cover opacity-20 blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 md:p-12">
        {/* Cover Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[4/5] w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl border-4 border-white/10 shadow-xl"
        >
          <img
            src={resolveAlbumCoverUrl(album.cover_image_url)}
            alt={album.title}
            className="h-full w-full object-cover"
          />
          {!album.is_public && (
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 bg-black/60 text-white backdrop-blur-md border-white/10 uppercase text-[10px] tracking-widest font-bold"
            >
              Privé
            </Badge>
          )}
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 justify-center space-y-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary border-primary/20 rounded-lg px-3 py-1"
              >
                Album Photo
              </Badge>
              <AiDescriptionButton albumId={album.id} />
              <EditAlbumDialog album={album} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tight"
            >
              {album.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              {album.description ||
                "Aucune description pour cet album. Utilisez l'IA pour en générer une."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Créé en {dateStr}</span>
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              <span>{album.images?.length || 0} Photos</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{album.places?.length || 0} Lieux</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
