import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RerouteAlertProps {
  deviated: boolean;
  onReroute: () => void;
}

export default function RerouteAlert({ deviated, onReroute }: RerouteAlertProps) {
  return (
    <AnimatePresence>
      {deviated && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full overflow-hidden"
        >
          <div className="bg-destructive text-destructive-foreground p-3 rounded-xl shadow-lg border border-destructive/20 flex flex-col gap-2 mt-2">
            <div className="flex items-start gap-2">
               <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
               <p className="text-sm font-bold leading-tight">Vous semblez vous être éloigné du trajet prévu.</p>
            </div>
            <button
               onClick={onReroute}
               className="bg-white/20 hover:bg-white/30 text-white font-bold py-1.5 px-3 rounded-lg text-xs w-fit transition-colors ml-7"
            >
              Recalculer l'itinéraire
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
