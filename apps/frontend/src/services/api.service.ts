import { ApiResponse, PaginationMeta } from '@/models/api-response';
import { config } from '@/config/env';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = config.api.baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;

      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const token = this.getToken();
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }

      const config: RequestInit = {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          status: data.status || 'error',
          data: {
            status: data.status || 'error',
            statusCode: response.status,
            message: data.message || `HTTP ${response.status}`,
            data: undefined as T,
            meta: null as PaginationMeta | null,
          },
        };
      }

      return {
        status: data.status,
        data: data,
      };
    } catch (error) {
      console.error('API request error:', error);
      return {
        status: 'error',
        data: {
          status: 'error',
          statusCode: 0,
          message: 'Network error',
          data: undefined as T,
          meta: null as PaginationMeta | null,
        },
      };
    }
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const authCookie = cookies.find((cookie) => cookie.trim().startsWith('auth-token='));

    if (authCookie) {
      return authCookie.split('=')[1];
    }

    if (process.env.NODE_ENV === 'development') {
      return localStorage.getItem('auth-token');
    }

    return null;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return await this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return await this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return await this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return await this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return await this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();
export default apiService;
