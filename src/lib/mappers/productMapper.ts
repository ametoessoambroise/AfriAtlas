import type { PlaceNestedProductResponse, ProductListResponse, ProductImageResponse } from "@/lib/types";
import type { MenuItem, Product, Room } from "@/lib/models/ui";
import { PLACEHOLDER_IMAGE } from "@/lib/mappers/placeMapper";

function parseMoney(price: string): number {
  const n = Number.parseFloat(price);
  return Number.isNaN(n) ? 0 : n;
}

function sortProductImages(images: ProductImageResponse[] | undefined): ProductImageResponse[] {
  if (!images?.length) return [];
  return [...images].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
}

function primaryProductImageUrl(images: ProductImageResponse[] | undefined): string {
  const sorted = sortProductImages(images);
  const primary = sorted.find((i) => i.is_primary) ?? sorted[0];
  return primary?.url ?? PLACEHOLDER_IMAGE;
}

const MENU_BUCKETS = ["Entrées", "Plats", "Desserts", "Boissons"] as const;

function normalizeMenuCategory(raw: string | null | undefined): string {
  const t = (raw ?? "").trim();
  if (MENU_BUCKETS.includes(t as (typeof MENU_BUCKETS)[number])) return t;
  const lower = t.toLowerCase();
  if (/entrée|starter|salade/.test(lower)) return "Entrées";
  if (/dessert|sweet/.test(lower)) return "Desserts";
  if (/boisson|drink|cocktail|jus/.test(lower)) return "Boissons";
  if (/plat|main|grill/.test(lower)) return "Plats";
  return t || "Plats";
}

export function mapProductListToProduct(p: ProductListResponse): Product {
  const img = p.primary_image?.url ?? PLACEHOLDER_IMAGE;
  const category = (p.category ?? "Autres").trim() || "Autres";
  const unit =
    p.tags?.find((t) => /kg|L|ml|g|lot|pièce|pack/i.test(t)) ??
    (p.tags && p.tags.length > 0 ? p.tags[0] : "—");
  return {
    id: p.id,
    name: p.name,
    price: parseMoney(p.price),
    image: img,
    category,
    description: p.description?.trim() ?? "",
    inStock: p.is_available && p.stock > 0,
    unit,
  };
}

export function mapNestedProductToMenuItem(p: PlaceNestedProductResponse): MenuItem {
  const popular = p.tags?.some((t) => /populaire|chef|signature/i.test(t)) ?? false;
  return {
    id: p.id,
    name: p.name.trim(),
    price: parseMoney(p.price),
    image: primaryProductImageUrl(p.images),
    category: normalizeMenuCategory(p.category),
    description: p.description?.trim() ?? "",
    isPopular: popular,
  };
}

export function mapProductListToMenuItem(p: ProductListResponse): MenuItem {
  const img = p.primary_image?.url ?? PLACEHOLDER_IMAGE;
  const popular = p.tags?.some((t) => /populaire|chef|signature/i.test(t)) ?? false;
  return {
    id: p.id,
    name: p.name.trim(),
    price: parseMoney(p.price),
    image: img,
    category: normalizeMenuCategory(p.category),
    description: p.description?.trim() ?? "",
    isPopular: popular,
  };
}

export function mapProductListToRoom(p: ProductListResponse): Room {
  const img = p.primary_image?.url ?? PLACEHOLDER_IMAGE;
  const capTag = p.tags
    ?.map((t) => Number.parseInt(/\d+/.exec(t)?.[0] ?? "", 10))
    .find((n) => n > 0 && n <= 12);
  return {
    id: p.id,
    name: p.name,
    price: parseMoney(p.price),
    image: img,
    gallery: [img],
    capacity: capTag ?? 2,
    amenities: p.tags?.length ? p.tags : ["Wifi", "Climatisation"],
    description: p.description?.trim() ?? "",
    available: p.is_available && p.stock > 0,
  };
}

export function mapNestedProductToRoom(p: PlaceNestedProductResponse): Room {
  const sorted = sortProductImages(p.images);
  const urls = sorted.map((i) => i.url).filter(Boolean);
  const gallery = urls.length ? urls : [PLACEHOLDER_IMAGE];
  const capTag = p.tags?.map((t) => Number.parseInt(/\d+/.exec(t)?.[0] ?? "", 10)).find((n) => n > 0 && n <= 12);
  return {
    id: p.id,
    name: p.name,
    price: parseMoney(p.price),
    image: gallery[0] ?? PLACEHOLDER_IMAGE,
    gallery,
    capacity: capTag ?? 2,
    amenities: p.tags?.length ? p.tags : ["Wifi", "Climatisation"],
    description: p.description?.trim() ?? "",
    available: p.is_available && p.stock > 0,
  };
}
