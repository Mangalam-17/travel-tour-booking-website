import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Spinner shown while checking stored token
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-slate-500 text-sm">Loading...</p>
    </div>
  </div>
);

// Requires login
export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
};

// Requires admin role
export const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};
