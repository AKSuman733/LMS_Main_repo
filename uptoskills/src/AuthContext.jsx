import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('upToSkills_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, role, name) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || (role === 'admin' ? 'Admin User' : 'Student User'),
      role,
      isNewUser: false
    };
    setUser(newUser);
    localStorage.setItem('upToSkills_user', JSON.stringify(newUser));
  };

  const register = (email, name) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'student',
      isNewUser: true
    };
    setUser(newUser);
    localStorage.setItem('upToSkills_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('upToSkills_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
