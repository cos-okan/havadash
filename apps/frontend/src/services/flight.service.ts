import { apiService } from './api.service';
import { ApiResponse } from '@/models';

class FlightService {
  async getAll(): Promise<ApiResponse<any>> {
    return await apiService.get('/api/flights');
  }

  async getById(id: string): Promise<ApiResponse<any>> {
    return await apiService.get(`/api/flights/${id}`);
  }

  async create(data: any): Promise<ApiResponse<any>> {
    return await apiService.post('/api/flights', data);
  }

  async update(id: string, data: any): Promise<ApiResponse<any>> {
    return await apiService.put(`/api/flights/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse> {
    return await apiService.delete(`/api/flights/${id}`);
  }
}

export const flightService = new FlightService();
export default flightService;
