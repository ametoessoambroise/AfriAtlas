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
  {
    id: "adventure",
    label: "Aventure",
    icon: <Mountain className="w-5 h-5" />,
  },
  { id: "romantic", label: "Romantique", icon: <Heart className="w-5 h-5" /> },
  { id: "family", label: "Famille", icon: <Users className="w-5 h-5" /> },
  { id: "humorous", label: "Humour", icon: <Smile className="w-5 h-5" /> },
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
      setShowOptions(false); // Hide options once started to focus on story

      await albumsApi.streamAlbumStory(
        albumId,
        { tone: selectedTone as any },
        (chunk) => {
          setStory((prev) => prev + chunk);
        },
      );
      toast.success("Récit généré !");
    } catch (error) {
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
            <h2 className="text-2xl font-black flex items-center gap-2">
              Crée ton histoire <Sparkles className="w-5 h-5 text-yellow-400" />
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Notre IA génère automatiquement une histoire unique à partir de
              tes photos et de tes souvenirs.
            </p>
          </div>

          <ul className="space-y-2 text-sm font-medium">
            {[
              "Narration automatique",
              "Transitions en vidéo",
              "Musique adaptée",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>

          <PremiumGate fallbackClassName="border-none bg-transparent p-0">
            <div className="space-y-4">
              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2"
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

              <div className="flex gap-3">
                <Button
                  className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl px-6 h-12 shadow-lg shadow-purple-500/20 font-bold"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  {isGenerating
                    ? "Génération..."
                    : story
                      ? "Régénérer"
                      : showOptions
                        ? "Lancer la magie"
                        : "Créer mon histoire"}
                </Button>

                {story && !isGenerating && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setStory("")}
                    className="h-12 w-12 rounded-xl border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <RotateCcw className="w-5 h-5" />
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
                alt="Video thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary ml-1" />
                  </div>
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
          )}
        </div>
      </div>
    </div>
  );
}
