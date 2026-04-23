/** JWT access token (aligné backend : localStorage `access_token`). */
export function getAccessToken(): string {
  try {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("access_token") ?? "";
  } catch {
    return "";
  }
}

export function setAccessToken(token: string): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  } catch {}
}

/** JWT refresh token (localStorage `refresh_token`). */
export function getRefreshToken(): string {
  try {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("refresh_token") ?? "";
  } catch {
    return "";
  }
}

export function setRefreshToken(token: string): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("refresh_token", token);
    }
  } catch {}
}

export function clearTokens(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  } catch {}
}
