'use client';

import { useState, useEffect } from 'react';
import { Drone } from '@/models/drone.model';
import { droneService } from '@/services/drone.service';
import { DroneStateEnum, DroneModelEnum, DRONE_STATES, DRONE_MODELS, DroneStateCode, DroneModelCode } from '@/models/drone-enums';

interface DroneFormProps {
  drone?: Drone;
  onSuccess?: (drone: Drone) => void;
  onCancel?: () => void;
}

export default function DroneForm({ drone, onSuccess, onCancel }: DroneFormProps) {
  const [formData, setFormData] = useState({
    code: drone?.code || '',
    serialNumber: drone?.serialNumber || '',
    modelCode: drone?.modelCode || 0,
    stateCode: drone?.stateCode || 0,
    maxPayloadKg: drone?.maxPayloadKg || '',
    batteryCapacity: drone?.batteryCapacity || '',
    latitude: drone?.latitude || '',
    longitude: drone?.longitude || '',
    altitude: drone?.altitude || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (drone) {
      setFormData({
        code: drone.code || '',
        serialNumber: drone.serialNumber || '',
        modelCode: drone.modelCode || 0,
        stateCode: drone.stateCode || 0,
        maxPayloadKg: drone.maxPayloadKg || '',
        batteryCapacity: drone.batteryCapacity || '',
        latitude: drone.latitude || '',
        longitude: drone.longitude || '',
        altitude: drone.altitude || '',
      });
    }
  }, [drone]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      if (drone) {
        response = await droneService.updateDrone(drone.id, formData as Partial<Drone>);
      } else {
        response = await droneService.createDrone(formData as Omit<Drone, 'id'>);
      }

      if (response.status === 'success' && response.data) {
        const droneData = response.data.data || response.data;
        onSuccess?.(droneData);
        if (!drone) {
          setFormData({
            code: '',
            serialNumber: '',
            modelCode: 0 as DroneModelCode,
            stateCode: 0 as DroneStateCode,
            maxPayloadKg: '',
            batteryCapacity: '',
            latitude: '',
            longitude: '',
            altitude: '',
          });
        }
      } else {
        setError(response.data?.message || 'İşlem başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu');
      console.error('Error saving drone:', err);
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
              <label htmlFor="code" className="block text-sm font-medium text-gray-800">
                Kod *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="code"
                  id="code"
                  required
                  value={formData.code}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="Drone kodu"
                />
              </div>
            </div>

            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-800">
                Seri Numarası *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="serialNumber"
                  id="serialNumber"
                  required
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="Seri numarası"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="modelCode" className="block text-sm font-medium text-gray-800">
                Model *
              </label>
              <div className="mt-1">
                <select
                  name="modelCode"
                  id="modelCode"
                  required
                  value={formData.modelCode}
                  onChange={handleChange}
                  className={`py-2 px-4 w-full border border-gray-800 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer ${
                    formData.modelCode === 0 ? 'text-gray-400' : 'text-gray-900'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}>
                  <option value="">Model seçin</option>
                  {Object.entries(DRONE_MODELS).map(([code, model]) => (
                    <option key={code} value={code}>
                      {model.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="stateCode" className="block text-sm font-medium text-gray-800">
                Durum *
              </label>
              <div className="mt-1">
                <select
                  name="stateCode"
                  id="stateCode"
                  required
                  value={formData.stateCode}
                  onChange={handleChange}
                  className={`py-2 px-4 w-full border border-gray-800 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer ${
                    formData.stateCode === 0 ? 'text-gray-400' : 'text-gray-900'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}>
                  <option value="">Durum seçin</option>
                  {Object.entries(DRONE_STATES).map(([code, state]) => (
                    <option key={code} value={code}>
                      {state.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="maxPayloadKg" className="block text-sm font-medium text-gray-800">
                Max Yük (kg)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.1"
                  name="maxPayloadKg"
                  id="maxPayloadKg"
                  value={formData.maxPayloadKg}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="Maksimum yük"
                />
              </div>
            </div>

            <div>
              <label htmlFor="batteryCapacity" className="block text-sm font-medium text-gray-800">
                Batarya Kapasitesi
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.1"
                  name="batteryCapacity"
                  id="batteryCapacity"
                  value={formData.batteryCapacity}
                  onChange={handleChange}
                  className="py-2 px-4 text-gray-900 w-full border border-gray-800 rounded-lg"
                  placeholder="Batarya kapasitesi"
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
                  {drone ? 'Güncelleniyor...' : 'Ekleniyor...'}
                </>
              ) : drone ? (
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
