  import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, MapPin, ChevronRight, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingListResponse } from "@/lib/types";

interface BookingCardProps {
  booking: BookingListResponse;
}

const statusMap: Record<string, { label: string; colorClass: string }> = {
  pending: { label: "En attente", colorClass: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  confirmed: { label: "Confirmée", colorClass: "bg-green-500/10 text-green-600 border-green-500/20" },
  cancelled: { label: "Annulée", colorClass: "bg-red-500/10 text-red-600 border-red-500/20" },
  completed: { label: "Terminée", colorClass: "bg-primary/10 text-primary border-primary/20" },
};

export function BookingCard({ booking }: BookingCardProps) {
  const statusInfo = statusMap[booking.status] || { label: booking.status, colorClass: "bg-muted text-muted-foreground" };
  const date = new Date(booking.scheduled_at);

  return (
    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row gap-6">
      <div className="h-40 w-full md:w-48 bg-muted rounded-2xl flex items-center justify-center shrink-0">
        <MapPin className="h-8 w-8 text-muted-foreground/30" />
      </div>

      <div className="flex-1 flex flex-col min-w-0 py-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-bold text-xl truncate">Réservation #{booking.id.substring(0, 8)}</h3>
            <p className="text-sm text-muted-foreground mt-1">Lieu ID: {booking.place_id}</p>
          </div>
          <div className={`px-4 py-1.5 rounded-full border text-sm font-semibold shrink-0 ${statusInfo.colorClass}`}>
            {statusInfo.label}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground mt-auto">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{booking.party_size} pers.</span>
          </div>
          {booking.total_price && (
            <div className="flex items-center gap-2 text-foreground font-bold">
              <Euro className="h-4 w-4" />
              <span>{parseFloat(booking.total_price).toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button asChild variant="outline" className="rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
            <Link to={`/bookings/${booking.id}`}>
              Voir les détails
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
