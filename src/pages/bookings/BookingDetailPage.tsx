import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, QrCode, Calendar, Clock, MapPin, Users, Euro, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingDetail, useCancelBooking } from "@/hooks/queries/useBookings";
import { Skeleton } from "@/components/ui/skeleton";
import type { BookingStatus } from "@/lib/types";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  switch (status) {
    case "confirmed":
      return <div className="flex justify-center items-center gap-2 mb-6 text-green-600 bg-green-500/10 px-4 py-2 rounded-md font-bold border border-green-500/20"><CheckCircle2 className="h-5 w-5" /> Confirmée</div>;
    case "pending":
      return <div className="flex justify-center items-center gap-2 mb-6 text-yellow-600 bg-yellow-500/10 px-4 py-2 rounded-md font-bold border border-yellow-500/20"><AlertCircle className="h-5 w-5" /> En attente de paiement</div>;
    case "cancelled":
      return <div className="flex justify-center items-center gap-2 mb-6 text-red-600 bg-red-500/10 px-4 py-2 rounded-md font-bold border border-red-500/20"><XCircle className="h-5 w-5" /> Annulée</div>;
    case "completed":
      return <div className="flex justify-center items-center gap-2 mb-6 text-primary bg-primary/10 px-4 py-2 rounded-md font-bold border border-primary/20"><CheckCircle2 className="h-5 w-5" /> Terminée</div>;
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
      <DashboardLayout>
        <div className="p-6 lg:p-8 space-y-6">
          <Skeleton className="h-10 w-48 rounded-md" />
          <Skeleton className="h-[600px] w-full rounded-md" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !booking) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 text-center space-y-4">
          <h1 className="text-2xl font-black uppercase tracking-tight">Réservation introuvable</h1>
          <Button asChild className="rounded-md px-8 h-12 font-black uppercase tracking-widest text-xs" variant="outline">
            <Link to="/bookings">Retour à mes réservations</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const date = new Date(booking.scheduled_at);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-2">
          <button
            onClick={() => navigate("/bookings")}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest w-fit"
          >
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Toutes les réservations
          </button>

          <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
            Détails de la <span className="text-primary">Réservation</span>
          </h1>
        </div>

        <div className="bg-card border border-border shadow-sm rounded-md overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-4 duration-500 delay-100">
          
          {/* Colonne QR & Actions */}
          <div className="md:w-1/3 bg-muted/20 p-8 flex flex-col border-b md:border-b-0 md:border-r border-border items-center text-center">
            <StatusBadge status={booking.status} />
            
            <div className="bg-white dark:bg-neutral-900 p-4 rounded-md shadow-sm mb-6 border border-border">
              <div className="border-[3px] border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center space-y-4 text-muted-foreground min-h-48 min-w-48 aspect-square">
                 <QrCode className="h-20 w-20 text-muted-foreground/40" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-center opacity-60">Ticket<br/>Virtuel</span>
              </div>
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8">Ref: {booking.id.split("-").join("").substring(0, 12).toUpperCase()}</p>

            <div className="mt-auto w-full space-y-3">
              {booking.status === "pending" && (
                <Button className="w-full h-12 rounded-md gap-2 font-black uppercase tracking-widest text-xs bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 transition-all">
                   <Euro className="h-4 w-4" /> Finaliser le paiement
                </Button>
              )}
              
              {(booking.status === "pending" || booking.status === "confirmed") && (
                <Button 
                  variant="destructive" 
                  className="w-full h-12 rounded-md font-black uppercase tracking-widest text-xs bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  {cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : "Annuler la réservation"}
                </Button>
              )}
            </div>
          </div>

          {/* Colonne Détails */}
          <div className="md:w-2/3 p-8 md:p-12 flex flex-col relative">
            <div className="grid sm:grid-cols-2 gap-10 text-lg">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Lieu / ID
                </span>
                <p className="font-black text-xl tracking-tight">{booking.place_id}</p>
              </div>
              
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" /> Date
                </span>
                <p className="font-black text-xl tracking-tight">{date.toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Heure
                </span>
                <p className="font-black text-xl tracking-tight">{date.toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })} (Locale)</p>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-primary" /> Participants
                </span>
                <p className="font-black text-xl tracking-tight">{booking.party_size} personne{booking.party_size > 1 ? "s" : ""}</p>
              </div>
            </div>

            <div className="mt-auto space-y-6 pt-12">
              {booking.notes && (
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-md">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Notes / Demandes</h4>
                  <p className="text-sm font-medium leading-relaxed">{booking.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-8 border-t border-border/60">
                <span className="text-muted-foreground text-xs font-black uppercase tracking-widest">Prix total payé</span>
                <span className="text-3xl font-black text-primary">
                  {booking.total_price ? parseFloat(booking.total_price).toFixed(2) : "0.00"} €
                </span>
              </div>
              {booking.paid_at && (
                 <p className="text-[10px] font-bold text-right text-muted-foreground uppercase tracking-widest opacity-60">Payé le {new Date(booking.paid_at).toLocaleString("fr-FR")}</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
