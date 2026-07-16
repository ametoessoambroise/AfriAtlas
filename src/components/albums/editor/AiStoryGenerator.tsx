import React from "react";
import {
  Sparkles,
  Check,
  Play,
  Loader2,
  RotateCcw,
  Mountain,
  Heart,
  Users,
  Smile,
  Wand2,
  Music2,
  Film,
  ImagePlay,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumGate } from "../PremiumGate";
import { albumsApi } from "@/lib/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AiStoryGeneratorProps {
  albumId: string;
  existingStory?: string | null;
}

const TONES = [
  { id: "adventure", label: "Aventure", icon: <Mountain className="w-4 h-4" /> },
  { id: "romantic", label: "Romantique", icon: <Heart className="w-4 h-4" /> },
  { id: "family", label: "Famille", icon: <Users className="w-4 h-4" /> },
  { id: "humorous", label: "Humour", icon: <Smile className="w-4 h-4" /> },
];

const FEATURES = [
  "Narration automatique",
  "Transitions en vidéo",
  "Musique adaptée",
];

// Bento tiles data
const BENTO_TILES = [
  {
    id: "preview",
    colSpan: "col-span-2",
    rowSpan: "row-span-2",
    img: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=600&auto=format&fit=crop",
    label: "De Lomé à Kara, une aventure…",
    hasPlay: true,
    duration: "02:45",
  },
  {
    id: "music",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    icon: <Music2 className="w-5 h-5" />,
    label: "Musique adaptée",
    sub: "Afro ambient",
    accent: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    id: "scenes",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    icon: <Film className="w-5 h-5" />,
    label: "12 scènes",
    sub: "Générées",
    accent: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: "photos",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
    label: "Paysages",
    sub: "34 photos",
  },
  {
    id: "ai",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    icon: <Wand2 className="w-5 h-5" />,
    label: "IA narrative",
    sub: "Claude 3",
    accent: "bg-muted text-muted-foreground border-border",
  },
  {
    id: "reel",
    colSpan: "col-span-2",
    rowSpan: "row-span-1",
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop",
    label: "Reel du voyage",
    sub: "Exportable",
    hasPlay: true,
    wide: true,
  },
];

