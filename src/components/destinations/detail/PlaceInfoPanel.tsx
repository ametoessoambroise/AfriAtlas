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
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-2.5">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Informations pratiques</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {destination.address && (
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Adresse</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{destination.address}</p>
          </div>
        )}

        {destination.openingHours && (
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Horaires</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{destination.openingHours}</p>
          </div>
        )}

        {destination.phone && (
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Contact</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{destination.phone}</p>
          </div>
        )}

        {destination.website && (
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Site Web</span>
            </div>
            <a
              href={destination.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Visiter le site
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
