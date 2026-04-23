import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, QrCode, Calendar, Clock, MapPin, Users, Euro, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingDetail, useCancelBooking } from "@/hooks/queries/useBookings";
import { Skeleton } from "@/components/ui/skeleton";
import type { BookingStatus } from "@/lib/types";

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  switch (status) {
    case "confirmed":
      return <div className="flex justify-center items-center gap-2 mb-6 text-green-600 bg-green-500/10 px-4 py-2 rounded-xl font-bold border border-green-500/20"><CheckCircle2 className="h-5 w-5" /> Confirmée</div>;
    case "pending":
      return <div className="flex justify-center items-center gap-2 mb-6 text-yellow-600 bg-yellow-500/10 px-4 py-2 rounded-xl font-bold border border-yellow-500/20"><AlertCircle className="h-5 w-5" /> En attente de paiement</div>;
    case "cancelled":
      return <div className="flex justify-center items-center gap-2 mb-6 text-red-600 bg-red-500/10 px-4 py-2 rounded-xl font-bold border border-red-500/20"><XCircle className="h-5 w-5" /> Annulée</div>;
    case "completed":
      return <div className="flex justify-center items-center gap-2 mb-6 text-primary bg-primary/10 px-4 py-2 rounded-xl font-bold border border-primary/20"><CheckCircle2 className="h-5 w-5" /> Terminée</div>;
  }
};

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: booking, isLoading, error } = useBookingDetail(id || "");
  const { mutateAsync: cancelBooking, isPending: cancelling } = useCancelBooking();

  const handleCancel = async () => {
    if (!id) return;
    if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      try {
        await cancelBooking(id);
      } catch (err) {
        // Error handled in the hook
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8 max-w-4xl mx-auto space-y-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Réservation introuvable</h1>
        <Button asChild className="mt-8 rounded-xl" variant="outline">
          <Link to="/bookings">Retour à mes réservations</Link>
        </Button>
      </div>
    );
  }

  const date = new Date(booking.scheduled_at);

  return (
    <div className="container py-8 px-4 md:px-8 mx-auto max-w-4xl space-y-8">
      <Button asChild variant="ghost" className="gap-2 rounded-xl text-muted-foreground hover:text-foreground">
        <Link to="/bookings">
          <ChevronLeft className="h-4 w-4" />
          Toutes les réservations
        </Link>
      </Button>

      <div className="bg-card border border-border shadow-sm rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Colonne QR & Actions */}
        <div className="md:w-1/3 bg-muted/40 p-8 flex flex-col border-b md:border-b-0 md:border-r border-border items-center text-center">
          <StatusBadge status={booking.status} />
          
          <div className="bg-white p-4 rounded-3xl shadow-sm mb-6 border border-border">
            <div className="border-[3px] border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 text-gray-400 min-h-48 min-w-48 aspect-square">
               <QrCode className="h-20 w-20" />
               <span className="text-xs font-medium uppercase tracking-widest text-center">Ticket<br/>Virtuel</span>
            </div>
          </div>
          
          <p className="text-sm font-mono text-muted-foreground mb-8">Ref: {booking.id.split("-").join("").substring(0, 12).toUpperCase()}</p>

          <div className="mt-auto w-full space-y-3">
            {booking.status === "pending" && (
              <Button className="w-full rounded-xl gap-2 font-bold bg-green-600 hover:bg-green-700 text-white">
                 <Euro className="h-4 w-4" /> Finaliser le paiement
              </Button>
            )}
            
            {(booking.status === "pending" || booking.status === "confirmed") && (
              <Button 
                variant="destructive" 
                className="w-full rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white"
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : "Annuler la réservation"}
              </Button>
            )}
          </div>
        </div>

        {/* Colonne Détails */}
        <div className="md:w-2/3 p-8 flex flex-col relative grid-bg">
          <h1 className="text-3xl font-black mb-8 relative z-10">Détails de la réservation</h1>
          
          <div className="grid sm:grid-cols-2 gap-8 relative z-10 text-lg">
            <div className="space-y-2">
              <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Lieu / ID
              </span>
              <p className="font-semibold">{booking.place_id}</p>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Date
              </span>
              <p className="font-semibold">{date.toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Heure
              </span>
              <p className="font-semibold">{date.toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })} (Heure locale)</p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" /> Participants
              </span>
              <p className="font-semibold">{booking.party_size} personne{booking.party_size > 1 ? "s" : ""}</p>
            </div>
          </div>

          <div className="mt-auto space-y-6 pt-12 relative z-10">
            {booking.notes && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-600 mb-1">Notes / Demandes</h4>
                <p className="text-sm text-yellow-800">{booking.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <span className="text-muted-foreground font-medium">Prix total payé</span>
              <span className="text-2xl font-black text-primary">
                {booking.total_price ? parseFloat(booking.total_price).toFixed(2) : "0.00"} €
              </span>
            </div>
            {booking.paid_at && (
               <p className="text-xs text-right text-muted-foreground">Payé le {new Date(booking.paid_at).toLocaleString("fr-FR")}</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
