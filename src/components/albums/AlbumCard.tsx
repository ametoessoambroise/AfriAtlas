import { Link } from 'react-router-dom';
import { Image as ImageIcon, MapPin, Calendar, Lock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AlbumListResponse } from '@/lib/types/album';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface AlbumCardProps {
  album: AlbumListResponse;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const dateStr = format(new Date(album.created_at), 'MMMM yyyy', { locale: fr });

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/albums/${album.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-alt border border-border transition-all group-hover:shadow-2xl group-hover:shadow-primary/10">
        {/* Cover Image */}
        {album.cover_image_url ? (
          <img
            src={album.cover_image_url}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
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
                <span className="text-[10px] font-black uppercase tracking-widest">Public</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <Lock className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Privé</span>
              </div>
            )}
          </div>

          <h3 className="text-xl font-black mb-2 line-clamp-1">{album.title}</h3>

          <div className="flex items-center gap-4 text-xs font-medium text-white/70">
            <div className="flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{album.image_count || 0} photos</span>
            </div>
            {album.place_count && album.place_count > 0 && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{album.place_count} lieux</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span className="capitalize">{dateStr}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AlbumCard;
