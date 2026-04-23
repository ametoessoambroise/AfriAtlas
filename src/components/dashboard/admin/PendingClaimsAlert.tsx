import React from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PendingClaimsAlert({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <Link to="/admin/claims" className="block">
      <Button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 h-12 rounded-2xl animate-pulse">
        <ShieldAlert className="h-5 w-5 mr-3" />
        {count} Revendications de lieux en attente de validation
      </Button>
    </Link>
  );
}
