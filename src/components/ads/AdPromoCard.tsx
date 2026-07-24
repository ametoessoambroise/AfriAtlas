import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { AdvertisementListResponse } from "@/lib/types";
import { useRecordImpression, useRecordClick } from "@/hooks/queries/useAds";
import { LazyImage } from "@/components/ui/lazy-image";

interface AdPromoCardProps {
  ad: AdvertisementListResponse;
  layout?: "horizontal" | "vertical";
}

const AdPromoCard: React.FC<AdPromoCardProps> = ({
  ad,
  layout = "horizontal",
}) => {
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
      { threshold: 0.5 },
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

  const isVertical = layout === "vertical";

  return (
    <motion.div
      ref={observerRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`relative overflow-hidden border border-[#EAEAEA] bg-white group hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow duration-200`}
        style={{ borderRadius: "12px" }}
      >
        <div
          className={`relative ${isVertical ? "h-48" : "h-32"} overflow-hidden`}
        >
          {ad.image_url ? (
            <LazyImage
              src={ad.image_url}
              alt={ad.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src="/placeholder.svg"
              alt="Aperçu non disponible"
              className="w-full h-full bg-[#F7F6F3] flex items-center justify-center text-[#787774] text-sm"
            />
          )}

          <div className="absolute top-3 left-3 bg-[#FBF3DB] text-[#956400] font-medium text-xs uppercase px-2 py-1 rounded-full tracking-[0.05em]">
            Promo
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-serif font-semibold text-lg text-foreground leading-tight tracking-tight mb-2 group-hover:text-muted-foreground transition-colors">
            {ad.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed font-sans">
            {ad.description}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Offre limitée
            </span>
            <span className="text-xs font-medium text-foreground uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Voir <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdPromoCard;
