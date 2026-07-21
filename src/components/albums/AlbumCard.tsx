import { Link, useNavigate } from "react-router-dom";
import {
  Image as ImageIcon,
  MapPin,
  Calendar,
  Lock,
  Globe,
  MoreHorizontal,
  Edit,
  Trash,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import type { AlbumListResponse } from "@/lib/types/album";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { resolveAlbumCoverUrl } from "@/lib/utils/imageUrl";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AlbumCardProps {
  album: AlbumListResponse;
  className?: string;
  index?: number;
}

const AlbumCard = ({ album, className, index = 0 }: AlbumCardProps) => {
  const navigate = useNavigate();
  const dateStr = format(new Date(album.created_at), "MMMM yyyy", {
    locale: fr,
  });

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link
        to={`/albums/${album.id}`}
        className="block relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-alt border border-border transition-all group-hover:shadow-2xl group-hover:shadow-primary/10"
      >
        {/* Cover Image */}
        {album.cover_image_url ? (
          <img
            src={resolveAlbumCoverUrl(album.cover_image_url)}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              console.error("❌ Image failed to load:", e.currentTarget.src);
              console.error("Original URL:", album.cover_image_url);
            }}
            onLoad={(e) => {
              console.log("✅ Image loaded successfully:", e.currentTarget.src);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/5">
            <ImageIcon className="w-12 h-12 text-primary/20" />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            {album.is_public ? (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                <Globe className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Public
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <Lock className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Privé
                </span>
              </div>
            )}
          </div>

      {/* Menu Dropdown */}
      <div className="absolute top-5 right-5 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-md border border-border text-primary hover:bg-background/80 hover:text-primary transition-all active:scale-90">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 p-2 rounded-md border-border shadow-xl"
          >
            <DropdownMenuItem
              onClick={() => navigate(`/albums/${album.id}`)}
              className="rounded-md gap-3 py-3"
            >
              <ImageIcon className="w-4 h-4" />
              Voir l'album
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/albums/${album.id}/edit`)}
              className="rounded-md gap-3 py-3"
            >
              <Edit className="w-4 h-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md gap-3 py-3">
              <Share2 className="w-4 h-4" />
              Partager
            </DropdownMenuItem>
            <div className="h-px bg-red-100 my-1" />
            <DropdownMenuItem className="rounded-md gap-3 py-3 text-red-500 focus:text-red-500 focus:bg-red-50">
              <Trash className="w-4 h-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link to={`/albums/${album.id}`} className="block">
        {/* Image de couverture */}
        <div className="aspect-[16/10] overflow-hidden relative">
          {album.cover_image_url ? (
            <img
              src={resolveAlbumCoverUrl(album.cover_image_url)}
              alt={album.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-background/80 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-primary/80" />
            </div>
          )}
          {/* Overlay gradient subtil */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Contenu */}
        <div className="p-8">
          <h3 className="text-2xl font-heading text-primary/80 group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-6">
            {album.title}
          </h3>

          <div className="flex items-center gap-6 text-primary/80">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary/80" />
              <span className="text-xs font-medium">
                {album.image_count || 0} photos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary/80" />
              <span className="text-xs font-medium">
                {album.place_count || 0} lieux
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary/80" />
              <span className="text-xs font-medium capitalize">{dateStr}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AlbumCard;
