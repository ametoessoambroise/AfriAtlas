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
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight uppercase">
              Expériences <span className="text-primary">Virtuelles</span>
            </h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
              Plongez au cœur du Togo depuis chez vous.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                <Headset className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative max-w-lg animate-in slide-in-from-bottom-4 duration-500 delay-100">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une destination…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 rounded-md bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30 font-bold text-xs"
          />
        </div>

        {/* ── Sessions list ── */}
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-52 w-full rounded-md" />
              <Skeleton className="h-52 w-full rounded-md" />
              <Skeleton className="h-52 w-full rounded-md" />
            </div>
          ) : error ? (
            <div className="text-center py-16 px-6 bg-destructive/5 rounded-md border border-destructive/10">
              <p className="text-destructive font-black uppercase tracking-widest text-xs">
                Erreur lors du chargement des sessions.
              </p>
            </div>
          ) : sessions?.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-md border-2 border-dashed border-border/50">
              <Headset className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-black uppercase tracking-tight mb-1">
                Aucune session trouvée
              </h3>
              <p className="text-muted-foreground text-sm font-medium">
                Essayez de modifier votre recherche.
              </p>
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
    </DashboardLayout>
  );
}
