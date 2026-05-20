import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { ReactNode } from 'react';

export function StudentRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

export function GuestRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  if (user?.role === 'student') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}
