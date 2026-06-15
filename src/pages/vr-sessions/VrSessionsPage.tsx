import React from "react";
import { Search, Headset } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useVrSessions } from "@/hooks/queries/useVrSessions";
import { SessionCard } from "@/components/vr-sessions/SessionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";

export default function VrSessionsPage() {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 400);

  const searchSlug =
    debouncedSearch.length > 2
      ? debouncedSearch.toLowerCase().replace(/\s+/g, "-")
      : undefined;

  const { data: sessions, isLoading, error } = useVrSessions(searchSlug);

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
        {/* ── Header ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Headset className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Réalité Virtuelle
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Expériences Virtuelles
          </h1>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            Plongez au cœur du Togo depuis chez vous. Réservez une visite
            virtuelle guidée et explorez les merveilles de l'Atlas avant même
            votre départ.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une destination…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 rounded-2xl bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30"
          />
        </div>

        {/* ── Sessions list ── */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-52 w-full rounded-2xl" />
              <Skeleton className="h-52 w-full rounded-2xl" />
              <Skeleton className="h-52 w-full rounded-2xl" />
            </div>
          ) : error ? (
            <div className="text-center py-16 px-6 bg-destructive/5 rounded-2xl border border-destructive/20">
              <p className="text-destructive font-medium text-sm">
                Erreur lors du chargement des sessions.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Veuillez rafraîchir la page ou réessayer plus tard.
              </p>
            </div>
          ) : sessions?.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
              <Headset className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-base font-semibold text-foreground mb-1">
                Aucune session trouvée
              </h3>
              <p className="text-sm text-muted-foreground">
                Essayez de modifier votre recherche.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {sessions?.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
