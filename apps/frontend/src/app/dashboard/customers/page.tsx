'use client';

import { useRouter } from 'next/navigation';
import CustomerTable from '@/components/tables/CustomerTable';
import { Customer } from '@/models/customer.model';

export default function Customers() {
  const router = useRouter();

  const handleAddCustomer = () => {
    router.push('/dashboard/customers/new');
  };

  const handleEditCustomer = (customer: Customer) => {
    router.push(`/dashboard/customers/${customer.id}/edit`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-black">Müşteriler</h1>
          <p className="text-sm text-gray-800 mt-2">Müşteri yönetimi</p>
        </div>
        <button className="bg-[var(--havadash-blue-dark)] text-white text-sm px-4 py-2 rounded-md hover:bg-[var(--havadash-blue-dark)]/90" onClick={handleAddCustomer}>
          Yeni Müşteri Ekle
        </button>
      </div>

      <CustomerTable onEdit={handleEditCustomer} />
    </div>
  );
}
