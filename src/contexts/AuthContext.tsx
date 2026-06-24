import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Student } from '../types';
import { currentStudent } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('krmu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: string) => {
    // Mock login logic based on role
    let loggedInUser: User;
    if (role === 'admin') {
      loggedInUser = {
        id: 'ADMIN001',
        name: 'University Admin',
        email: email,
        role: 'admin'
      };
    } else {
      loggedInUser = {
        ...currentStudent,
        email: email,
        role: 'student'
      };
    }
    setUser(loggedInUser);
    localStorage.setItem('krmu_user', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('krmu_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
