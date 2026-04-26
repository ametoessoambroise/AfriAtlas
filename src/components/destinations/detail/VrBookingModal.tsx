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
import { Separator } from "@/components/ui/separator";
import { useBookVrSession } from "@/hooks/queries/useVrSessions";
import { VRSessionListResponse } from "@/lib/types";
import { fr } from "date-fns/locale";
import {
  Clock,
  Users,
  Gamepad2,
  AlertCircle,
  Settings2,
  Loader2,
} from "lucide-react";
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
  const [customRange, setCustomRange] = useState([540, 600]);
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
    } catch (_) {
      // handled by mutation toast
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 rounded-2xl border border-border shadow-xl">
        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-5 border-b border-border bg-background">
          <DialogHeader>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              <Gamepad2 className="h-3.5 w-3.5" />
              Expérience Immersive
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Réserver votre session VR
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Préparez-vous à explorer le Togo comme si vous y étiez.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ── Body ── */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[65vh] overflow-y-auto bg-background">
          {/* ── Colonne gauche ── */}
          <div className="space-y-6">
            {/* 1. Session */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">
                1. Choisir l'expérience
              </Label>
              <Select
                value={selectedSessionId}
                onValueChange={setSelectedSessionId}
              >
                <SelectTrigger className="w-full h-10 rounded-lg border-border bg-background">
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
                <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Durée
                    </span>
                    <span className="font-semibold text-foreground">
                      {selectedSession.duration_minutes} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> Capacité
                    </span>
                    <span className="font-semibold text-foreground">
                      {selectedSession.max_participants} personnes
                    </span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Prix</span>
                    <span className="font-bold text-foreground text-sm">
                      {selectedSession.price} {selectedSession.currency}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Participants */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">
                2. Nombre de voyageurs
              </Label>
              <Input
                type="number"
                min={1}
                max={selectedSession?.max_participants || 4}
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
                className="h-10 rounded-lg text-center font-bold w-full"
              />
            </div>
          </div>

          {/* ── Colonne droite ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-foreground">
                3. Date & Créneau
              </Label>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 gap-1.5 text-xs rounded-lg transition-all ${
                  isCustom
                    ? "bg-primary/10 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsCustom(!isCustom)}
              >
                <Settings2 className="h-3.5 w-3.5" />
                {isCustom ? "Mode Grille" : "Personnalisé"}
              </Button>
            </div>

            {/* Calendrier */}
            <div className="rounded-lg border border-border bg-muted/40 p-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={fr}
                disabled={(d) => d < new Date()}
                className="rounded-lg border-none"
              />
            </div>

            {/* Créneaux grille */}
            {!isCustom ? (
              <div className="grid grid-cols-4 gap-1.5">
                {VR_TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`text-[10px] py-1.5 rounded-lg font-medium transition-all border ${
                      timeSlot === slot
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {slot.split(" - ")[0]}
                  </button>
                ))}
              </div>
            ) : (
              /* Mode personnalisé */
              <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Créneau
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {minutesToTime(customRange[0])} —{" "}
                      {minutesToTime(customRange[1])}
                    </p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Durée
                    </p>
                    <p
                      className={`text-sm font-bold ${isCustomValid ? "text-foreground" : "text-destructive"}`}
                    >
                      {currentDuration} min
                    </p>
                  </div>
                </div>

                <Slider
                  defaultValue={[540, 600]}
                  max={1320}
                  min={480}
                  step={5}
                  value={customRange}
                  onValueChange={setCustomRange}
                  className="py-2"
                />

                {!isCustomValid && (
                  <div className="flex items-center gap-1.5 text-[11px] text-destructive bg-destructive/5 px-3 py-2 rounded-lg border border-destructive/10">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    Min 20 min · Max 2h · Actuel : {currentDuration} min
                  </div>
                )}

                <p className="text-[10px] text-muted-foreground text-center italic">
                  Faites glisser les curseurs pour définir votre horaire.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <DialogFooter className="px-6 py-4 border-t border-border bg-muted/30 flex flex-col gap-3">
          {!user && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs w-full">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              Vous devez être connecté pour finaliser votre réservation.
            </div>
          )}
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-lg h-10"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              className="flex-[2] rounded-lg h-10 font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
              onClick={handleBooking}
              disabled={bookingMutation.isPending || !user}
            >
              {bookingMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Traitement...
                </>
              ) : (
                "Finaliser la réservation"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
