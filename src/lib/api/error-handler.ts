/**
 * WorldAtlas API — Error Handler
 * Centralise la gestion des erreurs pour un affichage utilisateur élégant.
 */

export class ApiError extends Error {
  public friendlyMessage: string;

  constructor(
    public readonly status: number,
    public readonly rawMessage: string,
    public readonly endpoint: string,
    public readonly moduleName: string = "API",
  ) {
    // Message technique pour les logs
    super(`[${moduleName}] HTTP ${status} — ${rawMessage} (${endpoint})`);
    this.name = "ApiError";

    // Message convivial pour l'UI
    this.friendlyMessage = this.parseFriendlyMessage(status, rawMessage);

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  private parseFriendlyMessage(status: number, raw: string): string {
    if (status === 401)
      return "Votre session a expiré. Veuillez vous reconnecter.";
    if (status === 403)
      return "Vous n'avez pas l'autorisation d'accéder à cette ressource.";
    if (status === 404)
      return "La ressource demandée est introuvable sur le serveur (404).";
    if (status >= 500)
      return "Le serveur rencontre un problème technique. Nos équipes ont été prévenues.";
    if (status === 409) return "Un élément avec ce nom existe déjà.";
    if (status === 400) return "Une erreur de saisie s'est produite.";
    if (status === 429)
      return "Demande trop fréquente. Veuillez réessayer plus tard.";
    if (status === 422) {
      try {
        const json = JSON.parse(raw);
        if (json.detail?.[0]?.msg?.includes("File is too large")) {
          return "Le fichier est trop volumineux. La taille maximale est de 2 Mo.";
        }
        if (json.detail?.[0]?.msg?.includes("Not a valid image")) {
          return "Le fichier sélectionné n'est pas une image valide.";
        }
      } catch (e) {}
    }

    // Tenter d'extraire le message "detail" de FastAPI/Pydantic
    try {
      const parsed = JSON.parse(raw);
      if (parsed.detail) {
        let detail = "";
        if (typeof parsed.detail === "string") detail = parsed.detail;
        else if (Array.isArray(parsed.detail)) detail = parsed.detail[0].msg; // Validation errors

        // Traduction des messages d'erreur communs du backend
        if (detail.toLowerCase().includes("email already registered"))
          return "Cette adresse email est déjà utilisée.";
        if (detail.toLowerCase().includes("invalid credentials"))
          return "Identifiants incorrects. Veuillez réessayer.";
        if (detail.toLowerCase().includes("not found"))
          return "Ressource introuvable.";

        if (detail) return detail;
      }
    } catch (e) {
      // Pas du JSON ou pas de champ detail
    }

    // Fallbacks
    if (status === 0)
      return "Impossible de joindre le serveur. Vérifiez votre connexion internet.";

    return "Une erreur inattendue est survenue lors de la communication avec l'Atlas.";
  }
}
