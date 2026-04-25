import { toast } from "sonner";
import { ApiError } from "@/lib/api/error-handler";
import { clearTokens } from "@/lib/api/token";

/**
 * Gestionnaire global d'erreurs pour l'application
 * Gère automatiquement les erreurs 401 (token expiré) et affiche des messages conviviaux
 */
export function handleApiError(error: unknown, customMessage?: string): string {
  // Erreur 401 - Token expiré, rediriger vers login
  if (error instanceof ApiError && error.status === 401) {
    clearTokens();

    // Sauvegarder l'URL actuelle pour redirection après login
    const currentPath = window.location.pathname;
    if (currentPath !== "/login" && currentPath !== "/register") {
      sessionStorage.setItem("redirectAfterLogin", currentPath);
    }

    toast.error("Votre session a expiré. Veuillez vous reconnecter.");

    // Rediriger vers login après un court délai
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);

    return "Session expirée";
  }

  // Utiliser le message personnalisé si fourni
  if (customMessage) {
    toast.error(customMessage);
    return customMessage;
  }

  // Extraire le message convivial de l'erreur
  let message = "Une erreur inattendue est survenue.";

  if (error instanceof ApiError) {
    message = error.friendlyMessage;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
  return message;
}

/**
 * Récupère uniquement le message d'erreur sans afficher de toast
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.friendlyMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Une erreur inattendue est survenue.";
}
