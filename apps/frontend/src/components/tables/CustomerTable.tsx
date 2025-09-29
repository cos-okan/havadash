'use client';

import { useState, useEffect } from 'react';
import { Customer } from '@/models/customer.model';
import { customerService } from '@/services/customer.service';
import { PaginationMeta } from '@/models/api-response';

interface CustomerTableProps {
  onEdit?: (customer: Customer) => void;
  onDelete?: (customer: Customer) => void;
}

export default function CustomerTable({ onEdit, onDelete }: CustomerTableProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    totalPage: 1,
    totalCount: 0,
    limit: 10,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    loadCustomers(1);
  }, []);

  const loadCustomers = async (page: number = 1) => {
    await loadCustomersWithSort(page, sortField, sortDirection);
  };

  const loadCustomersWithSort = async (page: number = 1, sortFieldParam?: string, sortDirectionParam?: 'asc' | 'desc') => {
    try {
      setLoading(true);
      setError(null);

      const queryParams: any = {
        // include: ['addresses'],

        fields: {
          customers: ['id', 'name', 'phone_number', 'email', 'created_at'],
        },

        page: {
          offset: page,
          limit: pagination.limit,
        },
      };

      if (searchTerm) {
        queryParams.filter = {
          'customers.name': { like: `%${searchTerm}%` },
          // 'customers.email': { like: `%${searchTerm}%` },
          // 'customers.phone_number': { like: `%${searchTerm}%` }
        };
      }

      if (Object.keys(filters).length > 0) {
        queryParams.filter = { ...queryParams.filter, ...filters };
      }

      if (sortFieldParam) {
        // Map frontend field names to API field names
        const apiFieldMap: { [key: string]: string } = {
          phoneNumber: 'phone_number',
          createdAt: 'created_at',
        };
        const apiField = apiFieldMap[sortFieldParam] || sortFieldParam;
        queryParams.sort = {
          [`customers.${apiField}`]: sortDirectionParam || 'asc',
        };
      }

      console.log('Query params:', queryParams);

      const response = await customerService.getCustomers(queryParams);
      console.log('API Response:', response);

      if (response.status === 'success' && response.data) {
        const customersData = response.data.data?.customers || response.data.data || [];
        const metaData = response.data.data?.meta || response.data.meta;

        console.log('Customers data:', customersData);
        console.log('Meta data:', metaData);

        setCustomers(customersData);

        if (metaData) {
          setPagination({
            page: metaData.page || page,
            totalPage: metaData.totalPage || 1,
            totalCount: metaData.totalCount || 0,
            limit: metaData.limit || 10,
          });
        }
      } else {
        setError(response.data?.message || 'Müşteriler yüklenemedi');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error('Error loading customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (customer: Customer) => {
    if (window.confirm(`${customer.name} müşterisini silmek istediğinizden emin misiniz?`)) {
      try {
        const response = await customerService.deleteCustomer(customer.id);
        if (response.status === 'success') {
          setCustomers(customers.filter((c) => c.id !== customer.id));
          onDelete?.(customer);
        } else {
          alert('Müşteri silinemedi: ' + (response.data?.message || 'Bilinmeyen hata'));
        }
      } catch (err) {
        alert('Müşteri silinemedi');
        console.error('Error deleting customer:', err);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPage) {
      loadCustomers(newPage);
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    loadCustomers(1);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilter = (field: string, value: any) => {
    const newFilters = { ...filters };
    if (value === '' || value === null || value === undefined) {
      delete newFilters[field];
    } else {
      newFilters[field] = value;
    }
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
    loadCustomers(1);
  };

  const handleSort = (field: string) => {
    let newSortField = field;
    let newSortDirection: 'asc' | 'desc' = 'asc';

    if (sortField === field) {
      newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }

    setSortField(newSortField);
    setSortDirection(newSortDirection);
    setPagination((prev) => ({ ...prev, page: 1 }));

    loadCustomersWithSort(1, newSortField, newSortDirection);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({});
    setSortField('');
    setSortDirection('asc');
    setPagination((prev) => ({ ...prev, page: 1 }));
    loadCustomers(1);
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
              <button onClick={() => loadCustomers(1)} className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm">
                Tekrar Dene
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {/* Search Bar with Button */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Müşteri ara..."
              value={searchTerm}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Search Button */}
          <button onClick={handleSearch} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Ara
          </button>

          {/* Clear Button - only show when there's something to clear */}
          {(searchTerm || Object.keys(filters).length > 0 || sortField) && (
            <button onClick={clearFilters} className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
              ✕
            </button>
          )}
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Henüz müşteri bulunmuyor</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Ad</span>
                    {sortField === 'name' && <span className="text-blue-600">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('phoneNumber')}>
                  <div className="flex items-center space-x-1">
                    <span>Telefon</span>
                    {sortField === 'phoneNumber' && <span className="text-blue-600">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('email')}>
                  <div className="flex items-center space-x-1">
                    <span>E-posta</span>
                    {sortField === 'email' && <span className="text-blue-600">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {onEdit && (
                        <button onClick={() => onEdit(customer)} className="bg-[var(--havadash-blue-dark)] text-white text-sm px-3 py-1.5 rounded-md hover:bg-[var(--havadash-blue-dark)]/90">
                          Düzenle
                        </button>
                      )}
                      <button onClick={() => handleDelete(customer)} className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-600/90">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Önceki
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPage}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Sonraki
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Toplam <span className="font-medium">{pagination.totalCount}</span> müşteriden <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span>
                {' - '}
                <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.totalCount)}</span> arası gösteriliyor
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="sr-only">Önceki</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, pagination.totalPage) }, (_, i) => {
                  const startPage = Math.max(1, pagination.page - 2);
                  const pageNum = startPage + i;
                  if (pageNum > pagination.totalPage) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium  ${
                        pageNum === pagination.page ? 'z-10 bg-[var(--havadash-blue-dark)] border-gray-300 text-white' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}>
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPage}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="sr-only">Sonraki</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
