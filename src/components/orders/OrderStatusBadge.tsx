import React from "react";
import { CheckCircle2, AlertCircle, XCircle, Clock, Package, RefreshCcw } from "lucide-react";
import type { OrderStatus } from "@/lib/types";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case "pending":
      return <div className="inline-flex items-center gap-1.5 text-xs text-yellow-600 bg-yellow-500/10 px-3 py-1 rounded-full font-bold border border-yellow-500/20"><AlertCircle className="h-3.5 w-3.5" /> En attente</div>;
    case "paid":
      return <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full font-bold border border-blue-500/20"><CheckCircle2 className="h-3.5 w-3.5" /> Payée</div>;
    case "processing":
      return <div className="inline-flex items-center gap-1.5 text-xs text-purple-600 bg-purple-500/10 px-3 py-1 rounded-full font-bold border border-purple-500/20"><Package className="h-3.5 w-3.5" /> En cours</div>;
    case "completed":
      return <div className="inline-flex items-center gap-1.5 text-xs text-green-600 bg-green-500/10 px-3 py-1 rounded-full font-bold border border-green-500/20"><CheckCircle2 className="h-3.5 w-3.5" /> Terminée</div>;
    case "cancelled":
      return <div className="inline-flex items-center gap-1.5 text-xs text-red-600 bg-red-500/10 px-3 py-1 rounded-full font-bold border border-red-500/20"><XCircle className="h-3.5 w-3.5" /> Annulée</div>;
    case "refunded":
      return <div className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-500/10 px-3 py-1 rounded-full font-bold border border-gray-500/20"><RefreshCcw className="h-3.5 w-3.5" /> Remboursée</div>;
    default:
      return <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full font-bold border border-border"><Clock className="h-3.5 w-3.5" /> Inconnu</div>;
  }
}
