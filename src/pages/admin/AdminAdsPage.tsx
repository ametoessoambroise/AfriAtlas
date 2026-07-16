import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  MoreVertical,
  Eye,
  TrendingUp,
  Calendar,
  DollarSign,
  Loader2,
  AlertCircle,
  Pause,
  Play,
  Trash2,
  ExternalLink,
  ChevronRight,
  Target,
  BarChart2,
  ArrowRight,
} from "lucide-react";
import { useAdminAds, useReviewAd } from "@/hooks/queries/useAds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function AdminAdsPage() {
  const { data, isLoading, error } = useAdminAds();

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
        <p className="text-white/40 animate-pulse text-sm">
          Synchronisation des campagnes publicitaires...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="h-12 w-12 text-red-500/50" />
        <p className="text-white font-bold">Erreur de chargement Ads</p>
      </div>
    );

  const ads = data || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter uppercase italic">
            Régie Publicitaire
          </h1>
          <p className="text-white/40 mt-1.5 flex items-center gap-2 text-sm font-medium">
            <Megaphone className="h-4 w-4 text-emerald-500" />
            Gestion des campagnes sponsorisées et placements Premium
          </p>
        </div>

        <CreateAdDialog />
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricsCard
          label="Campagnes Actives"
          value={ads
            .filter((a: any) => a.ad_status === "active")
            .length.toString()}
          icon={<Play className="text-emerald-400" />}
        />
        <MetricsCard
          label="Total Impressions"
          value="1.2M"
          icon={<Eye className="text-blue-400" />}
          trend="+12%"
        />
        <MetricsCard
          label="Clicks Cumulés"
          value="48.5K"
          icon={<TrendingUp className="text-amber-400" />}
          trend="+5.4%"
        />
        <MetricsCard
          label="CTR Moyen"
          value="4.04%"
          icon={<TrendingUp className="text-indigo-400" />}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white/5 p-4 rounded-md border border-white/5 backdrop-blur-xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
          <Input
            placeholder="Filtrer par annonceur ou lieu..."
            className="bg-black/20 border-white/5 pl-12 h-12 text-white text-sm focus-visible:ring-emerald-500/20 rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-white/5 bg-white/5 text-white/60 hover:text-white h-12 px-6 rounded-md font-bold text-xs uppercase"
          >
            Active
          </Button>
          <Button
            variant="outline"
            className="border-white/5 bg-white/5 text-white/60 hover:text-white h-12 px-6 rounded-md font-bold text-xs uppercase"
          >
            En attente
          </Button>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-white/5 rounded-md overflow-hidden backdrop-blur-3xl shadow-2xl">
        <Table>
          <TableHeader className="bg-white/[0.02] border-b border-white/5 h-16">
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-8 text-white/40 font-bold uppercase tracking-widest text-[9px]">
                Campagne
              </TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">
                Période
              </TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">
                Budget / Spend
              </TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">
                Metrics (CTR)
              </TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[9px]">
                Statut
              </TableHead>
              <TableHead className="text-right pr-8 text-white/40 font-bold uppercase tracking-widest text-[9px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.map((ad: any) => (
              <TableRow
                key={ad.id}
                className="border-white/5 hover:bg-white/[0.02] transition-all group h-24"
              >
                <TableCell className="pl-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 rounded-md bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                      {ad.image_url ? (
                        <img
                          src={ad.image_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 italic text-[7px]">
                          Preview N/A
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-black text-white text-sm tracking-tight">
                        {ad.title || "Annonce sans titre"}
                      </p>
                      <p className="text-[10px] text-white/30 font-medium uppercase">
                        {ad.target_link ? "Lien Externe" : "Lieu Atlas"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold">
                      <Calendar className="h-3 w-3 text-white/20" />{" "}
                      {new Date(
                        ad.start_date || Date.now(),
                      ).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-white/30 text-[9px]">
                      <ArrowRight className="h-2 w-2" />{" "}
                      {new Date(ad.end_date || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-white font-black text-sm italic">
                    {ad.budget || "500"}{" "}
                    <span className="text-[10px] text-white/40">USDT</span>
                  </div>
                  <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[65%]" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-white text-[11px] font-black italic">
                        4.2%
                      </p>
                      <p className="text-[9px] text-white/20 font-bold uppercase tracking-tighter">
                        Click-Thru
                      </p>
                    </div>
                    <BarChart2 className="h-4 w-4 text-white/10" />
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={ad.ad_status} />
                </TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex items-center justify-end gap-2">
                    <AdStatusToggle ad={ad} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-10 w-10 text-white/40 hover:text-white rounded-md hover:bg-white/5 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-zinc-900 border-white/10 text-white p-2 rounded-md w-48 shadow-2xl"
                      >
                        <DropdownMenuItem className="gap-3 py-2.5 rounded-md focus:bg-white/5 cursor-pointer font-bold text-xs uppercase tracking-tighter">
                          <Eye className="h-4 w-4 text-blue-400" /> Voir les
                          metrics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 py-2.5 rounded-md focus:bg-white/5 cursor-pointer font-bold text-xs uppercase tracking-tighter">
                          <Target className="h-4 w-4 text-emerald-400" />{" "}
                          Modifier le ciblage
                        </DropdownMenuItem>
                        <div className="h-px bg-white/5 my-1" />
                        <DropdownMenuItem className="gap-3 py-2.5 rounded-md focus:bg-red-400/10 focus:text-red-400 text-red-500 cursor-pointer font-bold text-xs uppercase tracking-tighter">
                          <Trash2 className="h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    active: "bg-emerald-500/10 text-emerald-400",
    paused: "bg-amber-500/10 text-amber-400",
    completed: "bg-blue-500/10 text-blue-400",
    draft: "bg-white/5 text-white/30",
    rejected: "bg-red-500/10 text-red-400",
  };

  return (
    <Badge
      className={`${colors[status] || colors.inactive} border-none font-black text-[9px] uppercase px-2.5 py-1`}
    >
      {status}
    </Badge>
  );
}

function MetricsCard({
  label,
  value,
  icon,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}) {
  return (
    <Card className="bg-zinc-900/40 border-white/5 rounded-md p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center border border-white/5">
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-black text-white italic mt-1">{value}</p>
    </Card>
  );
}

function AdStatusToggle({ ad }: { ad: any }) {
  const { mutate, isPending } = useReviewAd();
  const isActive = ad.ad_status === "active";

  return (
    <button
      disabled={isPending}
      onClick={() =>
        mutate({ adId: ad.id, status: isActive ? "paused" : "active" })
      }

      className={`h-10 px-4 rounded-md font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
        isActive
          ? "bg-white/5 text-white hover:bg-white/10"
          : "bg-emerald-500 text-zinc-950 hover:bg-emerald-600"
      } disabled:opacity-50`}
    >
      {isPending ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : isActive ? (
        <Pause className="h-3 w-3" />
      ) : (
        <Play className="h-3 w-3" />
      )}
      {isActive ? "Pause" : "Activer"}
    </button>
  );
}

function CreateAdDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black rounded-md px-6 gap-2 h-12 italic uppercase tracking-tighter shadow-lg shadow-emerald-500/20">
          <Plus className="h-5 w-5" /> Nouvelle Campagne
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 border-white/10 text-white p-0 rounded-md overflow-hidden max-w-lg">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">
            Créer une Annonce
          </DialogTitle>
          <DialogDescription className="text-white/40 text-xs">
            Configurez votre placement Premium sur le réseau Afriatlas Travel.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">
                Titre de la campagne
              </Label>
              <Input
                placeholder="Ex: Promotion Été - Kpalime Safari"
                className="bg-white/5 border-white/5 rounded-md h-11 text-xs"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">
                Destination Cible (Place ID)
              </Label>
              <Input
                placeholder="Atlas-Kpalime-001"
                className="bg-white/5 border-white/5 rounded-md h-11 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">
                  Budget (USDT)
                </Label>
                <Input
                  type="number"
                  placeholder="500"
                  className="bg-white/5 border-white/5 rounded-md h-11 text-xs"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">
                  Type CTA
                </Label>
                <Input
                  placeholder="Réserver"
                  className="bg-white/5 border-white/5 rounded-md h-11 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-dashed border-white/5 rounded-md flex flex-col items-center justify-center text-center gap-3 group hover:border-emerald-500/20 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-md bg-white/5 flex items-center justify-center text-white/20 group-hover:text-emerald-500 transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Uploader Créative (1200x628)
            </p>
          </div>
        </div>

        <DialogFooter className="p-8 pt-0 flex gap-3">
          <Button
            variant="ghost"
            className="flex-1 rounded-md h-12 font-bold text-white/40 hover:text-white uppercase tracking-tighter"
          >
            Annuler
          </Button>
          <Button className="flex-1 rounded-md h-12 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black uppercase tracking-tighter">
            Lancer la Campagne
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
