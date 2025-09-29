'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DroneForm from '@/components/forms/DroneForm';
import { Drone } from '@/models/drone.model';

export default function NewDrone() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSuccess = (drone: Drone) => {
    setLoading(true);
    router.push('/dashboard/drones');
  };

  const handleCancel = () => {
    router.push('/dashboard/drones');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-black">Yeni Drone</h1>
        <p className="text-sm text-gray-800 mt-2">Yeni drone bilgilerini girin.</p>
      </div>

      <DroneForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}
