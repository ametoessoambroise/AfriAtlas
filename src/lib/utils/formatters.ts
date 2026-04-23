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
