import { DroneStateCode, DroneModelCode } from './drone-enums';

export interface Drone {
  id: number;
  code: string;
  serialNumber: string;
  modelCode: DroneModelCode;
  stateCode: DroneStateCode;
  maxPayloadKg?: number | null;
  batteryCapacity?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  altitude?: number | null;
  lastLocationTime?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
