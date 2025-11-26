import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const MOCK_ADMIN = {
  id: '1',
  email: 'admin@casems.com',
  name: 'Admin User',
  role: 'admin' as const,
  password: 'admin123'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from cookie
    const savedUser = Cookies.get('cms_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        Cookies.remove('cms_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      const userData = {
        id: MOCK_ADMIN.id,
        email: MOCK_ADMIN.email,
        name: MOCK_ADMIN.name,
        role: MOCK_ADMIN.role
      };
      setUser(userData);
      Cookies.set('cms_user', JSON.stringify(userData), { expires: 7 });
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      return true;
    }

    toast({
      title: 'Login failed',
      description: 'Invalid email or password.',
      variant: 'destructive',
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('cms_user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, we'll just log them in
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'admin' as const
    };
    setUser(userData);
    Cookies.set('cms_user', JSON.stringify(userData), { expires: 7 });
    toast({
      title: 'Account created!',
      description: 'Your account has been successfully created.',
    });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
