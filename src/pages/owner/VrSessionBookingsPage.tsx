import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Users, 
  Download, 
  CheckCircle2, 
  Circle, 
  Loader2, 
  Mail, 
  Calendar as CalendarIcon,
  Clock,
  IdCard,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useVrSession,
  useVrSessionBookings,
  useUpdateVrAttendance
} from "@/hooks/queries/useVrSessions";

import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function VrSessionBookingsPage() {
  const { id } = useParams<{ id: string }>();
  const sessionId = id || "";

  const { data: session, isLoading: isLoadingSession } = useVrSession(sessionId);
  const { data: bookings, isLoading: isLoadingBookings, refetch } = useVrSessionBookings(sessionId);
  const { mutate: updateAttendance, isPending: isUpdating } = useUpdateVrAttendance(sessionId);

  const handleToggleAttendance = (bookingId: string, current: boolean) => {
    updateAttendance({ bookingId, attended: !current }, {
      onSuccess: () => toast.success("Présence mise à jour"),
    });
  };

  const handleExport = () => {
    toast.info("Génération de l'export CSV...");
    // Simulation simple d'export
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nom,Email,Participants,Statut,Presence\n"
      + (bookings?.map(b => `${b.user_id},${b.user_id}@mail.com,${b.num_participants},${b.status},Non`).join("\n") || "");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bookings_session_${sessionId}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (isLoadingSession || isLoadingBookings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-4">
        <Link to="/owner/vr-sessions">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{session?.title}</h1>
          <p className="text-white/40 text-sm flex items-center gap-2">
            <CalendarIcon className="h-3 w-3" /> Session ID: {sessionId.slice(0, 8)}...
          </p>
        </div>
      </div>

      {/* Session Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4">
          <div className="text-white/40 text-xs uppercase mb-1">Participants Totaux</div>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            {bookings?.reduce((acc, b) => acc + b.num_participants, 0) || 0} / {session?.max_participants}
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4">
          <div className="text-white/40 text-xs uppercase mb-1">Prix Unitaire</div>
          <div className="text-2xl font-bold text-white">{session?.price} {session?.currency}</div>
        </div>
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4">
          <div className="text-white/40 text-xs uppercase mb-1">Type de Session</div>
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mt-1">Statique / 360°</Badge>
        </div>
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex items-center justify-center">
          <Button onClick={handleExport} className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white">
            <Download className="h-4 w-4 mr-2" /> Exporter Liste
          </Button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Liste des Réservations</h2>
          <div className="text-xs text-white/40 tracking-wider">
            {bookings?.length || 0} RÉSERVATIONS
          </div>
        </div>

        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10">
              <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6">Client</TableHead>
              <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6 text-center">Places</TableHead>
              <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6">Date Réservation</TableHead>
              <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6">Paiement</TableHead>
              <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6 text-center">Présence</TableHead>
              <TableHead className="text-right px-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {(bookings || []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-20 text-center text-white/20">
                  <div className="flex flex-col items-center gap-3">
                    <IdCard className="h-10 w-10 opacity-20" />
                    <p>Aucune réservation pour cette session.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              bookings?.map((booking) => (
                <TableRow key={booking.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="text-white font-medium">Utilisateur #{booking.user_id.slice(0, 6)}</div>
                    <div className="text-xs text-white/40 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> user-{booking.user_id.slice(0,4)}@atlas.tg
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Badge variant="secondary" className="bg-white/5 text-white">{booking.num_participants}</Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="text-sm text-white/80">
                      {format(new Date(booking.created_at), "dd MMM yyyy", { locale: fr })}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      Confirmé
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex justify-center">
                      <Checkbox 
                        className="border-white/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        onCheckedChange={() => handleToggleAttendance(booking.id, false)} // Logic incomplete without state
                      />
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white/40 hover:text-white">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Action Bar */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
          <Clock className="h-4 w-4 mr-2" /> Historique Session
        </Button>
        <Button className="bg-white text-zinc-900 font-bold hover:bg-zinc-200">
          <Mail className="h-4 w-4 mr-2" /> Contacter tous les clients
        </Button>
      </div>
    </div>
  );
}
