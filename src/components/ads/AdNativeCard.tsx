import React, { useEffect, useRef } from "react";
import { ExternalLink, Megaphone, Star, MoveRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { AdvertisementListResponse } from "@/lib/types";
import { useRecordImpression, useRecordClick } from "@/hooks/queries/useAds";
import { LazyImage } from "@/components/ui/lazy-image";
import { cn } from "@/lib/utils";

interface AdNativeCardProps {
  ad: AdvertisementListResponse;
}

const AdNativeCard = ({ ad }: AdNativeCardProps) => {
  const { mutate: recordImpression } = useRecordImpression();
  const { mutate: recordClick } = useRecordClick();
  const observerRef = useRef<HTMLDivElement>(null);
  const impressionRecorded = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !impressionRecorded.current) {
            recordImpression(ad.id);
            impressionRecorded.current = true;
          }
        });
      },
      { threshold: 0.5 }, // On enregistre quand 50% de la pub est visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [ad.id, recordImpression]);

  const handleClick = () => {
    recordClick(ad.id);
    window.open(ad.target_url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      ref={observerRef}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(9,17,17,0.12)" }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={cn(
          "card-destination relative block h-full overflow-hidden rounded-md border",
          "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]",
          "bg-gradient-to-br from-card to-amber-950/5 group flex flex-col sm:flex-row",
        )}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 -z-10" />

        <div className="relative h-64 sm:h-auto sm:w-1/2 overflow-hidden sm:shrink-0">
          {ad.image_url ? (
            <LazyImage
              src={ad.image_url}
              alt={ad.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center italic text-muted-foreground">
              Aperçu non disponible
            </div>
          )}

          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-[10px] uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
            <Megaphone className="h-3 w-3" />
            Sponsorisé
          </div>
        </div>

        <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center bg-card/50 backdrop-blur-sm relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-2xl text-foreground leading-tight group-hover:text-amber-600 transition-colors">
              {ad.title}
            </h3>
            <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20 shadow-sm shrink-0">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Premium
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 sm:line-clamp-4 mb-6 leading-relaxed font-body">
            {ad.description}
          </p>

          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              Partenaire Atlas
            </span>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-1 transition-transform cursor-pointer">
              Découvrir <MoveRightIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdNativeCard;
