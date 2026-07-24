import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { AdvertisementListResponse } from "@/lib/types";
import { useRecordImpression, useRecordClick } from "@/hooks/queries/useAds";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/ui/lazy-image";
import { cn } from "@/lib/utils";

interface AdPremiumSpotlightProps {
  ad: AdvertisementListResponse;
}

const AdPremiumSpotlight = ({ ad }: AdPremiumSpotlightProps) => {
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
      { threshold: 0.3 },
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
    <div
      ref={observerRef}
      className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl my-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-md border border-border bg-card p-3 sm:p-4 shadow-sm cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative h-20 w-24 sm:h-24 sm:w-32 shrink-0 overflow-hidden rounded-md">
            {ad.image_url ? (
              <LazyImage
                src={ad.image_url}
                alt={ad.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                Aperçu
              </div>
            )}
            <div className="absolute left-1.5 top-1.5 bg-muted text-muted-foreground text-[10px] font-medium uppercase px-2 py-0.5 rounded-full tracking-[0.05em]">
              Sponsorisé
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <h4 className="font-heading font-bold text-foreground text-sm sm:text-base truncate">
                {ad.title}
              </h4>
              <div className="bg-muted text-muted-foreground text-[10px] font-medium uppercase px-2 py-0.5 rounded-full tracking-[0.05em]">
                Partenaire
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {ad.description}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-secondary text-secondary" />
              <span className="text-xs font-bold text-foreground">4.8</span>
              <span className="text-xs text-muted-foreground">(230 avis)</span>
            </div>
          </div>
          <div
            className="shrink-0 rounded-lg bg-primary px-3 py-2 sm:px-4 text-xs font-bold text-primary-foreground transition-colors hover:opacity-90 min-h-[40px] flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Découvrir <ArrowRight className="h-4 w-4" />
          </div>
        </div>
        {/* Dot indicators */}
        <div className="mt-3 flex justify-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === 0 ? "bg-primary w-4" : "bg-border w-1.5",
              )}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdPremiumSpotlight;
