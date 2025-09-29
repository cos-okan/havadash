import { apiService } from './api.service';
import { Customer } from '@/models/customer.model';
import { ApiResponse } from '@/models/api-response';

class CustomerService {
  private readonly endpoint = '/api/customers';

  async getCustomers(queryParams?: any): Promise<ApiResponse> {
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

  async getCustomerById(id: number): Promise<ApiResponse> {
    return await apiService.get<any>(`${this.endpoint}/${id}`);
  }

  async createCustomer(customer: Omit<Customer, 'id'>): Promise<ApiResponse> {
    return await apiService.post<Customer>(this.endpoint, customer);
  }

  async updateCustomer(id: number, customer: Partial<Customer>): Promise<ApiResponse> {
    return await apiService.patch<Customer>(`${this.endpoint}/${id}`, customer);
  }

  async deleteCustomer(id: number): Promise<ApiResponse<void>> {
    return await apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const customerService = new CustomerService();
export default customerService;
