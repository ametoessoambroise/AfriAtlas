import { Clock, MapPin, Phone, Globe } from "lucide-react";
import type { Destination } from "@/lib/models/ui";

interface PlaceInfoPanelProps {
  destination: Destination;
}

export default function PlaceInfoPanel({ destination }: PlaceInfoPanelProps) {
  const hasContactInfo =
    destination.phone ||
    destination.openingHours ||
    destination.priceRange ||
    destination.website;

  if (!hasContactInfo && !destination.address) {
    return null;
  }


  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">

        <div className="bg-primary/10 p-2.5 rounded-xl">

          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-semibold">Informations pratiques</h2>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {destination.address && (

          <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card shadow-sm group hover:shadow-md transition-all">
            <div className="bg-primary/10 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">

              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                Adresse
              </p>
              <p className="text-sm font-medium leading-relaxed">
                {destination.address}
              </p>
            </div>
          </div>
        )}

        {destination.openingHours && (

          <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card shadow-sm group hover:shadow-md transition-all">
            <div className="bg-primary/10 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                Horaires
              </p>
              <p className="text-sm font-medium leading-relaxed">
                {destination.openingHours}
              </p>
            </div>
          </div>
        )}

        {destination.phone && (

          <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card shadow-sm group hover:shadow-md transition-all">
            <div className="bg-primary/10 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                Contact
              </p>
              <p className="text-sm font-medium leading-relaxed">
                {destination.phone}
              </p>
            </div>
          </div>
        )}

        {destination.website && (

          <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card shadow-sm group hover:shadow-md transition-all">
            <div className="bg-blue-500/10 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                Site Web
              </p>
              <a
                href={destination.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
              >
                Visiter le site
                <Globe className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
