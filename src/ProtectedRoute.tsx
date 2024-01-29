import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthProvider';

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();
  if (!user?.aud) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
