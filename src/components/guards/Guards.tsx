import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Chargement...</div>;
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const RoleGuard = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};
