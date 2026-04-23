import { ApiError } from "@/lib/api/error-handler";
 
/**
 * Convertit une erreur inconnue en message utilisateur lisible (français).
 * Utilise désormais la logique centralisée de ApiError.
 */
export function getErrorMessage(error: unknown): string {
  // Erreurs typées ApiError (unifié)
  if (error instanceof ApiError) {
    return error.friendlyMessage;
  }
 
  // Erreurs réseau / génériques
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("fetch") || msg.includes("network") || msg.includes("failed to fetch"))
      return "Impossible de se connecter au serveur. Vérifiez votre connexion internet.";
    
    if (msg.includes("404") || msg.includes("not found"))
      return "La ressource demandée n'existe pas.";
    
    return error.message;
  }
 
  return "Une erreur inattendue est survenue. Veuillez réessayer.";
}
 
/**
 * Vérifie si une erreur est une 404.
 */
export function is404(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}
