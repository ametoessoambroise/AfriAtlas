import { useEffect, useRef } from "react";
import { authenticationApi } from "@/lib/api";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/api/token";
import { isTokenExpired, getTokenTimeRemaining } from "@/lib/utils/jwt";

/**
 * Hook pour rafraîchir automatiquement le token avant qu'il n'expire
 * Vérifie intelligemment l'expiration et rafraîchit au bon moment
 */
export function useTokenRefresh() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const refreshToken = async () => {
      const rt = getRefreshToken();
      const at = getAccessToken();

      if (!rt) {
        console.log("⏭️ No refresh token, skipping proactive refresh");
        return;
      }

      // Vérifier si le token actuel est proche de l'expiration
      if (at && !isTokenExpired(at, 5 * 60)) {
        // 5 minutes de buffer
        const timeRemaining = getTokenTimeRemaining(at);
        console.log(
          `⏰ Token still valid for ${Math.floor(timeRemaining / 60)} minutes`,
        );
        return;
      }

      try {
        console.log("🔄 Proactively refreshing token...");
        const response = await authenticationApi.refreshToken({
          refresh_token: rt,
        });

        if (response.access_token) {
          setAccessToken(response.access_token);
          
          // Mettre à jour le refresh token si le backend en a renvoyé un nouveau (rotation)
          if ((response as any).refresh_token) {
            setRefreshToken((response as any).refresh_token);
          }
          
          console.log("✅ Token proactively refreshed");

          // Planifier le prochain refresh basé sur l'expiration du nouveau token
          scheduleNextRefresh(response.access_token);
        }
      } catch (error) {
        console.error("❌ Proactive token refresh failed:", error);
        // Ne pas clear les tokens ici, laisser le mécanisme 401 gérer ça
      }
    };

    const scheduleNextRefresh = (token: string) => {
      const timeRemaining = getTokenTimeRemaining(token);

      if (timeRemaining > 0) {
        // Rafraîchir 5 minutes avant l'expiration
        const refreshIn = Math.max(60 * 1000, (timeRemaining - 5 * 60) * 1000);

        console.log(
          `⏱️ Next token refresh scheduled in ${Math.floor(refreshIn / 60000)} minutes`,
        );

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          refreshToken();
        }, refreshIn);
      }
    };

    // Vérifier immédiatement si on a besoin de rafraîchir
    const at = getAccessToken();
    const rt = getRefreshToken();

    if (rt && at) {
      if (isTokenExpired(at, 5 * 60)) {
        // Token expire dans moins de 5 minutes, rafraîchir immédiatement
        refreshToken();
      } else {
        // Planifier le prochain refresh
        scheduleNextRefresh(at);
      }
    }

    // Vérifier toutes les 5 minutes au cas où
    intervalRef.current = setInterval(
      () => {
        const currentToken = getAccessToken();
        if (currentToken && isTokenExpired(currentToken, 5 * 60)) {
          refreshToken();
        }
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}
