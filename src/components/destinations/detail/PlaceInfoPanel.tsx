import { Clock, MapPin, Phone, DollarSign, Globe } from "lucide-react";
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
    <div className="card-destination space-y-5 p-6 border border-border/50 bg-card/50 shadow-sm rounded-2xl">
      <h3 className="text-xl font-bold border-b border-border/50 pb-3">Informations pratiques</h3>
      
      <div className="space-y-4">
        {destination.address ? (
          <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-surface-alt transition-colors">
            <div className="bg-primary/10 p-2 rounded-full min-w-fit">
              <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5">Adresse</p>
              <p className="text-sm text-muted-foreground leading-snug">{destination.address}</p>
            </div>
          </div>
        ) : null}

        {destination.openingHours ? (
          <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-surface-alt transition-colors">
            <div className="bg-primary/10 p-2 rounded-full min-w-fit">
              <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5">Horaires d'ouverture</p>
              <p className="text-sm text-muted-foreground leading-snug">{destination.openingHours}</p>
            </div>
          </div>
        ) : null}

        {destination.phone ? (
          <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-surface-alt transition-colors">
            <div className="bg-primary/10 p-2 rounded-full min-w-fit">
              <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5">Contact</p>
              <p className="text-sm text-muted-foreground leading-snug">{destination.phone}</p>
            </div>
          </div>
        ) : null}

        {destination.priceRange ? (
          <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-surface-alt transition-colors">
            <div className="bg-amber-500/10 p-2 rounded-full min-w-fit">
              <DollarSign className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5">Gamme de prix</p>
              <p className="text-sm text-muted-foreground leading-snug">{destination.priceRange}</p>
            </div>
          </div>
        ) : null}

        {destination.website ? (
          <div className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-surface-alt transition-colors">
            <div className="bg-blue-500/10 p-2 rounded-full min-w-fit">
              <Globe className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5">Site Officiel</p>
              <p className="text-sm text-muted-foreground leading-snug">
                <a 
                  href={destination.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary underline underline-offset-2 transition-colors"
                >
                  Visiter le site
                </a>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
