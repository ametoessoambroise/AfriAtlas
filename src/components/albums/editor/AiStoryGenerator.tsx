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
    <div className="bg-white rounded-[2rem] border border-border shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Content & Actions */}
        <div className="flex-1 p-8 space-y-6">
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
                    {TONES.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => setSelectedTone(tone.id)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                          selectedTone === tone.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <span className="text-lg">{tone.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
                          {tone.label}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Boutons */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
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
                    onClick={() => setStory("")}
                    className="h-12 w-12 rounded-xl border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </PremiumGate>
        </div>

        {/* Right Side: Visual/Video Mockup */}
        <div className="w-full md:w-[40%] bg-muted/20 p-6 flex flex-col justify-center border-l border-border/50">
          {!story && !isGenerating ? (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-border group cursor-pointer">
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
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-bold truncate">
                  De Lomé à l'Islande, une aventure...
                </p>
                <span className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  02:45
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full relative min-h-[200px] p-6 rounded-2xl bg-muted/30 border border-border/50 font-serif leading-relaxed italic text-muted-foreground whitespace-pre-wrap flex items-center overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative text-sm"
                >
                  {story}
                  {isGenerating && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse align-middle" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}