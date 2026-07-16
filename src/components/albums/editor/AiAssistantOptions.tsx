import React from "react";
import {
  Sparkles,
  Wand2,
  ImagePlus,
  SunMedium,
  Paintbrush,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const aiOptions = [
  {
    id: "enhance",
    title: "1. Amélioration automatique",
    description: "Lumière, netteté, couleurs... L'IA sublime tes photos.",
    icon: <SunMedium className="w-5 h-5 text-blue-500" />,
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=600&auto=format&fit=crop",
    gradient: "from-blue-500 to-blue-400",
  },
  {
    id: "artistic",
    title: "2. Transformation artistique",
    description:
      "Transforme tes photos en dessin, aquarelle, cartoon ou style cinématique.",
    icon: <Paintbrush className="w-5 h-5 text-purple-500" />,
    image:
      "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=600&auto=format&fit=crop",
    gradient: "from-purple-500 to-purple-400",
  },
  {
    id: "decor",
    title: "3. Ajout intelligent de décor",
    description:
      "L'IA ajoute des paysages, ciels et monuments pour rendre l'image parfaite.",
    icon: <ImagePlus className="w-5 h-5 text-emerald-500" />,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop",
    gradient: "from-emerald-500 to-emerald-400",
  },
];

export default function AiAssistantOptions({ albumId }: { albumId: string }) {
  const [activeAction, setActiveAction] = React.useState<string | null>(null);

  const handleAiAction = async (actionId: string) => {
    setActiveAction(actionId);
    try {
      // TODO: Replace with actual API call if not a global hook
      // await albumsApi.applyAiMagic(albumId, actionId);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API
      toast.success("Magie IA appliquée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'application de l'IA.");
    } finally {
      setActiveAction(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-black flex items-center gap-2">
          Assistant IA
        </h2>
        <p className="text-muted-foreground text-sm font-medium">
          Choisis la magie que l'IA va appliquer à tes photos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleAiAction(option.id)}
            className={`relative group cursor-pointer overflow-hidden rounded-md border-2 bg-card hover:shadow-xl transition-all duration-300 ${
              activeAction === option.id
                ? `border-${option.gradient.split("-")[1]}-500 shadow-md`
                : "border-border/50 hover:border-primary/30"
            }`}
          >
            {/* Top Info */}
            <div className="p-6 pb-4 flex flex-col h-[140px]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${option.gradient} bg-opacity-10 flex items-center justify-center shadow-inner`}
                >
                  <div className="bg-white rounded-full p-1.5 shadow-sm">
                    {option.icon}
                  </div>
                </div>
                <h3 className="font-bold text-[15px] leading-tight">
                  {option.title}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {option.description}
              </p>
            </div>

            {/* Bottom Image */}
            <div className="relative h-32 w-full overflow-hidden mt-auto">
              <img
                src={option.image}
                alt={option.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay on hover/loading */}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${activeAction === option.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                {activeAction === option.id ? (
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <Wand2 className="w-8 h-8 text-white" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
