import { motion } from "framer-motion";
import { ChevronRight, Calendar, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Destination } from "@/lib/models/ui";

interface PlaceFooterBannersProps {
  destination: Destination;
  sessionId?: string;
}

export default function PlaceFooterBanners({
  destination,
  sessionId,
}: PlaceFooterBannersProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-20 grid gap-6 lg:grid-cols-2">
      {/* VR Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={() =>
          navigate(`/vr-sessions/${destination.slug}/${sessionId}/book`)
        }
        className="relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-foreground shadow-2xl group cursor-pointer"
      >
        <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
          <Smartphone className="h-full w-full rotate-12 scale-110" />
        </div>

        <div className="relative z-10 space-y-6 max-w-sm">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Vivez l'expérience avant votre voyage
            </h2>
            <p className="text-black text-sm leading-relaxed">
              Explorez le site en réalité virtuelle et projetez votre aventure
              comme si vous y étiez déjà.
            </p>
          </div>

          <button className="flex items-center gap-3 bg-background text-foreground px-8 py-4 rounded-2xl font-bold transition-all hover:bg-background/80 active:scale-95 shadow-lg">
            Réserver une session VR
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Booking Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={() =>
          navigate(`/vr-sessions/${destination.slug}/${sessionId}/book`)
        }
        className="relative overflow-hidden rounded-[2.5rem] bg-[#f8fafc] border border-slate-200 p-10 text-slate-900 shadow-xl group cursor-pointer"
      >
        <div className="absolute top-0 right-10 h-full w-1/3 opacity-10 pointer-events-none group-hover:opacity-15 transition-opacity">
          <Calendar className="h-full w-full -rotate-6 scale-90" />
        </div>

        <div className="relative z-10 space-y-6 max-w-sm">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Prêt à vivre l'aventure ?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Planifiez votre visite et vivez votre expérience sur place dès
              maintenant.
            </p>
          </div>

          <button
            onClick={() => {
              if (!sessionId || sessionId === "00000000-0000-0000-0000-000000000000") {
                navigate("/vr-sessions");
              } else {
                navigate(`/vr-sessions/${destination.slug}/${sessionId}/book`);
              }
            }}
            className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-primary/80 active:scale-95 shadow-lg shadow-primary/20"
          >
            Effectuer une réservation
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
