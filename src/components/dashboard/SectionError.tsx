import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorVariant = "network" | "server" | "auth" | "default";

interface SectionErrorProps {
  title?: string;
  message?: string;
  variant?: ErrorVariant;
  onRetry?: () => void;
}

const errorMessages: Record<ErrorVariant, string> = {
  network:
    "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
  server:
    "Le serveur a rencontré une erreur. Veuillez réessayer dans quelques instants.",
  auth: "Votre session a expiré. Veuillez vous reconnecter.",
  default: "Impossible de charger les données",
};

export function SectionError({
  title,
  message,
  variant = "default",
  onRetry,
}: SectionErrorProps) {
  const errorMessage = message || errorMessages[variant];

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-black">{title}</h3>}
      <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-2xl text-center">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-3">{errorMessage}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="w-3 h-3 mr-2" />
            Réessayer
          </Button>
        )}
      </div>
    </div>
  );
}

export default SectionError;
