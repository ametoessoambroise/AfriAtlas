import React from "react";
import { Calendar, Clock, MapPin, Users, Euro } from "lucide-react";
import type { VRSessionResponse } from "@/lib/types";

interface SessionSummaryProps {
  session: VRSessionResponse;
  date?: Date;
  timeSlot?: string;
  participants?: number;
}

export function SessionSummary({ session, date, timeSlot, participants = 1 }: SessionSummaryProps) {
  const price = parseFloat(session.price) || 0;
  const total = price * participants;

  return (
    <div className="bg-muted/30 border border-border rounded-md p-6 space-y-6 top-8 sticky">
      <h3 className="text-xl font-bold">Résumé de la Session</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 bg-primary/10 p-2 rounded-lg text-primary">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-sm">Expérience</p>
            <p className="font-bold">{session.title}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 bg-primary/10 p-2 rounded-lg text-primary">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-sm">Date</p>
            <p className="font-bold text-muted-foreground">
              {date ? date.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "À définir"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 bg-primary/10 p-2 rounded-lg text-primary">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-sm">Créneau</p>
            <p className="font-bold text-muted-foreground">{timeSlot || "À définir"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 bg-primary/10 p-2 rounded-lg text-primary">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-sm">Participants</p>
            <p className="font-bold text-muted-foreground">{participants} personne(s)</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <div className="flex items-center justify-between font-medium text-sm mb-2">
          <span className="text-muted-foreground">Prix unitaire</span>
          <span>{price.toFixed(2)} {session.currency || "€"}</span>
        </div>
        <div className="flex items-center justify-between text-xl font-black text-primary">
          <span>Total</span>
          <span>{total.toFixed(2)} {session.currency || "€"}</span>
        </div>
      </div>
    </div>
  );
}
