import { Gamepad2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useVrSessions } from "@/hooks/queries/useVrSessions";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import type { VRSessionListResponse } from "@/lib/types";
import { VrBookingModal } from "./VrBookingModal";
import { useState } from "react";
import { VR_TIME_SLOTS } from "@/constants/TimeSlots";

export default function VrSessionCalendar({ slug }: { slug: string }) {
  const { data: sessionsResponse, isLoading, isError } = useVrSessions(slug);
  const sessions = sessionsResponse || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mt-8">
      <VrBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sessions={sessions}
        placeSlug={slug}
      />

      {/* ── Header label — même style qu'AlbumForm section header ── */}
      <div className="flex items-center gap-2 mb-1">
        <Gamepad2 className="h-4 w-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Expérience VR
        </span>
      </div>

      <Separator className="mb-0" />

      {/* ── Layout 3-col — calqué sur AlbumForm ── */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 py-8">
        {/* ── Colonne gauche : titre + description ── */}
        <div>
          <h2 className="font-semibold text-foreground">
            Réserver une session VR
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Visitez cette destination en réalité virtuelle depuis notre espace
            premium, sans quitter votre ville.
          </p>
        </div>

        {/* ── Colonne droite : contenu ── */}
        <div className="sm:max-w-3xl md:col-span-2 space-y-5">
          {/* Sessions du jour */}
          <div className="rounded-lg border border-border bg-muted/40 px-5 py-4">
            <h4 className="text-sm font-medium text-foreground mb-3">
              Sessions disponibles aujourd'hui
            </h4>

            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-14 w-full rounded-lg" />
              </div>
            ) : isError || !sessions || sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground bg-background border border-border rounded-lg px-4 py-3 text-center">
                Aucune session active pour le moment.
              </p>
            ) : (
              <div className="space-y-2">
                {sessions.slice(0, 2).map((s: VRSessionListResponse) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between bg-background border border-border rounded-lg px-4 py-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {s.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {s.duration_minutes} min
                      </p>
                    </div>
                    <span className="text-sm font-bold text-foreground shrink-0 ml-4">
                      {s.price} {s.currency}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Horaires */}
          <div className="rounded-lg border border-border bg-muted/40 px-5 py-4">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              Horaires de service
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {VR_TIME_SLOTS.slice(0, 6).map((slot) => (
                <span
                  key={slot}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-background border border-border font-medium text-muted-foreground"
                >
                  {slot.split(" - ")[0]}
                </span>
              ))}
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-background border border-border font-medium text-muted-foreground">
                +{VR_TIME_SLOTS.length - 6} autres
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">
              Créneaux de 45 min. Dernière session à{" "}
              {VR_TIME_SLOTS[VR_TIME_SLOTS.length - 1].split(" - ")[0]}.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              disabled={sessions.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            >
              <CalendarIcon className="h-4 w-4" />
              Réserver mon casque VR
            </button>
            <p className="text-xs text-muted-foreground">
              Réservé aux membres vérifiés. Places limitées.
            </p>
          </div>
        </div>
      </div>

      <Separator />
    </div>
  );
}
