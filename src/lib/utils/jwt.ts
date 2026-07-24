/**
 * Décode un JWT sans vérification de signature (client-side)
 * Utile pour lire les claims comme l'expiration
 */
export function decodeJWT(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

/**
 * Vérifie si un token JWT est expiré
 * @param token Le token JWT à vérifier
 * @param bufferSeconds Nombre de secondes avant l'expiration réelle (par défaut 60s)
 * @returns true si le token est expiré ou va expirer dans bufferSeconds
 */
export function isTokenExpired(token: string, bufferSeconds = 60): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp - bufferSeconds < now;
}

/**
 * Retourne le temps restant avant expiration en secondes
 */
export function getTokenTimeRemaining(token: string): number {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return 0;
  }

  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, decoded.exp - now);
}
