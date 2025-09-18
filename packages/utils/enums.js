const PrmValueTypeEnum = {
  STRING: 1,
  INTEGER: 2,
  BOOLEAN: 3,
};

Object.freeze(PrmValueTypeEnum);

const RoleEnum = {
  SYSTEM: 1,
  ADMIN: 2,
};

Object.freeze(RoleEnum);

const StatusEnum = {
  ACTIVE: 1,
  INACTIVE: 0,
};

Object.freeze(StatusEnum);

const OrderStateEnum = {
  PENDING: 1,
  IN_PROGRESS: 2,
  DELIVERED: 3,
  CANCELLED: 4,
  FAILED: 5,
};

Object.freeze(OrderStateEnum);

const DroneStateEnum = {
  IDLE: 1,
  FLYING: 2,
  CHARGING: 3,
  MAINTENANCE: 4,
};

Object.freeze(DroneStateEnum);

const DroneModelEnum = {
  DJI_PHANTOM_4: 1,
  DJI_MAVIC_AIR_2: 2,
  DJI_MAVIC_3: 3,
  AUTEL_EVO_2: 4,
  CUSTOM_MODEL_X: 5,
};

Object.freeze(DroneModelEnum);

const FlightStateEnum = {
  PLANNED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  CANCELLED: 4,
  FAILED: 5,
};

Object.freeze(FlightStateEnum);

const AlarmTypeEnum = {
  LOW_BATTERY: 1,
  GPS_LOST: 2,
  MOTOR_FAILURE: 3,
  OBSTACLE_DETECTED: 4,
  UKNOWN_FAILURE: 5,
};

Object.freeze(AlarmTypeEnum);

const AlarmSeverityEnum = {
  INFO: 1,
  WARNING: 2,
  CRITICAL: 3,
};

Object.freeze(AlarmSeverityEnum);

const CommandTypeEnum = {
  TAKE_OFF: 1,
  LAND: 2,
  MOVE_TO: 3,
  HOVER: 4,
  RETURN_TO_BASE: 5,
};

Object.freeze(CommandTypeEnum);

const CommandStateEnum = {
  PENDING: 1,
  SENT: 2,
  EXECUTED: 3,
  FAILED: 4,
};

Object.freeze(CommandStateEnum);

export { 
  PrmValueTypeEnum,
  RoleEnum,
  StatusEnum,
  OrderStateEnum,
  DroneStateEnum,
  DroneModelEnum,
  FlightStateEnum,
  AlarmTypeEnum,
  AlarmSeverityEnum,
  CommandTypeEnum,
  CommandStateEnum,
};