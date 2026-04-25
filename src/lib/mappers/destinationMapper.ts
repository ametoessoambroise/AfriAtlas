import type { DestinationResponse } from "@/lib/types/destination";
import type { PlaceListResponse } from "@/lib/types/place";
import type { Destination, DestinationUiType } from "@/lib/models/ui";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

export function mapDestinationResponseToUi(
  d: DestinationResponse | PlaceListResponse,
): Destination {
  // Handle PlaceListResponse (from /api/v1/places)
  // We check for properties unique to PlaceListResponse
  if ("rating_avg" in d || "is_featured" in d) {
    const p = d as PlaceListResponse;
    return {
      id: p.id,
      slug: p.slug || p.name.toLowerCase().replace(/\s+/g, "-"),
      name: p.name,
      city: p.city || "Togo",
      type: (p.category as any) || "city",
      category: p.category || "Place",
      image: p.primary_image?.url || PLACEHOLDER_IMAGE,
      gallery: p.primary_image ? [p.primary_image.url] : [PLACEHOLDER_IMAGE],
      rating: parseFloat(p.rating_avg || "0"),
      reviewsCount: p.rating_count || 0,
      safety: 5,
      description: p.description || "",
      longDescription: "",
      coordinates: {
        lat: parseFloat(p.latitude || "8.6195"),
        lng: parseFloat(p.longitude || "0.8248"),
      },
      featured: p.is_featured,
      isFavorite: (p as any).is_favorite ?? false,
    };
  }

  // Handle original DestinationResponse
  const dest = d as DestinationResponse;
  const coverMedia = dest.media?.find((m) => m.is_cover) || dest.media?.[0];
  const gallery = dest.media?.map((m) => m.media_url) || [PLACEHOLDER_IMAGE];

  return {
    id: String(dest.id),
    slug: dest.name.toLowerCase().replace(/\s+/g, "-"),
    name: dest.name,
    city: dest.city || "Togo",
    type: "city" as DestinationUiType,
    category: "Destination",
    image: coverMedia?.media_url || PLACEHOLDER_IMAGE,
    gallery: gallery.length > 0 ? gallery : [PLACEHOLDER_IMAGE],
    rating: parseFloat(dest.average_rating || "0"),
    reviewsCount: dest.reviews_count || 0,
    safety: dest.safety_level || 5,
    description: dest.short_description || "",
    longDescription: dest.long_description || "",
    coordinates: {
      lat: parseFloat(dest.latitude || "8.6195"),
      lng: parseFloat(dest.longitude || "0.8248"),
    },
    featured: dest.popularity_score > 80,
    isFavorite: (dest as any).is_favorite ?? false,
  };
}
