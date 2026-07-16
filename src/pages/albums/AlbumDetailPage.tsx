import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Map,
  Share2,
  MoreHorizontal,
  LayoutGrid,
} from "lucide-react";
import { useAlbum } from "@/hooks/queries/useAlbums";
import { ApiErrorState } from "@/components/feedback/ApiQueryState";
import { AlbumDetailSkeleton } from "@/components/feedback/AlbumDetailSkeleton";
import type { PlaceListResponse } from "@/lib/types";
import { getErrorMessage, is404 } from "@/lib/utils/errorMessages";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

// Editor Components
import SmartAlbumHero from "@/components/albums/editor/SmartAlbumHero";
import AiAssistantOptions from "@/components/albums/editor/AiAssistantOptions";
import AlbumPhotoManager from "@/components/albums/editor/AlbumPhotoManager";
import TravelMapWidget from "@/components/albums/editor/TravelMapWidget";
import AiStoryGenerator from "@/components/albums/editor/AiStoryGenerator";
import AlbumSidebar from "@/components/albums/editor/AlbumSidebar";

export default function AlbumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const albumQuery = useAlbum(id!);

  if (!id) return <ApiErrorState message="ID de l'album manquant." />;

  if (albumQuery.isLoading) return <AlbumDetailSkeleton />;

  if (albumQuery.isError || !albumQuery.data) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8">
          {is404(albumQuery.error) ? (
            <div className="flex flex-col items-center text-center justify-center min-h-[40vh] space-y-4">
              <p className="text-2xl font-black uppercase tracking-tight">Album introuvable</p>
              <Button asChild variant="outline" className="rounded-md px-8 h-12 font-black uppercase tracking-widest text-xs">
                <Link to="/albums">Retour aux albums</Link>
              </Button>
            </div>
          ) : (
            <ApiErrorState
              message={getErrorMessage(albumQuery.error)}
              onRetry={() => albumQuery.refetch()}
            />
          )}
        </div>
      </DashboardLayout>
    );
  }

  const album = albumQuery.data;

  const associatedPlaces = (album.places || [])
    .map((ap) => ap.place)
    .filter((p): p is PlaceListResponse => !!p);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* Dynamic Header / Navigation */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col gap-4">
            <Link
              to="/albums"
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest w-fit"
            >
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              Tout mes albums
            </Link>
            
            <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
              Détails de <span className="text-primary">l'Album</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-md h-10 w-10 border-border bg-card shadow-sm"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-md h-10 w-10 border-border bg-card shadow-sm"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-md border-border bg-card shadow-xl">
                <DropdownMenuItem className="gap-2 font-bold text-xs uppercase tracking-widest py-3">
                  <Map className="h-4 w-4 text-primary" /> Voir sur la carte
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive font-bold text-xs uppercase tracking-widest py-3">
                  Supprimer l'album
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1fr_350px] items-start animate-in slide-in-from-bottom-4 duration-500 delay-100">
          {/* Main Content (Left Column) */}
          <div className="space-y-8">
            <SmartAlbumHero album={album} />
            <AiAssistantOptions albumId={album.id} />
            <AlbumPhotoManager album={album} />
            <TravelMapWidget places={associatedPlaces} />
            <AiStoryGenerator albumId={album.id} existingStory={null} />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="sticky top-24 space-y-8">
            <AlbumSidebar album={album} places={associatedPlaces} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
