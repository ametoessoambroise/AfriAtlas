import { Gamepad2, Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { useVrSessions } from "@/hooks/queries/useVrSessions";
import { Skeleton } from "@/components/ui/skeleton";
import type { VRSessionListResponse } from "@/lib/types";
import { VrBookingModal } from "./VrBookingModal";
import { useState } from "react";
import { VR_TIME_SLOTS } from "@/constants/TimeSlots";

export default function VrSessionCalendar({ slug }: { slug: string }) {
  const { data: sessionsResponse, isLoading, isError } = useVrSessions(slug);
  const sessions = sessionsResponse || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 rounded-3xl p-8 overflow-hidden relative shadow-xl">
      <VrBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        sessions={sessions} 
        placeSlug={slug}
      />
      {/* Deco elements */}
      <div className="absolute top-0 right-0 p-10 opacity-10 blur-3xl rounded-full bg-white w-64 h-64 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 p-10 opacity-10 blur-3xl justify-center rounded-full bg-cyan-400 w-64 h-64 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="text-white max-w-lg">
          <div className="flex items-center gap-2 text-indigo-200 font-semibold uppercase tracking-wider text-sm mb-3">
            <Gamepad2 className="h-5 w-5" />
            Vivez l'expérience VR
          </div>
          <h3 className="text-3xl font-extrabold mb-3">Explorez avant d'y être</h3>
          <p className="text-indigo-100/80 leading-relaxed mb-6">
            Réservez une session en réalité virtuelle dans nos locaux et visitez physiquement 
            cette destination depuis notre espace VR premium, sans quitter votre ville.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-black/20 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                   <h4 className="font-semibold text-white mb-4">Aujourd'hui</h4>
                   {isLoading ? (
                     <Skeleton className="h-20 w-full bg-white/10 rounded-xl" />
                   ) : isError || !sessions || sessions.length === 0 ? (
                     <div className="text-sm text-indigo-200 bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                       Aucune session active.
                     </div>
                   ) : (
                      <div className="space-y-3">
                         {sessions.slice(0, 2).map((s: VRSessionListResponse) => (
                            <div key={s.id} className="flex flex-col gap-1 bg-white/10 p-3 rounded-xl border border-white/5">
                               <span className="font-bold text-white text-sm">{s.title}</span>
                               <div className="flex items-center justify-between text-[10px] text-indigo-200">
                                  <span>{s.duration_minutes} min</span>
                                  <span className="font-black text-xs text-white">{s.price} {s.currency}</span>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <h4 className="font-semibold text-white/90 mb-4 flex items-center gap-2 text-sm">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                Horaires de service
              </h4>
              <div className="flex flex-wrap gap-1.5 opacity-60">
                {VR_TIME_SLOTS.slice(0, 6).map(slot => (
                  <span key={slot} className="text-[9px] px-2 py-1 rounded-md bg-white/10 border border-white/5 font-medium">
                    {slot.split(' - ')[0]}
                  </span>
                ))}
                <span className="text-[9px] px-2 py-1 rounded-md bg-white/10 border border-white/5 font-medium">
                  ... +{VR_TIME_SLOTS.length - 6}
                </span>
              </div>
              <p className="text-[10px] text-indigo-300/60 mt-4 leading-tight italic">
                Créneaux de 45 min. Dernière session à {VR_TIME_SLOTS[VR_TIME_SLOTS.length-1].split(' - ')[0]}.
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto flex flex-col gap-3">
          <button 
             type="button" 
             onClick={() => setIsModalOpen(true)}
             disabled={sessions.length === 0}
             className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-indigo-950 font-bold px-8 py-4 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
             <CalendarIcon className="h-5 w-5" />
             Réserver mon casque VR
          </button>
          <p className="text-xs text-center text-indigo-200/60 mt-1">
            Réservé aux membres vérifiés. Places limitées.
          </p>
        </div>
      </div>
    </div>
  );
}
