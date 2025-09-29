'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { logout, getCurrentUser, setStoredToken, getStoredToken, LoginCredentials, decodeToken } from '@/lib/auth';
import { authService } from '@/services/auth.service';
import { User } from '@/lib/auth';
import { LoginResponse } from '@/models/login-response';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getStoredToken();
        if (token) {
          const user = getCurrentUser();
          if (user) {
            setUser(user);
          } else {
            logout();
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      console.log(response);

      if (response.data.status === 'success' && response.data.data && response.data.data.token) {
        console.log('Login successful');
        console.log(response.data.data);
        setStoredToken(response.data.data.token);
        const decodedUser = decodeToken(response.data.data.token);
        if (decodedUser) {
          setUser(decodedUser);
          console.log('User set:', decodedUser);
        }
        return { success: true };
      } else {
        return { success: false, message: response.data?.message || 'Giriş başarısız' };
      }
    } catch (error) {
      return { success: false, message: 'Bir hata oluştu' };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
