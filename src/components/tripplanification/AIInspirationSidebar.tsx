import React from "react";
import { Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

export default function AIInspirationSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-background/10 backdrop-blur-2xl border border-border rounded-md p-8 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center text-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-foreground font-bold text-lg">
            Laisse l'IA t'inspirer
          </h3>
          <span className="text-[10px] font-black uppercase tracking-widest bg-primary/20 text-primary px-1.5 py-0.5 rounded leading-none">
            IA
          </span>
        </div>
      </div>

      <p className="text-foreground text-sm mb-6 leading-relaxed">
        Décris le voyage dont tu rêves, on te propose un itinéraire
        personnalisé.
      </p>

      <div className="relative group">
        <Input
          placeholder="Ex : Un road trip de 10 jours en Islande pour voir les aurores boréales, cascades et sources chaudes..."
          className="w-full h-24 bg-background/20 border border-border rounded-md p-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none mb-6"
        />
      </div>

      <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-foreground font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 group">
        Générer mon itinéraire
        <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
      </Button>

      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="w-5 h-5 rounded-full bg-background flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
        </div>
        <p className="text-[11px] text-muted-foreground font-medium tracking-wide">
          Propulsé par <span className="text-foreground">WorldAtlas AI</span>
        </p>
      </div>
    </motion.div>
  );
}
