import React from "react";
import {
  Sparkles,
  Loader2,
  Send,
  Wand2,
  History,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PremiumGate } from "./PremiumGate";
import { albumsApi } from "@/lib/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AiStoryPanelProps {
  albumId: string;
  existingStory?: string | null;
}

const TONES = [
  { id: "adventure", label: "Aventure", icon: "🌋" },
  { id: "romantic", label: "Romantique", icon: "💖" },
  { id: "family", label: "Famille", icon: "👨‍👩-👧" },
  { id: "humorous", label: "Humour", icon: "🤣" },
];

export default function AiStoryPanel({
  albumId,
  existingStory,
}: AiStoryPanelProps) {
  const [story, setStory] = React.useState(existingStory || "");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [selectedTone, setSelectedTone] = React.useState("adventure");

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setStory(""); // Clear previous story for streaming effect

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
    <Card className="overflow-hidden border-2 border-primary/10 shadow-xl rounded-md">
      <CardHeader className="bg-primary/5 pb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl font-black">
              <Sparkles className="h-6 w-6 text-primary" />
              Narration IA
            </CardTitle>
            <CardDescription>
              Laissez l'intelligence artificielle transformer vos photos en un
              récit captivant.
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary text-white hover:bg-primary uppercase font-bold tracking-widest text-[10px]"
          >
            Premium ✨
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-8">
        <PremiumGate fallbackClassName="border-none bg-transparent p-0">
          <div className="space-y-6">
            {/* Tone Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Choisir une ambiance
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TONES.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${
                      selectedTone === tone.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <span className="text-2xl mb-1">{tone.icon}</span>
                    <span className="text-xs font-bold">{tone.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Display */}
            <div className="relative min-h-[200px] p-6 rounded-md bg-muted/30 border border-border/50 font-serif leading-relaxed text-lg italic text-muted-foreground whitespace-pre-wrap">
              <AnimatePresence mode="wait">
                {story ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    {story}
                    {isGenerating && (
                      <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse align-middle" />
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-40">
                    <History className="h-12 w-12 mb-4" />
                    <p>Votre aventure n'attend que d'être racontée...</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 h-12 rounded-md gap-2 font-bold shadow-lg shadow-primary/20"
              >
                {isGenerating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="h-5 w-5" />
                )}
                {isGenerating
                  ? "Écriture en cours..."
                  : story
                    ? "Régénérer le récit"
                    : "Générer mon voyage"}
              </Button>

              {story && !isGenerating && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setStory("")}
                  className="h-12 w-12 rounded-md border-border/50 hover:bg-red-50 text-red-500"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </PremiumGate>
      </CardContent>
    </Card>
  );
}
