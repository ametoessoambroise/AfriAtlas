import type {
  PlaceCategory,
  PlaceImageResponse,
  PlaceListResponse,
  PlaceResponse,
} from "@/lib/types";
import type { Destination, DestinationUiType } from "@/lib/models/ui";

export const PLACEHOLDER_IMAGE = "/placeholder.svg";

const TOGO_CENTER = { lat: 8.6195, lng: 0.8248 };

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  museum: "Musée",
  park: "Parc naturel",
  hotel: "Hôtel",
  restaurant: "Restaurant",
  vr_room: "VR",
  market: "Marché",
  boutique: "Boutique",
  supermarket: "Supermarché",
  cafe: "Café",
  bar: "Bar",
  beach: "Plage",
  monument: "Monument",
  activity: "Activité",
  other: "Lieu",
};

export function mapPlaceCategoryToUiType(category: PlaceCategory): DestinationUiType {
  if (category === "hotel") return "hotel";
  if (category === "restaurant" || category === "cafe" || category === "bar") return "restaurant";
  if (category === "supermarket" || category === "market" || category === "boutique") {
    return "supermarket";
  }
  return "city";
}

export function formatPlaceCategoryLabel(category: PlaceCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}

function parseRating(avg: string | undefined): number {
  const n = Number.parseFloat(avg ?? "0");
  if (Number.isNaN(n)) return 0;
  return Math.min(5, Math.max(0, Math.round(n * 10) / 10));
}

function parseCoord(lat?: string | null, lng?: string | null): { lat: number; lng: number } {
  const la = Number.parseFloat(lat ?? "");
  const lo = Number.parseFloat(lng ?? "");
  if (Number.isNaN(la) || Number.isNaN(lo)) return TOGO_CENTER;
  return { lat: la, lng: lo };
}

function sortImages(images: PlaceImageResponse[] | undefined): PlaceImageResponse[] {
  if (!images?.length) return [];
  return [...images].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
}

function galleryUrls(images: PlaceImageResponse[] | undefined): string[] {
  const sorted = sortImages(images);
  const urls = sorted.map((i) => i.url).filter(Boolean);
  return urls.length ? urls : [PLACEHOLDER_IMAGE];
}

function shortDescription(desc: string | null | undefined, max = 160): string {
  const t = (desc ?? "").trim();
  if (!t) return "Découvrez ce lieu au Togo.";
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

function formatOpeningHours(raw: string | Record<string, any> | null | undefined): string | undefined {
  if (!raw) return undefined;
  if (typeof raw === "string") return raw;
  if (typeof raw !== "object") return undefined;
  const entries = Object.entries(raw);
  if (!entries.length) return undefined;
  return entries.map(([k, v]) => `${k}: ${String(v)}`).join(" · ");
}

export function mapPlaceListToDestination(p: PlaceListResponse): Destination {
  const coords = parseCoord(p.latitude, p.longitude);
  const primary = p.primary_image?.url;
  const desc = p.description ?? "";
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    city: p.city?.trim() || "Togo",
    type: mapPlaceCategoryToUiType(p.category),
    category: formatPlaceCategoryLabel(p.category),
    image: primary ?? PLACEHOLDER_IMAGE,
    gallery: primary ? [primary] : [PLACEHOLDER_IMAGE],
    rating: parseRating(p.rating_avg),
    safety: Math.min(5, Math.max(1, Math.round(parseRating(p.rating_avg)))),
    description: shortDescription(desc),
    longDescription: desc || shortDescription(desc),
    coordinates: coords,
    featured: p.is_featured,
    hasCatalog: p.has_catalog,
    isFavorite: (p as any).is_favorite ?? false,
  };
}

export function mapPlaceResponseToDestination(p: PlaceResponse): Destination {
  const coords = parseCoord(p.latitude, p.longitude);
  const imgs = galleryUrls(p.images);
  const desc = p.description ?? "";
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    city: p.city?.trim() || "Togo",
    type: mapPlaceCategoryToUiType(p.category),
    category: formatPlaceCategoryLabel(p.category),
    image: imgs[0] ?? PLACEHOLDER_IMAGE,
    gallery: imgs,
    rating: parseRating(p.rating_avg),
    safety: Math.min(5, Math.max(1, Math.round(parseRating(p.rating_avg)))),
    description: shortDescription(desc),
    longDescription: desc || "Découvrez ce lieu au Togo.",
    coordinates: coords,
    address: p.address ?? undefined,
    amenities: p.amenities ?? [],
    tags: p.tags ?? [],
    priceRange: p.price_range ?? undefined,
    openingHours: formatOpeningHours(p.opening_hours ?? undefined),
    phone: p.phone ?? undefined,
    website: p.website ?? undefined,
    featured: p.is_featured,
    hasCatalog: p.has_catalog,
    isFavorite: (p as any).is_favorite ?? false,
  };
}
