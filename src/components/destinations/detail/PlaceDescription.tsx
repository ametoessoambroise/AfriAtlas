import { motion } from "framer-motion";
import type { Destination } from "@/lib/models/ui";

interface PlaceDescriptionProps {
  destination: Destination;
}

export default function PlaceDescription({ destination }: PlaceDescriptionProps) {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight">À propos</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="leading-relaxed text-muted-foreground text-lg">
            {destination.longDescription}
          </p>
        </div>
      </motion.div>

      {(destination.amenities && destination.amenities.length > 0) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="mb-4 text-2xl font-bold">Commodités</h2>
          <div className="flex flex-wrap gap-2">
            {destination.amenities.map((a) => (
              <span
                key={a}
                className="rounded-lg bg-surface-alt border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
              >
                {a}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {(destination.tags && destination.tags.length > 0) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="mb-4 text-2xl font-bold">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
