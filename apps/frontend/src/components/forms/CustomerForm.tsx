'use client';

import { useState, useEffect } from 'react';
import { Customer } from '@/models/customer.model';
import { customerService } from '@/services/customer.service';

interface CustomerFormProps {
  customer?: Customer;
  onSuccess?: (customer: Customer) => void;
  onCancel?: () => void;
}

export default function CustomerForm({ customer, onSuccess, onCancel }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    phoneNumber: customer?.phoneNumber || '',
    email: customer?.email || '',
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        phoneNumber: customer.phoneNumber || '',
        email: customer.email || '',
      });
    }
  }, [customer]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (customer) {
        response = await customerService.updateCustomer(customer.id, formData);
      } else {
        response = await customerService.createCustomer(formData);
      }

      if (response.status === 'success' && response.data) {
        const customerData = response.data.data || response.data;
        onSuccess?.(customerData);
        if (!customer) {
          setFormData({
            name: '',
            phoneNumber: '',
            email: '',
          });
        }
      } else {
        setError(response.data?.message || 'İşlem başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error('Error saving customer:', err);
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
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                Ad Soyad *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="Müşteri adı"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-800">
                Telefon Numarası *
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="0555 123 45 67"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                E-posta Adresi *
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="ornek@email.com"
                />
              </div>
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
                  {customer ? 'Güncelleniyor...' : 'Ekleniyor...'}
                </>
              ) : customer ? (
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
