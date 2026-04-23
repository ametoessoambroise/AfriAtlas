import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useBookVrSession } from "@/hooks/queries/useVrSessions";
import { VRSessionListResponse } from "@/lib/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, Users, Gamepad2, AlertCircle, Settings2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

import { VR_TIME_SLOTS } from "@/constants/TimeSlots";

interface VrBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: VRSessionListResponse[];
  placeSlug: string;
}

export function VrBookingModal({
  isOpen,
  onClose,
  sessions,
  placeSlug,
}: VrBookingModalProps) {
  const { user } = useAuth();
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    sessions[0]?.id || "",
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>("09:00 - 09:45");
  const [isCustom, setIsCustom] = useState(false);
  const [customRange, setCustomRange] = useState([540, 600]); // 09:00 - 10:00
  const [participants, setParticipants] = useState<number>(1);

  const selectedSession = sessions.find((s) => s.id === selectedSessionId);
  const bookingMutation = useBookVrSession(selectedSessionId);

  const minutesToTime = (m: number) => {
    const h = Math.floor(m / 60);
    const mins = m % 60;
    return `${h.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  const currentDuration = customRange[1] - customRange[0];
  const isCustomValid = currentDuration >= 20 && currentDuration <= 120;

  const handleBooking = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour réserver.");
      return;
    }

    if (isCustom && !isCustomValid) {
      toast.error(
        "La durée personnalisée doit être comprise entre 20 min et 2h.",
      );
      return;
    }

    if (!date || !selectedSessionId) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    const finalTimeSlot = isCustom
      ? `${minutesToTime(customRange[0])} - ${minutesToTime(customRange[1])}`
      : timeSlot;

    try {
      await bookingMutation.mutateAsync({
        body: {
          booking_date: date.toISOString(),
          time_slot: finalTimeSlot,
          num_participants: participants,
        },
        slug: placeSlug,
      });
      onClose();
    } catch (error) {
      // Error handled by mutation toast
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 rounded-3xl border-none shadow-2xl">
        <div className="bg-indigo-900 p-6 text-white bg-gradient-to-r from-indigo-900 to-violet-800">
          <DialogHeader>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">
              <Gamepad2 className="h-4 w-4" />
              Expérience Immersive
            </div>
            <DialogTitle className="text-2xl font-extrabold text-white">
              Réserver votre session VR
            </DialogTitle>
            <DialogDescription className="text-indigo-200/80">
              Préparez-vous à explorer le Togo comme si vous y étiez.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-bold">
                1. Choisir l'expérience
              </Label>
              <Select
                value={selectedSessionId}
                onValueChange={setSelectedSessionId}
              >
                <SelectTrigger className="w-full h-12 rounded-xl border-border bg-surface shadow-sm focus:ring-primary/20 transition-all">
                  <SelectValue placeholder="Sélectionnez une session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedSession && (
                <div className="p-4 rounded-xl bg-surface-alt border border-border/50 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Durée :
                    </span>
                    <span className="font-bold">
                      {selectedSession.duration_minutes} minutes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> Capacité :
                    </span>
                    <span className="font-bold">
                      {selectedSession.max_participants} personnes
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border mt-2 flex items-center justify-between text-base">
                    <span className="font-semibold text-foreground italic">
                      Prix :
                    </span>
                    <span className="font-bold text-primary">
                      {selectedSession.price} {selectedSession.currency}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-bold">
                2. Nombre de voyageurs
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min={1}
                  max={selectedSession?.max_participants || 4}
                  value={participants}
                  onChange={(e) =>
                    setParticipants(parseInt(e.target.value) || 1)
                  }
                  className="h-12 rounded-xl text-center font-bold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-bold">
                  3. Date & Créneau horaire
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-8 gap-1.5 text-xs rounded-lg transition-all ${
                    isCustom
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-surface text-muted-foreground"
                  }`}
                  onClick={() => setIsCustom(!isCustom)}
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  {isCustom ? "Mode Grille" : "Personnalisé"}
                </Button>
              </div>

              <div className="border rounded-2xl p-1 bg-surface-alt shadow-inner">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={fr}
                  disabled={(d) => d < new Date()}
                  className="rounded-xl border-none"
                />
              </div>

              {!isCustom ? (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {VR_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`text-[10px] py-1.5 rounded-lg font-medium transition-all border ${
                        timeSlot === slot && !isCustom
                          ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                          : "bg-surface border-border hover:border-primary/50"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-4 p-4 rounded-2xl bg-surface border border-primary/20 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                        Créneau
                      </span>
                      <p className="text-sm font-black text-primary">
                        {minutesToTime(customRange[0])} —{" "}
                        {minutesToTime(customRange[1])}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                        Durée
                      </span>
                      <p
                        className={`text-sm font-black ${isCustomValid ? "text-emerald-600" : "text-destructive"}`}
                      >
                        {currentDuration} min
                      </p>
                    </div>
                  </div>

                  <Slider
                    defaultValue={[540, 600]}
                    max={1320} // 22:00
                    min={480} // 08:00
                    step={5}
                    value={customRange}
                    onValueChange={setCustomRange}
                    className="py-4"
                  />

                  {!isCustomValid && (
                    <div className="flex items-center gap-1.5 text-[10px] text-destructive bg-destructive/5 p-2 rounded-lg border border-destructive/10">
                      <AlertCircle className="h-3 w-3" />
                      <span>Min 20m, Max 2h. Actuel: {currentDuration}m</span>
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground text-center italic">
                    Faites glisser les curseurs pour définir votre horaire.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-surface border-t border-border flex flex-col sm:flex-row gap-4">
          {!user && (
            <div className="w-full flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-xs mb-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                Vous devez être connecté pour finaliser votre réservation.
              </span>
            </div>
          )}
          <div className="flex w-full gap-3">
            <Button
              variant="ghost"
              className="flex-1 rounded-xl h-12"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              className="flex-[2] rounded-xl h-12 font-bold text-base bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
              onClick={handleBooking}
              disabled={bookingMutation.isPending || !user}
            >
              {bookingMutation.isPending
                ? "Traitement..."
                : "Finaliser la réservation"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
