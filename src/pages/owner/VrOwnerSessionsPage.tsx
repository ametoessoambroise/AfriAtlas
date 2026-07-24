import React, { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  List,
  Plus,
  Search,
  Download,
  Users,
  Clock,
  MapPin,
  AlertTriangle,
  Loader2,
  Edit2,
  Trash2,
  Filter,
  CheckCircle2,
  XCircle,
  FileDown,
} from "lucide-react";
import { format, isPast, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useVrSessions,
  useCreateVrSession,
  useUpdateVrSession,
  useDeleteVrSession,
  useVrSessionBookings,
  useUpdateVrAttendance,
} from "@/hooks/queries/useVrSessions";
import { useOwnerClaims } from "@/hooks/queries/useOwnerDashboard";
import { useMyRevenueSummary } from "@/hooks/queries/useRevenues";
import { VrSessionCalendar } from "@/components/shared/VrSessionCalendar";
import type {
  VRSessionListResponse,
  VRSessionCreate,
  VRSessionUpdate,
  VRBookingListResponse,
} from "@/lib/types";
import { toast } from "sonner";

// ─── Status Badge ─────────────────────────────────────────────────────────────
function SessionStatusBadge({
  isActive,
  createdAt,
}: {
  isActive: boolean;
  createdAt: string;
}) {
  const isRecent =
    new Date().getTime() - new Date(createdAt).getTime() <
    7 * 24 * 60 * 60 * 1000;

  if (!isActive)
    return (
      <Badge
        variant="outline"
        className="bg-red-500/10 text-red-400 border-red-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest"
      >
        Désactivé
      </Badge>
    );

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest"
      >
        Actif
      </Badge>
      {isRecent && (
        <Badge className="bg-amber-500 text-zinc-900 border-none text-[10px] h-5 rounded-lg font-black uppercase tracking-widest">
          Nouveau
        </Badge>
      )}
    </div>
  );
}

