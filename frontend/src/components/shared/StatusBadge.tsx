import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "active" | "inactive" | "pending" | "completed" | "cancelled" | "paid" | "failed" | "processing";

interface StatusBadgeProps {
  status: string | StatusType;
  className?: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: "Actif", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  inactive: { label: "Inactif", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  pending: { label: "En attente", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  completed: { label: "Terminé", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  cancelled: { label: "Annulé", color: "bg-red-500/10 text-red-500 border-red-500/20" },
  paid: { label: "Payé", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  failed: { label: "Échoué", color: "bg-red-500/10 text-red-500 border-red-500/20" },
  processing: { label: "En cours", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normStatus = status.toLowerCase();
  const config = statusMap[normStatus] || { label: status, color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };

  return (
    <Badge variant="outline" className={cn("font-medium rounded-full px-2.5 py-0.5", config.color, className)}>
      {config.label}
    </Badge>
  );
}