export default function AiStoryGenerator({
  albumId,
  existingStory,
}: AiStoryGeneratorProps) {
  const [story, setStory] = React.useState(existingStory || "");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [selectedTone, setSelectedTone] = React.useState("adventure");
  const [showOptions, setShowOptions] = React.useState(false);

  const handleGenerate = async () => {
    if (!showOptions && !story) {
      setShowOptions(true);
      return;
    }
    try {
      setIsGenerating(true);
      setStory("");
      setShowOptions(false);
      await albumsApi.streamAlbumStory(
        albumId,
        { tone: selectedTone as any },
        (chunk) => setStory((prev) => prev + chunk)
      );
      toast.success("Récit généré !");
    } catch {
      toast.error("Erreur lors de la génération du récit.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-md border border-border bg-background overflow-hidden">
      <div className="flex flex-col lg:flex-row">

        {/* ── Colonne gauche ── */}
        <div className="flex-1 flex flex-col gap-7 p-8 lg:max-w-[380px]">

          {/* En-tête */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                Génération IA
              </span>
            </div>
            <h2 className="text-xl font-semibold text-foreground leading-snug">
              Crée ton histoire de voyage
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Notre IA génère automatiquement un récit unique à partir de tes
              photos et de tes souvenirs de voyage.
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-2.5">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                {item}
              </li>
            ))}
          </ul>

          {/* Zone premium / actions */}
          <PremiumGate fallbackClassName="border-none bg-transparent p-0">
            <div className="space-y-4">

              {/* Sélecteur de ton */}
              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs font-medium text-muted-foreground mb-2.5">
                      Choisir un ton
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {TONES.map((tone) => (
                        <button
                          key={tone.id}
                          onClick={() => setSelectedTone(tone.id)}
                          className={[
                            "flex flex-col items-center justify-center gap-1.5 py-3 rounded-md border transition-all",
                            selectedTone === tone.id
                              ? "border-primary/40 bg-primary/5 text-primary"
                              : "border-border text-muted-foreground hover:bg-muted/40",
                          ].join(" ")}
                        >
                          {tone.icon}
                          <span className="text-[10px] uppercase tracking-wider font-semibold">
                            {tone.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Boutons */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="rounded-md h-10 px-5 font-medium bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  {isGenerating
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Sparkles className="w-4 h-4" />
                  }
                  {isGenerating
                    ? "Génération…"
                    : story
                    ? "Régénérer"
                    : showOptions
                    ? "Lancer"
                    : "Créer mon histoire"}
                </Button>

                {story && !isGenerating && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => { setStory(""); setShowOptions(false); }}
                    className="h-10 w-10 rounded-md text-muted-foreground hover:text-destructive hover:border-destructive/30"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </PremiumGate>

          {/* Story output (si générée, dans la colonne gauche en bas) */}
          <AnimatePresence>
            {(story || isGenerating) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-md border border-border bg-muted/20 p-4 max-h-[200px] overflow-y-auto">
                  <p className="font-serif text-sm leading-relaxed text-muted-foreground italic whitespace-pre-wrap">
                    {story}
                    {isGenerating && (
                      <span className="inline-block w-1 h-3.5 ml-0.5 bg-primary/70 animate-pulse align-middle rounded-sm" />
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Colonne droite : Bento grid ── */}
        <div className="flex-1 border-t lg:border-t-0 lg:border-l border-border bg-muted/10 p-5">
          <div className="grid grid-cols-3 grid-rows-4 gap-2.5 h-full min-h-[380px]">

            {/* Tile 1 — grande vidéo principale */}
            <div className="col-span-2 row-span-2 relative rounded-md overflow-hidden border border-border group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=600&auto=format&fit=crop"
                alt="Aperçu principal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Play className="w-3.5 h-3.5 text-primary ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-xs font-medium truncate">De Lomé à Kara…</p>
                <span className="text-[10px] text-white/60">02:45</span>
              </div>
            </div>

            {/* Tile 2 — Musique */}
            <div className="col-span-1 row-span-1 rounded-md border border-secondary/20 bg-secondary/10 p-3.5 flex flex-col justify-between">
              <div className="w-7 h-7 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Music2 className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Musique</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Afro ambient</p>
              </div>
            </div>

            {/* Tile 3 — Scènes */}
            <div className="col-span-1 row-span-1 rounded-md border border-primary/20 bg-primary/5 p-3.5 flex flex-col justify-between">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Film className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">12 scènes</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Générées</p>
              </div>
            </div>

            {/* Tile 4 — Photo paysage */}
            <div className="col-span-1 row-span-2 relative rounded-md overflow-hidden border border-border group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop"
                alt="Paysages"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-[11px] font-medium">Paysages</p>
                <p className="text-white/60 text-[10px]">34 photos</p>
              </div>
            </div>

            {/* Tile 5 — IA narrative */}
            <div className="col-span-1 row-span-1 rounded-md border border-border bg-muted/30 p-3.5 flex flex-col justify-between">
              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">IA narrative</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Claude 3</p>
              </div>
            </div>

            {/* Tile 6 — Galerie photos */}
            <div className="col-span-1 row-span-1 relative rounded-md overflow-hidden border border-border group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=400&auto=format&fit=crop"
                alt="Galerie"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-2.5">
                <p className="text-white text-[11px] font-medium">Galerie</p>
              </div>
            </div>

            {/* Tile 7 — Reel large */}
            <div className="col-span-2 row-span-1 relative rounded-md overflow-hidden border border-border group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop"
                alt="Reel du voyage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-between px-4">
                <div>
                  <p className="text-white text-xs font-semibold">Reel du voyage</p>
                  <p className="text-white/60 text-[10px] mt-0.5">Exportable · HD</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
                  <Play className="w-3 h-3 text-primary ml-0.5" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
