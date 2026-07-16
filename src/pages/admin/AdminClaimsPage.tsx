import React, { useState } from "react";
import {
  ShieldCheck,
  Clock,
  History,
  CheckCircle2,
  XCircle,
  ExternalLink,
  FileText,
  MoreHorizontal,
  Loader2,
  AlertCircle,
  Search,
  MessageSquare,
  Building,
  User,
  ArrowRight,
} from "lucide-react";
import { useAdminClaims, useUpdateClaimStatus } from "@/hooks/queries/useAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AdminClaimsPage() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter uppercase italic">
            Gouvernance des Propriétés
          </h1>
          <p className="text-white/40 mt-1.5 flex items-center gap-2 text-sm font-medium">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
            Vérification et validation des revendications de lieux POI
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="pending"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <TabsList className="bg-white/5 border border-white/5 p-1 rounded-md h-12">
            <TabsTrigger
              value="pending"
              className="rounded-md px-6 data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-white/40 font-bold text-xs uppercase tracking-widest transition-all"
            >
              <Clock className="w-3.5 h-3.5 mr-2" />
              File d'attente
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-md px-6 data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-white/40 font-bold text-xs uppercase tracking-widest transition-all"
            >
              <History className="w-3.5 h-3.5 mr-2" />
              Historique
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
            <Input
              placeholder="Filtrer les demandes..."
              className="bg-white/5 border-white/5 pl-10 h-10 text-xs rounded-md focus-visible:ring-indigo-500/20"
            />
          </div>
        </div>

        <TabsContent value="pending" className="mt-0">
          <ClaimsQueue status="pending" />
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <ClaimsQueue status="approved,rejected" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ClaimsQueue({ status }: { status: string }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useAdminClaims(
    status === "pending" ? "pending" : undefined,
    page,
  );

  const claims = React.useMemo(() => {
    if (!data) return [];
    if (status === "pending") return data;
    // Filtrer pour l'historique si l'API retourne tout
    return data.filter((c: any) => c.status !== "pending");
  }, [data, status]);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="bg-zinc-900/40 border-white/5 h-[200px] animate-pulse"
          />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-500/50" />
        <p className="text-white/60">Échec du chargement des revendications</p>
      </div>
    );

  if (claims.length === 0)
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center gap-2 bg-white/[0.02] border border-dashed border-white/10 rounded-md">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
          <ShieldCheck className="h-6 w-6 text-white/20" />
        </div>
        <p className="text-white font-bold tracking-tight">
          Aucune demande trouvée
        </p>
        <p className="text-white/20 text-xs italic">
          La file d'attente est parfaitement synchronisée.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {claims.map((claim: any) => (
        <ClaimCard key={claim.id} claim={claim} />
      ))}
    </div>
  );
}

function ClaimCard({ claim }: { claim: any }) {
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white hover:border-white/10 transition-all flex flex-col group overflow-hidden rounded-[1.5rem]">
      <CardHeader className="p-5 pb-2">
        <div className="flex items-start justify-between">
          <Badge
            className={
              claim.status === "pending"
                ? "bg-indigo-500/10 text-indigo-400 border-none"
                : claim.status === "approved"
                  ? "bg-emerald-500/10 text-emerald-400 border-none"
                  : "bg-red-500/10 text-red-400 border-none"
            }
          >
            {claim.status === "pending"
              ? "EN ATTENTE"
              : claim.status.toUpperCase()}
          </Badge>
          <span className="text-[10px] text-white/20 font-mono italic">
            #{claim.id}
          </span>
        </div>
        <CardTitle className="text-lg font-black mt-3 flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
          <Building className="h-4 w-4 text-white/40" />
          {claim.place_name}
        </CardTitle>
        <CardDescription className="text-white/30 text-[10px] flex items-center gap-1 font-medium mt-1">
          Demandé le {new Date(claim.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-1 space-y-4">
        <div className="p-3 bg-white/5 rounded-md border border-white/5">
          <div className="flex items-center gap-2 mb-1.5">
            <User className="h-3 w-3 text-white/20" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">
              Owner Requérant
            </span>
          </div>
          <p className="text-sm font-bold truncate">
            #{claim.owner_id} — Partenaire
          </p>
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <ReviewPanel
            claim={claim}
            isOpen={reviewOpen}
            onOpenChange={setReviewOpen}
          >
            <Button className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-md h-10 font-bold text-xs">
              Examiner
            </Button>
          </ReviewPanel>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-md text-white/20 hover:text-white hover:bg-white/5"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewPanel({
  claim,
  children,
  isOpen,
  onOpenChange,
}: {
  claim: any;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [adminNotes, setAdminNotes] = useState("");
  const { mutate: updateStatus, isPending } = useUpdateClaimStatus();

  const handleAction = (status: "approved" | "rejected") => {
    if (status === "rejected" && !adminNotes.trim()) {
      toast.error("Echec ! Veuillez fournir des notes d'admin.");
      return;
    }
    updateStatus(
      {
        id: claim.id.toString(),
        body: { status, admin_notes: adminNotes },
      },
      {
        onSuccess: () => onOpenChange(false),
        onError: () => toast.error("Echec ! Veuillez réessayer."),
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-[500px] p-0 overflow-hidden rounded-md">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
            Vérification de Preuve
          </DialogTitle>
          <DialogDescription className="text-white/40 text-xs">
            Examen de la revendication pour{" "}
            <span className="text-indigo-400 font-bold">
              {claim.place_name}
            </span>
            . Veuillez vérifier les pièces jointes ci-dessous.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-md border border-white/5">
              <p className="text-[10px] text-white/20 font-bold uppercase mb-2">
                Justificatif ID
              </p>
              <div className="flex items-center gap-2 text-indigo-400 hover:underline cursor-pointer font-bold text-sm">
                <FileText className="h-4 w-4" /> doc_identite.pdf
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-md border border-white/5">
              <p className="text-[10px] text-white/20 font-bold uppercase mb-2">
                Preuve Propriété
              </p>
              <div className="flex items-center gap-2 text-indigo-400 hover:underline cursor-pointer font-bold text-sm">
                <FileText className="h-4 w-4" /> kb_extrait.pdf
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-white/40 tracking-widest flex items-center gap-2">
              <MessageSquare className="h-3 w-3" /> Note d'Administration
            </label>
            <Textarea
              placeholder="Expliquez la raison de l'approbation ou du rejet..."
              className="bg-white/5 border-white/5 min-h-[100px] rounded-md resize-none text-white focus-visible:ring-indigo-500/20"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="p-8 pt-0 bg-white/[0.02] mt-4 flex gap-3">
          <Button
            disabled={isPending || !adminNotes.trim()}
            variant="ghost"
            className="flex-1 h-12 rounded-md text-red-500 hover:bg-red-500/10 hover:text-red-500 font-bold text-xs uppercase"
            onClick={() => handleAction("rejected")}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Rejeter"
            )}
          </Button>
          <Button
            disabled={isPending}
            className="flex-1 h-12 rounded-md bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black text-xs uppercase"
            onClick={() => handleAction("approved")}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
            ) : (
              "Approuver"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
