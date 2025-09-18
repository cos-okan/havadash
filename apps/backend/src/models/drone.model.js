import BaseModel from "./base.model.js";
import { Model } from "objection";

class Drone extends BaseModel {
  static get tableName() {
    return "drones";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      ...super.jsonSchema,
      required: [...super.jsonSchema.required, 'code', 'serialNumber', 'modelCode', 'stateCode'],
      properties: {
        ...super.jsonSchema.properties,
        code: { type: 'string' },
        serialNumber: { type: 'string' },
        modelCode: { type: 'integer' },
        stateCode: { type: 'integer' },
        maxPayloadKg: { type: ['decimal', 'null'] },
        batteryCapacity: { type: ['decimal', 'null'] },
        latitude: { type: ['decimal', 'null'] },
        longitude: { type: ['decimal', 'null'] },
        altitude: { type: ['decimal', 'null'] },
        lastLocationTime: { type: ['string', 'null'], format: 'date-time' },
      },
    }
  }

  static get relationMappings() {
    return this.lazyRelation(() => ({
       model: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-drone-model.model.js").then((m) => m.default),
        join: {
          from: "drones.model_code",
          to: "prm_drone_models.code",
        },
      },
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: () =>
          import("./prm-drone-state.model.js").then((m) => m.default),
        join: {
          from: "drones.state_code",
          to: "prm_drone_states.code",
        },
      },
      flights: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./flight.model.js").then((m) => m.default),
        join: {
          from: "drones.id",
          to: "flights.drone_id",
        },
      },
      telemetryData: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./telemetry-data.model.js").then((m) => m.default),
        join: {
          from: "drones.id",
          to: "telemetry_data.drone_id",
        },
      },
      alarmData: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./alarm-data.model.js").then((m) => m.default),
        join: {
          from: "drones.id",
          to: "alarm_data.drone_id",
        },
      },
      droneCommands: {
        relation: Model.HasManyRelation,
        modelClass: () =>
          import("./drone-command.model.js").then((m) => m.default),
        join: {
          from: "drones.id",
          to: "drone_commands.drone_id",
        },
      },
    }));
  }

}

export default Drone;
