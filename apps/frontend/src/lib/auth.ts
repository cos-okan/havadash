import Cookies from 'js-cookie';
import { config } from '@/config/env';

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decoded = JSON.parse(jsonPayload);

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
      username: decoded.email.split('@')[0],
    };
  } catch (error) {
    return null;
  }
};

export const logout = (): void => {
  if (process.env.NODE_ENV !== 'production') {
    Cookies.remove('auth-token');
  }
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return Cookies.get('auth-token') || null;
};

export const setStoredToken = (token: string): void => {
  // kontrol et
  if (process.env.NODE_ENV !== 'production') {
    Cookies.set('auth-token', token, {
      expires: 7,
      secure: false,
      sameSite: 'strict',
    });
  }
};

export const getCurrentUser = (): User | null => {
  const token = getStoredToken();
  if (!token) return null;
  return decodeToken(token);
};
