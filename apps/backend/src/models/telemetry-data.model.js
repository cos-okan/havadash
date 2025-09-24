import BaseModel from "./base.model.js";
import { Model } from "objection";

class TelemetryData extends BaseModel {
  static get tableName() {
    return "telemetry_data";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'droneId', 'timestamp'],
      properties: {
        ...super.jsonSchema.properties,
        droneId: { type: 'integer' },
        flightId: { type: ['integer', 'null'] },
        latitude: { type: ['number', 'null'] },
        longitude: { type: ['number', 'null'] },
        altitude: { type: ['number', 'null'] },
        speed: { type: ['number', 'null'] },
        batteryLevel: { type: ['number', 'null'] },
        timestamp: { type: 'string', format: 'date-time' },
      },
    }
  }

  static get relationMappings() {
    return this.lazyRelation(() => ({
      flight: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./flight.model.js").then((m) => m.default),
        join: {
          from: "telemetry_data.flight_id",
          to: "flights.id",
        },
      },
      drone: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./drone.model.js").then((m) => m.default),
        join: {
          from: "telemetry_data.drone_id",
          to: "drones.id",
        },
      },
    }));
  }

}

export default TelemetryData;
