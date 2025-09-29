import { apiService } from './api.service';
import { Order, OrderWithRelations } from '@/models/order.model';
import { ApiResponse } from '@/models/api-response';

class OrderService {
  private readonly endpoint = '/api/orders';

  async getOrders(queryParams?: any): Promise<ApiResponse> {
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

  async getOrderById(id: number): Promise<ApiResponse> {
    return await apiService.get<OrderWithRelations>(`${this.endpoint}/${id}`);
  }

  async createOrder(order: Omit<Order, 'id'>): Promise<ApiResponse> {
    return await apiService.post<Order>(this.endpoint, order);
  }

  async updateOrder(id: number, order: Partial<Order>): Promise<ApiResponse> {
    return await apiService.put<Order>(`${this.endpoint}/${id}`, order);
  }

  async deleteOrder(id: number): Promise<ApiResponse<void>> {
    return await apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async assignToDrone(orderId: number, droneId: number): Promise<ApiResponse> {
    return await apiService.post<Order>(`${this.endpoint}/${orderId}/assign`, { droneId });
  }

  async cancelOrder(id: number): Promise<ApiResponse<Order>> {
    return await apiService.post<Order>(`${this.endpoint}/${id}/cancel`);
  }
}

export const orderService = new OrderService();
export default orderService;
