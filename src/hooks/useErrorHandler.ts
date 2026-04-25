import { useNavigate } from "react-router-dom";
import { clearTokens } from "@/lib/api/token";
import { ApiError } from "@/lib/api/error-handler";
import { getErrorMessage } from "@/lib/utils/errorMessages";
import { toast } from "sonner";

/**
 * Hook utilitaire pour gérer les erreurs API de manière centralisée.
 * Gère automatiquement la redirection vers /login en cas de 401 (session expirée).
 */
export function useErrorHandler() {
  const navigate = useNavigate();

  const handleError = (error: unknown, showToast = false) => {
    // 1. Gestion spécifique du 401 (Non autorisé / Session expirée)
    if (error instanceof ApiError && error.status === 401) {
      clearTokens();
      // Optionnel : On pourrait vider un store global ici si nécessaire
      
      toast.error("Votre session a expiré. Veuillez vous reconnecter.");
      navigate("/login", { replace: true });
      return null;
    }

    // 2. Récupération du message convivial
    const message = getErrorMessage(error);

    // 3. Affichage optionnel d'un toast
    if (showToast && message) {
      toast.error(message);
    }

    return message;
  };

  return { handleError };
}
