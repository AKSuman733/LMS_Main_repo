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
        borderTopColor: '#BBFF00',
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

export function StudentRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      setRedirecting(true);
      window.location.href = 'http://localhost:5174/admin';
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (redirecting || user.role === 'admin') {
    return <RedirectingScreen message="Redirecting to Admin Panel..." />;
  }

  return <>{children}</>;
}

export function GuestRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      setRedirecting(true);
      window.location.href = 'http://localhost:5174/admin';
    }
  }, [user]);

  if (user?.role === 'student') {
    return <Navigate to="/dashboard" replace />;
  }

  if (redirecting || user?.role === 'admin') {
    return <RedirectingScreen message="Redirecting to Admin Panel..." />;
  }

  return <>{children}</>;
}
