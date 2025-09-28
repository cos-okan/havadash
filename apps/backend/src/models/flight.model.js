import BaseModel from "./base.model.js";
import { Model } from "objection";

class Flight extends BaseModel {
  static get tableName() {
    return "flights";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'droneId', 'orderId', 'stateCode', 'startAddressId', 'endAddressId'],
      properties: {
        ...super.jsonSchema.properties,
        droneId: { type: 'integer' },
        orderId: { type: 'integer' },
        stateCode: { type: 'integer' },
        startAddressId: { type: 'integer' },
        plannedTime: { type: ['string', 'null'], format: 'date-time' },
        startTime: { type: ['string', 'null'], format: 'date-time' },
        endAddressId: { type: 'integer' },
        endTime: { type: ['string', 'null'], format: 'date-time' },
        distance: { type: ['number', 'null'] },
      },
    }
  }

  static get relationMappings() {
    return this.lazyRelation(() => ({
      drone: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./drone.model.js").then((m) => m.default),
        join: {
          from: "flights.drone_id",
          to: "drones.id",
        },
      },
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./order.model.js").then((m) => m.default),
        join: {
          from: "flights.order_id",
          to: "orders.id",
        },
      },
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-flight-state.model.js").then((m) => m.default),
        join: {
          from: "flights.state_code",
          to: "prm_flight_states.code",
        },
      },
      startAddress: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./address.model.js").then((m) => m.default),
        join: {
          from: "flights.start_address_id",
          to: "addresses.id",
        },
      },
      endAddress: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./address.model.js").then((m) => m.default),
        join: {
          from: "flights.end_address_id",
          to: "addresses.id",
        },
      },
      flightLocations: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./flight-location.model.js").then((m) => m.default),
        join: {
          from: "flights.id",
          to: "flight_locations.flight_id",
        },
      },
      telemetryData: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./telemetry-data.model.js").then((m) => m.default),
        join: {
          from: "flights.id",
          to: "telemetry_data.flight_id",
        },
      },
      alarmData: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./alarm-data.model.js").then((m) => m.default),
        join: {
          from: "flights.id",
          to: "alarm_data.flight_id",
        },
      }
    }));
  }

}

export default Flight;
