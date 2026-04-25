import React, { memo } from "react";
import { Video, Calendar, MapPin, Compass } from "lucide-react";
import { BookingListResponse } from "@/lib/types/booking";
import { formatDate } from "@/lib/utils/formatters";
import { Link } from "react-router-dom";

interface NextBookingCardProps {
  booking?: BookingListResponse;
  isLoading?: boolean;
}

export const NextBookingCard = memo(
  ({ booking, isLoading }: NextBookingCardProps) => {
    if (isLoading) {
      return (
        <div className="bg-card rounded-[32px] p-6 border border-border flex flex-col gap-4 animate-pulse">
          <div className="w-1/3 h-4 bg-muted rounded" />
          <div className="w-2/3 h-8 bg-muted rounded" />
          <div className="w-full h-12 bg-muted rounded mt-auto" />
        </div>
      );
    }

    if (!booking) {
      return (
        <div className="bg-card rounded-[32px] p-6 border border-border flex flex-col gap-4 h-full shadow-sm hover:shadow-md transition-all">
          <p className="font-black text-foreground">Prochaine étape ?</p>
          <div className="flex-1 flex flex-col justify-center items-center text-center py-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <p className="text-sm font-black text-foreground mb-1">
              Prêt pour une aventure ?
            </p>
            <p className="text-[11px] text-muted-foreground px-4">
              Explorez nos destinations et réservez votre prochaine visite VR ou
              réelle.
            </p>
          </div>
          <Link
            to="/destinations"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-black transition-all hover:scale-[1.02] shadow-lg shadow-primary/10"
          >
            Découvrir
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-card rounded-[32px] p-6 border border-border flex flex-col gap-4 h-full shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform" />

        <div className="flex items-center justify-between relative z-10">
          <p className="font-black text-foreground">Prochaine Réservation</p>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 uppercase tracking-widest">
            {booking.status === "confirmed" ? "Confirmé" : "En attente"}
          </span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h3 className="text-2xl font-black text-foreground leading-tight font-premium mb-2">
            Visite Immersive
            <br />
            Destination #{booking.place_id.substring(0, 4)}
          </h3>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">
                {formatDate(booking.scheduled_at)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">Lomé, Togo</span>
            </div>
          </div>
        </div>

        <Link
          to={`/bookings/${booking.id}`}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-black transition-all hover:scale-[1.02] shadow-lg shadow-primary/10 relative z-10"
        >
          <Video className="w-4 h-4" />
          Accéder à la session
        </Link>
      </div>
    );
  },
);
