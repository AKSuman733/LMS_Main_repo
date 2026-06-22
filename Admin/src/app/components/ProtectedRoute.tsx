import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { ReactNode, useEffect, useState } from 'react';

function RedirectingScreen({ message }: { message: string }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0F0A1E',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 16
    }}>
      <div style={{
        width: 40, height: 40,
        border: '3px solid rgba(255,255,255,0.1)',
        borderTopColor: '#FF6B35',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500 }}>
        {message}
      </p>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      setRedirecting(true);
      window.location.href = 'http://localhost:5173/dashboard';
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (redirecting || user.role !== 'admin') {
    return <RedirectingScreen message="Redirecting to Student Dashboard..." />;
  }

  return <>{children}</>;
}

export function GuestRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (user?.role === 'student') {
      setRedirecting(true);
      window.location.href = 'http://localhost:5173/dashboard';
    }
  }, [user]);

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  if (redirecting || user?.role === 'student') {
    return <RedirectingScreen message="Redirecting to Student Dashboard..." />;
  }

  return <>{children}</>;
}
