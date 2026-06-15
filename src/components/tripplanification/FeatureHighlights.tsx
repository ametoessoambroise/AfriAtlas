import React from "react";
import { motion } from "framer-motion";
import { Map, Clock, ShieldCheck, PencilLine } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Itinéraires personnalisés",
    desc: "Créés selon vos envies et votre style de voyage.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Clock,
    title: "Gagne du temps",
    desc: "L'IA organise tout pour toi en quelques secondes.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
  {
    icon: ShieldCheck,
    title: "Voyage en toute sérénité",
    desc: "Des conseils locaux et à jour pour un voyage inoubliable.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: PencilLine,
    title: "Modifie à tout moment",
    desc: "Adapte ton itinéraire selon tes envies et ton budget.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
];

export default function FeatureHighlights() {
  return (
    <div className="bg-background backdrop-blur-3xl border border-border rounded-md p-8 md:p-12 overflow-hidden relative shadow-3xl">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="flex items-start gap-5 group"
          >
            <div
              className={`w-14 h-14 shrink-0 rounded-md ${f.bg} flex items-center justify-center ${f.color} shadow-lg transition-transform group-hover:scale-110 duration-500`}
            >
              <f.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-foreground font-bold text-sm mb-1 uppercase tracking-wider">
                {f.title}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
