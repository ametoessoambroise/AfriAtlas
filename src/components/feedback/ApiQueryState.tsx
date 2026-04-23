import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ApiErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ApiErrorState({
  title = "Oups ! Quelque chose s'est mal passé",
  message,
  onRetry,
  className,
}: ApiErrorStateProps) {
  // Tenter de récupérer un message plus propre si c'est un objet Error étendu
  const displayMessage = (message as any)?.friendlyMessage || (typeof message === 'string' ? message : "Une erreur inconnue est survenue.");

  return (
    <Alert className={cn("border-destructive/40 bg-destructive/5", className)} role="alert">
      <AlertCircle className="h-4 w-4 text-destructive" aria-hidden />
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription>
        <p className="mb-3 text-foreground/90">{displayMessage}</p>
        {onRetry ? (
          <Button type="button" variant="outline" size="sm" onClick={() => onRetry()}>
            Réessayer
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ title, description, actionLabel, onAction, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Inbox className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      {description ? <p className="mb-6 max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {actionLabel && onAction ? (
        <Button type="button" variant="secondary" size="sm" onClick={() => onAction()}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

interface GridLoadingProps {
  count?: number;
  className?: string;
}

export function DestinationGridSkeleton({ count = 6, className }: GridLoadingProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)} aria-busy="true" aria-label="Chargement">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
          <Skeleton className="h-52 w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageLoading({ label = "Chargement…" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground" role="status" aria-live="polite">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
