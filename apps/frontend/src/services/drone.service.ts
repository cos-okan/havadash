import { apiService } from './api.service';
import { Drone } from '@/models/drone.model';
import { ApiResponse } from '@/models/api-response';

class DroneService {
  private readonly endpoint = '/api/drones';

  async getDrones(queryParams?: any): Promise<ApiResponse> {
    const params = new URLSearchParams();

    if (queryParams) {
      if (queryParams.include) {
        if (Array.isArray(queryParams.include)) {
          params.append('include', queryParams.include.join(','));
        } else {
          params.append('include', queryParams.include);
        }
      }

      if (queryParams.fields) {
        Object.entries(queryParams.fields).forEach(([table, fields]) => {
          if (Array.isArray(fields)) {
            params.append(`fields[${table}]`, fields.join(','));
          } else {
            params.append(`fields[${table}]`, fields as string);
          }
        });
      }

      if (queryParams.page) {
        if (queryParams.page.offset) params.append('page[offset]', queryParams.page.offset);
        if (queryParams.page.limit) params.append('page[limit]', queryParams.page.limit);
      }

      if (queryParams.filter) {
        Object.entries(queryParams.filter).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([op, val]) => {
              params.append(`filter[${key}][${op}]`, String(val));
            });
          } else {
            params.append(`filter[${key}]`, String(value));
          }
        });
      }

      if (queryParams.sort) {
        Object.entries(queryParams.sort).forEach(([key, direction]) => {
          params.append(`sort[${key}]`, String(direction));
        });
      }
    }

    const queryString = params.toString();
    const url = queryString ? `${this.endpoint}?${queryString}` : this.endpoint;

    return await apiService.get<any>(url);
  }

  async getDroneById(id: number): Promise<ApiResponse> {
    return await apiService.get<Drone>(`${this.endpoint}/${id}`);
  }

  async createDrone(drone: Omit<Drone, 'id'>): Promise<ApiResponse<Drone>> {
    return await apiService.post<Drone>(this.endpoint, drone);
  }

  async updateDrone(id: number, drone: Partial<Drone>): Promise<ApiResponse> {
    return await apiService.put<Drone>(`${this.endpoint}/${id}`, drone);
  }

  async deleteDrone(id: number): Promise<ApiResponse<void>> {
    return await apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const droneService = new DroneService();
export default droneService;
