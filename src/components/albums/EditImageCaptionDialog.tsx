import { useState } from "react";
import { Loader2, Calendar, MapPin, Pencil, FileText, Check } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { albumsApi } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AlbumImageResponse } from "@/lib/types";

interface EditImageCaptionDialogProps {
  albumId: string;
  image: AlbumImageResponse;
  trigger?: React.ReactNode;
}

export function EditImageCaptionDialog({
  albumId,
  image,
  trigger,
}: EditImageCaptionDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [caption, setCaption] = useState(image.caption || "");
  const [takenAt, setTakenAt] = useState(
    image.taken_at ? format(new Date(image.taken_at), "yyyy-MM-dd") : "",
  );
  const [latitude, setLatitude] = useState(image.latitude || "");
  const [longitude, setLongitude] = useState(image.longitude || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await albumsApi.updateAlbumImage(albumId, image.id, {
        caption: caption.trim() || null,
        taken_at: takenAt || null,
        latitude: latitude ? parseFloat(String(latitude)) : null,
        longitude: longitude ? parseFloat(String(longitude)) : null,
      });
      queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
      toast.success("Photo mise à jour avec succès !");
      setOpen(false);
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Erreur lors de la mise à jour de la photo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px] p-0 gap-0 overflow-hidden rounded-2xl border border-border bg-background">
        {/* ── En-tête ── */}
        <div className="px-6 pt-6 pb-5">
          <h2 className="font-semibold text-foreground">
            Modifier les détails de la photo
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Ajoutez ou modifiez la description, la date et les coordonnées GPS
            de cette photo.
          </p>
        </div>

        <Separator />

        <form onSubmit={handleSubmit} className="divide-y divide-border">
          {/* ── Section : Description ── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 px-6 py-5">
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Description
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-5">
                Racontez le moment capturé dans cette photo.
              </p>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Décrivez cette photo..."
                className="resize-none"
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {caption.length}/500
              </p>
            </div>
          </div>

          {/* ── Section : Date ── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 px-6 py-5">
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Date de prise
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-5">
                Quand cette photo a-t-elle été prise ?
              </p>
            </div>
            <div className="md:col-span-2">
              <Input
                id="taken_at"
                type="date"
                value={takenAt}
                onChange={(e) => setTakenAt(e.target.value)}
              />
            </div>
          </div>

          {/* ── Section : Coordonnées ── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 px-6 py-5">
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Localisation
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-5">
                Coordonnées GPS du lieu de la prise de vue.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="latitude"
                  className="text-xs text-muted-foreground uppercase tracking-wide"
                >
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="6.1375"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="longitude"
                  className="text-xs text-muted-foreground uppercase tracking-wide"
                >
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="1.2123"
                />
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="whitespace-nowrap bg-red-100 text-red-600 hover:bg-red-600"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="whitespace-nowrap bg-primary text-white border border-border hover:bg-primary/80 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  Enregistrer
                  <Check className="mr-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
