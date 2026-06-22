import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  role?: 'student' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check URL parameters for autologin from the student app (different port origin)
    const params = new URLSearchParams(window.location.search);
    const autologin = params.get('autologin');
    if (autologin === 'admin') {
      const adminUser: User = { name: 'Admin', email: 'admin@learnify.com', role: 'admin' };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setTimeout(() => {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }, 0);
      return adminUser;
    }

    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
