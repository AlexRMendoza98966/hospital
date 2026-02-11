"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';


interface UserType {
  rol?: string;
  nombre_completo?: string;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (userData?: any) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Persistencia simple: revisa localStorage
    const logged = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    setIsAuthenticated(logged === 'true');
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  const login = (userData?: any) => {
    setIsAuthenticated(true);
    setUser(userData || null);
    localStorage.setItem('isAuthenticated', 'true');
    if (userData) localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    // router.push('/login'); // Removed redirection as per user request
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
