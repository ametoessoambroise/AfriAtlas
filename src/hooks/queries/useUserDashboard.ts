import { useQuery } from "@tanstack/react-query";
import { getUserDashboard } from "@/lib/api/users";
import { getUserOrders } from "@/lib/api/orders";
import { getPlaces } from "@/lib/api/places";
import { listUserFavorites } from "@/lib/api/favorites";
import { getUserBookings } from "@/lib/api/bookings";

export function useUserDashboard() {
  const dashboardQuery = useQuery({
    queryKey: ["user-dashboard"],
    queryFn: () => getUserDashboard(),
  });

  const favoritesQuery = useQuery({
    queryKey: ["user-favorites-recent"],
    queryFn: () => listUserFavorites({ per_page: 4 }),
  });

  const ordersQuery = useQuery({
    queryKey: ["recent-orders"],
    queryFn: () => getUserOrders({ page: 1, per_page: 5 }),
  });

  const bookingsQuery = useQuery({
    queryKey: ["recent-bookings"],
    queryFn: () => getUserBookings({ per_page: 5 }),
  });

  const topPlacesQuery = useQuery({
    queryKey: ["top-places"],
    queryFn: () => getPlaces({ page_size: 6, is_featured: true }),
  });

  return {
    dashboard: dashboardQuery.data,
    favorites: favoritesQuery.data?.items || [],
    orders: ordersQuery.data?.items || [],
    bookings: bookingsQuery.data?.items || [],
    topPlaces: topPlacesQuery.data?.items || [],
    isLoading: 
      dashboardQuery.isLoading || 
      favoritesQuery.isLoading || 
      ordersQuery.isLoading || 
      bookingsQuery.isLoading ||
      topPlacesQuery.isLoading,
    isError: 
      dashboardQuery.isError || 
      favoritesQuery.isError || 
      ordersQuery.isError || 
      bookingsQuery.isError ||
      topPlacesQuery.isError,
    refetch: () => {
      dashboardQuery.refetch();
      favoritesQuery.refetch();
      ordersQuery.refetch();
      bookingsQuery.refetch();
      topPlacesQuery.refetch();
    }
  };
}
