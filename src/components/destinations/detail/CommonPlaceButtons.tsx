import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Navigation, FolderPlus, Plus, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import type { Destination } from "@/lib/models/ui";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useFavorites, useFavoriteMutations } from "@/hooks/queries/useFavorites";
import { useAlbums, useAlbumMutations } from "@/hooks/queries/useAlbums";
import { useAuth } from "@/hooks/useAuth";

interface ButtonsProps {
  destination: Destination;
}

// ---------------------------------------------------------------------------
// FavoriteButton — état réel via useFavorites
// ---------------------------------------------------------------------------

export function FavoriteButton({ destination }: ButtonsProps) {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const { data: favorites } = useFavorites();
  const { addFavorite, removeFavorite } = useFavoriteMutations();

  // Check if this destination is already in favorites
  // Note: f.id is number (backend) vs destination.id is string (UUID frontend) → normalize with String()
  const isFav = favorites?.items?.some((f) => String(f.id) === destination.id) ?? false;
  const isPending = addFavorite.isPending || removeFavorite.isPending;

  const handleToggle = () => {
    if (!isAuthenticated) {
      toast.error("Connectez-vous pour sauvegarder des favoris.");
      return;
    }
    if (isFav) {
      removeFavorite.mutate(destination.id, {
        onSuccess: () => toast.success("Retiré des favoris"),
        onError: () => toast.error("Erreur lors de la suppression"),
      });
    } else {
      addFavorite.mutate(destination.id, {
        onSuccess: () => toast.success("Ajouté aux favoris !"),
        onError: () => toast.error("Erreur lors de l'ajout"),
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold transition-all hover:bg-surface-alt hover:border-primary/40 shadow-sm disabled:opacity-60"
      aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      {isPending ? (
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      ) : (
        <Heart className={`h-5 w-5 transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
      )}
      <span className={isFav ? "text-red-500" : ""}>{isFav ? "Favori" : "Sauvegarder"}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// AlbumPickerModal — Dialog Shadcn + sélection ou création d'album
// ---------------------------------------------------------------------------

export function AlbumPickerModal({ destination }: ButtonsProps) {
  const [open, setOpen] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const { user } = useAuth();
  const isAuthenticated = !!user;
  const { data: albums, isLoading: albumsLoading } = useAlbums();
  const { createAlbum, addPlaceToAlbum } = useAlbumMutations();

  const handleOpen = () => {
    if (!isAuthenticated) {
      toast.error("Connectez-vous pour ajouter à un album.");
      return;
    }
    setOpen(true);
  };

  const handleSelectAlbum = (albumId: string) => {
    addPlaceToAlbum.mutate(
      { albumId, data: { place_id: destination.id } },
      {
        onSuccess: () => {
          toast.success("Lieu ajouté à l'album !");
          setOpen(false);
        },
        onError: () => toast.error("Erreur lors de l'ajout."),
      }
    );
  };

  const handleCreateAlbum = () => {
    if (!newAlbumName.trim()) return;
    createAlbum.mutate(
      { title: newAlbumName.trim() },
      {
        onSuccess: (album) => {
          // Once created, add the place to it immediately
          addPlaceToAlbum.mutate(
            { albumId: album.id, data: { place_id: destination.id } },
            {
              onSuccess: () => {
                toast.success(`Album "${album.title}" créé et lieu ajouté !`);
                setOpen(false);
                setNewAlbumName("");
                setShowCreate(false);
              },
            }
          );
        },
        onError: () => toast.error("Erreur lors de la création de l'album."),
      }
    );
  };

  const isBusy = addPlaceToAlbum.isPending || createAlbum.isPending;

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold transition-all hover:bg-surface-alt hover:border-primary/40 shadow-sm"
      >
        <FolderPlus className="h-5 w-5 text-muted-foreground" />
        <span>À un album</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Ajouter à un album</DialogTitle>
            <DialogDescription>
              Sélectionnez un album existant ou créez-en un nouveau.
            </DialogDescription>
          </DialogHeader>

          {/* Album list */}
          {albumsLoading ? (
            <div className="space-y-2 py-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : albums && albums.length > 0 ? (
            <ScrollArea className="max-h-52">
              <ul className="space-y-1.5 pr-2">
                {albums.map((album) => (
                  <li key={album.id}>
                    <button
                      onClick={() => handleSelectAlbum(album.id)}
                      disabled={isBusy}
                      className="w-full flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5 text-sm text-left hover:bg-surface-alt transition-colors disabled:opacity-60"
                    >
                      <span className="font-medium truncate">{album.title}</span>
                      {isBusy && addPlaceToAlbum.variables?.albumId === album.id ? (
                        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                      ) : (
                        <Check className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucun album pour l'instant.
            </p>
          )}

          {/* Create new album */}
          {showCreate ? (
            <div className="space-y-2 pt-1">
              <Label htmlFor="album-name">Nom du nouvel album</Label>
              <Input
                id="album-name"
                placeholder="Ex: Voyage au Togo 2025"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateAlbum()}
                autoFocus
              />
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={handleCreateAlbum}
                  disabled={!newAlbumName.trim() || isBusy}
                  className="flex-1"
                >
                  {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Créer et ajouter"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowCreate(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCreate(true)}
              className="w-full gap-2 mt-1"
            >
              <Plus className="h-4 w-4" />
              Créer un nouvel album
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// ---------------------------------------------------------------------------
// NavigateButton
// ---------------------------------------------------------------------------

export function NavigateButton({ destination }: ButtonsProps) {
  return (
    <Link
      to={`/map/${destination.slug}`}
      className="flex items-center justify-center gap-2 rounded-xl border border-transparent bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
    >
      <Navigation className="h-5 w-5" />
      Lancer l'itinéraire
    </Link>
  );
}

// ---------------------------------------------------------------------------

export default function CommonPlaceButtons({ destination }: ButtonsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
      <NavigateButton destination={destination} />
      <FavoriteButton destination={destination} />
      <AlbumPickerModal destination={destination} />
    </div>
  );
}
