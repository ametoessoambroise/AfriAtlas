import React from "react";
import { Search, Headset } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useVrSessions } from "@/hooks/queries/useVrSessions";
import { SessionCard } from "@/components/vr-sessions/SessionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function VrSessionsPage() {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 400);

  const searchSlug =
    debouncedSearch.length > 2
      ? debouncedSearch.toLowerCase().replace(/\s+/g, "-")
      : undefined;

  const { data: sessions, isLoading, error } = useVrSessions(searchSlug);

  return (
    <div className="container py-12 px-4 md:px-8 mx-auto max-w-5xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary">
          Expériences Virtuelles
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Plongez au cœur du Togo depuis chez vous. Réservez une visite virtuelle guidée 
          et explorez les merveilles de l'Atlas avant même votre départ.
        </p>
      </div>

      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Rechercher une destination pour le voyage VR..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 py-6 rounded-2xl text-lg bg-card shadow-sm border-border/50"
        />
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-6">
             <Skeleton className="h-64 w-full rounded-3xl" />
             <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-red-500/10 rounded-3xl border border-red-500/20">
            <p className="text-red-500 font-medium">Erreur lors du chargement des sessions commerciales.</p>
          </div>
        ) : sessions?.length === 0 ? (
          <div className="text-center p-16 bg-muted/30 rounded-3xl border-2 border-dashed border-border/50">
            <h3 className="text-xl font-bold mb-2">Aucune session trouvée</h3>
            <p className="text-muted-foreground">Essayez de modifier votre recherche.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {sessions?.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
