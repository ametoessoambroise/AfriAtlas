import { getApiBaseUrl } from "@/lib/api/env";

/**
 * Résout l'URL complète d'une image en fonction du storage provider
 *
 * @param url - L'URL de l'image (peut être relative ou absolue)
 * @param storageProvider - Le provider de stockage ("local" ou "cloudinary")
 * @returns L'URL complète utilisable pour afficher l'image
 */
export function resolveImageUrl(
  url: string | null | undefined,
  storageProvider?: string | null,
): string {
  // Si pas d'URL, retourner le placeholder
  if (!url) {
    return "/placeholder.png";
  }

  // Si l'URL est déjà absolue (commence par http:// ou https://), la retourner telle quelle
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Si l'URL commence par /uploads (stockage local), préfixer avec l'URL du backend
  // Ceci gère le cas où storage_provider n'est pas défini ou est mal formaté
  if (url.startsWith("/uploads")) {
    const baseUrl = getApiBaseUrl();
    const resolvedUrl = `${baseUrl}${url}`;
    console.log(`🖼️ Resolving local image: ${url} → ${resolvedUrl}`);
    return resolvedUrl;
  }

  // Si le storage provider est explicitement "local", préfixer avec l'URL du backend
  if (storageProvider === "local") {
    const baseUrl = getApiBaseUrl();
    // S'assurer qu'il n'y a pas de double slash
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    const resolvedUrl = `${baseUrl}${cleanUrl}`;
    console.log(
      `🖼️ Resolving local image (via provider): ${url} → ${resolvedUrl}`,
    );
    return resolvedUrl;
  }

  // Par défaut (Cloudinary ou autre), retourner l'URL telle quelle
  return url;
}

/**
 * Résout l'URL d'une image d'album
 */
export function resolveAlbumImageUrl(image: {
  url: string;
  storage_provider?: string | null;
}): string {
  return resolveImageUrl(image.url, image.storage_provider);
}

/**
 * Résout l'URL d'une image de place/destination
 */
export function resolvePlaceImageUrl(image: {
  url: string;
  storage_provider?: string | null;
}): string {
  return resolveImageUrl(image.url, image.storage_provider);
}

/**
 * Résout l'URL d'une cover image d'album
 */
export function resolveAlbumCoverUrl(
  coverUrl: string | null | undefined,
  storageProvider?: string | null,
): string {
  return resolveImageUrl(coverUrl, storageProvider);
}
