import React, { useEffect, useRef } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={cn(
          "relative block h-full overflow-hidden border",
          "border-[#EAEAEA] bg-white group flex flex-col sm:flex-row",
          "hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow duration-200",
        )}
        style={{ borderRadius: "12px" }}
      >
        <div className="relative h-64 sm:h-auto sm:w-1/2 overflow-hidden sm:shrink-0">
          {ad.image_url ? (
            <LazyImage
              src={ad.image_url}
              alt={ad.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
              Aperçu non disponible
            </div>
          )}

          <div className="absolute top-4 left-4 bg-[#FBF3DB] text-[#956400] font-medium text-xs uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 tracking-[0.05em]">
            Sponsorisé
          </div>
        </div>

        <div className="p-8 sm:p-10 sm:w-1/2 flex flex-col justify-center bg-white relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-semibold text-2xl text-[#111111] leading-tight tracking-tight group-hover:text-[#2F3437] transition-colors">
              {ad.title}
            </h3>
            <div className="flex items-center gap-1 text-[#956400] bg-[#FBF3DB] px-2 py-1 rounded-full border border-[#EAEAEA] shrink-0">
              <span className="text-xs font-medium uppercase tracking-[0.05em]">
                Premium
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 sm:line-clamp-4 mb-6 leading-relaxed font-sans">
            {ad.description}
          </p>

          <div className="mt-auto pt-4 border-t border-[#EAEAEA] flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#956400]" />
              Partenaire Atlas
            </span>
            <span className="text-xs font-medium text-foreground uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-1 transition-transform cursor-pointer">
              Découvrir <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdNativeCard;
