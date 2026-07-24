import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { TripDraft } from "@/lib/types/trip_planning";
import TripInsightsSidebar from "./TripInsightsSidebar";

interface MobileInsightsDrawerProps {
  draft: TripDraft;
}

export function MobileInsightsDrawer({ draft }: MobileInsightsDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB — Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center"
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.08, boxShadow: "0 20px 40px hsl(var(--primary)/0.45)" }}
        onClick={() => setOpen(true)}
        aria-label="Ouvrir les insights voyage"
        style={{ willChange: "transform" }}
      >
        <Lightbulb className="w-6 h-6" />
      </motion.button>

      {/* Drawer bottom-sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Drag handle */}
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-6" />

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors"
                aria-label="Fermer les insights"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Title */}
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                Insights Voyage
              </p>

              <TripInsightsSidebar draft={draft} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
