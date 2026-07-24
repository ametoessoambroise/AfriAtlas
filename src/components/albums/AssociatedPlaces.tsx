import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Plus, ExternalLink, Trash2, Search, Loader2 } from "lucide-react";
import type { PlaceListResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { albumsApi, placesApi } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

interface AssociatedPlacesProps {
  albumId: string;
  places: PlaceListResponse[];
}

export function PlacePickerModal({ albumId }: { albumId: string }) {
  const [search, setSearch] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const placesQuery = useQuery({
    queryKey: ["places", "search", search],
    queryFn: () => placesApi.searchPlaces({ query: search || undefined, limit: 10 }),
    enabled: isOpen && search.length > 2,
  });

  const handleAdd = async (placeId: string) => {
    try {
      await albumsApi.addPlaceToAlbum(albumId, { place_id: placeId });
      queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
      toast.success("Lieu ajouté à l'album !");
      setIsOpen(false);
    } catch (error) {
      toast.error("Erreur lors de l'ajout du lieu.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-md gap-2 border-primary/30 text-primary hover:bg-primary/5">
          <Plus className="h-4 w-4" />
          Ajouter un lieu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle>Ajouter un lieu à l'album</DialogTitle>
          <DialogDescription>
            Recherchez un village, un monument ou une plage du Togo pour l'associer à vos photos.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher (ex: Kpalimé, Lomé...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-md"
            />
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
            {placesQuery.isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            
            {placesQuery.data?.map((place) => (
              <div 
                key={place.id}
                className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-border">
                    <img src={place.primary_image?.url || "/placeholder.png"} alt={place.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{place.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{place.category}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleAdd(place.id)} className="rounded-lg hover:bg-primary hover:text-white transition-colors">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {search.length > 2 && placesQuery.data?.length === 0 && (
              <p className="text-center py-8 text-sm text-muted-foreground">Aucun lieu trouvé.</p>
            )}
            
            {search.length <= 2 && (
              <p className="text-center py-8 text-sm text-muted-foreground italic">Entrez au moins 3 caractères.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AssociatedPlaces({ albumId, places }: AssociatedPlacesProps) {
  const queryClient = useQueryClient();

  const handleRemove = async (placeId: string) => {
    if (!confirm("Voulez-vous retirer ce lieu de l'album ?")) return;
    try {
      await albumsApi.removePlaceFromAlbum(albumId, placeId);
      queryClient.invalidateQueries({ queryKey: ["albums", albumId] });
      toast.success("Lieu retiré.");
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Lieux Visités</h2>
        <PlacePickerModal albumId={albumId} />
      </div>

      {places.length === 0 ? (
        <div className="p-8 text-center rounded-md bg-muted/20 border-2 border-dashed border-border/50">
          <MapPin className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Aucun lieu associé à cet album pour l'instant.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {places.map((place) => (
            <div 
              key={place.id}
              className="flex items-center gap-4 p-4 rounded-md bg-card border border-border shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-border shadow-inner">
                <img src={place.primary_image?.url || "/placeholder.svg"} alt={place.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold truncate">{place.name}</h3>
                  <Badge variant="outline" className="text-[9px] h-4 px-1.5 uppercase tracking-tighter">
                    {place.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <Link 
                    to={`/destinations/${place.slug}`}
                    className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    Voir la page
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <Link 
                    to={`/map/${place.slug}`}
                    className="text-[11px] font-bold text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Carte
                    <MapPin className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemove(place.id)}
                className="h-9 w-9 rounded-full text-muted-foreground/50 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
