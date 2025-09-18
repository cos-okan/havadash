import BaseModel from "./base.model.js";
import { Model } from "objection";

class AlarmData extends BaseModel {
  static get tableName() {
    return "alarm_data";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'flightId', 'droneId', 'typeCode', 'severityCode', 'message', 'timestamp'],
      properties: {
        ...super.jsonSchema.properties,
        flightId: { type: 'integer' },
        droneId: { type: 'integer' },
        typeCode: { type: 'integer' },
        severityCode: { type: 'integer' },
        message: { type: ['string', 'null'] },
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
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-alarm-type.model.js").then((m) => m.default),
        join: {
          from: "alarm_data.type_code",
          to: "prm_alarm_types.code",
        },
      },
      severity: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-alarm-severity.model.js").then((m) => m.default),
        join: {
          from: "alarm_data.severity_code",
          to: "prm_alarm_severities.code",
        },
      },
    }));
  }

}

export default AlarmData;
