/**
 * Modèles d'affichage (UI) — distincts des DTO OpenAPI dans @/lib/types.
 */
import type {
  PlaceFeatureResponse,
  PlaceActivityResponse,
  PlaceClimateResponse,
} from "@/lib/types/place";

export type DestinationUiType = "city" | "hotel" | "restaurant" | "supermarket";

/** Re-export for convenience */
export type { PlaceFeatureResponse, PlaceActivityResponse, PlaceClimateResponse };

export interface Destination {
  id: string;
  slug: string;
  name: string;
  city: string;
  type: DestinationUiType;
  /** Libellé court affiché (ex. catégorie métier) */
  category: string;
  image: string;
  gallery: string[];
  rating: number;
  safety: number;
  description: string;
  longDescription: string;
  coordinates: { lat: number; lng: number };
  address?: string;
  amenities?: string[];
  tags?: string[];
  priceRange?: string;
  openingHours?: string;
  phone?: string;
  website?: string;
  featured: boolean;
  /** Whether the destination is marked as favorite by the current user */
  isFavorite?: boolean;
  /** Volume total d'avis */
  reviewsCount?: number;
  /** Fiche lieu avec offres catalogue (hôtel, resto, commerce…) — renvoyé par l’API (`has_catalog`). */
  hasCatalog?: boolean;
  /** Feature cards (Histoire, Culture, Paysages…) from PlaceFeature backend relation. */
  features?: PlaceFeatureResponse[];
  /** Activities from PlaceActivity backend relation. */
  activities?: PlaceActivityResponse[];
  /** Climate & seasonality from PlaceClimate backend relation. */
  climate?: PlaceClimateResponse | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  unit: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isPopular: boolean;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery: string[];
  capacity: number;
  amenities: string[];
  description: string;
  available: boolean;
}

export interface CartItem {
  item: Product | MenuItem;
  quantity: number;
}
