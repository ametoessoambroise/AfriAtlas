/**
 * Afriatlas API — clients HTTP (Vite : VITE_API_URL, voir ./env.ts)
 */

export { getApiBaseUrl } from "./env";
export { getAccessToken } from "./token";

export * as adminApi from "./admin";
export * as advertisementsApi from "./advertisements";
export * as albumsApi from "./albums";
export * as analyticsApi from "./analytics";
export * as authenticationApi from "./authentication";
export * as bookingsApi from "./bookings";
export * as favoritesApi from "./favorites";
export * as healthApi from "./health";
export * as oauthApi from "./oauth";
export * as ordersApi from "./orders";
export * as ownerApi from "./owner";
export * as paymentsApi from "./payments";
export * as placesApi from "./places";
export * as productsApi from "./products";
export * as recommendationsApi from "./recommendations";
export * as regionsApi from "./regions";
export * as revenuesApi from "./revenues";
export * as reviewsApi from "./reviews";

export * as subscriptionsApi from "./subscriptions";
export * as usersApi from "./users";
export * as vrSessionsApi from "./vr_sessions";
export * as cartApi from "./cart";
export * as deliveryApi from "./delivery";
export * as searchApi from "./search";

// Export du type d'erreur partagé
export { ApiError } from "./error-handler";
