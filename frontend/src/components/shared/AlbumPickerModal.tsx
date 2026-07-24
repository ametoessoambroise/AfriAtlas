import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAlbums, useAlbumMutations } from "@/hooks/queries/useAlbums";
import { Loader2, Plus, FolderPlus, Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface AlbumPickerModalProps {
  placeId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AlbumPickerModal({
  placeId,
  isOpen,
  onClose,
  onSuccess,
}: AlbumPickerModalProps) {
  const { user } = useAuth();
  const { data: albums, isLoading } = useAlbums();
  const { addPlaceToAlbum, createAlbum } = useAlbumMutations();
  const [isCreating, setIsCreating] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-md text-center py-12">
          <div className="flex flex-col items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary shadow-[0_0_15px_rgba(240,185,11,0.5)]" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold">Connexion requise</DialogTitle>
              <DialogDescription className="text-white/40 max-w-[260px] mx-auto">
                Vous devez être connecté pour créer des carnets de voyage et enregistrer vos lieux favoris.
              </DialogDescription>
            </div>
            <Button className="w-full bg-primary text-zinc-950 font-bold" onClick={() => window.location.href = "/login"}>
              Se connecter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleAddToAlbum = async (albumId: string) => {
    try {
      await addPlaceToAlbum.mutateAsync({
        albumId,
        data: { place_id: placeId },
      });
      toast.success("Lieu ajouté à l'album !");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Impossible d'ajouter au carnet");
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newAlbumTitle.trim()) return;
    try {
      const album = await createAlbum.mutateAsync({
        title: newAlbumTitle.trim(),
        description: "",
      });
      await handleAddToAlbum(album.id);
    } catch (error) {
      toast.error("Erreur lors de la création de l'album");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Ajouter à un album</DialogTitle>
          <DialogDescription className="text-white/40">
            Enregistrez ce lieu dans l'un de vos carnets de voyage.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar pr-2">
              {albums?.map((album) => (
                <button
                  key={album.id}
                  onClick={() => handleAddToAlbum(album.id)}
                  disabled={addPlaceToAlbum.isPending}
                  className="w-full flex items-center justify-between p-4 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-bold text-xs">
                      {album.title.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {album.title}
                      </div>
                      <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                        {album.place_count ?? 0} lieux
                      </div>
                    </div>
                  </div>
                  <Check className="h-4 w-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}

              {!albums?.length && !isCreating && (
                <div className="text-center py-8 text-white/40 text-sm">
                  Vous n'avez pas encore d'album.
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            {!isCreating ? (
              <Button
                onClick={() => setIsCreating(true)}
                variant="outline"
                className="w-full border-dashed border-white/10 hover:bg-white/5 text-white/60 hover:text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Créer un nouveau carnet
              </Button>
            ) : (
              <div className="space-y-3 p-4 rounded-md bg-white/5 border border-primary/20">
                <Input
                  placeholder="Nom du carnet (ex: Togo 2026)"
                  value={newAlbumTitle}
                  onChange={(e) => setNewAlbumTitle(e.target.value)}
                  autoFocus
                  className="bg-zinc-950 border-white/10 text-white h-10"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsCreating(false)}
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-white/40 hover:text-white"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleCreateAndAdd}
                    disabled={createAlbum.isPending || !newAlbumTitle.trim()}
                    size="sm"
                    className="flex-1 bg-primary text-white"
                  >
                    {createAlbum.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Créer & Ajouter"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
