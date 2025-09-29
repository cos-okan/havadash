'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/models/order.model';
import { orderService } from '@/services/order.service';
import { OrderStateCode, ORDER_STATES } from '@/models/order-enums';
import { customerService } from '@/services/customer.service';
import { Customer } from '@/models/customer.model';
import { addressService } from '@/services/address.service';
import { CustomerAddressWithRelations } from '@/models/address.model';

interface OrderFormProps {
  order?: Order;
  onSuccess?: (order: Order) => void;
  onCancel?: () => void;
}

export default function OrderForm({ order, onSuccess, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState({
    customerId: order?.customerId || 0,
    deliveryAddressId: order?.deliveryAddressId || '',
    stateCode: order?.stateCode || OrderStateCode.PENDING,
    orderNo: order?.orderNo || '',
    orderDate: order?.orderDate ? new Date(order.orderDate).toISOString().slice(0, 16) : '',
    weight: order?.weight || '',
    notes: order?.notes || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [customerAddresses, setCustomerAddresses] = useState<CustomerAddressWithRelations[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  useEffect(() => {
    if (order) {
      setFormData({
        customerId: order.customerId || 0,
        deliveryAddressId: order.deliveryAddressId || 0,
        stateCode: order.stateCode || OrderStateCode.PENDING,
        orderNo: order.orderNo || '',
        orderDate: order.orderDate ? new Date(order.orderDate).toISOString().slice(0, 16) : '',
        weight: order.weight || '',
        notes: order.notes || '',
      });
    }
  }, [order]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoadingCustomers(true);
        const queryParams = {
          fields: {
            customers: ['id', 'name', 'phoneNumber', 'email'],
          },
        };
        const response = await customerService.getCustomers(queryParams);
        if (response.status === 'success' && response.data) {
          const customersData = response.data.data?.customers || response.data.data || [];
          setCustomers(customersData);
        }
      } catch (err) {
        console.error('Error loading customers:', err);
      } finally {
        setLoadingCustomers(false);
      }
    };

    loadCustomers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'customerId' || name === 'deliveryAddressId' || name === 'stateCode' || name === 'orderNo' ? (value === '' ? '' : parseInt(value, 10)) : value,
    }));

    if (name === 'customerId' && value) {
      loadCustomerAddresses(parseInt(value, 10));
      setFormData((prev) => ({
        ...prev,
        deliveryAddressId: '',
      }));
    }
  };

  const loadCustomerAddresses = async (customerId: number) => {
    try {
      setLoadingAddresses(true);
      const queryParams = {
        include: ['address', 'customer'],
        fields: {
          customerAddresses: ['id', 'customerId', 'addressId'],
          addresses: ['id', 'name', 'addressLine', 'cityId', 'latitude', 'longitude'],
        },
        filter: {
          'customerAddresses.customerId': customerId,
        },
      };

      const response = await addressService.getAddresses(queryParams);
      if (response.status === 'success' && response.data) {
        const addressesData = response.data.data?.customerAddresses || response.data.data || [];
        setCustomerAddresses(addressesData);
      }
    } catch (err) {
      console.error('Error loading customer addresses:', err);
      setCustomerAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      const payload = {
        ...formData,
        customerId: formData.customerId,
        deliveryAddressId: formData.deliveryAddressId,
        orderNo: formData.orderNo,
        weight: formData.weight === '' ? null : Number(formData.weight),
        orderDate: new Date(formData.orderDate).toISOString(),
      };

      if (order) {
        response = await orderService.updateOrder(order.id, payload as Partial<Order>);
      } else {
        response = await orderService.createOrder(payload as Omit<Order, 'id'>);
      }

      if (response.status === 'success' && response.data) {
        const orderData = response.data.data || response.data;
        onSuccess?.(orderData);
        if (!order) {
          setFormData({
            customerId: 0,
            deliveryAddressId: 0,
            stateCode: OrderStateCode.PENDING,
            orderNo: 0,
            orderDate: '',
            weight: '',
            notes: '',
          });
        }
      } else {
        setError(response.data?.message || 'İşlem başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error('Error saving order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Hata</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="orderNo" className="block text-sm font-medium text-gray-800">
                Sipariş Numarası *
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="orderNo"
                  id="orderNo"
                  required
                  value={formData.orderNo}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="Sipariş numarası"
                />
              </div>
            </div>

            <div>
              <label htmlFor="customerId" className="block text-sm font-medium text-gray-800">
                Müşteri *
              </label>
              <div className="mt-1">
                <select
                  name="customerId"
                  id="customerId"
                  required
                  value={formData.customerId}
                  onChange={handleChange}
                  disabled={loadingCustomers}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg">
                  <option value="">Müşteri seçin</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="deliveryAddressId" className="block text-sm font-medium text-gray-800">
                Teslimat Adresi *
              </label>
              <div className="mt-1">
                <select
                  name="deliveryAddressId"
                  id="deliveryAddressId"
                  required
                  value={formData.deliveryAddressId}
                  onChange={handleChange}
                  disabled={!formData.customerId || loadingAddresses}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg">
                  <option value="">{!formData.customerId ? 'Önce müşteri seçin' : loadingAddresses ? 'Adresler yükleniyor...' : 'Teslimat adresi seçin'}</option>
                  {customerAddresses.map((customerAddress) => (
                    <option key={customerAddress.addressId} value={customerAddress.addressId}>
                      {customerAddress.address?.name} - {customerAddress.address?.addressLine}
                    </option>
                  ))}
                </select>
                {formData.customerId && customerAddresses.length === 0 && !loadingAddresses && <p className="mt-1 text-sm text-gray-500">Bu müşteri için kayıtlı adres bulunmuyor</p>}
              </div>
            </div>

            <div>
              <label htmlFor="stateCode" className="block text-sm font-medium text-gray-800">
                Durum *
              </label>
              <div className="mt-1">
                <select name="stateCode" id="stateCode" required value={formData.stateCode} onChange={handleChange} className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg">
                  {ORDER_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="orderDate" className="block text-sm font-medium text-gray-800">
                Sipariş Tarihi *
              </label>
              <div className="mt-1">
                <input
                  type="datetime-local"
                  name="orderDate"
                  id="orderDate"
                  required
                  value={formData.orderDate}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-800">
                Ağırlık (kg)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="Ağırlık"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-800">
              Notlar
            </label>
            <div className="mt-1">
              <textarea
                name="notes"
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                placeholder="Sipariş notları"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                İptal
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[var(--havadash-blue-dark)] hover:bg-[var(--havadash-blue-dark)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {order ? 'Güncelleniyor...' : 'Ekleniyor...'}
                </>
              ) : order ? (
                'Güncelle'
              ) : (
                'Ekle'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
