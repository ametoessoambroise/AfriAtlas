import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useVrSessions, useBookVrSession } from "@/hooks/queries/useVrSessions";
import {
  Clock,
  Calendar as CalendarIcon,
  Users,
  Check,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { VR_TIME_SLOTS } from "@/constants/TimeSlots";

interface VrSessionCalendarProps {
  placeSlug: string;
  onSuccess?: () => void;
  className?: string;
}

export function VrSessionCalendar({
  placeSlug,
  onSuccess,
  className,
}: VrSessionCalendarProps) {
  const { data: sessions, isLoading: sessionsLoading } =
    useVrSessions(placeSlug);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [participants, setParticipants] = useState(1);

  const selectedSession = sessions?.find((s) => s.id === selectedSessionId);
  const bookMutation = useBookVrSession(selectedSessionId || "");

  const handleBooking = async () => {
    if (!selectedSessionId || !selectedDate || !selectedSlot) {
      toast.error("Veuillez sélectionner une session, une date et un créneau.");
      return;
    }

    try {
      await bookMutation.mutateAsync({
        slug: placeSlug,
        body: {
          booking_date: format(selectedDate, "yyyy-MM-dd"),
          time_slot: selectedSlot,
          num_participants: participants,
        },
      });
      onSuccess?.();
      toast.success("Session VR réservée avec succès !");
      // Reset
      setSelectedSlot(null);
      setSelectedDate(undefined);
      setSelectedSessionId(null);
      setParticipants(1);
    } catch (error) {
      // Error handled by mutation toast
    }
  };

  if (sessionsLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/40 border border-white/5 rounded-2xl animate-pulse">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <div className="h-4 w-32 bg-white/5 rounded" />
      </div>
    );
  }

  if (!sessions?.length) {
    return (
      <div className="p-8 text-center bg-background border border-white/5 rounded-2xl">
        <div className="mb-4 inline-flex p-3 rounded-full bg-white/5">
          <CalendarIcon className="h-6 w-6 text-white/20" />
        </div>
        <p className="text-white/40 text-sm">
          Aucune session VR disponible pour cet établissement.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Session Selection */}
      <section>
        <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">
          Expérience VR
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                selectedSessionId === session.id
                  ? "bg-primary/10 border-primary text-white"
                  : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10",
              )}
            >
              <div>
                <div className="font-bold text-sm">{session.title}</div>
                <div className="text-[10px] opacity-60">
                  {session.duration_minutes} min · {session.price}{" "}
                  {session.currency}
                </div>
              </div>
              {selectedSessionId === session.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Date & Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <section>
          <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">
            Choisir la date
          </h4>
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-2 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 1} // Disallow past and Mondays (stub)
              locale={fr}
              className="text-white"
            />
          </div>
        </section>

        {/* Slots */}
        <section>
          <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">
            Créneaux horaires
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {VR_TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={cn(
                  "p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2",
                  selectedSlot === slot
                    ? "bg-white text-zinc-950 border-white"
                    : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white",
                )}
              >
                <Clock className="h-3 w-3" />
                {slot}
              </button>
            ))}
          </div>

          {/* Participants */}
          <div className="mt-6 p-4 rounded-2xl bg-zinc-900/40 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-white/40" />
                <span className="text-sm font-bold text-white">
                  Participants
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setParticipants(Math.max(1, participants - 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10"
                >
                  -
                </button>
                <span className="text-sm font-bold w-4 text-center">
                  {participants}
                </span>
                <button
                  onClick={() =>
                    setParticipants(
                      Math.min(
                        selectedSession?.max_participants || 4,
                        participants + 1,
                      ),
                    )
                  }
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-[10px] text-white/30 text-center italic">
              Maximum {selectedSession?.max_participants || 4} personnes
            </div>
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-white/5">
        <Button
          onClick={handleBooking}
          disabled={
            bookMutation.isPending || !selectedSlot || !selectedSessionId
          }
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold shadow-lg shadow-primary/20"
        >
          {bookMutation.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <div className="flex items-center justify-between w-full px-4">
              <span>Réserver la session</span>
              <div className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-80">
                <span>
                  {selectedSession
                    ? parseFloat(selectedSession.price) * participants
                    : 0}{" "}
                  FCFA
                </span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
