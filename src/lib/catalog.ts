import type { PlaceCategory } from "@/lib/types";

/** Aligné sur `CATALOG_CATEGORIES` backend — utilisé si `has_catalog` est absent (API ancienne). */
const CATALOG_CATEGORIES = new Set<PlaceCategory>([
  "hotel",
  "restaurant",
  "market",
  "boutique",
  "supermarket",
  "cafe",
  "bar",
]);

export function inferHasCatalog(p: { category: PlaceCategory; has_catalog?: boolean }): boolean {
  if (typeof p.has_catalog === "boolean") return p.has_catalog;
  return CATALOG_CATEGORIES.has(p.category);
}

/** Présentation du catalogue selon le type de lieu. */
export function getCatalogMode(category: PlaceCategory): "rooms" | "menu" | "retail" {
  if (category === "hotel") return "rooms";
  if (category === "restaurant" || category === "cafe" || category === "bar") return "menu";
  return "retail";
}
