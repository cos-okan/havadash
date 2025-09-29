import { OrderStateCode } from './order-enums';

export interface Order {
  id: number;
  customerId: number;
  deliveryAddressId: number;
  stateCode: OrderStateCode;
  orderNo: number;
  orderDate: string;
  weight?: number | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderWithRelations extends Order {
  customer?: {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
  };
  address?: {
    id: number;
    address: string;
    city: string;
    district: string;
  };
  state?: {
    code: number;
    name: string;
  };
}

export interface OrderState {
  code: number;
  name: string;
}
