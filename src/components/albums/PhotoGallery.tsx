import React from "react";
import { X, Maximize2, Trash2, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import type { AlbumImageResponse } from "@/lib/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { albumsApi } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PhotoGalleryProps {
  images: AlbumImageResponse[];
  albumId: string;
}

export default function PhotoGallery({ images, albumId }: PhotoGalleryProps) {
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = React.useState<AlbumImageResponse | null>(null);

  const handleDelete = async (imageId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette photo ?")) return;
    
    try {
      await albumsApi.deleteAlbumImage(albumId, imageId);
      queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
      toast.success("Photo supprimée.");
      if (selectedImage?.id === imageId) setSelectedImage(null);
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
    }
  };

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Maximize2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">Aucune photo dans cet album.</p>
        <p className="text-sm text-center text-muted-foreground/60 mt-1 max-w-xs">
          Ajoutez vos souvenirs ci-dessous pour donner vie à votre récit de voyage.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Galerie Photos</h2>
        <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {images.length} souvenirs
        </span>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="relative group break-inside-avoid overflow-hidden rounded-2xl bg-muted shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu cursor-zoom-in"
          >
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={image.url}
                  alt={image.caption || "Photo d'album"}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] md:max-w-[80vw] h-[90vh] p-0 overflow-hidden border-none bg-black/95">
                <div className="relative h-full w-full flex flex-col items-center justify-center">
                  <img
                    src={image.url}
                    alt={image.caption || ""}
                    className="max-h-[80%] max-w-full object-contain"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent text-white">
                    <div className="max-w-4xl mx-auto space-y-4">
                      {image.caption && (
                        <p className="text-xl font-medium">{image.caption}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                        {image.taken_at && (
                          <div className="flex items-center gap-2">
                             <Calendar className="h-4 w-4 text-primary" />
                             <span>{format(new Date(image.taken_at), "dd MMMM yyyy", { locale: fr })}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(image.id)}
                    className="absolute top-4 right-16 h-10 w-10 text-white/50 hover:text-red-500 hover:bg-red-500/10 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Quick Actions Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <Maximize2 className="h-8 w-8 text-white/80" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
