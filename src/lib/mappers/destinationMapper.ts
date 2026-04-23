import type { DestinationResponse } from "@/lib/types/destination";
import type { Destination, DestinationUiType } from "@/lib/models/ui";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

export function mapDestinationResponseToUi(
  d: DestinationResponse,
): Destination {
  const coverMedia = d.media?.find((m) => m.is_cover) || d.media?.[0];
  const gallery = d.media?.map((m) => m.media_url) || [PLACEHOLDER_IMAGE];

  return {
    id: String(d.id),
    slug: d.name.toLowerCase().replace(/\s+/g, "-"), // Basic slugifier if missing
    name: d.name,
    city: d.city || "Togo",
    type: "city" as DestinationUiType, // Destinations (cities) are typed as "city"
    category: "Destination",
    image: coverMedia?.media_url || PLACEHOLDER_IMAGE,
    gallery: gallery.length > 0 ? gallery : [PLACEHOLDER_IMAGE],
    rating: parseFloat(d.average_rating || "0"),
    reviewsCount: d.reviews_count || 0,
    safety: d.safety_level || 5,
    description: d.short_description || "",
    longDescription: d.long_description || "",
    coordinates: {
      lat: parseFloat(d.latitude || "8.6195"),
      lng: parseFloat(d.longitude || "0.8248"),
    },
    featured: d.popularity_score > 80,
    isFavorite: (d as any).is_favorite ?? false,
  };
}
