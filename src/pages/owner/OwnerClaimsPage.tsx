import React, { useState } from "react";
import { 
  Shield, 
  Plus, 
  MapPin, 
  FileCheck, 
  Clock, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ExternalLink,
  Upload,
  Info,
  Loader2,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useOwnerClaims,
  useCreateClaim,
} from "@/hooks/queries/useOwnerDashboard";
import { usePlaces } from "@/hooks/queries/usePlaces";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { PlaceClaimResponse } from "@/lib/types";

// ─── Status Badge ─────────────────────────────────────────────────────────────
function ClaimStatusBadge({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case "approved":
      return (
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          <CheckCircle2 className="h-3 w-3 mr-1" /> Approuvé
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
          <XCircle className="h-3 w-3 mr-1" /> Rejeté
        </Badge>
      );
    case "pending":
    default:
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">
          <Clock className="h-3 w-3 mr-1" /> En attente
        </Badge>
      );
  }
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function OwnerClaimsPage() {
  const { data: claims, isLoading, isError } = useOwnerClaims();
  const [isNewClaimOpen, setIsNewClaimOpen] = useState(false);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Revendications</h1>
          <p className="text-white/60 mt-1">Gérez vos demandes de propriété pour des lieux existants.</p>
        </div>
        <Button 
          onClick={() => setIsNewClaimOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold"
        >
          <Plus className="h-4 w-4 mr-2" /> Nouvelle Demande
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-zinc-900/40 border-amber-500/20 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-amber-500" /> Processus de vérification
          </CardTitle>
          <CardDescription className="text-white/40">
            Toutes les demandes de revendication sont examinées manuellement par nos administrateurs sous 48h.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-white/70 space-y-2">
          <p>• Vous devez fournir un justificatif officiel (Extrait Kbis, facture d'eau/électricité, ou contrat de bail).</p>
          <p>• Une fois approuvé, vous aurez le plein contrôle sur les produits, horaires et photos du lieu.</p>
        </CardContent>
      </Card>

      {/* Claims List */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-md overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/40 uppercase text-[10px] font-black tracking-widest px-6 h-14">Lieu demandé</TableHead>
              <TableHead className="text-white/40 uppercase text-[10px] font-black tracking-widest px-6 h-14">Date demande</TableHead>
              <TableHead className="text-white/40 uppercase text-[10px] font-black tracking-widest px-6 h-14">Statut</TableHead>
              <TableHead className="text-white/40 uppercase text-[10px] font-black tracking-widest px-6 h-14">Notes Admin</TableHead>
              <TableHead className="text-right px-6 h-14" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {(!claims || claims.length === 0) ? (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center text-white/20 italic">
                  Aucune demande en cours.
                </TableCell>
              </TableRow>
            ) : (
              claims.map((claim) => (
                <TableRow key={claim.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="font-medium text-white">{claim.place_name || "Lieu inconnu"}</div>
                    <div className="text-xs text-white/40 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> Lomé, Togo
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="text-sm text-white/70">
                      {format(new Date(claim.created_at), "dd MMM yyyy", { locale: fr })}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <ClaimStatusBadge status={claim.status} />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="text-sm text-white/50 max-w-[250px] truncate">
                      {claim.admin_comment || "En attente de revue..."}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="text-white/40 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isNewClaimOpen} onOpenChange={setIsNewClaimOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-lg">
          <NewClaimForm onClose={() => setIsNewClaimOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── New Claim Form ──────────────────────────────────────────────────────────
function NewClaimForm({ onClose }: { onClose: () => void }) {
  const { data: allPlaces } = usePlaces({ page_size: 100 });
  const { mutate: create, isPending } = useCreateClaim();
  
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  const [justification, setJustification] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlaceId) {
      toast.error("Veuillez sélectionner un établissement.");
      return;
    }

    const place = allPlaces?.items.find(p => p.id === selectedPlaceId);
    if (!place) return;
    
    create({
      place_name: place.name,
      custom_description: justification,
      category: place.category as any,
      google_place_id: null,
      address_city: place.city,
    }, {
      onSuccess: () => onClose(),
    });
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-500" /> Revendiquer un lieu
        </DialogTitle>
        <DialogDescription className="text-white/40">
          Recherchez le lieu que vous gérez et fournissez les preuves de propriété.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
...
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block px-1">Choisir le lieu</label>
          <Select value={selectedPlaceId} onValueChange={setSelectedPlaceId}>
            <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-md h-11 px-4 text-white outline-none focus:ring-amber-500/20">
              <SelectValue placeholder="Sélectionner un établissement..." />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-white/10 text-white">
              {allPlaces?.items.map(p => (
                <SelectItem key={p.id} value={p.id} className="focus:bg-white/10 focus:text-white">{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-white/40 uppercase font-bold tracking-widest">Justification (Message)</label>
          <textarea 
            className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white min-h-[80px] outline-none focus:border-amber-500/50"
            placeholder="Décrivez brièvement votre rôle ou la situation..."
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-white/40 uppercase font-bold tracking-widest">Documents justificatifs</label>
          <div className="border-2 border-dashed border-white/10 rounded-md p-8 text-center hover:border-amber-500/30 transition-colors cursor-pointer bg-white/[0.02]">
            <Upload className="h-8 w-8 text-white/20 mx-auto mb-3" />
            <div className="text-sm font-medium text-white">Cliquez pour uploader</div>
            <p className="text-[10px] text-white/30 mt-1 uppercase tracking-tighter">PDF, JPG ou PNG (Max 5MB)</p>
          </div>
          {/* File list placeholder */}
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
            <FileText className="h-3 w-3" /> kbis_restaurant_lomé.pdf (1.2 MB)
          </div>
        </div>
      </div>

      <DialogFooter className="gap-2">
        <Button type="button" variant="ghost" onClick={onClose} className="text-white">Annuler</Button>
        <Button 
          type="submit" 
          disabled={isPending}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-8"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Envoyer la demande"}
        </Button>
      </DialogFooter>
    </form>
  );
}
