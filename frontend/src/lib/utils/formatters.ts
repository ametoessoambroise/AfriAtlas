/**
 * Formats a raw place category into a human-readable UI label.
 * @param category The raw category string from the database/API.
 * @returns A formatted string ready for UI display.
 */
export function formatPlaceCategoryLabel(category: string): string {
  if (!category) return "Lieu";

  // Dictionnaire des catégories courantes
  const categoryMap: Record<string, string> = {
    city: "Ville",
    hotel: "Hôtel",
    restaurant: "Restaurant",
    supermarket: "Supermarché",
    museum: "Musée",
    market: "Marché",
    university: "Université",
    stadium: "Stade",
    mosque: "Mosquée",
    church: "Église",
    gasStation: "Station Service",
    bar: "Bar",
    hospital: "Hôpital",
    pharmacy: "Pharmacie",
    school: "École",
    bank: "Banque",
  };

  // On renvoie la traduction, sinon on met la première lettre en majuscule
  return (
    categoryMap[category] ||
    category.charAt(0).toUpperCase() + category.slice(1)
  );
}

/**
 * Formats a price into FCFA.
 */
export function formatPriceFCFA(price: number): string {
  return price.toLocaleString("fr-FR") + " FCFA";
}

/**
 * Formats a date in French locale with configurable format.
 * @param date The date to format (Date object, ISO string, or timestamp).
 * @param format The format type: 'short' (DD/MM/YYYY) or 'long' (DD MMM YYYY). Defaults to 'short'.
 * @returns Formatted date string in the specified format.
 */
export function formatDate(
  date: Date | string | number,
  format: "short" | "long" = "short",
): string {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  if (format === "short") {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(dateObj);
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateObj);
}

/**
 * Formats a date in French locale with month name (DD MMM YYYY format).
 * @param date The date to format (Date object, ISO string, or timestamp).
 * @returns Formatted date string like "25 avr. 2026".
 */
export function formatDateWithMonth(date: Date | string | number): string {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateObj);
}

/**
 * Formats a number with French locale (space as thousands separator).
 * @param value The number to format.
 * @param options Optional Intl.NumberFormatOptions for customization (e.g., minimumFractionDigits, maximumFractionDigits).
 * @returns Formatted number string like "1 234" or "1 234,56".
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat("fr-FR", options).format(value);
}

/**
 * Formats a decimal number with French locale (comma as decimal separator).
 * @param value The number to format.
 * @param decimals Number of decimal places (default: 2).
 * @returns Formatted number string like "1 234,56".
 */
export function formatDecimal(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formats currency with French locale.
 * @param value The amount to format.
 * @param currency The currency code (e.g., "EUR", "XOF").
 * @returns Formatted currency string.
 */
export function formatCurrency(
  value: number,
  currency: string = "XOF",
): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Formats a relative time in French (e.g., "il y a 2 jours").
 * @param date The date to compare against now.
 * @returns Relative time string in French.
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return "à l'instant";
  } else if (diffMinutes < 60) {
    return `il y a ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
  } else if (diffHours < 24) {
    return `il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
  } else if (diffDays < 7) {
    return `il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  } else if (diffDays < 30) {
    return `il y a ${diffWeeks} semaine${diffWeeks > 1 ? "s" : ""}`;
  } else if (diffMonths < 12) {
    return `il y a ${diffMonths} mois`;
  } else {
    return `il y a ${diffYears} an${diffYears > 1 ? "s" : ""}`;
  }
}
