'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/forms/CustomerForm';
import { Customer } from '@/models/customer.model';

export default function NewCustomer() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSuccess = (customer: Customer) => {
    setLoading(true);
    router.push('/dashboard/customers');
  };

  const handleCancel = () => {
    router.push('/dashboard/customers');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-black">Yeni Müşteri</h1>
        <p className="text-sm text-gray-800 mt-2">Yeni müşteri bilgilerini girin.</p>
      </div>
      <CustomerForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}
