import { Model } from "objection";
import PrmUserRole from "./prm-user-role.model.js";
import PrmOrderState from "./prm-order-state.model.js";
import PrmDroneState from "./prm-drone-state.model.js";
import PrmDroneModel from "./prm-drone-model.model.js";
import PrmFlightState from "./prm-flight-state.model.js";
import PrmAlarmType from "./prm-alarm-type.model.js";
import PrmAlarmSeverity from "./prm-alarm-severity.model.js";
import PrmCommandType from "./prm-command-type.model.js";
import PrmCommandState from "./prm-command-state.model.js";

import User from "./user.model.js";
import Country from "./country.model.js";
import City from "./city.model.js";
import Customer from "./customer.model.js";
import Address from "./address.model.js";
import CustomerAddressMap from "./customer-address-map.model.js";
import Order from "./order.model.js";
import Drone from "./drone.model.js";
import Flight from "./flight.model.js";
import FlightLocation from "./flight-location.model.js";
import TelemetryData from "./telemetry-data.model.js";
import AlarmData from "./alarm-data.model.js";
import DroneCommand from "./drone-command.model.js";

export function initRelations() {
  User.relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmUserRole,
      join: { from: 'users.role_code', to: 'prm_user_roles.code' },
    },
  };

  Customer.relationMappings = {
    customerAddresses: {
      relation: Model.ManyToManyRelation,
      modelClass: Address,
      join: {
        from: "customers.id",
        through: {
          from: 'customer_address_map.customer_id',
          to: 'customer_address_map.address_id',
        },
        to: "addresses.id",
      },
    },

    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: "customers.id",
        to: "orders.customer_id",
      },
    }
  };

  Country.relationMappings = {
    cities: {
      relation: Model.HasManyRelation,
      modelClass: City,
      join: {
        from: "countries.id",
        to: "cities.country_id",
      },
    },
  };

  City.relationMappings = {
    country: {
      relation: Model.BelongsToOneRelation,
      modelClass: Country,
      join: {
        from: "cities.country_id",
        to: "countries.id",
      },
    },
    addresses: {
      relation: Model.HasManyRelation,
      modelClass: Address,
      join: {
        from: "cities.id",
        to: "addresses.city_id",
      },
    },
  };

  Address.relationMappings = {
    city: {
      relation: Model.BelongsToOneRelation,
      modelClass: City,
      join: {
        from: "addresses.city_id",
        to: "cities.id",
      },
    },

    customerAddressMap: {
      relation: Model.HasOneRelation,
      modelClass: CustomerAddressMap,
      join: {
        from: "addresses.id",
        to: "customer_address_maps.address_id",
      },
    },

    customer: {
      relation: Model.ManyToManyRelation,
      modelClass: Customer,
      join: {
        from: "addresses.id",
        through: {
          from: 'customer_address_maps.address_id',
          to: 'customer_address_maps.customer_id',
        },
        to: "customers.id",
      },
    }
  };

  CustomerAddressMap.relationMappings = {
    customer: {
      relation: Model.BelongsToOneRelation,
      modelClass: Customer,
      join: {
        from: "customer_address_maps.customer_id",
        to: "customers.id",
      },
    },
    address: {
      relation: Model.HasManyRelation,
      modelClass: Address,
      join: {
        from: "customer_address_maps.address_id",
        to: "addresses.id",
      },
    },
  };

  Order.relationMappings = {
    customer: {
      relation: Model.BelongsToOneRelation,
      modelClass: Customer,
      join: {
        from: "orders.customer_id",
        to: "customers.id",
      },
    },
    deliveryAddress: {
      relation: Model.BelongsToOneRelation,
      modelClass: Address,
      join: {
        from: "orders.delivery_address_id",
        to: "addresses.id",
      },
    },
    state: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmOrderState,
      join: {
        from: "orders.state_code",
        to: "prm_order_states.code",
      },
    },
    flight: {
      relation: Model.HasOneRelation,
      modelClass: Flight,
      join: {
        from: "orders.id",
        to: "flights.order_id",
      },
    },
  };

  Drone.relationMappings = {
    model: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmDroneModel,
      join: {
        from: "drones.model_code",
        to: "prm_drone_models.code",
      },
    },
    state: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmDroneState,
      join: {
        from: "drones.state_code",
        to: "prm_drone_states.code",
      },
    },
    flights: {
      relation: Model.HasManyRelation,
      modelClass: Flight,
      join: {
        from: "drones.id",
        to: "flights.drone_id",
      },
    },
    telemetryData: {
      relation: Model.HasManyRelation,
      modelClass: TelemetryData,
      join: {
        from: "drones.id",
        to: "telemetry_data.drone_id",
      },
    },
    alarmData: {
      relation: Model.HasManyRelation,
      modelClass: AlarmData,
      join: {
        from: "drones.id",
        to: "alarm_data.drone_id",
      },
    },
    droneCommands: {
      relation: Model.HasManyRelation,
      modelClass: DroneCommand,
      join: {
        from: "drones.id",
        to: "drone_commands.drone_id",
      },
    },
  };

  Flight.relationMappings = {
    drone: {
      relation: Model.BelongsToOneRelation,
      modelClass: Drone,
      join: {
        from: "flights.drone_id",
        to: "drones.id",
      },
    },
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: "flights.order_id",
        to: "orders.id",
      },
    },
    state: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmFlightState,
      join: {
        from: "flights.state_code",
        to: "prm_flight_states.code",
      },
    },
    startAddress: {
      relation: Model.BelongsToOneRelation,
      modelClass: Address,
      join: {
        from: "flights.start_address_id",
        to: "addresses.id",
      },
    },
    endAddress: {
      relation: Model.BelongsToOneRelation,
      modelClass: Address,
      join: {
        from: "flights.end_address_id",
        to: "addresses.id",
      },
    },
    flightLocations: {
      relation: Model.HasManyRelation,
      modelClass: FlightLocation,
      join: {
        from: "flights.id",
        to: "flight_locations.flight_id",
      },
    },
    telemetryData: {
      relation: Model.HasManyRelation,
      modelClass: TelemetryData,
      join: {
        from: "flights.id",
        to: "telemetry_data.flight_id",
      },
    },
    alarmData: {
      relation: Model.HasManyRelation,
      modelClass: AlarmData,
      join: {
        from: "flights.id",
        to: "alarm_data.flight_id",
      },
    }
  };

  FlightLocation.relationMappings = {
    flight: {
      relation: Model.BelongsToOneRelation,
      modelClass: Flight,
      join: {
        from: "flight_locations.flight_id",
        to: "flights.id",
      },
    },
  };

  TelemetryData.relationMappings = {
    flight: {
      relation: Model.BelongsToOneRelation,
      modelClass: Flight,
      join: {
        from: "telemetry_data.flight_id",
        to: "flights.id",
      },
    },
    drone: {
      relation: Model.BelongsToOneRelation,
      modelClass: Drone,
      join: {
        from: "telemetry_data.drone_id",
        to: "drones.id",
      },
    },
  };

  AlarmData.relationMappings = {
    flight: {
      relation: Model.BelongsToOneRelation,
      modelClass: Flight,
      join: {
        from: "telemetry_data.flight_id",
        to: "flights.id",
      },
    },
    drone: {
      relation: Model.BelongsToOneRelation,
      modelClass: Drone,
      join: {
        from: "telemetry_data.drone_id",
        to: "drones.id",
      },
    },
    type: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmAlarmType,
      join: {
        from: "alarm_data.type_code",
        to: "prm_alarm_types.code",
      },
    },
    severity: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmAlarmSeverity,
      join: {
        from: "alarm_data.severity_code",
        to: "prm_alarm_severities.code",
      },
    },
  };

  DroneCommand.relationMappings = {
    drone: {
      relation: Model.BelongsToOneRelation,
      modelClass: Drone,
      join: {
        from: "drone_commands.drone_id",
        to: "drones.id",
      },
    },
    type: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmCommandType,
      join: {
        from: "drone_commands.type_code",
        to: "prm_command_types.code",
      },
    },
    state: {
      relation: Model.BelongsToOneRelation,
      modelClass: PrmCommandState,
      join: {
        from: "drone_commands.state_code",
        to: "prm_command_states.code",
      },
    },
  };
}
