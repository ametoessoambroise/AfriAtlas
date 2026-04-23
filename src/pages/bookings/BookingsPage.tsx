import React, { useState } from "react";
import { Loader2, TicketPercent } from "lucide-react";
import { useBookings } from "@/hooks/queries/useBookings";
import { BookingCard } from "@/components/bookings/BookingCard";
import type { BookingStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  
  const { data, isLoading, error } = useBookings(
    statusFilter === "all" ? null : statusFilter, 
    1
  );

  return (
    <div className="container py-12 px-4 md:px-8 mx-auto max-w-5xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary">
          Mes Réservations
        </h1>
        <p className="text-lg text-muted-foreground">
          Gérez vos visites sur place, guides et expériences VR passées et à venir.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pb-4">
        {[
          { id: "all", label: "Toutes" },
          { id: "pending", label: "En attente" },
          { id: "confirmed", label: "Confirmées" },
          { id: "completed", label: "Terminées" },
          { id: "cancelled", label: "Annulées" }
        ].map((filter) => (
          <Button
            key={filter.id}
            variant={statusFilter === filter.id ? "default" : "outline"}
            className="rounded-full px-6"
            onClick={() => setStatusFilter(filter.id as BookingStatus | "all")}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-red-500/10 rounded-3xl border border-red-500/20">
            <p className="text-red-500 font-medium">Erreur lors de la récupération de vos réservations.</p>
          </div>
        ) : data?.items?.length === 0 ? (
          <div className="text-center p-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border/50">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <TicketPercent className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-bold mb-2">Aucune réservation</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Vous n'avez aucune réservation correspondant à ce critère.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {data?.items?.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
