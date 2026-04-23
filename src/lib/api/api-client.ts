import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken, clearTokens } from "./token";
import { getApiBaseUrl } from "./env";
import { ApiError } from "./error-handler";

let refreshPromise: Promise<string | null> | null = null;

/**
 * Enhanced fetch wrapper that handles:
 * 1. Automatic Authorization header injection
 * 2. Automatic token refresh on 401 Unauthorized
 * 3. Consistent error handling with ApiError
 */
export async function fetchWithAuth(url: string, init: RequestInit = {}): Promise<Response> {
  const accessToken = getAccessToken();
  
  const headers = new Headers(init.headers || {});

  // Auto-set Content-Type for JSON bodies
  if (typeof init.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const newInit = { ...init, headers };
  let response = await fetch(url, newInit);

  // If 401, try to refresh the token (but NOT on the auth endpoints themselves)
  const isAuthEndpoint = url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/auth/refresh");
  if (response.status === 401 && !isAuthEndpoint) {
    const refreshTokenValue = getRefreshToken();
    
    if (refreshTokenValue) {
      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshUrl = `${getApiBaseUrl()}/api/v1/auth/refresh`;
            const refreshRes = await fetch(refreshUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh_token: refreshTokenValue }),
            });

            if (refreshRes.ok) {
              const data = await refreshRes.json();
              const newAccessToken = data.access_token;
              
              if (newAccessToken) {
                setAccessToken(newAccessToken);
                // Si le backend utilise la rotation de refresh_token, on le met à jour
                if (data.refresh_token) setRefreshToken(data.refresh_token);
                return newAccessToken;
              }
            }
            
            clearTokens();
            return null;
          } catch (error) {
            console.error("Token refresh failed:", error);
            clearTokens();
            return null;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      // Attendre que la promesse existante se termine
      const newAccessToken = await refreshPromise;

      if (newAccessToken) {
        // Relancer la requête d'origine
        headers.set("Authorization", `Bearer ${newAccessToken}`);
        response = await fetch(url, { ...init, headers });
      }
    }
  }

  return response;
}

/**
 * Standardized request helper that parses JSON and throws ApiError
 */
export async function request<T>(url: string, init: RequestInit = {}, moduleName = "API"): Promise<T> {
  const res = await fetchWithAuth(url, init);

  if (!res.ok) {
    const errorBody = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, errorBody, url, moduleName);
  }

  // Handle 204 No Content
  if (res.status === 204) return {} as T;

  return res.json() as Promise<T>;
}