// ─── VR Session Table ────────────────────────────────────────────────────────
function VrSessionsTable({
  sessions,
  onEdit,
  onDelete,
  onViewBookings,
}: {
  sessions: VRSessionListResponse[];
  onEdit: (s: VRSessionListResponse) => void;
  onDelete: (s: VRSessionListResponse) => void;
  onViewBookings: (s: VRSessionListResponse) => void;
}) {
  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-md overflow-hidden text-white shadow-2xl">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/40 uppercase text-[10px] font-black tracking-widest px-6 h-14">
              Session
            </TableHead>
            <TableHead className="text-white/40 uppercase text-[10px] font-black tracking-widest px-6 h-14">
              Détails
            </TableHead>
            <TableHead className="text-white/40 uppercase text-[10px] font-black tracking-widest px-6 h-14">
              Prix / Capacité
            </TableHead>
            <TableHead className="text-white/40 uppercase text-[10px] font-black tracking-widest px-6 h-14">
              Statut
            </TableHead>
            <TableHead className="text-right px-6 h-14" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow
              key={session.id}
              className="border-white/5 hover:bg-white/5 transition-colors group"
            >
              <TableCell className="px-6 py-4">
                <div className="font-black text-sm uppercase tracking-tight text-white">{session.title}</div>
                <div className="text-[10px] text-white/40 flex items-center gap-1 mt-1 font-bold uppercase tracking-widest">
                  <MapPin className="h-3 w-3" /> {session.place_id.slice(0, 8)}...
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm font-bold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500/70" />
                  {session.duration_minutes} min
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm font-black text-white">
                  {session.price} {session.currency}
                </div>
                <div className="text-[10px] text-white/40 flex items-center gap-1 font-bold uppercase tracking-widest">
                  <Users className="h-3 w-3" /> max {session.max_participants}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <SessionStatusBadge
                  isActive={session.is_active}
                  createdAt={session.created_at}
                />
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewBookings(session)}
                    className="h-9 w-9 rounded-lg hover:bg-white/10"
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(session)}
                    className="h-9 w-9 rounded-lg hover:bg-white/10"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(session)}
                    className="h-9 w-9 rounded-lg hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function VrOwnerSessionsPage() {
  const { data: claims } = useOwnerClaims();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  // On récupère toutes les sessions. Le filtrage par lieu se fait côté client
  // ou on pourrait passer le slug si l'API le supporte bien.
  const { data: sessions, isLoading: isSessionsLoading, isError } = useVrSessions();
  const { data: revenueSummary, isLoading: isRevenueLoading } = useMyRevenueSummary();

  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");

  const isLoading = isSessionsLoading || isRevenueLoading;

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSession, setEditingSession] =
    useState<VRSessionListResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] =
    useState<VRSessionListResponse | null>(null);
  const [selectedSessionForBookings, setSelectedSessionForBookings] =
    useState<VRSessionListResponse | null>(null);

  const filteredSessions = useMemo(() => {
    if (!sessions) return [];
    return sessions.filter((s) => {
      const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
      const matchPlace = selectedPlace && selectedPlace !== "all" ? s.place_id === selectedPlace : true;
      return matchSearch && matchPlace;
    });
  }, [sessions, search, selectedPlace]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Sessions <span className="text-amber-500">VR Immersives</span>
          </h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1 opacity-70">
            Gérez vos expériences de réalité virtuelle et les réservations clients.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-white/10 text-white bg-white/5 hover:bg-white/10 rounded-md h-12 px-6 font-black uppercase tracking-widest text-[10px] transition-all"
            onClick={() =>
              setViewMode(viewMode === "list" ? "calendar" : "list")
            }
          >
            {viewMode === "list" ? (
              <CalendarIcon className="h-4 w-4 mr-2" />
            ) : (
              <List className="h-4 w-4 mr-2" />
            )}
            {viewMode === "list" ? "Vue Calendrier" : "Vue Liste"}
          </Button>
          <Button
            onClick={() => {
              setEditingSession(null);
              setIsFormOpen(true);
            }}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black uppercase tracking-widest text-xs h-12 px-8 rounded-md shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
          >
            <Plus className="h-5 w-5 mr-2" /> Nouvelle Session
          </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-100">
        {[
          {
            label: "Sessions Actives",
            value: sessions?.filter((s) => s.is_active).length || 0,
            icon: CheckCircle2,
            color: "text-emerald-400",
          },
          {
            label: "Total Réservations",
            value: revenueSummary?.total_bookings || 0,
            icon: Users,
            color: "text-blue-400",
          },
          {
            label: "Alerte Maintenance",
            value: sessions?.filter((s) => !s.is_active).length || 0,
            icon: AlertTriangle,
            color: "text-amber-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-900/40 border border-white/5 rounded-md p-5 flex items-center gap-4 hover:border-white/10 transition-colors"
          >
            <div
              className={`w-12 h-12 rounded-md bg-white/5 flex items-center justify-center ${stat.color} shadow-inner`}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
          <Input
            placeholder="Rechercher une session..."
            className="bg-zinc-900 border-white/10 pl-12 text-white rounded-md h-12 font-bold text-xs uppercase tracking-widest focus:ring-amber-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-zinc-900/50 border border-white/10 text-white rounded-xl h-11 px-4 min-w-[200px] outline-none focus:border-amber-500/50"
          value={selectedPlace || ""}
          onChange={(e) => setSelectedPlace(e.target.value || null)}
        >
          <option value="">Tous les lieux</option>
          {claims?.map((c) => (
            <option key={c.id} value={c.place_id}>
              {c.place_name}
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          className="border-white/10 h-12 px-6 text-white hover:bg-white/5 rounded-md font-black uppercase tracking-widest text-[10px]"
        >
          <Filter className="h-4 w-4 mr-2" /> Filtres
        </Button>
      </div>

      {/* Main Content */}
      <div className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
        {viewMode === "list" ? (
          <VrSessionsTable
            sessions={filteredSessions}
            onEdit={(s) => {
              setEditingSession(s);
              setIsFormOpen(true);
            }}
            onDelete={(s) => {
              setSessionToDelete(s);
              setIsDeleteOpen(true);
            }}
            onViewBookings={(s) => {
              setSelectedSessionForBookings(s);
            }}
          />
        ) : (
          <div className="space-y-6">
            {!selectedPlace || selectedPlace === "all" ? (
              <div className="bg-zinc-900/50 border border-white/10 rounded-md p-12 text-center text-white min-h-[400px] flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 bg-white/5 rounded-md flex items-center justify-center">
                  <CalendarIcon className="h-10 w-10 text-white/20" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight">Vue Calendrier</h3>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest max-w-xs mx-auto">
                    Veuillez sélectionner un établissement spécifique pour afficher son calendrier.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/50 border border-white/10 rounded-md p-8 shadow-2xl">
                <VrSessionCalendar placeSlug={selectedPlace} />
              </div>
            )}
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => setViewMode("list")} className="rounded-md h-11 px-8 font-black uppercase tracking-widest text-[10px] border-white/10 hover:bg-white/5">
                Retour à la liste des sessions
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modals placeholders */}
      <VrSessionFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        session={editingSession}
        placeId={selectedPlace && selectedPlace !== "all" ? selectedPlace : (claims?.[0]?.id || "")}
      />

      <DeleteConfirmModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        session={sessionToDelete}
      />

      <SessionBookingsModal
        session={selectedSessionForBookings}
        onClose={() => setSelectedSessionForBookings(null)}
      />
    </div>
  );
}

// ─── Session Bookings Modal ──────────────────────────────────────────────────
function SessionBookingsModal({
  session,
  onClose,
}: {
  session: VRSessionListResponse | null;
  onClose: () => void;
}) {
  const { data: bookings, isLoading } = useVrSessionBookings(session?.id || "");
  const { mutate: updateAttendance } = useUpdateVrAttendance(session?.id || "");

  return (
    <Dialog open={!!session} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-3xl rounded-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight">
            <Users className="h-5 w-5 text-amber-500" />
            Réservations : {session?.title}
          </DialogTitle>
          <DialogDescription className="text-white/40 text-xs font-bold uppercase tracking-widest">
            Liste des participants et gestion de la présence.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
            </div>
          ) : !bookings || bookings.length === 0 ? (
            <div className="text-center py-12 text-white/40 italic uppercase text-[10px] font-black tracking-widest bg-white/3 rounded-md border border-dashed border-white/10">
              Aucune réservation pour cette session.
            </div>
          ) : (
            <div className="border border-white/10 rounded-md overflow-hidden shadow-inner">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60 font-black uppercase text-[10px] tracking-widest h-12">
                      Date
                    </TableHead>
                    <TableHead className="text-white/60 font-black uppercase text-[10px] tracking-widest h-12">
                      Créneau
                    </TableHead>
                    <TableHead className="text-white/60 font-black uppercase text-[10px] tracking-widest h-12">
                      Participants
                    </TableHead>
                    <TableHead className="text-white/60 font-black uppercase text-[10px] tracking-widest h-12">
                      Statut
                    </TableHead>
                    <TableHead className="text-white/60 font-black uppercase text-[10px] tracking-widest h-12 text-right">
                      Présence
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="border-white/5 group hover:bg-white/3">
                      <TableCell className="font-bold text-xs">
                        {format(parseISO(booking.booking_date), "dd MMM yyyy", {
                          locale: fr,
                        })}
                      </TableCell>
                      <TableCell className="text-xs font-medium">{booking.time_slot}</TableCell>
                      <TableCell className="text-xs font-medium">{booking.num_participants}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            booking.status === "confirmed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 rounded-lg text-[9px] font-black uppercase"
                              : "bg-white/5 text-white/60 rounded-lg text-[9px] font-black uppercase"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-lg hover:bg-white/10 font-black uppercase text-[9px] tracking-widest opacity-60 group-hover:opacity-100 transition-all"
                          onClick={() =>
                            updateAttendance({
                              bookingId: booking.id,
                              attended: true,
                            })
                          }
                        >
                          Marquer Présent
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-md h-11 px-8 font-black uppercase tracking-widest text-[10px]"
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Session Form Modal ──────────────────────────────────────────────────────
function VrSessionFormModal({
  open,
  onClose,
  session,
  placeId,
}: {
  open: boolean;
  onClose: () => void;
  session: VRSessionListResponse | null;
  placeId: string;
}) {
  const { mutate: create, isPending: isCreating } = useCreateVrSession(placeId);
  const isEditing = !!session;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-2xl rounded-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tight">
            {isEditing ? "Modifier la Session" : "Nouvelle Session VR"}
          </DialogTitle>
          <DialogDescription className="text-white/40 text-xs font-bold uppercase tracking-widest">
            Configurez les détails de l'expérience et la tarification.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-5 py-6">
          <div className="col-span-2 space-y-1.5">
            <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">
              Titre de l'expérience
            </label>
            <Input
              id="session-title"
              defaultValue={session?.title}
              className="bg-white/5 border-white/10 rounded-md h-12 font-bold text-sm focus:ring-amber-500/20"
              placeholder="Ex: Survol du Koutammakou"
            />
          </div>
          <div className="col-span-2 space-y-1.5">
            <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">
              Description
            </label>
            <textarea
              className="w-full bg-white/5 border-white/10 rounded-md p-3 min-h-[100px]"
              defaultValue={session?.description || ""}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">
              Durée (minutes)
            </label>
            <Input
              id="session-duration"
              type="number"
              defaultValue={session?.duration_minutes}
              className="bg-white/5 border-white/10 rounded-md h-12 font-bold text-sm focus:ring-amber-500/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">
              Prix (FCFA)
            </label>
            <Input
              id="session-price"
              type="number"
              defaultValue={session?.price}
              className="bg-white/5 border-white/10 rounded-md h-12 font-bold text-sm focus:ring-amber-500/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">
              Places Max
            </label>
            <Input
              id="session-max"
              type="number"
              defaultValue={session?.max_participants}
              className="bg-white/5 border-white/10 rounded-md h-12 font-bold text-sm focus:ring-amber-500/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block px-1">
              Statut
            </label>
            <select className="w-full bg-white/5 border-white/10 rounded-md h-10 px-3 outline-none">
              <option value="true">Actif</option>
              <option value="false">Désactivé / Maintenance</option>
            </select>
          </div>
        </div>

        <DialogFooter className="gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 text-zinc-300 rounded-md h-12 font-black uppercase tracking-widest text-[10px] px-6"
          >
            Annuler
          </Button>
          <Button className="bg-amber-500 text-zinc-900 font-bold hover:bg-amber-400">
            {isEditing ? "Enregistrer" : "Créer la session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm Modal ────────────────────────────────────────────────────
function DeleteConfirmModal({
  open,
  onClose,
  session,
}: {
  open: boolean;
  onClose: () => void;
  session: VRSessionListResponse | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-red-500/20 text-white rounded-md">
        <DialogHeader>
          <DialogTitle className="text-red-400 flex items-center gap-2 font-black uppercase tracking-tight text-lg">
            <Trash2 className="h-5 w-5" /> Supprimer la session
          </DialogTitle>
          <DialogDescription className="text-white/40 font-medium text-sm">
            Êtes-vous sûr de vouloir supprimer "{session?.title}" ? Toutes les
            réservations associées pourraient être affectées.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 text-zinc-300 rounded-md h-11 px-6 font-black uppercase tracking-widest text-[10px]"
          >
            Annuler
          </Button>
          <Button variant="destructive" className="rounded-md h-11 px-6 font-black uppercase tracking-widest text-[10px]">Confirmer la suppression</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
