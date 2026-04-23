/**
 * Base URL de l'API — alignée sur Vite (import.meta.env).
 * Référence : backend/openapi.json — préfixe commun /api/v1
 */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL as string | undefined;
  let url = raw && raw.trim() ? raw : "http://localhost:8000";
  
  // Supprimer les slashs de fin
  url = url.replace(/\/+$/, "");
  
  // Si l'URL contient déjà /api/v1, on le retire car les clients l'ajoutent manuellement
  // pour garder une structure claire (domaine + prefixe + route)
  return url.replace(/\/api\/v1$/, "");
}
