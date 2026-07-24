import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that protects routes and redirects unauthenticated users to the login page.
 * It also handles the loading state of the user profile.
 */
const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show a loading screen while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium animate-pulse">
          Vérification de vos accès...
        </p>
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedWrapper;
