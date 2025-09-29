'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CustomerForm from '@/components/forms/CustomerForm';
import { Customer } from '@/models/customer.model';
import { customerService } from '@/services/customer.service';

export default function EditCustomer() {
  const router = useRouter();
  const params = useParams();
  const customerId = Number(params.id);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customerId) {
      loadCustomer();
    }
  }, [customerId]);

  const loadCustomer = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerService.getCustomerById(customerId);

      if (response.status === 'success' && response.data) {
        setCustomer(response.data.data.customer);
      } else {
        setError(response.data?.message || 'Müşteri bulunamadı');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error('Error loading customer:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (updatedCustomer: Customer) => {
    router.push('/dashboard/customers');
  };

  const handleCancel = () => {
    router.push('/dashboard/customers');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Hata</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button onClick={() => router.push('/dashboard/customers')} className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm">
                Geri Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">Müşteri bulunamadı</p>
        <button onClick={() => router.push('/dashboard/customers')} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-black">Müşteri Düzenle</h1>
        <p className="text-sm text-gray-800 mt-2">Müşteri bilgilerini düzenleyin.</p>
      </div>
      <CustomerForm customer={customer} onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}
