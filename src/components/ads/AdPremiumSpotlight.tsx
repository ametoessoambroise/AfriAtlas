import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Megaphone, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { AdvertisementListResponse } from "@/lib/types";
import { useRecordImpression, useRecordClick } from "@/hooks/queries/useAds";
import { Button } from "@/components/ui/button";

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
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative h-[400px] rounded-[3rem] overflow-hidden border border-white/10 group cursor-pointer"
        onClick={handleClick}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {ad.image_url ? (
            <img
              src={ad.image_url}
              alt={ad.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-zinc-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-12 md:px-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Megaphone className="h-4 w-4 text-zinc-950" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">
              Expérience Premium
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tighter uppercase italic mb-4"
          >
            {ad.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/60 font-medium mb-8 line-clamp-2 italic"
          >
            {ad.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex md:items-center gap-2 md:gap-4 justify-between items-center flex-wrap"
          >
            <Button className="h-12 md:h-14 px-4 md:px-8 rounded-2xl bg-white text-zinc-950 font-black uppercase italic text-center tracking-tighter hover:bg-zinc-200 transition-all flex items-center gap-2 group-2">
              Découvrir l'offre
              <ArrowRight className="h-5 w-5 group-2-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              asChild
              variant="link"
              className="text-white/50 hover:text-white px-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Link to="/how-ads-works">
                Comment fonctionnent nos annonces ?
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
          <Megaphone className="h-8 w-8 text-white/20" />
        </div>
      </motion.div>
    </div>
  );
};

export default AdPremiumSpotlight;
