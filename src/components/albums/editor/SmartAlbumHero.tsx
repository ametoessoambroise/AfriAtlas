import React from "react";
import { motion } from "framer-motion";
import { Sparkles, UploadCloud, LayoutTemplate } from "lucide-react";
import type { AlbumDetailResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { resolveAlbumImageUrl } from "@/lib/utils/imageUrl";

export default function SmartAlbumHero({
  album,
}: {
  album: AlbumDetailResponse;
}) {
  const heroImages = [
    album.images?.[0]
      ? resolveAlbumImageUrl(album.images[0])
      : "/placeholder.png",
    album.images?.[1]
      ? resolveAlbumImageUrl(album.images[1])
      : "/placeholder.png",
    album.images?.[2]
      ? resolveAlbumImageUrl(album.images[2])
      : "/placeholder.png",
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#f0f5ff] border border-blue-100 p-8 md:p-12">
      {/* Background World Map Pattern (Simulated with SVG or subtle background) */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='dots' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%2394a3b8' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23dots)'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-6 max-w-xl">
          <Badge className="bg-primary hover:bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest gap-1 border-none">
            Nouveau <Sparkles className="w-3 h-3" />
          </Badge>

          <h1 className="text-4xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
            Crée ton album <br /> de voyage intelligent
          </h1>

          <p className="text-foreground/80 text-lg font-medium max-w-md">
            Transforme tes souvenirs en une histoire visuelle grâce à l'IA
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Button className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-xl px-6 h-12 shadow-lg shadow-blue-500/20 font-bold">
              <UploadCloud className="w-4 h-4 mr-2" />
              Importer mes photos
            </Button>
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl px-6 h-12 shadow-lg shadow-purple-500/20 font-bold">
              <Sparkles className="w-4 h-4 mr-2" />
              Générer avec IA
            </Button>
            {/* <Button
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-blue-200 text-[#1e293b] rounded-md px-6 h-12 hover:bg-white font-bold"
            >
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Explorer des templates
            </Button> */}
          </div>
        </div>

        {/* Right Polaroids (Mockup Visual) */}
        <div className="relative w-full max-w-[300px] h-[300px] hidden md:block">
          {/* We use framer-motion to animate them entering */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, x: -20, y: 20 }}
            animate={{ opacity: 1, rotate: -6, x: -30, y: 10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-10 left-0 w-40 h-48 bg-white p-2 rounded-lg shadow-xl shadow-foreground/20 z-10 border border-slate-100"
          >
            <div className="w-full h-full bg-slate-200 rounded overflow-hidden">
              <img
                src={heroImages[0]}
                className="w-full h-full object-cover"
                alt="Travel 1"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 10, x: 20, y: -20 }}
            animate={{ opacity: 1, rotate: 12, x: 40, y: -10 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-0 right-0 w-44 h-56 bg-white p-2.5 rounded-lg shadow-2xl shadow-foreground/20 z-20 border border-slate-100"
          >
            <div className="w-full h-full bg-slate-200 rounded overflow-hidden">
              <img
                src={heroImages[1]}
                className="w-full h-full object-cover"
                alt="Travel 2"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-0 left-10 w-48 h-40 bg-white p-2 rounded-lg shadow-xl shadow-foreground/20 z-30 border border-slate-100"
          >
            <div className="w-full h-full bg-slate-200 rounded overflow-hidden">
              <img
                src={heroImages[2]}
                className="w-full h-full object-cover"
                alt="Travel 3"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
