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

// ─── Status Badge ─────────────────────────────────────────────────────────────
// src/pages/owner/VrOwnerSessionsPage.tsx

function SessionStatusBadge({
  isActive,
  createdAt,
}: {
  isActive: boolean;
  createdAt: string;
}) {
  // Calcul si la session est récente (< 7 jours)
  const isRecent =
    new Date().getTime() - new Date(createdAt).getTime() <
    7 * 24 * 60 * 60 * 1000;

  if (!isActive)
    return (
      <Badge
        variant="outline"
        className="bg-red-500/10 text-red-400 border-red-500/20"
      >
        Désactivé
      </Badge>
    );

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      >
        Actif
      </Badge>
      {isRecent && (
        <Badge className="bg-amber-500 text-zinc-900 border-none text-[10px] h-5">
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
    <div className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden text-white">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10">
            <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6">
              Session
            </TableHead>
            <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6">
              Détails
            </TableHead>
            <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6">
              Prix / Capacité
            </TableHead>
            <TableHead className="text-white/40 uppercase text-[10px] tracking-widest px-6">
              Statut
            </TableHead>
            <TableHead className="text-right px-6" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow
              key={session.id}
              className="border-white/5 hover:bg-white/5 transition-colors"
            >
              <TableCell className="px-6 py-4">
                <div className="font-medium text-white">{session.title}</div>
                <div className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" /> Lieu (ID:{" "}
                  {session.place_id.slice(0, 8)}...)
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500/70" />
                  {session.duration_minutes} min
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm font-semibold text-white">
                  {session.price} {session.currency}
                </div>
                <div className="text-xs text-white/40 flex items-center gap-1">
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
                <div className="flex items-center justify-end gap-2 text-white">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewBookings(session)}
                    className="hover:bg-white/10"
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(session)}
                    className="hover:bg-white/10"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(session)}
                    className="hover:bg-red-500/20 text-red-400"
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
      const matchPlace = selectedPlace ? s.place_id === selectedPlace : true;
      return matchSearch && matchPlace;
    });
  }, [sessions, search, selectedPlace]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Sessions VR
          </h1>
          <p className="text-white/60 mt-1">
            Gérez vos expériences de réalité virtuelle et les réservations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-white/10 text-white bg-white/5 hover:bg-white/10"
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
            className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold"
          >
            <Plus className="h-4 w-4 mr-2" /> Nouvelle Session
          </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            label: "Alertes Disponibilité",
            value: sessions?.filter((s) => !s.is_active).length || 0,
            icon: AlertTriangle,
            color: "text-amber-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            placeholder="Rechercher une session..."
            className="bg-zinc-900/50 border-white/10 pl-10 text-white rounded-xl h-11"
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
          className="border-white/10 h-11 px-4 text-white hover:bg-white/5"
        >
          <Filter className="h-4 w-4 mr-2" /> Filtres
        </Button>
      </div>

      {/* Main Content */}
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
          {!selectedPlace ? (
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 text-center text-white min-h-[400px] flex flex-col items-center justify-center gap-4">
              <CalendarIcon className="h-12 w-12 text-white/20" />
              <div>
                <h3 className="text-lg font-medium">Vue Calendrier</h3>
                <p className="text-white/40 text-sm mt-1">
                  Veuillez sélectionner un établissement pour afficher le
                  calendrier.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
              <VrSessionCalendar placeSlug={selectedPlace} />
            </div>
          )}
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setViewMode("list")}>
              Retour à la liste des sessions
            </Button>
          </div>
        </div>
      )}

      {/* Modals placeholders */}
      <VrSessionFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        session={editingSession}
        placeId={selectedPlace || ""}
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
  const { mutate: updateAttendance } = useUpdateVrAttendance(
    session?.id || ""
  );

  return (
    <Dialog open={!!session} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-amber-500" />
            Réservations : {session?.title}
          </DialogTitle>
          <DialogDescription className="text-white/40">
            Liste des participants et gestion de la présence.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          ) : !bookings || bookings.length === 0 ? (
            <div className="text-center py-12 text-white/40 italic">
              Aucune réservation pour cette session.
            </div>
          ) : (
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60 font-bold">
                      Date
                    </TableHead>
                    <TableHead className="text-white/60 font-bold">
                      Créneau
                    </TableHead>
                    <TableHead className="text-white/60 font-bold">
                      Participants
                    </TableHead>
                    <TableHead className="text-white/60 font-bold">
                      Statut
                    </TableHead>
                    <TableHead className="text-white/60 font-bold text-right">
                      Présence
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="border-white/5">
                      <TableCell className="font-medium">
                        {format(parseISO(booking.booking_date), "dd MMM yyyy", {
                          locale: fr,
                        })}
                      </TableCell>
                      <TableCell>{booking.time_slot}</TableCell>
                      <TableCell>{booking.num_participants}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            booking.status === "confirmed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-white/5 text-white/60"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-white/10"
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
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
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
      <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier la Session" : "Nouvelle Session VR"}
          </DialogTitle>
          <DialogDescription className="text-white/40">
            Configurez les détails de l'expérience et la tarification.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="col-span-2 space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold tracking-tighter">
              Titre de l'expérience
            </label>
            <Input
              defaultValue={session?.title}
              className="bg-white/5 border-white/10"
              placeholder="Ex: Survol du Koutammakou"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold tracking-tighter">
              Description
            </label>
            <textarea
              className="w-full bg-white/5 border-white/10 rounded-md p-3 min-h-[100px]"
              defaultValue={session?.description || ""}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold tracking-tighter">
              Durée (minutes)
            </label>
            <Input
              type="number"
              defaultValue={session?.duration_minutes}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold tracking-tighter">
              Prix (FCFA)
            </label>
            <Input
              type="number"
              defaultValue={session?.price}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold tracking-tighter">
              Places Max
            </label>
            <Input
              type="number"
              defaultValue={session?.max_participants}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/40 uppercase font-bold tracking-tighter">
              Statut
            </label>
            <select className="w-full bg-white/5 border-white/10 rounded-md h-10 px-3 outline-none">
              <option value="true">Actif</option>
              <option value="false">Désactivé / Maintenance</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/10"
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
      <DialogContent className="bg-zinc-900 border-red-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-red-400 flex items-center gap-2">
            <Trash2 className="h-5 w-5" /> Supprimer la session
          </DialogTitle>
          <DialogDescription className="text-white/40">
            Êtes-vous sûr de vouloir supprimer "{session?.title}" ? Toutes les
            réservations associées pourraient être affectées.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/10"
          >
            Annuler
          </Button>
          <Button variant="destructive">Confirmer la suppression</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
