import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

// Pages publiques & Catalogue
import Index from "./pages/Index";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetail from "./pages/DestinationDetail";
import PlaceCatalogPage from "./pages/PlaceCatalogPage";
import CartePage from "./pages/CartePage";
import NavigationPage from "./pages/NavigationPage";
import PartnerLandingPage from "./pages/PartnerLandingPage";

// Pages Authentification
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";

// Pages de cartes
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import DashboardPage from "./pages/DashboardPage";
import { ErrorBoundary } from "./components/dashboard/ErrorBoundary";
import ProfilePage from "./pages/profile/ProfilePages";
import ProfileEditPage from "./pages/profile/ProfilesEditPage";
import FavoritesPage from "./pages/FavoritesPage";
import AlbumsPage from "./pages/albums/AlbumsPage";
import CreateAlbumPage from "./pages/albums/CreateAlbumPage";
import AlbumDetailPage from "./pages/albums/AlbumDetailPage";
import ProtectedWrapper from "./components/auth/ProtectedWrapper";

// Pages VR & Bookings
import VrSessionsPage from "./pages/vr-sessions/VrSessionsPage";
import VrBookingPage from "./pages/vr-sessions/VrBookingPage";
import BookingsPage from "./pages/bookings/BookingsPage";
import BookingDetailPage from "./pages/bookings/BookingDetailPage";

import OrdersPage from "./pages/orders/OrdersPage";
import OrderDetailPage from "./pages/orders/OrderDetailPage";

// Pages Subscription & Famille
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import FamilyPage from "./pages/subscription/FamilyPage";

// Pages Owner
import OwnerLayout from "./components/layout/OwnerLayout";
import OwnerDashboardPage from "./pages/owner/OwnerDashboardPage";
import PlaceEditPage from "./pages/owner/PlaceEditPage";
import OwnerProductsPage from "./pages/owner/OwnerProductsPage";
import VrOwnerSessionsPage from "./pages/owner/VrOwnerSessionsPage";
import VrSessionBookingsPage from "./pages/owner/VrSessionBookingsPage";
import OwnerClaimsPage from "./pages/owner/OwnerClaimsPage";

// Pages Admin
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminDestinationsPage from "./pages/admin/AdminDestinationsPage";
import AdminClaimsPage from "./pages/admin/AdminClaimsPage";
import AdminAdsPage from "./pages/admin/AdminAdsPage";
import RoleGuard from "./components/auth/RoleGuard";

import NotFound from "./pages/NotFound";
import AdminOwnerRevenuesPage from "./pages/admin/AdminOwnerRevenuesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 25 * 60 * 1000, // 25 minutes (avant l'expiration du token de 30 min)
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true, // Rafraîchir quand la connexion revient
    },
  },
});

import { useLocation } from "react-router-dom";

const AppContent = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  // Rafraîchir automatiquement le token toutes les 25 minutes
  useTokenRefresh();

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Aller au contenu principal
      </a>
      {!isDashboard && <Navbar />}
      <main
        id="contenu-principal"
        tabIndex={-1}
        className={
          isMobile
            ? `min-h-dvh scroll-mt-24 ${isDashboard ? "" : "pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]"} outline-none md:pb-0`
            : "min-h-dvh scroll-mt-24 outline-none"
        }
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route
            path="/destinations/:slug/catalog"
            element={<PlaceCatalogPage />}
          />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/carte" element={<CartePage />} />
          <Route path="/map/:slug" element={<NavigationPage />} />
          <Route path="/how-ads-works" element={<PartnerLandingPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          {/* Private Routes (Protected) */}
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedWrapper>
                <CheckoutPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/checkout/confirm"
            element={
              <ProtectedWrapper>
                <ConfirmationPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedWrapper>
                <ErrorBoundary>
                  <DashboardPage />
                </ErrorBoundary>
              </ProtectedWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedWrapper>
                <ProfilePage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedWrapper>
                <ProfileEditPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedWrapper>
                <FavoritesPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/albums"
            element={
              <ProtectedWrapper>
                <AlbumsPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/albums/new"
            element={
              <ProtectedWrapper>
                <CreateAlbumPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/albums/:id"
            element={
              <ProtectedWrapper>
                <AlbumDetailPage />
              </ProtectedWrapper>
            }
          />

          {/* VR & Bookings */}
          <Route path="/vr-sessions" element={<VrSessionsPage />} />
          <Route
            path="/vr-sessions/:slug/:id/book"
            element={
              <ProtectedWrapper>
                <VrBookingPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedWrapper>
                <BookingsPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/bookings/:id"
            element={
              <ProtectedWrapper>
                <BookingDetailPage />
              </ProtectedWrapper>
            }
          />

          {/* Orders */}
          <Route
            path="/orders"
            element={
              <ProtectedWrapper>
                <OrdersPage />
              </ProtectedWrapper>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedWrapper>
                <OrderDetailPage />
              </ProtectedWrapper>
            }
          />

          {/* Subscription & Famille */}
          <Route path="/pricing" element={<SubscriptionPage />} />
          <Route
            path="/family"
            element={
              <ProtectedWrapper>
                <FamilyPage />
              </ProtectedWrapper>
            }
          />

          {/* Owner Space */}
          <Route
            path="/owner"
            element={
              <ProtectedWrapper>
                <OwnerLayout />
              </ProtectedWrapper>
            }
          >
            <Route path="dashboard" element={<OwnerDashboardPage />} />
            <Route path="places/:id/edit" element={<PlaceEditPage />} />
            <Route path="products" element={<OwnerProductsPage />} />
            <Route path="vr-sessions" element={<VrOwnerSessionsPage />} />
            <Route
              path="vr-sessions/:id/bookings"
              element={<VrSessionBookingsPage />}
            />
            <Route path="claims" element={<OwnerClaimsPage />} />
          </Route>

          {/* Admin Dashboard (Protected) */}
          <Route
            path="/admin"
            element={
              <RoleGuard
                allowedRoles={["admin", "superadmin"]}
                fallbackPath="/owner/dashboard"
              >
                <AdminLayout />
              </RoleGuard>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="revenues" element={<AdminOwnerRevenuesPage />} />
            <Route path="ads" element={<AdminAdsPage />} />
            <Route path="destinations" element={<AdminDestinationsPage />} />
            <Route path="claims" element={<AdminClaimsPage />} />
          </Route>

          {/* Catch-all (Public) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isDashboard && <Footer />}
      {isMobile && !isDashboard && <BottomNav />}
    </TooltipProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
