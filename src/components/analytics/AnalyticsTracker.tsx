import { useEffect } from "react";
import { analyticsApi } from "@/lib/api";

interface AnalyticsTrackerProps {
  entityId: string | number;
  entityType: "destination" | "place" | "product" | "album";
  metadata?: Record<string, any>;
}

/**
 * Composant invisible pour traquer automatiquement les vues au montage de la page.
 */
export function AnalyticsTracker({ entityId, entityType, metadata }: AnalyticsTrackerProps) {
  useEffect(() => {
    const track = async () => {
      try {
        // Device ID (Persistant sur le navigateur)
        let deviceId = localStorage.getItem("atlas_analytics_did");
        if (!deviceId) {
          deviceId = "did_" + (crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15));
          localStorage.setItem("atlas_analytics_did", deviceId);
        }

        // Session ID (Uniquement pour l'onglet/session en cours)
        let sessionId = sessionStorage.getItem("atlas_analytics_sid");
        if (!sessionId) {
          sessionId = "sid_" + (crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15));
          sessionStorage.setItem("atlas_analytics_sid", sessionId);
        }

        await analyticsApi.recordVisit({
          place_id: String(entityId),
          visit_type: "view",
          session_id: sessionId,
          user_agent: navigator.userAgent,
          referrer: document.referrer || undefined,
          // metadata.device_id permet de tracker l'utilisateur anonyme au-delà de sa session
          // @ts-ignore
          metadata: { 
            ...metadata, 
            entity_type: entityType,
            device_id: deviceId 
          }
        });
      } catch (error) {
        // Silently fail analytics in production
        if (process.env.NODE_ENV === "development") {
          console.warn("Tracking failed", error);
        }
      }
    };

    // Délai de précaution pour éviter de compter les "accidents" de navigation
    const delay = entityType === "place" ? 2000 : 1000;
    const timer = setTimeout(track, delay);
    return () => clearTimeout(timer);
  }, [entityId, entityType]);

  return null;
}
