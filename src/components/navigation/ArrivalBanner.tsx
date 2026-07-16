import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ArrivalBannerProps {
  distanceMeters: number | null;
  threshold?: number;
}

export default function ArrivalBanner({ distanceMeters, threshold = 50 }: ArrivalBannerProps) {
  const isArrived = distanceMeters !== null && distanceMeters <= threshold;

  return (
    <AnimatePresence>
      {isArrived && (
        <motion.div
           initial={{ opacity: 0, y: 50, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, y: 50, scale: 0.9 }}
           className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1500] w-[90%] max-w-sm pointer-events-auto"
        >
          <div className="bg-green-500 text-white p-4 rounded-md shadow-2xl flex items-center justify-center gap-3">
             <div className="bg-white/20 p-2 rounded-full">
               <CheckCircle2 className="w-8 h-8 text-white fill-current opacity-20" />
             </div>
             <div>
               <h2 className="text-xl font-black">Vous êtes arrivé !</h2>
               <p className="text-sm font-medium text-green-100">Votre destination est à proximité.</p>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
