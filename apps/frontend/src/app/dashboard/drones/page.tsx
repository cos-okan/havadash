'use client';

import { useRouter } from 'next/navigation';
import DroneCard from '@/components/cards/DroneCard';
import DroneTable from '@/components/tables/DroneTable';
import { Drone } from '@/models/drone.model';

export default function Drones() {
  const router = useRouter();

  const handleAddDrone = () => {
    router.push('/dashboard/drones/new');
  };

  const handleEditDrone = (drone: Drone) => {
    router.push(`/dashboard/drones/${drone.id}/edit`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-black">Dronelar</h1>
          <p className="text-sm text-gray-800 mt-2">Drone yönetimi ve takibi</p>
        </div>
        <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleAddDrone}>
          Yeni Drone Ekle
        </button>
      </div>

      <DroneTable onEdit={handleEditDrone} />
    </div>
  );
}
