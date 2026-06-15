import { useEffect, useRef } from "react";
import { useAnalyticsMutations } from "@/hooks/queries/useAnalytics";

// ---------------------------------------------------------------------------
// Helpers — IDs persistants pour le suivi analytics

/** device_id : survit aux fermetures de navigateur (localStorage). */
function getOrCreateDeviceId(): string {
  const KEY = "atlas_device_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = "dev_" + (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
    localStorage.setItem(KEY, id);
  }
  return id;
}

/** session_id : réinitialisé à chaque nouvelle session d'onglet (sessionStorage). */
function getOrCreateSessionId(): string {
  const KEY = "atlas_analytics_sid";
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = "sid_" + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem(KEY, id);
  }
  return id;
}

// ---------------------------------------------------------------------------

/**
 * AnalyticsTracker
 * Monte silencieusement et envoie un événement d'affichage de lieu au backend.
 * Délai de 1 seconde pour éviter de compter les rebonds immédiats.
 */
export default function AnalyticsTracker({ placeId }: { placeId: string }) {
  const { recordVisit } = useAnalyticsMutations();
  const tracked = useRef(false);

  useEffect(() => {
    if (!placeId || tracked.current) return;

    const timer = setTimeout(() => {
      tracked.current = true;
      recordVisit.mutate({
        entity_id: placeId,
        entity_type: "place",
        visit_type: "view",
        source: document.referrer ? new URL(document.referrer).hostname : "direct",
        referrer: document.referrer || undefined,
        duration_seconds: 0,
      });
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId]);

  // N'affiche rien dans le DOM
  return null;
}
