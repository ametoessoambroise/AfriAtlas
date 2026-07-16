import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Route, Compass } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "IA Sur-mesure",
    description: "Des recommandations qui s'adaptent à vos envies.",
  },
  {
    icon: Route,
    title: "Itinéraire Intelligent",
    description: "Temps de trajet et logistique optimisés pour vous.",
  },
  {
    icon: Compass,
    title: "Spots Secrets",
    description: "Accédez à notre base de lieux hors des sentiers battus.",
  },
];

export default function FeatureHighlights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="bg-muted/10 border border-border rounded-2xl p-6 sm:p-8"
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground shadow-sm mb-4 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-2">
                {feature.title}
              </h4>
              <p className="text-muted-foreground text-[11px] leading-relaxed max-w-[200px]">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
