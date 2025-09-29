import { apiService } from './api.service';
import { ApiResponse } from '@/models/api-response';
import { LoginRequest } from '@/models/login-request';
import { LoginResponse } from '@/models/login-response';

class AuthService {
  async login(credentials: LoginRequest): Promise<any> {
    const response = await apiService.post('/api/auth/login', credentials);
    return response;
  }

  async logout(): Promise<ApiResponse> {
    return await apiService.post('/api/auth/logout');
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return await apiService.post<{ token: string }>('/api/auth/refresh');
  }
}

export const authService = new AuthService();
export default authService;
