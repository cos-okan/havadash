import { apiService } from './api.service';
import { ApiResponse } from '@/models';

class UserService {
  async getAll(): Promise<ApiResponse<any>> {
    return await apiService.get('/api/users');
  }

  async getById(id: string): Promise<ApiResponse<any>> {
    return await apiService.get(`/api/users/${id}`);
  }

  async create(data: any): Promise<ApiResponse<any>> {
    return await apiService.post('/api/users', data);
  }

  async update(id: string, data: any): Promise<ApiResponse<any>> {
    return await apiService.put(`/api/users/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse> {
    return await apiService.delete(`/api/users/${id}`);
  }
}

export const userService = new UserService();
export default userService;
