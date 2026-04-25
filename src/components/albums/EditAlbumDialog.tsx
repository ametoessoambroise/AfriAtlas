import { useState } from "react";
import { Pencil, Loader2, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { albumsApi } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AlbumDetailResponse } from "@/lib/types";

interface EditAlbumDialogProps {
  album: AlbumDetailResponse;
  trigger?: React.ReactNode;
}

export function EditAlbumDialog({ album, trigger }: EditAlbumDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description || "");
  const [isPublic, setIsPublic] = useState(album.is_public);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    setIsSubmitting(true);

    try {
      await albumsApi.updateAlbum(album.id, {
        title: title.trim(),
        description: description.trim() || null,
        is_public: isPublic,
      });

      queryClient.invalidateQueries({ queryKey: ["albums", album.id] });
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      toast.success("Album mis à jour avec succès !");
      setOpen(false);
    } catch (error) {
      console.error("Error updating album:", error);
      toast.error("Erreur lors de la mise à jour de l'album");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Pencil className="h-4 w-4" />
            Modifier l'album
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Modifier l'album</DialogTitle>
          <DialogDescription>
            Modifiez le titre, la description et la visibilité de votre album.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Titre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mon voyage à Paris"
              className="rounded-xl"
              maxLength={100}
              required
            />
            <p className="text-xs text-muted-foreground text-right">
              {title.length}/100
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre album..."
              className="min-h-[120px] resize-none rounded-xl"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {description.length}/1000
            </p>
          </div>

          {/* Public/Private Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border p-4 bg-muted/30">
            <div className="space-y-0.5">
              <Label htmlFor="is_public" className="text-base font-medium">
                Visibilité
              </Label>
              <p className="text-sm text-muted-foreground">
                {isPublic
                  ? "Cet album est visible par tous"
                  : "Cet album est privé"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isPublic ? (
                <Eye className="h-4 w-4 text-primary" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              <Switch
                id="is_public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="rounded-xl"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-primary"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
