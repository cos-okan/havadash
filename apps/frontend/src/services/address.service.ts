import { apiService } from './api.service';
import { Address, AddressWithRelations, CustomerAddress, CustomerAddressWithRelations } from '@/models/address.model';
import { ApiResponse } from '@/models/api-response';

class AddressService {
  private readonly endpoint = '/api/addresses';
  private readonly customerAddressEndpoint = '/api/customer-addresses';

  async getAddresses(queryParams?: any): Promise<ApiResponse> {
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

  async getAddressById(id: number): Promise<ApiResponse> {
    return await apiService.get<AddressWithRelations>(`${this.endpoint}/${id}`);
  }

  async createAddress(address: Omit<Address, 'id'>): Promise<ApiResponse<Address>> {
    return await apiService.post<Address>(this.endpoint, address);
  }

  async updateAddress(id: number, address: Partial<Address>): Promise<ApiResponse> {
    return await apiService.put<Address>(`${this.endpoint}/${id}`, address);
  }

  async deleteAddress(id: number): Promise<ApiResponse<void>> {
    return await apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  async getAddressesByCustomerId(customerId: number): Promise<ApiResponse> {
    return await apiService.get<CustomerAddressWithRelations[]>(`${this.customerAddressEndpoint}?customerId=${customerId}`);
  }

  async createCustomerAddress(customerAddress: Omit<CustomerAddress, 'id'>): Promise<ApiResponse> {
    return await apiService.post<CustomerAddress>(this.customerAddressEndpoint, customerAddress);
  }

  async deleteCustomerAddress(id: number): Promise<ApiResponse<void>> {
    return await apiService.delete<void>(`${this.customerAddressEndpoint}/${id}`);
  }
}

export const addressService = new AddressService();
export default addressService;
