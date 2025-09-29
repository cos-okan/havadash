export const DroneStateEnum = {
  IDLE: 1,
  FLYING: 2,
  CHARGING: 3,
  MAINTENANCE: 4,
} as const;

export type DroneStateCode = (typeof DroneStateEnum)[keyof typeof DroneStateEnum];

export const DroneModelEnum = {
  DJI_PHANTOM_4: 1,
  DJI_MAVIC_AIR_2: 2,
  DJI_MAVIC_3: 3,
  AUTEL_EVO_2: 4,
  CUSTOM_MODEL_X: 5,
} as const;

export type DroneModelCode = (typeof DroneModelEnum)[keyof typeof DroneModelEnum];

export const DRONE_STATES = {
  [DroneStateEnum.IDLE]: { value: 'Idle', description: 'Idle' },
  [DroneStateEnum.FLYING]: { value: 'Flying', description: 'Flying' },
  [DroneStateEnum.CHARGING]: { value: 'Charging', description: 'Charging' },
  [DroneStateEnum.MAINTENANCE]: { value: 'Maintenance', description: 'Maintenance' },
} as const;

export const DRONE_MODELS = {
  [DroneModelEnum.DJI_PHANTOM_4]: { value: 'DJI Phantom 4', description: 'DJI Phantom 4' },
  [DroneModelEnum.DJI_MAVIC_AIR_2]: { value: 'DJI Mavic Air 2', description: 'DJI Mavic Air 2' },
  [DroneModelEnum.DJI_MAVIC_3]: { value: 'DJI Mavic 3', description: 'DJI Mavic 3' },
  [DroneModelEnum.AUTEL_EVO_2]: { value: 'Autel Evo 2', description: 'Autel Evo 2' },
  [DroneModelEnum.CUSTOM_MODEL_X]: { value: 'Custom Model X', description: 'Custom Model X' },
} as const;

export const getDroneStateLabel = (code: DroneStateCode): string => {
  return DRONE_STATES[code]?.value || 'Unknown';
};

export const getDroneModelLabel = (code: DroneModelCode): string => {
  return DRONE_MODELS[code]?.value || 'Unknown';
};

export const getDroneStateDescription = (code: DroneStateCode): string => {
  return DRONE_STATES[code]?.description || 'Unknown';
};

export const getDroneModelDescription = (code: DroneModelCode): string => {
  return DRONE_MODELS[code]?.description || 'Unknown';
};
