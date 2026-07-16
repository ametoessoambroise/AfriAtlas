import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import type { OwnerRevenueResponse } from "@/lib/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface RevenueTableProps {
  data: OwnerRevenueResponse[] | undefined;
  isLoading: boolean;
  onUpdateStatus: (id: number, status: any) => void;
  onViewOwner: (id: number) => void;
}

export function RevenueTable({ data, isLoading, onUpdateStatus, onViewOwner }: RevenueTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 rounded-full flex items-center w-fit gap-1 gap-1 px-3">
            <CheckCircle2 className="w-3 h-3" /> Payé
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 rounded-full flex items-center w-fit gap-1 gap-1 px-3">
            <Clock className="w-3 h-3 animate-pulse" /> En cours
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 rounded-full flex items-center w-fit gap-1 gap-1 px-3">
            <AlertCircle className="w-3 h-3" /> Échoué
          </Badge>
        );
      default:
        return (
          <Badge className="bg-zinc-500/10 text-white/40 border-white/5 hover:bg-white/10 rounded-full flex items-center w-fit gap-1 gap-1 px-3">
            <Clock className="w-3 h-3" /> En attente
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 rounded-md bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border border-white/5 bg-zinc-900/40 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/[0.02]">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Période</TableHead>
            <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">ID Owner</TableHead>
            <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Transactions</TableHead>
            <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Brut</TableHead>
            <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Frais Atlas</TableHead>
            <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Net Owner</TableHead>
            <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Statut</TableHead>
            <TableHead className="text-right text-white/40 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((revenue) => (
            <TableRow key={revenue.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
              <TableCell className="font-medium text-white py-4">
                {revenue.period_display}
                <div className="text-[10px] text-white/30 font-medium">
                  {format(new Date(revenue.period_start), "dd MMM", { locale: fr })} - {format(new Date(revenue.period_end), "dd MMM yyyy", { locale: fr })}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 font-medium font-mono text-xs">#{revenue.owner_id}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-white/20 hover:text-white"
                    onClick={() => onViewOwner(revenue.owner_id)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/5 text-white/40 text-[10px]">
                    {revenue.total_transactions} tx
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-white/70 font-medium">{formatCurrency(revenue.total_revenue)}</TableCell>
              <TableCell className="text-red-400/60 text-xs">-{formatCurrency(revenue.platform_fees)}</TableCell>
              <TableCell className="text-emerald-400 font-bold">{formatCurrency(revenue.net_revenue)}</TableCell>
              <TableCell>{getStatusBadge(revenue.payment_status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 rounded-full">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10 text-white">
                    <DropdownMenuLabel>Gestion du Paiement</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem 
                      className="gap-2 focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer"
                      onClick={() => onUpdateStatus(revenue.id, { payment_status: "paid" })}
                      disabled={revenue.payment_status === "paid"}
                    >
                      <CheckCircle2 className="h-4 w-4" /> Marquer comme payé
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="gap-2 focus:bg-blue-500/10 focus:text-blue-400 cursor-pointer"
                      onClick={() => onUpdateStatus(revenue.id, { payment_status: "processing" })}
                    >
                      <Clock className="h-4 w-4" /> Mettre en traitement
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="gap-2 focus:bg-red-500/10 focus:text-red-400 cursor-pointer text-red-400"
                      onClick={() => onUpdateStatus(revenue.id, { payment_status: "failed" })}
                    >
                      <AlertCircle className="h-4 w-4" /> Signaler un échec
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => onViewOwner(revenue.owner_id)}>
                      <Eye className="h-4 w-4" /> Voir l'owner
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {(!data || data.length === 0) && !isLoading && (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-white/20 italic">
                Aucun enregistrement trouvé pour cette période.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
