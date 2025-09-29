'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DroneForm from '@/components/forms/DroneForm';
import { Drone } from '@/models/drone.model';
import { droneService } from '@/services/drone.service';

export default function EditDrone() {
  const router = useRouter();
  const params = useParams();
  const droneId = Number(params.id);

  const [drone, setDrone] = useState<Drone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (droneId) {
      loadDrone();
    }
  }, [droneId]);

  const loadDrone = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await droneService.getDroneById(droneId);
      console.log(response);

      if (response.status === 'success' && response.data) {
        setDrone(response.data.data.drone);
      } else {
        setError(response.data?.message || 'Drone bulunamadı');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error('Error loading drone:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (updatedDrone: Drone) => {
    router.push('/dashboard/drones');
  };

  const handleCancel = () => {
    router.push('/dashboard/drones');
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
              <button onClick={() => router.push('/dashboard/drones')} className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm">
                Geri Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!drone) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Drone bulunamadı</p>
        <button onClick={() => router.push('/dashboard/drones')} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-black">Drone Düzenle</h1>
        <p className="text-sm text-gray-800 mt-2">{drone.code} drone'unun bilgilerini güncelleyin.</p>
      </div>

      <DroneForm drone={drone} onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}
