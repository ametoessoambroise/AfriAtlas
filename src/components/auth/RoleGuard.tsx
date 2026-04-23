import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("user" | "owner" | "admin" | "superadmin")[];
  fallbackPath?: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallbackPath = "/",
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-zinc-950">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Sécurisation du tunnel...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = (user as any).role || "user";

  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-center">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Accès Non Autorisé
        </h1>
        <p className="text-white/40 max-w-md mb-8">
          Désolé, votre compte ne possède pas les privilèges nécessaires pour
          accéder à cette section de la console Atlas.
        </p>
        <Button
          variant="outline"
          onClick={() => (window.location.href = fallbackPath)}
          className="border-white/10 text-white hover:bg-white/5"
        >
          Retour au portail
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
