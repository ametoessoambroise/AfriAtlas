import React from "react";
import { AlbumPhotoCard } from "@/components/albums/AlbumPhotoCard";
import { LayoutGrid, List, Filter, PencilLine } from "lucide-react";
import type { AlbumDetailResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { albumsApi } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PhotoUploadZone from "../PhotoUploadZone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AlbumPhotoManager({
  album,
}: {
  album: AlbumDetailResponse;
}) {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = React.useState("date");
  const [isRenameOpen, setIsRenameOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(album.title);

  const images = album.images || [];

  const sortedImages = React.useMemo(() => {
    const imgs = [...images];
    if (sortBy === "recent") {
      imgs.sort(
        (a, b) =>
          new Date(b.taken_at || 0).getTime() -
          new Date(a.taken_at || 0).getTime(),
      );
    } else if (sortBy === "old") {
      imgs.sort(
        (a, b) =>
          new Date(a.taken_at || 0).getTime() -
          new Date(b.taken_at || 0).getTime(),
      );
    }
    return imgs;
  }, [images, sortBy]);

  // Calculate unique countries/places
  const uniquePlaces = new Set(
    images.map((img) => img.place_id).filter(Boolean),
  ).size;

  const handleDelete = async (imageId: string) => {
    try {
      await albumsApi.deleteAlbumImage(album.id, imageId);
      queryClient.invalidateQueries({ queryKey: ["albums", album.id] });
      toast.success("Photo supprimée.");
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
    }
  };

  const handleRename = async () => {
    if (!newTitle.trim()) return;
    try {
      await albumsApi.updateAlbum(album.id, { title: newTitle });
      queryClient.invalidateQueries({ queryKey: ["albums", album.id] });
      toast.success("Nom de l'album modifié !");
      setIsRenameOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la modification.");
    }
  };

  const associatedPlaces = (album.places || [])
    .map((ap) => ap.place)
    .filter(Boolean) as any[];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
            {album.title}
            <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <PencilLine className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modifier l'album</DialogTitle>
                  <DialogDescription>
                    Saisissez un nouveau nom pour votre album.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Nom de l'album"
                    className="text-lg font-medium h-12 rounded-md"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="rounded-md">
                      Annuler
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleRename}
                    className="rounded-md bg-primary"
                  >
                    Enregistrer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">
            {images.length} photos • {uniquePlaces} lieux
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-muted/50 p-1 rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-10 rounded-xl bg-white border border-border">
              <SelectValue placeholder="Trier par date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Trier par date</SelectItem>
              <SelectItem value="recent">Récents d'abord</SelectItem>
              <SelectItem value="old">Anciens d'abord</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="rounded-xl h-10 gap-2 bg-white">
            <Filter className="w-4 h-4" /> Filtrer
          </Button>
        </div>
      </div>

      {/* Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 lg:grid-cols-2 gap-6 text-foreground"
            : "space-y-6 text-foreground"
        }
      >
        {sortedImages.map((image, index) => {
          // Find if the image is linked to a place in the album
          const place = associatedPlaces.find((p) => p.id === image.place_id);

          return (
            <AlbumPhotoCard
              key={image.id}
              albumId={album.id}
              image={image}
              place={place}
              onDelete={handleDelete}
              viewMode={viewMode}
              index={index}
            />
          );
        })}
      </div>

      {/* Upload Zone */}
      <div className="mt-8">
        <PhotoUploadZone
          albumId={album.id}
          associatedPlaces={associatedPlaces}
        />
      </div>
    </div>
  );
}
