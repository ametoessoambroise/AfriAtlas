import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";

export default function AIInspirationSidebar() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    // TODO: appel API IA — générer itinéraire
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden group"
    >
      {/* Blob décoratif */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/15 rounded-full blur-[60px] group-hover:bg-primary/25 transition-colors duration-700 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <motion.div
          className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-foreground font-heading font-semibold text-sm italic">
            Magie <span className="text-primary">IA</span>
          </h3>
          <p className="text-[10px] font-body text-muted-foreground uppercase tracking-[0.2em] mt-0.5">
            Assistant Personnel
          </p>
        </div>
        {/* Indicateur IA active */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground hidden sm:inline">
            Actif
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <p className="text-muted-foreground text-xs mb-5 leading-relaxed relative z-10">
        Décrivez le voyage dont vous rêvez. Notre IA orchestre chaque détail
        pour un itinéraire 100% sur-mesure.
      </p>

      {/* Textarea contrôlée */}
      <div className="relative mb-5 z-10">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, 300))}
          maxLength={300}
          placeholder="Ex: Un road trip de 10 jours au Togo pour voir les cascades, les villages traditionnels et goûter la cuisine locale..."
          className="w-full h-28 bg-muted/40 border border-border rounded-xl p-4 text-foreground text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all resize-none placeholder:text-muted-foreground/50"
          aria-label="Décrivez votre voyage idéal"
        />
        <span className="absolute bottom-3 right-3 text-[9px] text-muted-foreground/50 font-mono pointer-events-none">
          {prompt.length}/300
        </span>
      </div>

      {/* CTA */}
      <motion.button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isLoading}
        className="relative z-10 w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.97 } : {}}
        style={{ willChange: "transform" }}
        aria-label="Générer mon itinéraire avec l'IA"
      >
        {isLoading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            Analyse en cours...
          </>
        ) : (
          <>
            Générer mon voyage
            <MessageSquare className="w-4 h-4" />
          </>
        )}
      </motion.button>

      {/* Divider */}
      <div className="mt-6 flex items-center gap-3 opacity-30 group-hover:opacity-60 transition-opacity duration-500 relative z-10">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[9px] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
          Afriatlas AI
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </motion.div>
  );
}
