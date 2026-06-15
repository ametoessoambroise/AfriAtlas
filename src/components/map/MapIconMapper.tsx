import { 
  Building2, 
  Hotel, 
  Utensils, 
  ShoppingBag, 
  Landmark, 
  Store, 
  GraduationCap, 
  Trophy, 
  Church, 
  Moon, 
  Fuel,
  MapPin,
  Camera,
  Trees,
  Waves,
  Mountain,
  Palmtree
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, any> = {
  city: Building2,
  hotel: Hotel,
  restaurant: Utensils,
  supermarket: ShoppingBag,
  museum: Landmark,
  market: Store,
  university: GraduationCap,
  stadium: Trophy,
  mosque: Moon,
  church: Church,
  gasStation: Fuel,
  beach: Waves,
  nature: Trees,
  mountain: Mountain,
  monument: Landmark,
  park: Palmtree,
  viewpoint: Camera,
  default: MapPin
};

// SVG Paths for direct injection into Leaflet divIcon (simplified versions of Lucide)
export const CATEGORY_SVG_PATHS: Record<string, string> = {
  city: '<path d="M6 22V4c0-1.1.9-2 2-2h8a2 2-0 0 1 2 2v18Z"/><path d="M6 12H4a2 2-0 0 0-2 2v6a2 2-0 0 0 2 2h2"/><path d="M18 9h2a2 2-0 0 1 2 2v9a2 2-0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  hotel: '<path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M7 14h10"/><path d="M7 18h10"/><path d="M10 10h4"/><path d="M12 6h.01"/>',
  restaurant: '<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M10 4v16"/><path d="M14 4v16"/><path d="M18 12h4"/><path d="M18 16h4"/>',
  supermarket: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  museum: '<path d="m2 9 10-7 10 7"/><path d="M4 22h16"/><path d="M4 9v11"/><path d="M20 9v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/>',
  market: '<path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M9 22V12h6v10"/>',
  university: '<path d="m4 6 8-4 8 4-8 4-8-4Z"/><path d="M4 10v6c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M12 10v8"/>',
  stadium: '<path d="M12 12c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4Z"/><path d="M4 16v4"/><path d="M20 16v4"/><path d="M12 2v10"/><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z"/>',
  mosque: '<path d="M20 22h-8M8 22H4M12 2v20M12 2a4 4 0 0 0-4 4v2"/><path d="M16 8V6a4 4 0 0 0-4-4"/><path d="M4 12V8a4 4 0 0 1 4-4h0"/><path d="M16 4h0a4 4 0 0 1 4 4v4"/><path d="M20 12h-4v10h4V12Z"/><path d="M4 12h4v10H4V12Z"/><path d="M12 8a2 2 0 0 1 2 2v2h-4v-2a2 2 0 0 1 2-2Z"/>',
  church: '<path d="M10 20V10l-2 2v8"/><path d="M14 20V10l2 2v8"/><path d="M12 10V2"/><path d="M9 5h6"/><path d="M4 22h16"/>',
  gasStation: '<path d="M3 7h11"/><path d="M3 11h11"/><path d="M3 15h11"/><path d="M18 7v10"/><path d="M14 22V2h3l3 3v15a2 2 0 0 1-2 2h-4Z"/>',
  beach: '<path d="M2 18h20"/><path d="M10 10 5 18"/><path d="M14 10l5 8"/><path d="M12 10V4"/><path d="M8 4h8"/><path d="M12 18v-4"/>',
  nature: '<path d="M12 22V12"/><path d="M12 12 7 17"/><path d="M12 12l5 5"/><path d="M9 7h6"/><path d="M12 2v5"/>',
  mountain: '<path d="m8 20 4-6 4 6"/><path d="m3 20 7-10 7 10"/><path d="m14 20 5-7 3 7"/>',
  monument: '<path d="M8 22h8"/><path d="M12 2v20"/><path d="M9 12h6"/><path d="M10 7h4"/><path d="M11 2h2"/>',
  viewpoint: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  default: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'
};

export const CATEGORY_COLORS: Record<string, string> = {
  city: "#3dc2c7",
  hotel: "#f59e0b",
  restaurant: "#f97316",
  supermarket: "#22c55e",
  museum: "#33eac5ff",
  market: "#ea3333ff",
  university: "#95e6f2ff",
  stadium: "#e4ea33ff",
  mosque: "#223011ff",
  church: "#3352eaff",
  gasStation: "#9333ea",
  beach: "#0ea5e9",
  nature: "#10b981",
  mountain: "#6366f1",
  monument: "#8b5cf6",
  park: "#22c55e",
  viewpoint: "#ec4899",
  default: "#3b82f6"
};

export function getCategoryIcon(category: string) {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS.default;
}

export function getCategorySVG(category: string, color: string = "currentColor", size: number = 16) {
  const path = CATEGORY_SVG_PATHS[category] || CATEGORY_SVG_PATHS.default;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

export function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
}
