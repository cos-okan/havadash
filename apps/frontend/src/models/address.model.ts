export interface Address {
  id: number;
  name: string;
  addressLine: string;
  cityId: number;
  zipCode?: number | null;
  latitude: number;
  longitude: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressWithRelations extends Address {
  city?: {
    id: number;
    name: string;
    country: string;
  };
}

export interface CustomerAddress {
  id: number;
  customerId: number;
  addressId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerAddressWithRelations extends CustomerAddress {
  customer?: {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
  };
  address?: AddressWithRelations;
}
