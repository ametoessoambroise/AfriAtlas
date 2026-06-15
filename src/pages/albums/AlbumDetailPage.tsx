import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Map,
  Share2,
  MoreHorizontal,
  LayoutGrid,
} from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
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
      <PageWrapper>
        <div className="container py-16">
          {is404(albumQuery.error) ? (
            <div className="flex flex-col items-center text-center justify-center min-h-[40vh]">
              <p className="mb-4 text-2xl font-bold">Album introuvable</p>
              <Link to="/albums" className="btn-primary">
                Retour aux albums
              </Link>
            </div>
          ) : (
            <ApiErrorState
              message={getErrorMessage(albumQuery.error)}
              onRetry={() => albumQuery.refetch()}
            />
          )}
        </div>
      </PageWrapper>
    );
  }

  const album = albumQuery.data;

  const associatedPlaces = (album.places || [])
    .map((ap) => ap.place)
    .filter((p): p is PlaceListResponse => !!p);

  return (
    <PageWrapper>
      {/* Dynamic Header / Navigation */}
      <div className="bg-card/50 backdrop-blur-lg sticky top-0 z-40 border-b border-border/50">
        <div className="container h-20 flex items-center justify-between">
          <Link
            to="/albums"
            className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Tout mes albums
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-10 w-10"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem className="gap-2">
                  <Map className="h-4 w-4" /> Voir sur la carte
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                  Supprimer l'album
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-8 space-y-8">
            <SmartAlbumHero album={album} />
            <AiAssistantOptions albumId={album.id} />
            <AlbumPhotoManager album={album} />
            <TravelMapWidget places={associatedPlaces} />
            <AiStoryGenerator albumId={album.id} existingStory={null} />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-4 sticky top-24 space-y-8">
            <AlbumSidebar album={album} places={associatedPlaces} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
