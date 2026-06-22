import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  role?: 'student' | 'admin';
  avatar?: string;
  id?: string;
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
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && !parsed.id) {
        parsed.id = parsed.email;
      }
      return parsed;
    }
    return null;
  });

  const login = (userData: User) => {
    const dataWithId = { ...userData, id: userData.id || userData.email };
    localStorage.setItem('user', JSON.stringify(dataWithId));
    setUser(dataWithId);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSetUser = (newVal: User | null) => {
    if (newVal) {
      const dataWithId = { ...newVal, id: newVal.id || newVal.email };
      localStorage.setItem('user', JSON.stringify(dataWithId));
      setUser(dataWithId);
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, login, logout }}>
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
